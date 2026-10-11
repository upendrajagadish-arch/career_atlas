'use strict';
/* Timetable builder: combine selected skills (and role syllabi) into one dated 80-hour lecture timetable. */

const BUILD_KEY = 'atlas.builder';
const COLORS = ['#3b6cf6', '#e8590c', '#2f9e44', '#ae3ec9', '#0c8599', '#d6336c', '#f08c00', '#6741d9', '#66a80f', '#a61e4d', '#1098ad', '#868e96'];
const SLOT_TIMES = [['0900', '1000'], ['1000', '1100'], ['1115', '1215'], ['1215', '1315']];
const builderEl = $('#builderModal'), builderCard = builderEl.firstElementChild;

const pad2 = n => String(n).padStart(2, '0');
const isoDate = d => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const parseISO = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const fmtDate = (d, long) => d.toLocaleDateString('en-GB', long ? { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' } : { weekday: 'short', day: 'numeric', month: 'short' });
function nextMonday() {
  const d = new Date(); d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7));
  return isoDate(d);
}

const B = Object.assign({ title: '', role: '', items: [], mode: 'block', coverage: 'spread', start: nextMonday(), holidays: [] },
  JSON.parse(localStorage.getItem(BUILD_KEY) || '{}'), { tab: 'setup', filter: '', month: '' });
const titleOf = () => B.title || (S.ROLE && S.ROLE[B.role] ? `${S.ROLE[B.role].name} timetable` : 'My combined timetable');
const saveBuilder = () => localStorage.setItem(BUILD_KEY, JSON.stringify({ title: B.title, role: B.role, items: B.items, mode: B.mode, coverage: B.coverage, start: B.start, holidays: B.holidays }));

/* ------------------------------------------------------------------ selection model */
const rmOf = it => (it.type === 'role' ? S.ROLE[it.slug] : S.SKILL[it.slug]);
const nameOf = it => (it.type === 'role' ? `${rmOf(it).name} (role syllabus)` : rmOf(it).name);
const colorOf = it => COLORS[B.items.indexOf(it) % COLORS.length];
const capOf = it => it.levels.filter(Boolean).length * 20;
const totalHours = () => B.items.reduce((a, it) => a + it.hours, 0);
const findItem = (type, slug) => B.items.find(it => it.type === type && it.slug === slug);
const levelNames = it => LEVELS.filter((_, i) => it.levels[i]).map(l => l[0]);

function addItem(type, slug) { if (!findItem(type, slug)) B.items.push({ type, slug, hours: 0, levels: [true, true, true, true] }); }
function balance() {
  let left = TOTAL_HOURS, moved = true;
  B.items.forEach(it => { it.hours = 0; });
  while (left > 0 && moved) {
    moved = false;
    for (const it of B.items) {
      const step = Math.min(4, left, capOf(it) - it.hours);
      if (step > 0) { it.hours += step; left -= step; moved = true; }
      if (!left) break;
    }
  }
}
function setHours(it, v) {
  const room = TOTAL_HOURS - (totalHours() - it.hours);
  it.hours = clamp(Math.round(+v || 0), 0, Math.min(capOf(it), room));
}

