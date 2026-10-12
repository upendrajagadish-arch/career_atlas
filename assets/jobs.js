'use strict';
/* Live fresher openings & hiring events. Reads data/jobs.json, which scripts/update-jobs.js rewrites every day. */
const JOBS_URL = 'data/jobs.json';
const J = { data: null, byCo: new Map(), evByCo: new Map(), byRole: new Map(), byTrack: new Map(), byKey: new Map(),
  tab: 'jobs', limit: 60, f: { q: '', city: '', track: '', level: '', posted: '', fresh: false, cid: '', role: '' }, ef: { q: '', type: '', linked: false }, sq: '', scity: '' };
const jobsEl = $('#jobsModal'), jobsCard = jobsEl.firstElementChild;
const JOB_CITIES = ['Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Mumbai', 'Delhi NCR', 'Kolkata', 'Kerala', 'Coimbatore', 'Ahmedabad', 'Other India'];
const SEARCH_ROLES = [
  ['ServiceNow developer', 'servicenow-developer'], ['Salesforce developer', 'salesforce-developer'], ['Salesforce PD1', 'salesforce-developer'], ['SAP ABAP developer', 'sap-abap-developer'],
  ['RPA UiPath developer', 'rpa-developer'], ['Pega developer', null], ['Power Platform developer', null], ['Graduate engineer trainee', null], ['Software engineer', 'backend'],
  ['Java developer', 'backend'], ['Python developer', 'backend'], ['Frontend developer', 'frontend'], ['Full stack developer', 'full-stack'], ['Android developer', 'android'],
  ['Data analyst', 'data-analyst'], ['Power BI developer', 'bi-analyst'], ['Data engineer', 'data-engineer'], ['Machine learning engineer', 'machine-learning'], ['AI engineer', 'ai-engineer'],
  ['DevOps engineer', 'devops'], ['Cloud engineer', 'devops'], ['QA automation tester', 'qa'], ['Cyber security analyst', 'cyber-security'], ['Network engineer', 'network-engineer'],
  ['Technical support engineer', null], ['Business analyst', 'data-analyst'], ['UI UX designer', 'ux-design'], ['Technical writer', 'technical-writer'], ['Digital marketing', 'seo'], ['Internship', null],
];

const pushTo = (m, k, v) => { if (k == null) return; if (!m.has(k)) m.set(k, []); m.get(k).push(v); };
const DAY_MS = 864e5;
const dayDiff = iso => Math.round((Date.parse(J.data?.date || new Date().toISOString().slice(0, 10)) - Date.parse(iso)) / DAY_MS);
function agoTxt(iso) {
  if (!iso) return 'date not listed';
  const d = dayDiff(iso);
  return d <= 0 ? 'today' : d === 1 ? 'yesterday' : d < 30 ? `${d} days ago` : `${Math.round(d / 30)} month${d < 45 ? '' : 's'} ago`;
}
const dayLabel = iso => iso ? new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—';
const isNewJob = j => J.data && !J.data.firstRun && j.first === J.data.date;
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
const coOf = id => id && S.data ? S.data.companies.find(c => c.id === id) : null;

function loadJobs() {
  return fetch(JOBS_URL, { cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).catch(() => null).then(d => {
    if (!d || !Array.isArray(d.jobs)) return;
    J.data = d;
    for (const j of d.jobs) { J.byKey.set(j.key, j); pushTo(J.byCo, j.cid, j); pushTo(J.byTrack, j.track, j); j.roles.forEach(r => pushTo(J.byRole, r, j)); }
    for (const e of d.events) e.cids.forEach(id => pushTo(J.evByCo, id, e));
    for (const [id, cov] of Object.entries(d.coverage)) if (cov.sharedWith && J.byCo.has(cov.sharedWith)) J.byCo.set(id, J.byCo.get(cov.sharedWith));
    const b = $('#jobsBadge'), n = d.firstRun ? d.totals.jobs : d.totals.newToday;
    if (n) { b.textContent = n > 999 ? '999+' : n; b.hidden = false; b.title = d.firstRun ? `${n} openings` : `${n} new today`; }
  });
}

/* ------------------------------------------------------------------ job-site search links */
function siteLinks(q, city) {
  const loc = city || 'India', nk = slugify(q), nc = city ? slugify(city === 'Bengaluru' ? 'bangalore' : city === 'Delhi NCR' ? 'delhi-ncr' : city) : '';
  return [
    ['LinkedIn · last 24 h', `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(q)}&location=${encodeURIComponent(loc)}&f_E=1%2C2&f_TPR=r86400&sortBy=DD`],
    ['Naukri · freshers', `https://www.naukri.com/${nk}-jobs${nc ? '-in-' + nc : ''}?experience=0&jobAge=1`],
    ['Indeed · last 24 h', `https://in.indeed.com/jobs?q=${encodeURIComponent(q + ' fresher')}&l=${encodeURIComponent(loc)}&fromage=1&sort=date`],
    ['Foundit', `https://www.foundit.in/srp/results?query=${encodeURIComponent(q)}&locations=${encodeURIComponent(loc)}&experienceRanges=0~1`],
    ['Google Jobs', `https://www.google.com/search?q=${encodeURIComponent(`${q} fresher jobs ${loc}`)}&ibp=htl;jobs`],
  ];
}
const siteLinkHTML = (q, city) => `<div class="links">${siteLinks(q, city).map(([l, u], i) => `<a href="${esc(u)}" target="_blank" rel="noopener"${i ? '' : ' class="primary"'}>${esc(l)} ↗</a>`).join('')}</div>`;

/* ------------------------------------------------------------------ mind-map nodes */
function jobNode(p, j) {
  return mk(p, 'lj:' + j.key, j.title, 'job', { sub: `${j.company} · ${j.city}${j.posted ? ' · posted ' + dayLabel(j.posted) : ''}`, data: { job: j } });
}
function eventNode(p, e) {
  return mk(p, 'ev:' + e.id, e.title, 'event', { sub: `${e.type} · ${e.source || 'News'} · ${dayLabel(e.date)}`, data: { event: e } });
}
const byCompany = list => list.slice().sort((a, b) => a.company.localeCompare(b.company)).map(j => ({ key: 'lj:' + j.key, name: j.company, build: g => jobNode(g, j) }));
function liveOpeningsNode(r) {
  const d = J.data;
  if (!d) return mk(r, 'live', 'Live fresher openings', 'library', { sub: 'Job feed not generated yet' });
  return mk(r, 'live', 'Live fresher openings', 'library', { sub: `${d.totals.jobs} openings · updated ${dayLabel(d.date)}`, factory: n =>
    [...J.byTrack].sort((a, b) => b[1].length - a[1].length).map(([track, list]) => mk(n, 'lt:' + slugify(track), track, 'section', {
      sub: `${plural(list.length, 'opening')} · ${plural(new Set(list.map(j => j.company)).size, 'company')}`, data: { what: 'track', track, jobs: list },
      factory: g => grouped(g, byCompany(list), 'openings'),
    })) });
}
function eventsNode(r) {
  const d = J.data;
  if (!d) return null;
  return mk(r, 'events', 'Drives, internships & hackathons', 'library', { sub: `${d.events.length} in the last 30 days`, factory: n => {
    const byType = new Map(); d.events.forEach(e => pushTo(byType, e.type, e));
    return [...byType].sort((a, b) => b[1].length - a[1].length).map(([type, list]) => mk(n, 'et:' + slugify(type), type, 'section', {
      sub: plural(list.length, 'item'), data: { what: 'evtype', type, events: list },
      factory: g => grouped(g, list.map(e => ({ key: 'ev:' + e.id, name: e.title, build: gg => eventNode(gg, e) })), 'items', 20, 24),
    }));
  } });
}
// Live openings city by city; the three directory cities also carry their hiring-company directory.
function locationsNode(r) {
  const byCity = new Map();
  (J.data?.jobs || []).forEach(j => pushTo(byCity, j.city, j));
  const cities = uniq([...CITIES, ...JOB_CITIES]).filter(c => byCity.has(c) || CITIES.includes(c));
  return mk(r, 'loc', 'Location-wise job openings', 'library', {
    sub: `${cities.length} locations`, has: new Set([...cities.map(c => 'lc:' + c), ...CITIES.map(c => 'city:' + c)]),
    factory: n => cities.map(city => {
      const jobs = byCity.get(city) || [], dir = CITIES.includes(city);
      return mk(n, 'lc:' + city, city, 'section', {
        sub: `${plural(jobs.length, 'live opening')}${dir ? ' · company directory' : ''}`, data: { what: 'loccity', city, jobs }, has: dir ? new Set(['city:' + city]) : null,
        factory: cn => [
          jobs.length && mk(cn, 'lcj', `Live openings in ${city} (${jobs.length})`, 'section', { data: { what: 'loclive', city, jobs }, factory: g => grouped(g, byCompany(jobs), 'openings') }),
          dir && cityNode(cn, city, `Hiring companies in ${city}`),
        ],
      });
    }),
  });
}
function companyLiveNodes(p, c) {
  if (!J.data) return [];
  const jobs = J.byCo.get(c.id) || [], ev = J.evByCo.get(c.id) || [];
  return [
    jobs.length && mk(p, 'live', `Live openings today (${jobs.length})`, 'section', { data: { what: 'live', company: c, jobs }, factory: s => jobs.map(j => jobNode(s, j)) }),
    ev.length && mk(p, 'news', `Drives, internships & hackathons (${ev.length})`, 'section', { data: { what: 'news', company: c, events: ev }, factory: s => ev.map(e => eventNode(s, e)) }),
  ];
}
function roleLiveNode(p, rm) {
  const jobs = J.data && J.byRole.get(rm.slug);
  return jobs?.length ? mk(p, 'rlive', `Live openings for this role (${jobs.length})`, 'section', { data: { what: 'rolelive', rm, jobs }, factory: s => grouped(s, jobs.map(j => ({ key: 'lj:' + j.key, name: j.company, build: g => jobNode(g, j) })), 'openings') }) : null;
}
function liveIndex(idx) {
  if (!J.data) return;
  for (const j of J.data.jobs) idx.push({ label: j.title, sub: `${j.company} · live opening · ${j.city}`, type: 'job', keys: ['live', 'lt:' + slugify(j.track), 'lj:' + j.key] });
  for (const e of J.data.events) idx.push({ label: e.title, sub: `${e.type} · ${e.source || 'News'} · ${dayLabel(e.date)}`, type: 'event', keys: ['events', 'et:' + slugify(e.type), 'ev:' + e.id] });
}

/* ------------------------------------------------------------------ notes-panel bodies */
const openFeedBtn = (label, f, primary) => `<button class="chip-btn${primary ? ' primary' : ''}" data-act="jobs" data-f="${esc(JSON.stringify(f || {}))}">${label}</button>`;
function miniJobs(list, n = 8) {
  return `<ul class="lj-list">${list.slice(0, n).map(j => `<li><a href="${esc(j.url)}" target="_blank" rel="noopener">${esc(j.title)}</a><small>${esc(j.company)} · ${esc(j.city)} · ${esc(j.level)}${isNewJob(j) ? ' · <b class="new">new</b>' : ''}</small></li>`).join('')}</ul>${list.length > n ? `<p class="muted">+${list.length - n} more</p>` : ''}`;
}
function miniEvents(list, n = 8) {
  return `<ul class="lj-list">${list.slice(0, n).map(e => `<li><a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.title)}</a><small>${esc(e.type)} · ${esc(e.source || 'News')} · ${dayLabel(e.date)}</small></li>`).join('')}</ul>`;
}
function staleNote() {
  if (!J.data) return note('No live job feed yet. Run <code>node scripts/update-jobs.js</code> in the project folder (it also runs automatically every day once the scheduled task is set up).', true);
  const d = dayDiff(new Date().toISOString().slice(0, 10)) * -1;
  return d > 1 ? note(`The job feed was last refreshed ${plural(d, 'day')} ago. Check that the daily task is running, or run <code>node scripts/update-jobs.js</code>.`, true) : '';
}
function liveBody(n) {
  const d = n.data;
  if (n.kind === 'job') {
    const j = d.job, c = coOf(j.cid), roles = j.roles.filter(r => S.ROLE[r]);
    return `<p><b>${esc(j.level)}</b> opening at <b>${esc(j.company)}</b>, found on the company’s official job board.</p>`
      + `<div class="btn-row"><a class="chip-btn primary" href="${esc(j.url)}" target="_blank" rel="noopener">Apply on the official site ↗</a><button class="chip-btn" data-act="resume" data-f="${esc(JSON.stringify({ jobKey: j.key }))}">Tailor my resume</button>${roles[0] ? `<button class="chip-btn" data-act="buildrole" data-role="${esc(roles[0])}">＋ Timetable for this role</button>` : ''}</div>`
      + facts([['Company', c && companyKeys(c) ? `<button class="link-btn" ${revealAttr(companyKeys(c))}>${esc(j.company)}</button>` : esc(j.company)], ['Level', esc(j.level)],
        ['Why it is listed', esc(j.why)], ['Experience', j.yrs === 0 ? '0 years — open to freshers' : j.level === 'Internship' ? 'None — internship' : 'No experience requirement in the listing'],
        ['Location', esc(j.loc)], ['Role track', esc(j.track)], ['Posted', j.posted ? `${dayLabel(j.posted)} (${agoTxt(j.posted)})` : 'Not listed'],
        ['First seen', `${dayLabel(j.first)}${isNewJob(j) ? ' · <b class="new">new today</b>' : ''}`], ['Source', esc(j.source)]])
      + (roles.length ? `<h3>Prepare with</h3><div class="chips">${roles.map(r => `<button class="chip k-roadmap" ${revealAttr(['roles', 'rr:' + r])}>${esc(S.ROLE[r].name)} roadmap</button>`).join('')}</div>` : '')
      + note(`Collected on ${dayLabel(J.data.date)} from ${esc(j.source)}. Openings close quickly — confirm eligibility and the last date on the apply page.`)
      + `<h3>Similar openings on job sites</h3>${siteLinkHTML(j.track === 'Other roles' ? j.title : j.track, MAIN_JOB_CITY(j.city))}`;
  }
  if (n.kind === 'event') {
    const e = d.event, cos = e.cids.map(coOf).filter(c => c && companyKeys(c));
    return `<p>${esc(e.title)}</p>` + facts([['Type', esc(e.type)], ['Published', `${dayLabel(e.date)} (${agoTxt(e.date)})`], ['Source', esc(e.source || 'News')]])
      + (cos.length ? `<h3>Companies</h3><div class="chips">${cos.map(c => `<button class="chip k-company" ${revealAttr(companyKeys(c))}>${esc(c.name)}</button>`).join('')}</div>` : '')
      + links([['Read the full story', e.url, true]])
      + note('Headline from Google News. Dates, eligibility and registration links are on the source page — always check the company’s own careers site before sharing personal details.', true);
  }
  if (n.kind === 'library' && n.key === 'live') {
    const t = J.data.totals;
    return `<p><b>${t.jobs}</b> fresher, graduate and internship openings in India at <b>${t.companiesWithJobs}</b> companies, collected today from official company job boards. Grouped by role track.</p>`
      + `<div class="btn-row">${openFeedBtn('Open the job feed', {}, true)}</div>` + staleNote();
  }
  if (n.kind === 'library' && n.key === 'events') return `<p>Fresher job drives, internships and hackathons you can apply or register for, from the last 30 days. General hiring news and anything asking for experience is left out.</p><div class="btn-row">${openFeedBtn('Open drives, internships & hackathons', { tab: 'events' }, true)}</div>`;
  if (n.kind === 'library' && n.key === 'loc') return `<p>Today's fresher and intern openings grouped by city. Hyderabad, Bengaluru and Chennai also list every hiring company in the directory, by category.</p>`
    + (J.data ? facts(kids(n).map(c => [c.title, esc(c.sub)])) : staleNote());
  if (n.kind !== 'section') return null;
  switch (d.what) {
    case 'loccity': return `<p>${d.jobs.length ? `<b>${plural(d.jobs.length, 'live fresher / intern opening')}</b> in ${esc(d.city)} today.` : `No live opening in ${esc(d.city)} on the tracked boards today.`}</p>`
      + (d.jobs.length ? `${miniJobs(d.jobs)}<div class="btn-row">${openFeedBtn(`All ${esc(d.city)} openings`, { city: d.city }, true)}</div>` : '')
      + `<h3>Search fresher jobs in ${esc(d.city)}</h3>${siteLinkHTML('fresher', d.city === 'Other India' ? '' : d.city)}`;
    case 'loclive': return `<p>${plural(d.jobs.length, 'opening')} in ${esc(d.city)}, grouped by company.</p>${miniJobs(d.jobs)}<div class="btn-row">${openFeedBtn('Filter the job feed', { city: d.city }, true)}</div>`;
    case 'live': return `<p>${plural(d.jobs.length, 'fresher / intern opening')} at <b>${esc(d.company.name)}</b> on its official job board today.</p>${miniJobs(d.jobs)}<div class="btn-row">${openFeedBtn('See them in the job feed', { cid: d.company.id }, true)}</div>`;
    case 'news': return `<p>Fresher drives, internships and hackathons from <b>${esc(d.company.name)}</b> in the last 30 days.</p>${miniEvents(d.events)}`;
    case 'rolelive': return `<p>${plural(d.jobs.length, 'live opening')} that match the <b>${esc(d.rm.name)}</b> role today.</p>${miniJobs(d.jobs)}<div class="btn-row">${openFeedBtn('See all in the job feed', { role: d.rm.slug }, true)}</div>`;
    case 'track': return `<p>${plural(d.jobs.length, 'opening')} in <b>${esc(d.track)}</b> at ${plural(new Set(d.jobs.map(j => j.company)).size, 'company')}.</p>${miniJobs(d.jobs)}<div class="btn-row">${openFeedBtn('Filter the job feed', { track: d.track }, true)}</div>`;
    case 'evtype': return `<p>${plural(d.events.length, d.type.toLowerCase() + ' item')} from the last 30 days.</p>${miniEvents(d.events)}`;
  }
  return null;
}
const MAIN_JOB_CITY = c => (['Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Mumbai'].includes(c) ? c : '');
function companyLiveHTML(c) {
  if (!J.data) return '';
  const jobs = J.byCo.get(c.id) || [], ev = J.evByCo.get(c.id) || [], cov = J.data.coverage[c.id];
  return `<h3>Today's openings</h3>`
    + (jobs.length ? `<p><b>${jobs.length}</b> fresher / intern opening${jobs.length > 1 ? 's' : ''} on the official job board${jobs.some(isNewJob) ? ` · <b class="new">${jobs.filter(isNewJob).length} new today</b>` : ''}.</p>${miniJobs(jobs, 5)}`
      : `<p class="muted">${cov?.boards?.length ? `Tracked daily on ${esc(uniq(cov.boards.map(b => b.label)).join(', '))} — no fresher or intern opening in India today.` : 'This company’s careers site cannot be read automatically — use the job-site links below.'}</p>`)
    + (ev.length ? `<h3>Drives, internships &amp; hackathons</h3>${miniEvents(ev, 4)}` : '')
    + `<h3>Search fresher jobs at ${esc(c.name)}</h3>${siteLinkHTML(c.name, '')}`;
}
function roleLiveHTML(rm) {
  if (!J.data) return '';
  const jobs = J.byRole.get(rm.slug) || [];
  return `<h3>Live openings today</h3>${jobs.length ? `<p><b>${jobs.length}</b> matching fresher / intern opening${jobs.length > 1 ? 's' : ''} at ${plural(new Set(jobs.map(j => j.company)).size, 'company')}.</p>${miniJobs(jobs, 4)}<div class="btn-row">${openFeedBtn('See all openings', { role: rm.slug }, true)}</div>` : '<p class="muted">No matching opening on the tracked company boards today.</p>'}`
    + `<h3>Search ${esc(rm.name)} jobs (last 24 hours)</h3>${siteLinkHTML(rm.name.replace(/\s*\(.*?\)/g, '') + (/developer|engineer|analyst|designer|writer|manager/i.test(rm.name) ? '' : ' fresher'), '')}`;
}
function liveRootHTML() {
  if (!J.data) return staleNote();
  const t = J.data.totals;
  return `<div class="b-promo"><b>Today's fresher job feed</b><span>${t.jobs} openings at ${t.companiesWithJobs} companies${J.data.firstRun ? '' : ` · ${t.newToday} new today`} · ${t.events} drives, internships &amp; hackathons. Updated ${dayLabel(J.data.date)}.</span>${openFeedBtn('Open jobs &amp; events', {}, true)}</div>` + staleNote();
}