function lecturesFor(it) {
  const pool = [], rm = rmOf(it);
  planOf(rm).days.forEach((day, k) => {
    const w = Math.floor(k / 5) + 1;
    if (!it.levels[w - 1]) return;
    day.hours.forEach(title => pool.push({ title, theme: day.theme, level: LEVELS[w - 1][0], item: it }));
  });
  const n = Math.min(it.hours, pool.length);
  if (B.coverage === 'first') return pool.slice(0, n);
  return Array.from({ length: n }, (_, k) => pool[Math.floor(k * pool.length / n)]);
}
function teachingDates(n) {
  const out = [], hol = new Set(B.holidays), d = parseISO(B.start || nextMonday());
  while (out.length < n) {
    const wd = d.getDay();
    if (wd >= 1 && wd <= 5 && !hol.has(isoDate(d))) out.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}
function buildSchedule() {
  const queues = B.items.filter(it => it.hours > 0).map(it => ({ it, list: lecturesFor(it), k: 0 }));
  let seq = [];
  if (B.mode === 'block') seq = queues.flatMap(q => q.list);
  else {
    const n = queues.reduce((a, q) => a + q.list.length, 0);
    for (let s = 0; s < n; s++) {
      let best = null, score = Infinity;
      for (const q of queues) if (q.k < q.list.length && (q.k + 1) / q.list.length < score - 1e-9) { score = (q.k + 1) / q.list.length; best = q; }
      seq.push(best.list[best.k++]);
    }
  }
  if (!seq.length) return null;
  const dates = teachingDates(Math.ceil(seq.length / 4));
  const lectures = seq.map((l, i) => ({ ...l, n: i + 1, slot: i % 4, dayNo: Math.floor(i / 4) + 1, date: dates[Math.floor(i / 4)] }));
  const days = dates.map((date, k) => ({ k: k + 1, date, week: Math.floor(k / 5) + 1, lectures: lectures.slice(k * 4, k * 4 + 4) }));
  const weeks = [];
  days.forEach(d => (weeks[d.week - 1] ||= []).push(d));
  return { lectures, days, weeks, start: dates[0], end: dates.at(-1) };
}

/* ------------------------------------------------------------------ views */
function skillListHTML() {
  const q = B.filter.trim().toLowerCase();
  const used = new Set(SKILL_GROUPS.flatMap(g => g[1]));
  const groups = [...SKILL_GROUPS, ['Other skills', S.data.catalog.skill.map(s => s.slug).filter(s => !used.has(s))]];
  const html = groups.map(([name, slugs]) => {
    const list = slugs.filter(s => S.SKILL[s] && (!q || S.SKILL[s].name.toLowerCase().includes(q) || s.includes(q)));
    if (!list.length) return '';
    return `<div class="b-group"><h4>${esc(name)}</h4><div class="chips">${list.map(s => `<button class="b-chip${findItem('skill', s) ? ' on' : ''}" data-b="toggle:skill:${s}">${esc(S.SKILL[s].name)}</button>`).join('')}</div></div>`;
  }).join('');
  return html || `<p class="muted">No skills match “${esc(B.filter)}”.</p>`;
}
function itemRow(it, idx) {
  const cap = capOf(it);
  return `<div class="b-item" style="--c:${colorOf(it)}"><span class="b-dot"></span>
    <div class="b-item-main"><b>${esc(nameOf(it))}</b><small>${it.type === 'role' ? 'Role syllabus' : 'Skill'} · ${cap} lectures available in the selected levels</small>
      <div class="b-levels">${LEVELS.map(([l], li) => `<button class="b-lv${it.levels[li] ? ' on' : ''}" data-b="lv:${idx}:${li}" title="Week ${li + 1} of the ${esc(rmOf(it).name)} syllabus">${l}</button>`).join('')}</div></div>
    <div class="b-hours" title="Lecture hours for this subject"><button data-b="hrs:${idx}:-4" aria-label="4 hours less">−</button><input type="number" data-bh="${idx}" value="${it.hours}" min="0" max="${cap}"><span>h</span><button data-b="hrs:${idx}:4" aria-label="4 hours more">+</button></div>
    <div class="b-move"><button data-b="up:${idx}" title="Move up"${idx ? '' : ' disabled'}>↑</button><button data-b="down:${idx}" title="Move down"${idx < B.items.length - 1 ? '' : ' disabled'}>↓</button><button data-b="rm:${idx}" title="Remove">×</button></div></div>`;
}
function seg(key, value, options) {
  return `<div class="b-seg">${options.map(([v, l, s]) => `<button class="${value === v ? 'on' : ''}" data-b="${key}:${v}">${l}${s ? `<small>${s}</small>` : ''}</button>`).join('')}</div>`;
}
function setupHTML() {
  const tot = totalHours(), capAll = B.items.reduce((a, it) => a + capOf(it), 0);
  const role = B.role && S.ROLE[B.role];
  const warn = [];
  if (B.items.length && tot < TOTAL_HOURS) warn.push(capAll < TOTAL_HOURS
    ? `The selected levels only provide ${capAll} lectures. Add more skills or levels to fill all 80 hours.`
    : `${TOTAL_HOURS - tot} hours are still unassigned. Increase some subjects or click Auto-balance.`);
  if (B.items.length > 20) warn.push('More than 20 subjects: with 4-hour blocks some subjects receive no hours.');
  return `<div class="b-setup">
    <section class="b-col">
      <h3 class="b-h">1. Start from a role</h3>
      <select id="bRole" class="b-input"><option value="">Choose a role…</option>${ROLE_GROUPS.map(([g, slugs]) => `<optgroup label="${esc(g)}">${slugs.filter(s => S.ROLE[s]).map(s => `<option value="${s}"${B.role === s ? ' selected' : ''}>${esc(S.ROLE[s].name)}</option>`).join('')}</optgroup>`).join('')}</select>
      ${role ? `<p class="b-hint">Skills a ${esc(role.name)} uses — click to add or remove.</p>
        <div class="chips"><button class="b-chip role${findItem('role', B.role) ? ' on' : ''}" data-b="toggle:role:${B.role}">${esc(role.name)} role syllabus</button>${linkedSkills(role).map(s => `<button class="b-chip${findItem('skill', s) ? ' on' : ''}" data-b="toggle:skill:${s}">${esc(S.SKILL[s].name)}</button>`).join('')}</div>
        <button class="chip-btn" data-b="roleall" style="margin-top:10px">Add all ${esc(role.name)} skills</button>` : '<p class="b-hint">Picking a role suggests the skills it needs. You can also pick any skills below.</p>'}
      <h3 class="b-h">2. Or pick any skills</h3>
      <input id="bFilter" class="b-input" placeholder="Filter skills…" autocomplete="off" value="${esc(B.filter)}">
      <div id="bSkillList">${skillListHTML()}</div>
    </section>
    <section class="b-col">
      <h3 class="b-h">3. Your subjects &amp; syllabus</h3>
      <label class="b-label">Timetable title<input id="bTitle" class="b-input" value="${esc(B.title)}" placeholder="My combined timetable"></label>
      <div class="b-total"><div class="track"><div class="fill${tot === TOTAL_HOURS ? ' full' : ''}" style="width:${(100 * tot / TOTAL_HOURS).toFixed(1)}%"></div></div><b>${tot} / 80 hours</b>
        <button class="chip-btn" data-b="balance"${B.items.length ? '' : ' disabled'}>Auto-balance</button><button class="chip-btn" data-b="clear"${B.items.length ? '' : ' disabled'}>Clear</button></div>
      ${warn.map(w => note(esc(w), true)).join('')}
      <div class="b-items">${B.items.map(itemRow).join('') || '<div class="b-empty-state">No subjects yet. Choose a role or click skills on the left — the 80 hours are shared between them automatically.</div>'}</div>
      <p class="b-hint">Level buttons choose which part of each syllabus is taught (Beginner → Expert). Hours set how many of those lectures are included.</p>
      <h3 class="b-h">4. How to combine</h3>
      ${seg('mode', B.mode, [['block', 'One subject after another', 'Finish each subject before the next'], ['mixed', 'Mixed every day', 'Subjects rotate through each day']])}
      <div style="height:8px"></div>
      ${seg('cov', B.coverage, [['spread', 'Basic → advanced', 'Lectures spread across the selected levels'], ['first', 'In order from the start', 'Take the first lectures of the selected levels']])}
      <h3 class="b-h">5. Calendar</h3>
      <div class="b-dates"><label class="b-label">Start date<input id="bStart" type="date" class="b-input" value="${B.start}"></label>
        <label class="b-label">Add a holiday<input id="bHol" type="date" class="b-input"></label><button class="chip-btn" data-b="addhol">Add holiday</button></div>
      <div class="b-hols">${B.holidays.length ? B.holidays.map(h => `<span class="tag">${fmtDate(parseISO(h))}<button class="b-x" data-b="delhol:${h}" title="Remove">×</button></span>`).join('') : '<span class="muted">No holidays. Weekends are always free; lectures run Monday – Friday.</span>'}</div>
      <button class="chip-btn primary b-cta" data-b="tab:tt"${tot ? '' : ' disabled'}>Create timetable →</button>
    </section></div>`;
}
const legend = () => `<div class="b-legend">${B.items.filter(it => it.hours).map(it => `<span style="--c:${colorOf(it)}"><i class="b-dot"></i>${esc(nameOf(it))} · ${it.hours} h</span>`).join('')}</div>`;

function bTimetable(sch) {
  return legend() + sch.weeks.map((days, wi) => {
    const first = days[0].lectures[0].n, last = days.at(-1).lectures.at(-1).n;
    let g = `<div class="g-h">Time</div>${days.map(d => `<div class="g-h">${fmtDate(d.date)}<small>Teaching day ${d.k}</small></div>`).join('')}`;
    SLOTS.forEach((slot, hi) => {
      if (hi === 2) g += '<div class="g-break">Break · 11:00 – 11:15</div>';
      g += `<div class="g-t">${slot}<small>Lecture ${hi + 1}</small></div>` + days.map(d => {
        const l = d.lectures[hi];
        return l ? `<div class="g-c b-cell" style="--c:${colorOf(l.item)}"><span class="g-no">Hour ${l.n} · <span class="b-tagname">${esc(rmOf(l.item).name)}</span></span><span class="b-title">${esc(l.title)}</span><small class="b-lvl">${l.level} · ${esc(l.theme)}</small></div>` : '<div class="g-c b-empty"></div>';
      }).join('');
    });
    return `<section class="m-week"><div class="m-week-h"><div><h3>Week ${wi + 1} <small>${fmtDate(days[0].date)} – ${fmtDate(days.at(-1).date)}</small></h3><p>Lecture hours ${first}–${last} · ${days.length} teaching days</p></div></div>
      <div class="m-gridwrap"><div class="m-grid" style="grid-template-columns:120px repeat(${days.length},minmax(150px,1fr))">${g}</div></div></section>`;
  }).join('');
}
function bCalendar(sch) {
  const byDate = new Map(sch.days.map(d => [isoDate(d.date), d])), hol = new Set(B.holidays), today = isoDate(new Date());
  const base = B.month ? parseISO(B.month + '-01') : new Date(sch.start.getFullYear(), sch.start.getMonth(), 1);
  const y = base.getFullYear(), m = base.getMonth(), lead = (new Date(y, m, 1).getDay() + 6) % 7, count = new Date(y, m + 1, 0).getDate();
  const months = [];
  for (let d = new Date(sch.start.getFullYear(), sch.start.getMonth(), 1); d <= sch.end; d.setMonth(d.getMonth() + 1)) months.push(new Date(d));
  let cells = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(w => `<div class="cal-wd">${w}</div>`).join('') + '<div class="cal-c out"></div>'.repeat(lead);
  for (let day = 1; day <= count; day++) {
    const date = new Date(y, m, day), iso = isoDate(date), wd = date.getDay(), we = wd === 0 || wd === 6, t = byDate.get(iso), h = hol.has(iso);
    const cls = ['cal-c', we && 'we', h && 'hol', t && 'teach', iso === today && 'today'].filter(Boolean).join(' ');
    const act = we ? '' : ` data-b="hol:${iso}" title="${h ? 'Holiday — click to make it a teaching day again' : 'Click to mark as a holiday'}"`;
    cells += `<div class="${cls}"${act}><div class="cal-d"><b>${day}</b>${t ? `<span>Day ${t.k}</span>` : h ? '<span>Holiday</span>' : we ? '<span>Weekend</span>' : ''}</div>`
      + (t ? t.lectures.map(l => `<div class="cal-l" style="--c:${colorOf(l.item)}" title="${esc(`${SLOTS[l.slot]} · ${rmOf(l.item).name} · ${l.title}`)}"><i></i><span>${esc(l.title)}</span></div>`).join('') : '')
      + '</div>';
  }
  cells += '<div class="cal-c out"></div>'.repeat((7 - (lead + count) % 7) % 7);
  return `<div class="cal-head"><button class="cal-nav" data-b="month:-1" aria-label="Previous month">‹</button><h3>${base.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</h3><button class="cal-nav" data-b="month:1" aria-label="Next month">›</button>
      <label class="b-label b-inline">Start date <input id="bStart" type="date" class="b-input" value="${B.start}"></label>
      <div class="cal-months">${months.map(d => `<button class="chip-btn${d.getFullYear() === y && d.getMonth() === m ? ' primary' : ''}" data-b="goto:${d.getFullYear()}-${pad2(d.getMonth() + 1)}">${d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</button>`).join('')}</div></div>
    ${legend()}<div class="cal">${cells}</div>
    ${note('Click any weekday to mark it as a holiday — the lectures move to the next working day automatically. Weekends are always free. Download the calendar file to add every lecture to Google Calendar or Outlook.')}`;
}
function bSyllabus(sch) {
  return B.items.filter(it => it.hours).map(it => {
    const ls = sch.lectures.filter(l => l.item === it);
    return `<section class="b-syl" style="--c:${colorOf(it)}"><div class="b-syl-h"><i class="b-dot"></i><h3>${esc(nameOf(it))}</h3><small>${ls.length} lecture hours · ${levelNames(it).join(', ')} · ${fmtDate(ls[0].date)} → ${fmtDate(ls.at(-1).date)}</small></div>
      <ol class="b-syl-list">${ls.map(l => `<li><span class="b-when">${fmtDate(l.date)} · ${SLOTS[l.slot]}</span><b>${esc(l.title)}</b><small>Hour ${l.n} of ${sch.lectures.length} · ${l.level} · ${esc(l.theme)}</small></li>`).join('')}</ol></section>`;
  }).join('');
}

function renderBuilder(keepScroll) {
  const top = keepScroll ? builderCard.querySelector('.m-body')?.scrollTop || 0 : 0;
  B.items = B.items.filter(it => rmOf(it));
  const sch = buildSchedule();
  if (!sch) B.tab = 'setup';
  const tabs = [['setup', '1 · Select skills & syllabus'], ['tt', '2 · Timetable'], ['cal', '3 · Calendar'], ['syl', '4 · Syllabus']];
  const views = { setup: setupHTML, tt: () => bTimetable(sch), cal: () => bCalendar(sch), syl: () => bSyllabus(sch), all: () => bTimetable(sch) + '<h2 class="m-print-h">Syllabus</h2>' + bSyllabus(sch) };
  const sub = sch ? `${B.items.filter(it => it.hours).length} subjects · ${sch.lectures.length} lecture hours · ${sch.days.length} teaching days · ${fmtDate(sch.start, true)} → ${fmtDate(sch.end, true)}`
    : 'Select skills from a role or the skill list, choose the syllabus levels, and get one combined 80-hour lecture timetable with real dates.';
  const dis = sch ? '' : ' disabled';
  builderCard.innerHTML = `<header class="m-head"><div class="m-headl"><span class="pill k-overview">Timetable builder</span><h2 id="bTitleH">${esc(titleOf())}</h2><p>${sub}</p>
      <p class="b-meta">Monday – Friday · 4 one-hour lectures a day (09:00 – 13:15) · lecture-only</p></div>
    <div class="m-actions"><button class="chip-btn primary" data-bm="xlsx"${dis}><svg class="ico" viewBox="0 0 24 24"><path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14"/></svg>Excel</button>
      <button class="chip-btn" data-bm="ics"${dis}><svg class="ico" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>Calendar file</button>
      <button class="chip-btn" data-bm="print"${dis}>Print / PDF</button><button class="m-close" data-bm="close" title="Close (Esc)" aria-label="Close">×</button></div></header>
    <div class="m-bar"><div class="m-tabs">${tabs.map(([k, l]) => `<button class="m-tab${B.tab === k ? ' on' : ''}" data-b="tab:${k}"${k !== 'setup' && !sch ? ' disabled' : ''}>${l}</button>`).join('')}</div></div>
    <div class="m-body">${views[B.tab]()}</div>`;
  builderCard.querySelector('.m-body').scrollTop = top;
}

function openBuilder(seed = {}) {
  if (!S.data) return;
  B.items = B.items.filter(it => rmOf(it));
  if (seed.role) {
    const skills = linkedSkills(S.ROLE[seed.role]);
    const same = skills.every(s => findItem('skill', s));
    if (!same && B.items.length && confirm(`Replace your current subjects with the ${S.ROLE[seed.role].name} skills?\n\nOK = replace · Cancel = add them to the current list`)) { B.items = []; B.title = ''; }
    skills.forEach(s => addItem('skill', s));
    B.role = seed.role; balance();
  }
  if (seed.skill && !findItem('skill', seed.skill)) { addItem('skill', seed.skill); balance(); }
  B.tab = 'setup'; B.filter = ''; B.month = '';
  saveBuilder();
  S.builder = true; builderEl.hidden = false;
  renderBuilder();
}
function closeBuilder() { S.builder = false; builderEl.hidden = true; builderCard.innerHTML = ''; }

/* ------------------------------------------------------------------ exports */
function saveBlob(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
const fileBase = () => slugify(titleOf()) || 'combined-timetable';

function builderWorkbook(sch) {
  const st = s => v => ({ v, s }), T = st(1), SUB = st(2), H = st(3), C = st(4), TM = st(5), BRK = st(6), TH = st(7), L = st(8), W = st(9), CC = st(10);
  const title = titleOf(), range = `${fmtDate(sch.start, true)} → ${fmtDate(sch.end, true)}`;
  const items = B.items.filter(it => it.hours);

  const ov = { name: 'Overview', cols: [22, 34, 14, 12, 34, 36], merges: ['A1:F1', 'A2:F2'], heights: { 0: 26 },
    rows: [[T(`${title} — combined 80-hour lecture timetable`)], [SUB(`${range} · Monday – Friday · 4 one-hour lectures a day · lecture-only (no practice, lab or assignment blocks)`)], []] };
  [['Start date', fmtDate(sch.start, true)], ['End date', fmtDate(sch.end, true)], ['Teaching days', `${sch.days.length}`], ['Lecture hours', `${sch.lectures.length}`],
    ['Daily timings', `${SLOTS.join('   |   ')}   (break 11:00 – 11:15)`], ['Arrangement', B.mode === 'block' ? 'One subject after another' : 'Mixed every day'],
    ['Lecture selection', B.coverage === 'spread' ? 'Basic → advanced, spread across the selected levels' : 'In order from the start of the selected levels'],
    ['Holidays', B.holidays.map(h => fmtDate(parseISO(h), true)).join(', ') || 'None (weekends free)']].forEach(([k, v]) => {
    const r = ov.rows.length; ov.rows.push([L(k), W(v)]); ov.merges.push(`B${r + 1}:F${r + 1}`);
  });
  ov.rows.push([], [H('#'), H('Subject'), H('Type'), H('Hours'), H('Syllabus levels'), H('Dates')]);
  items.forEach((it, i) => {
    const ls = sch.lectures.filter(l => l.item === it);
    ov.rows.push([CC(i + 1), C(nameOf(it)), CC(it.type === 'role' ? 'Role' : 'Skill'), CC(ls.length), C(levelNames(it).join(', ')), C(`${fmtDate(ls[0].date, true)} → ${fmtDate(ls.at(-1).date, true)}`)]);
  });

  const weekSheets = sch.weeks.map((days, wi) => {
    const sh = { name: `Week ${wi + 1}`, cols: [18, ...days.map(() => 36)], merges: [`A1:${colName(days.length)}1`, `A2:${colName(days.length)}2`], heights: { 0: 26, 3: 34 }, freeze: 4 };
    sh.rows = [[T(`${title} · Week ${wi + 1}`)], [SUB(`${fmtDate(days[0].date, true)} – ${fmtDate(days.at(-1).date, true)} · lecture hours ${days[0].lectures[0].n} – ${days.at(-1).lectures.at(-1).n}`)], [],
      [H('Time'), ...days.map(d => H(`${fmtDate(d.date, true)}\nTeaching day ${d.k}`))]];
    SLOTS.forEach((slot, hi) => {
      if (hi === 2) { sh.merges.push(`B${sh.rows.length + 1}:${colName(days.length)}${sh.rows.length + 1}`); sh.rows.push([BRK('11:00 – 11:15'), BRK('Break'), ...days.slice(1).map(() => BRK(''))]); }
      sh.heights[sh.rows.length] = 66;
      sh.rows.push([TM(`${slot}\nLecture ${hi + 1}`), ...days.map(d => { const l = d.lectures[hi]; return C(l ? `Hour ${l.n} · ${rmOf(l.item).name}\n${l.title}\n(${l.level})` : ''); })]);
    });
    return sh;
  });

  const sched = { name: 'Schedule', cols: [7, 18, 13, 7, 7, 26, 13, 30, 46, 40], freeze: 3, merges: ['A1:J1'], heights: { 0: 26 },
    rows: [[T(`${title} — day-by-day schedule`)], [SUB(range)], ['Hour', 'Date', 'Time', 'Day', 'Week', 'Subject', 'Level', 'Day theme', 'Lecture', 'Key topics'].map(H)] };
  sch.lectures.forEach(l => {
    const parts = lectureParts(l.title);
    sched.heights[sched.rows.length] = 15 * Math.max(lines(l.title, 44), parts ? parts.length : 1, lines(l.theme, 28)) + 6;
    sched.rows.push([CC(l.n), C(fmtDate(l.date, true)), C(SLOTS[l.slot]), CC(l.dayNo), CC(Math.floor((l.dayNo - 1) / 5) + 1), C(rmOf(l.item).name), CC(l.level), C(l.theme), C(l.title), C(parts ? parts.map(p => '• ' + p).join('\n') : '')]);
  });

  const bySub = { name: 'Syllabus by subject', cols: [7, 18, 13, 13, 32, 50], merges: ['A1:F1'], heights: { 0: 26 }, rows: [[T(`${title} — syllabus by subject`)], [SUB('Every included lecture, grouped by subject, in teaching order.')], []] };
  items.forEach(it => {
    const r = bySub.rows.length;
    bySub.merges.push(`A${r + 1}:F${r + 1}`); bySub.heights[r] = 22;
    bySub.rows.push([TH(`${nameOf(it)} — ${it.hours} lecture hours · ${levelNames(it).join(', ')}`), TH(''), TH(''), TH(''), TH(''), TH('')]);
    bySub.rows.push(['Hour', 'Date', 'Time', 'Level', 'Day theme', 'Lecture'].map(H));
    sch.lectures.filter(l => l.item === it).forEach(l => {
      bySub.heights[bySub.rows.length] = 15 * Math.max(lines(l.title, 48), lines(l.theme, 30)) + 6;
      bySub.rows.push([CC(l.n), C(fmtDate(l.date, true)), C(SLOTS[l.slot]), CC(l.level), C(l.theme), C(l.title)]);
    });
    bySub.rows.push([]);
  });
  return [ov, ...weekSheets, sched, bySub];
}

function icsText(sch) {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const ie = s => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
  const fold = l => { const out = []; while (l.length > 73) { out.push(l.slice(0, 73)); l = ' ' + l.slice(73); } out.push(l); return out.join('\r\n'); };
  const ymd = d => `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}`;
  const title = titleOf();
  const out = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Career Atlas//Timetable Builder//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', `X-WR-CALNAME:${ie(title)}`];
  for (const l of sch.lectures) {
    const [t0, t1] = SLOT_TIMES[l.slot], subject = rmOf(l.item).name;
    out.push('BEGIN:VEVENT', `UID:atlas-${stamp}-${l.n}@career-atlas`, `DTSTAMP:${stamp}`, `DTSTART:${ymd(l.date)}T${t0}00`, `DTEND:${ymd(l.date)}T${t1}00`,
      `SUMMARY:${ie(`${subject} · ${l.title}`)}`, `DESCRIPTION:${ie(`Lecture hour ${l.n} of ${sch.lectures.length} (teaching day ${l.dayNo})\n${l.level} · ${l.theme}\nLecture-only session.`)}`,
      `CATEGORIES:${ie(subject)}`, 'END:VEVENT');
  }
  out.push('END:VCALENDAR');
  return out.map(fold).join('\r\n') + '\r\n';
}

function printBuilder() {
  const prev = B.tab;
  B.tab = 'all'; renderBuilder();
  const restore = () => { window.removeEventListener('afterprint', restore); if (S.builder) { B.tab = prev; renderBuilder(); } };
  window.addEventListener('afterprint', restore);
  window.print();
}

/* ------------------------------------------------------------------ events */
builderEl.addEventListener('click', e => {
  if (e.target === builderEl) { closeBuilder(); return; }
  const t = e.target.closest('[data-b],[data-bm]'); if (!t || t.disabled) return;
  if (t.dataset.bm) {
    const sch = buildSchedule();
    switch (t.dataset.bm) {
      case 'close': closeBuilder(); return;
      case 'xlsx': if (sch) saveBlob(workbookBlob(builderWorkbook(sch)), fileBase() + '-80-hour-timetable.xlsx'); return;
      case 'ics': if (sch) saveBlob(new Blob([icsText(sch)], { type: 'text/calendar;charset=utf-8' }), fileBase() + '-timetable.ics'); return;
      case 'print': if (sch) printBuilder(); return;
    }
    return;
  }
  const [act, a, b] = t.dataset.b.split(':'), it = B.items[+a];
  let keep = true;
  switch (act) {
    case 'toggle': { const ex = findItem(a, b); if (ex) B.items.splice(B.items.indexOf(ex), 1); else addItem(a, b); balance(); break; }
    case 'roleall': linkedSkills(S.ROLE[B.role]).forEach(s => addItem('skill', s)); balance(); break;
    case 'balance': balance(); break;
    case 'clear': if (!confirm('Remove all subjects from this timetable?')) return; B.items = []; break;
    case 'lv': if (it.levels[+b] && it.levels.filter(Boolean).length === 1) return; it.levels[+b] = !it.levels[+b]; it.hours = Math.min(it.hours, capOf(it)); break;
    case 'hrs': setHours(it, it.hours + +b); break;
    case 'up': case 'down': { const j = +a + (act === 'up' ? -1 : 1); [B.items[+a], B.items[j]] = [B.items[j], B.items[+a]]; break; }
    case 'rm': B.items.splice(+a, 1); break;
    case 'mode': B.mode = a; break;
    case 'cov': B.coverage = a; break;
    case 'addhol': { const v = $('#bHol').value; if (!v) return; const wd = parseISO(v).getDay(); if (wd === 0 || wd === 6) { alert('Weekends are already free — pick a weekday.'); return; } if (!B.holidays.includes(v)) B.holidays = [...B.holidays, v].sort(); break; }
    case 'delhol': B.holidays = B.holidays.filter(h => h !== a); break;
    case 'hol': B.holidays = B.holidays.includes(a) ? B.holidays.filter(h => h !== a) : [...B.holidays, a].sort(); break;
    case 'month': { const sch = buildSchedule(), base = B.month ? parseISO(B.month + '-01') : new Date(sch.start.getFullYear(), sch.start.getMonth(), 1); base.setMonth(base.getMonth() + +a); B.month = `${base.getFullYear()}-${pad2(base.getMonth() + 1)}`; break; }
    case 'goto': B.month = a; break;
    case 'tab': B.tab = a; keep = false; break;
    default: return;
  }
  saveBuilder(); renderBuilder(keep);
});
builderEl.addEventListener('input', e => {
  if (e.target.id === 'bFilter') { B.filter = e.target.value; $('#bSkillList').innerHTML = skillListHTML(); }
  else if (e.target.id === 'bTitle') { B.title = e.target.value; $('#bTitleH').textContent = titleOf(); saveBuilder(); }
});
builderEl.addEventListener('change', e => {
  const el = e.target;
  if (el.id === 'bRole') B.role = el.value;
  else if (el.id === 'bStart') { if (!el.value) return; B.start = el.value; B.month = ''; }
  else if (el.dataset.bh) setHours(B.items[+el.dataset.bh], el.value);
  else return;
  saveBuilder(); renderBuilder(true);
});
$('#btnBuild').onclick = () => openBuilder();