/* ------------------------------------------------------------------ job-feed popup */
function openJobs(f = {}) {
  if (f.tab) J.tab = f.tab; else J.tab = 'jobs';
  J.f = { q: '', city: '', track: '', level: '', posted: '', fresh: false, cid: '', role: '', ...f }; delete J.f.tab;
  J.limit = 60;
  S.jobs = true; jobsEl.hidden = false;
  renderJobs();
}
function closeJobs() { S.jobs = false; jobsEl.hidden = true; jobsCard.innerHTML = ''; }
function filteredJobs() {
  const f = J.f, q = f.q.trim().toLowerCase();
  return J.data.jobs.filter(j => (!f.city || j.city === f.city) && (!f.track || j.track === f.track) && (!f.level || j.level === f.level) && (!f.cid || j.cid === f.cid)
    && (!f.role || j.roles.includes(f.role)) && (!f.fresh || isNewJob(j)) && (!f.posted || (j.posted && dayDiff(j.posted) <= +f.posted))
    && (!q || `${j.title} ${j.company} ${j.loc} ${j.track}`.toLowerCase().includes(q)));
}
function filteredEvents() {
  const f = J.ef, q = f.q.trim().toLowerCase();
  return J.data.events.filter(e => (!f.type || e.type === f.type) && (!f.linked || e.cids.length) && (!q || `${e.title} ${e.source}`.toLowerCase().includes(q)));
}
const opt = (v, label, cur) => `<option value="${esc(v)}"${v === cur ? ' selected' : ''}>${esc(label)}</option>`;
function jobCard(j) {
  const c = coOf(j.cid), roles = j.roles.filter(r => S.ROLE[r]);
  return `<article class="jb"><div class="jb-tags"><span class="jb-tag lvl${j.level === 'Internship' ? ' intern' : ''}">${esc(j.level)}</span><span class="jb-tag">${esc(j.track)}</span>${isNewJob(j) ? '<span class="jb-tag new">New today</span>' : ''}</div>
    <h4><a href="${esc(j.url)}" target="_blank" rel="noopener">${esc(j.title)}</a></h4>
    <div class="jb-co">${j.cid ? `<button class="link-btn" data-j="co:${esc(j.cid)}" title="Show only ${esc(j.company)}">${esc(j.company)}</button>` : `<b>${esc(j.company)}</b>`} · ${esc(j.loc)}</div>
    <div class="jb-meta">Posted ${esc(agoTxt(j.posted))} · via ${esc(j.source)}</div>
    <div class="jb-why">✓ ${esc(j.why)}</div>
    <div class="jb-act"><a class="chip-btn primary" href="${esc(j.url)}" target="_blank" rel="noopener">Apply ↗</a><button class="chip-btn" data-j="resume:${esc(j.key)}" title="Tailor your resume to this opening">Tailor resume</button>${roles[0] ? `<button class="chip-btn" data-j="map:${esc(JSON.stringify(['roles', 'rr:' + roles[0]]))}">${esc(S.ROLE[roles[0]].name)} roadmap</button><button class="chip-btn" data-j="build:${esc(roles[0])}">＋ Timetable</button>` : ''}${c && companyKeys(c) ? `<button class="chip-btn" data-j="map:${esc(JSON.stringify(companyKeys(c)))}">Company on map</button>` : ''}</div></article>`;
}
function jobsTab() {
  const all = J.data.jobs, list = filteredJobs(), f = J.f;
  const count = key => { const m = new Map(); all.forEach(j => m.set(j[key], (m.get(j[key]) || 0) + 1)); return m; };
  const tracks = [...count('track')].sort((a, b) => b[1] - a[1]), cities = count('city');
  const chips = [f.cid && [`Company: ${coOf(f.cid)?.name || f.cid}`, 'cid'], f.role && [`Role: ${S.ROLE[f.role]?.name || f.role}`, 'role']].filter(Boolean);
  return `<div class="jf">
      <input id="jQ" class="b-input" type="search" placeholder="Search title, company, skill or city…" value="${esc(f.q)}">
      <select id="jCity" class="b-input">${opt('', `All cities (${all.length})`, f.city)}${JOB_CITIES.filter(c => cities.get(c)).map(c => opt(c, `${c} (${cities.get(c)})`, f.city)).join('')}</select>
      <select id="jTrack" class="b-input">${opt('', 'All role tracks', f.track)}${tracks.map(([t, n]) => opt(t, `${t} (${n})`, f.track)).join('')}</select>
      <select id="jLevel" class="b-input">${opt('', 'Internships & fresher jobs', f.level)}${opt('Internship', 'Internships only', f.level)}${opt('Fresher / entry level', 'Fresher / entry-level jobs only', f.level)}</select>
      <select id="jPosted" class="b-input">${opt('', 'Posted any time', f.posted)}${opt('1', 'Posted in the last 24 hours', f.posted)}${opt('7', 'Posted in the last 7 days', f.posted)}${opt('30', 'Posted in the last 30 days', f.posted)}</select>
      ${J.data.firstRun ? '' : `<label class="jf-check"><input type="checkbox" id="jFresh"${f.fresh ? ' checked' : ''}> New today only</label>`}
    </div>
    ${chips.length ? `<div class="jf-chips">${chips.map(([t, k]) => `<span class="tag">${esc(t)} <button class="b-x" data-j="clear:${k}" title="Remove filter">×</button></span>`).join('')}</div>` : ''}
    <p class="jf-count">Showing <b>${Math.min(list.length, J.limit)}</b> of <b>${list.length}</b> matching openings${list.length !== all.length ? ` (${all.length} in total)` : ''}</p>
    ${list.length ? `<div class="jb-grid">${list.slice(0, J.limit).map(jobCard).join('')}</div>${list.length > J.limit ? `<div class="jf-more"><button class="chip-btn" data-j="more">Show ${Math.min(60, list.length - J.limit)} more</button></div>` : ''}`
      : `<div class="b-empty-state">No openings match these filters. Try another city or role track — or search the job sites in the “Search all job sites” tab.</div>`}`;
}
function eventsTab() {
  const all = J.data.events, list = filteredEvents(), f = J.ef;
  const types = new Map(); all.forEach(e => types.set(e.type, (types.get(e.type) || 0) + 1));
  return `<div class="jf">
      <input id="eQ" class="b-input" type="search" placeholder="Search headlines…" value="${esc(f.q)}">
      <select id="eType" class="b-input">${opt('', `All types (${all.length})`, f.type)}${[...types].sort((a, b) => b[1] - a[1]).map(([t, n]) => opt(t, `${t} (${n})`, f.type)).join('')}</select>
      <label class="jf-check"><input type="checkbox" id="eLinked"${f.linked ? ' checked' : ''}> Only companies in the map</label>
    </div>
    <p class="jf-count"><b>${list.length}</b> items from the last 30 days, newest first.</p>
    <div class="ev-list">${list.slice(0, 300).map(e => {
      const cos = e.cids.map(coOf).filter(Boolean);
      return `<article class="ev"><div class="ev-date"><b>${dayLabel(e.date)}</b><small>${esc(agoTxt(e.date))}</small></div><div class="ev-main"><span class="jb-tag ev-${slugify(e.type)}">${esc(e.type)}</span>
        <h4><a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.title)}</a></h4><small>${esc(e.source || 'News')}</small>
        ${cos.length ? `<div class="ev-cos">${cos.map(c => companyKeys(c) ? `<button class="chip k-company" data-j="map:${esc(JSON.stringify(companyKeys(c)))}">${esc(c.name)}</button>` : `<span class="tag">${esc(c.name)}</span>`).join('')}</div>` : ''}</div></article>`;
    }).join('')}</div>${list.length > 300 ? `<p class="muted">Showing the newest 300 — narrow the search to see others.</p>` : ''}
    ${note('Headlines come from Google News. Dates, eligibility and registration links are on each source page — always confirm on the company’s own careers site.', true)}`;
}
function searchTab() {
  return `<p>Most Indian job sites (LinkedIn, Naukri, Indeed, Foundit) do not allow automatic collection, so each link below opens that site’s own search with <b>fresher / entry-level</b> filters and, where the site supports it, <b>only the last 24 hours</b>.</p>
    <div class="jf"><input id="sQ" class="b-input" type="search" placeholder="Any role, skill or company — e.g. ServiceNow developer, Salesforce PD1" value="${esc(J.sq)}">
      <select id="sCity" class="b-input">${opt('', 'All of India', J.scity)}${['Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Mumbai', 'Delhi NCR', 'Kolkata'].map(c => opt(c, c, J.scity)).join('')}</select></div>
    ${J.sq.trim() ? `<div class="sr-row sr-custom"><b>${esc(J.sq)}</b>${siteLinkHTML(J.sq.trim(), J.scity)}</div>` : ''}
    <div class="sr-list">${SEARCH_ROLES.map(([q, slug]) => `<div class="sr-row"><div><b>${esc(q)}</b>${slug && S.ROLE[slug] ? `<button class="link-btn" data-j="map:${esc(JSON.stringify(['roles', 'rr:' + slug]))}">roadmap</button>` : ''}${J.data && slug && J.byRole.get(slug) ? `<small>${J.byRole.get(slug).length} live today</small>` : ''}</div>${siteLinkHTML(q, J.scity)}</div>`).join('')}</div>`;
}
function sourcesTab() {
  const d = J.data, t = d.totals, cov = Object.entries(d.coverage).filter(([, v]) => v.boards?.length);
  const bySrc = new Map(); cov.forEach(([, v]) => uniq(v.boards.map(b => b.label)).forEach(l => bySrc.set(l, (bySrc.get(l) || 0) + 1)));
  const untracked = S.data.companies.filter(c => !d.coverage[c.id]?.boards?.length);
  return facts([['Last update', `${new Date(d.generatedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })} (${agoTxt(d.date)})`], ['Run time', `${d.durationSec} s · ${t.requests} requests`],
      ['Companies tracked daily', `${t.trackedCompanies} of ${S.data.companies.length}`], ['Companies with openings today', `${t.companiesWithJobs}`], ['Fresher / intern openings', `${t.jobs}${d.firstRun ? '' : ` (${t.newToday} new today)`}`],
      ['Drives, internships & hackathons', `${t.events} (last 30 days)`], ['Job aggregators', d.sources.aggregators.length ? esc(d.sources.aggregators.join(', ')) : 'None — add free Adzuna / Jooble API keys to include them']])
    + `<h3>How it stays up to date</h3>${ul(['scripts/update-jobs.js runs every morning (Windows Task Scheduler, 08:00) and rewrites data/jobs.json. Reload the page to see the new feed.',
      'Openings come straight from each company’s official job board (Workday, Greenhouse, Lever, Ashby, SmartRecruiters, Workable, Recruitee, amazon.jobs, Microsoft and Oracle careers APIs).',
      'Only India-based internships and fresher roles open to 0 years of experience are kept: titles such as Intern, Graduate, Trainee, Associate or Engineer I, and the full job description is read so any opening asking for 1 year or more (or months of experience) is dropped.',
      'The events tab lists only fresher job drives, internships and hackathons you can apply or register for, found in Google News headlines. Layoffs, results, statistics, winners, opinion pieces and anything asking for experience are left out.',
      'Run it by hand any time: open a terminal in the project folder and run node scripts/update-jobs.js'])}`
    + `<h3>Sources in use</h3><div class="chips">${[...bySrc].sort((a, b) => b[1] - a[1]).map(([l, n]) => `<span class="tag">${esc(l)} · ${n}</span>`).join('')}<span class="tag">Google News · events</span></div>`
    + `<h3>Companies tracked daily <span class="muted">${cov.length}</span></h3><div class="cov">${cov.sort((a, b) => b[1].jobs - a[1].jobs).map(([id, v]) => {
      const c = coOf(id); return `<div class="cov-r"><button class="link-btn" data-j="co:${esc(id)}">${esc(c?.name || id)}</button><span>${v.jobs ? `<b>${v.jobs}</b> open` : '<span class="muted">0 open</span>'}</span>${v.boards[0]?.url ? `<a href="${esc(v.boards[0].url)}" target="_blank" rel="noopener">${esc(v.boards[0].label)} ↗</a>` : `<small>${esc(v.boards[0]?.label || '')}</small>`}</div>`;
    }).join('')}</div>`
    + `<h3>Not readable automatically <span class="muted">${untracked.length}</span></h3><p class="muted">These companies use custom careers sites (for example TCS, Infosys, Wipro, HCLTech, Cognizant, Capgemini and most agencies). Their hiring drives still appear under Events, and every company panel has one-click job-site searches.</p>`
    + (d.errors.length ? `<details class="cov-err"><summary>${plural(d.errors.length, 'source')} failed in the last run</summary>${ul(d.errors)}</details>` : '');
}
function renderJobs(keepScroll) {
  const body = jobsCard.querySelector('.m-body'), top = keepScroll && body ? body.scrollTop : 0;
  if (!J.data) {
    jobsCard.innerHTML = `<header class="m-head"><div class="m-headl"><span class="pill k-job">Live job feed</span><h2 id="jTitle">Fresher &amp; graduate openings</h2><p>No job feed has been generated yet.</p></div><div class="m-actions"><button class="m-close" data-j="close" aria-label="Close">✕</button></div></header>
      <div class="m-body">${staleNote()}<h3>Search the job sites now</h3>${siteLinkHTML('fresher software engineer', '')}</div>`;
    return;
  }
  const d = J.data, t = d.totals;
  const tabs = [['jobs', `Openings (${t.jobs})`], ['events', `Drives, internships & hackathons (${t.events})`], ['search', 'Search all job sites'], ['sources', 'Sources & daily update']];
  jobsCard.innerHTML = `<header class="m-head"><div class="m-headl"><span class="pill k-job">Live job feed · ${esc(dayLabel(d.date))}</span><h2 id="jTitle">Fresher &amp; graduate openings in India</h2>
      <p>${t.jobs} openings at ${t.companiesWithJobs} companies${d.firstRun ? '' : ` · <b>${t.newToday} new today</b>`} · ${t.events} drives, internships &amp; hackathons · updated ${esc(agoTxt(d.date))}</p></div>
      <div class="m-actions"><button class="chip-btn primary" data-j="xlsx"><svg class="ico" viewBox="0 0 24 24"><path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14"/></svg>Download Excel</button><button class="m-close" data-j="close" aria-label="Close">✕</button></div></header>
    <nav class="m-tabs">${tabs.map(([k, l]) => `<button class="m-tab${J.tab === k ? ' on' : ''}" data-j="tab:${k}">${esc(l)}</button>`).join('')}</nav>
    <div class="m-body">${staleNote()}${{ jobs: jobsTab, events: eventsTab, search: searchTab, sources: sourcesTab }[J.tab]()}</div>`;
  jobsCard.querySelector('.m-body').scrollTop = top;
}
function jobsWorkbook() {
  const st = s => v => ({ v, s }), T = st(1), SUB = st(2), H = st(3), C = st(4), CC = st(10);
  const list = filteredJobs(), d = J.data;
  const js = { name: 'Openings', cols: [6, 24, 44, 22, 18, 14, 30, 12, 12, 16, 46, 60], freeze: 3, merges: ['A1:L1', 'A2:L2'], heights: { 0: 26 },
    rows: [[T(`Fresher & graduate openings in India — ${dayLabel(d.date)}`)], [SUB(`${list.length} openings from official company job boards · collected ${new Date(d.generatedAt).toLocaleString('en-IN')} · confirm each opening on the apply page`)],
      ['#', 'Company', 'Job title', 'Role track', 'Level', 'City', 'Location', 'Posted', 'First seen', 'Source', 'Why it is listed', 'Apply link'].map(H)] };
  list.forEach((j, i) => { js.heights[js.rows.length] = 15 * Math.max(lines(j.title, 44), lines(j.why, 46)) + 6; js.rows.push([CC(i + 1), C(j.company), C(j.title), C(j.track), C(j.level), C(j.city), C(j.loc), CC(j.posted || ''), CC(j.first), C(j.source), C(j.why), C(j.url)]); });
  const ev = { name: 'Drives & hackathons', cols: [12, 22, 70, 22, 30, 60], freeze: 3, merges: ['A1:F1'], heights: { 0: 26 },
    rows: [[T('Fresher drives, internships & hackathons — last 30 days')], [SUB('Headlines from Google News; check the source page and the company careers site for details.')], ['Date', 'Type', 'Headline', 'Source', 'Companies', 'Link'].map(H)] };
  filteredEvents().forEach(e => { ev.heights[ev.rows.length] = 15 * lines(e.title, 70) + 6; ev.rows.push([CC(e.date), C(e.type), C(e.title), C(e.source), C(e.cids.map(id => coOf(id)?.name || id).join(', ')), C(e.url)]); });
  return [js, ev];
}
function downloadJobsXLSX() {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(workbookBlob(jobsWorkbook()));
  a.download = `fresher-openings-${J.data.date}.xlsx`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

jobsEl.addEventListener('click', e => {
  if (e.target === jobsEl) { closeJobs(); return; }
  const t = e.target.closest('[data-j]'); if (!t) return;
  const [act, ...rest] = t.dataset.j.split(':'), arg = rest.join(':');
  switch (act) {
    case 'close': closeJobs(); return;
    case 'tab': J.tab = arg; renderJobs(); return;
    case 'more': J.limit += 60; renderJobs(true); return;
    case 'co': J.f.cid = arg; J.tab = 'jobs'; J.limit = 60; renderJobs(); return;
    case 'clear': J.f[arg] = ''; renderJobs(true); return;
    case 'map': closeJobs(); revealKeys(JSON.parse(arg), true); return;
    case 'build': closeJobs(); openBuilder({ role: arg }); return;
    case 'resume': closeJobs(); openResume({ jobKey: arg }); return;
    case 'xlsx': downloadJobsXLSX(); return;
  }
});
let jobsTimer = null;
jobsEl.addEventListener('input', e => {
  const id = e.target.id;
  if (!['jQ', 'eQ', 'sQ'].includes(id)) return;
  clearTimeout(jobsTimer);
  jobsTimer = setTimeout(() => {
    if (id === 'jQ') { J.f.q = e.target.value; J.limit = 60; } else if (id === 'eQ') J.ef.q = e.target.value; else J.sq = e.target.value;
    renderJobs(true);
    const el = jobsCard.querySelector('#' + id); if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
  }, 220);
});
jobsEl.addEventListener('change', e => {
  const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
  const map = { jCity: ['f', 'city'], jTrack: ['f', 'track'], jLevel: ['f', 'level'], jPosted: ['f', 'posted'], jFresh: ['f', 'fresh'], eType: ['ef', 'type'], eLinked: ['ef', 'linked'] };
  if (map[e.target.id]) { const [o, k] = map[e.target.id]; J[o][k] = v; J.limit = 60; renderJobs(true); }
  else if (e.target.id === 'sCity') { J.scity = v; renderJobs(true); }
});
$('#btnJobs').onclick = () => openJobs();
