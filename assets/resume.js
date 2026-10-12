/* Resume studio popup: upload, single + bulk tailoring with the Resume Agent, live preview, PDF / Word / ZIP downloads, AI settings */
(() => {
const el = $('#resumeModal'), card = el.querySelector('.modal-card'), fileIn = $('#rsFile');
const LS = { list: 'atlas.resumes.v1', ai: 'atlas.resume.ai', prefs: 'atlas.resume.prefs' };
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const U = {
  list: read(LS.list, []), curId: null, tab: 'single', view: 'tailored', edit: false, msg: null, busy: null, log: [], sel: new Set(), token: 0,
  t: { role: '', jd: '', company: '', title: '', jobKey: '', jdAuto: false },
  bt: { mode: 'same', role: '', jd: '', company: '', title: '', jobKey: '', jdAuto: false },
  prefs: { tpl: 'classic', bold: true, pages: 0, engine: 'builtin', pdf: true, docx: true, ...read(LS.prefs, {}) },
  ai: { provider: 'gemini', model: '', key: '', base: '', ...read(LS.ai, {}) },
};
S.resume = false;

const ICON_UP = '<svg class="ico" viewBox="0 0 24 24"><path d="M12 16V5m0 0L7.5 9.5M12 5l4.5 4.5M5 19h14"/></svg>';
const ICON_DL = '<svg class="ico" viewBox="0 0 24 24"><path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14"/></svg>';
const ICON_SPARK = '<svg class="ico" viewBox="0 0 24 24"><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>';
const tick = () => new Promise(r => setTimeout(r, 0));
const cls = v => (v >= 75 ? 'good' : v >= 50 ? 'mid' : 'low');
const cur = () => U.list.find(x => x.id === U.curId) || null;
const stats = r => { const b = r.sections.reduce((a, s) => a + (s.entries ? s.entries.reduce((x, e) => x + e.bullets.length, 0) : 0), 0), k = r.skills.reduce((a, g) => a + g.items.length, 0); return `${r.sections.length} sections · ${b} bullets · ${k} skills`; };
const safe = s => String(s || '').normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s-]+/g, '_').slice(0, 50);
const baseName = (it, useOut) => { const r = useOut && it.out ? it.out.r : it.src; return `${safe(r.name) || 'Candidate'}_${useOut && it.out ? safe(it.out.title) + '_' : ''}Resume`; };
const specOf = t => ({ role: t.role, jd: t.jd || '', company: t.company, title: t.title });
const aiReady = () => { const P = RE.PROVIDERS[U.ai.provider]; return !!P && (!P.key || !!(U.ai.key || '').trim()); };

function save() {
  try { localStorage.setItem(LS.list, JSON.stringify(U.list)); }
  catch { U.msg = { warn: true, text: 'Browser storage is full — remove a few resumes. Everything still works until you reload the page.' }; }
}
const savePrefs = () => localStorage.setItem(LS.prefs, JSON.stringify(U.prefs));
const saveAI = () => localStorage.setItem(LS.ai, JSON.stringify(U.ai));

/* ------------------------------------------------------------------ sample + blank template */
const SAMPLE_MD = `# Aarav Mehta
Software Developer
aarav.mehta@example.com | +91 98765 43210 | Pune, Maharashtra | linkedin.com/in/aarav-mehta | github.com/aaravm

## Summary
I am a hard working final year student looking for an opportunity to grow my skills in a reputed company.

## Skills
Programming: Java, Python, JavaScript, SQL, C
Web: HTML, CSS, React, Node.js, Express
Tools: Git, GitHub, VS Code, Postman, MySQL, MongoDB
Other: Data Structures, OOP, DBMS, Operating Systems, Communication, Teamwork

## Experience
### Software Developer Intern | Brightwave Technologies | Pune | May 2025 – Jul 2025
- Responsible for developing REST APIs in Node.js and Express for the internal ticketing tool
- Worked on the React dashboard used by the support team
- Wrote SQL queries and stored procedures in MySQL to generate weekly reports, cutting manual reporting time by 6 hours a week
- Involved in fixing bugs and writing unit tests with Jest, raising coverage from 48% to 75%

## Projects
### Campus Placement Portal | React, Node.js, MongoDB | github.com/aaravm/placement-portal | 2025
- Built a portal where 600+ students track drives, upload resumes and get deadline reminders
- Implemented JWT login and role-based access for students, coordinators and admins
- Deployed on AWS EC2 with Nginx and GitHub Actions CI/CD
### Expense Splitter App | Java, Spring Boot, MySQL | 2024
- Developing a Spring Boot service that splits group expenses and settles debts with a greedy algorithm
- Designed the MySQL schema and wrote JUnit tests for the settlement logic
### Movie Recommendation System | Python, Pandas, scikit-learn | 2024
- Built a content-based recommender on the TMDB 5000 dataset using TF-IDF and cosine similarity

## Education
### B.Tech in Computer Engineering | Pune Institute of Technology | Pune | 2022 – 2026
Score: CGPA 8.4/10
### Class XII (HSC) | Fergusson Junior College | Pune | 2022
Score: 89.2%

## Certifications
- Oracle Cloud Infrastructure Foundations Associate (2025)
- NPTEL: Data Structures and Algorithms using Java (Elite, 2024)

## Achievements
- Solved 450+ problems on LeetCode (contest rating 1720)
- Finalist, Smart India Hackathon 2024 (team of 6)

## Declaration
- I hereby declare that the above information is true to the best of my knowledge.
`;
const TEMPLATE_MD = `# Your Full Name
Target Job Title
you@email.com | +91 90000 00000 | City, State | linkedin.com/in/your-id | github.com/your-id

## Summary
Degree graduate targeting <role> roles, with hands-on experience in <3–4 top skills from the job description>. Completed <internship or best project> that <result with a number>. Strong foundation in <DSA / OOP / DBMS or your domain>.

## Skills
Languages: Java, Python, SQL
Frameworks & libraries: Spring Boot, React
Databases: MySQL, MongoDB
Cloud & DevOps: Git, Docker, AWS
Core concepts: Data Structures, OOP, DBMS, Operating Systems

## Education
### B.Tech in Computer Science | Your College Name | City | 2022 – 2026
Score: CGPA 8.5/10

## Experience
### Software Engineer Intern | Company Name | City | May 2025 – Jul 2025
- Built <what> using <tool>, serving <number> users / saving <number> hours a week
- Automated <task> with <tool>, cutting <time or errors> by <number>%
- Collaborated with <team> to ship <feature> used by <number> people

## Projects
### Project Name | React, Node.js, MongoDB | github.com/you/project | 2025
- Built <what it does> for <who>, handling <number> users or records
- Implemented <hardest part> with <technique>, improving <metric> by <number>%

## Certifications
- Certification name — Issuer (Year)

## Achievements
- Rank, prize or hackathon result with a number (e.g. Top 5 of 300 teams)
`;
const sampleResume = () => { const r = RE.fromMarkup(SAMPLE_MD); r.file = 'Sample resume'; return r; };
let THUMB_R = null;
const thumbModel = () => THUMB_R || (THUMB_R = RE.tailor(sampleResume(), RE.target(S.ROLE['full-stack'] ? { role: 'full-stack' } : { jd: 'Full stack developer: React, Node.js, MongoDB, AWS, REST APIs' })).r);

/* ------------------------------------------------------------------ open / close */
const jobJD = j => [j.title, `${j.company} · ${j.loc}`, j.kw?.length ? `Required skills: ${j.kw.join(', ')}` : '', `Role track: ${j.track}`, j.level].filter(Boolean).join('\n');
function fillFromJob(o, j) {
  o.jobKey = j.key; o.title = j.title; o.company = j.company;
  if (!o.jd.trim() || o.jdAuto) { o.jd = jobJD(j); o.jdAuto = true; }
  o.role = j.roles.find(r => S.ROLE[r]) || o.role;
}
function openResume(seed = {}) {
  const j = seed.jobKey && J.byKey.get(seed.jobKey);
  if (j) { U.t.jd = ''; fillFromJob(U.t, j); U.tab = 'single'; }
  else if (seed.role) { Object.assign(U.t, { role: seed.role, jobKey: '', title: '', company: '' }); if (U.t.jdAuto) U.t.jd = ''; U.tab = 'single'; }
  if (seed.tab) U.tab = seed.tab;
  if (!cur() && U.list.length) U.curId = U.list[U.list.length - 1].id;
  U.msg = null; U.edit = false;
  S.resume = true; el.hidden = false;
  render();
}
function closeResume() { S.resume = false; el.hidden = true; card.innerHTML = ''; U.token++; }
window.openResume = openResume;
window.closeResume = closeResume;

/* ------------------------------------------------------------------ shared pieces */
const roleOptions = sel => `<option value="">No specific role</option>` + ROLE_GROUPS.map(([g, slugs]) => `<optgroup label="${esc(g)}">${slugs.filter(s => S.ROLE[s]).map(s => `<option value="${s}"${sel === s ? ' selected' : ''}>${esc(S.ROLE[s].name)}</option>`).join('')}</optgroup>`).join('');
function jobOptions(t) {
  if (!J.data) return '<option value="">Job feed not loaded</option>';
  const js = (t.role ? J.data.jobs.filter(j => j.roles.includes(t.role)) : J.data.jobs).slice(0, 300);
  return `<option value="">${js.length ? `Pick one of ${js.length} live openings…` : 'No live opening for this role today'}</option>` + js.map(j => `<option value="${esc(j.key)}"${t.jobKey === j.key ? ' selected' : ''}>${esc(short(`${j.title} — ${j.company}`, 78))}</option>`).join('');
}
function prefsHTML() {
  const p = U.prefs, P = RE.PROVIDERS[U.ai.provider], ready = aiReady();
  return `<label class="rs-l">Template<select id="rsTpl" class="b-input">${Object.entries(RE.TEMPLATES).map(([k, t]) => opt(k, t.label, p.tpl)).join('')}</select></label>
    <div class="rs-2"><label class="rs-l">Length<select id="rsPagesSel" class="b-input">${opt('0', 'Auto: 1 page fresher, 2 experienced', String(p.pages))}${opt('1', 'Fit on 1 page', String(p.pages))}${opt('2', 'Up to 2 pages', String(p.pages))}${opt('-1', 'Never trim', String(p.pages))}</select></label>
      <label class="jf-check rs-chk"><input type="checkbox" id="rsBold"${p.bold ? ' checked' : ''}> Bold matched keywords</label></div>
    <div class="rs-eng"><label><input type="radio" name="rsEng" value="builtin"${p.engine !== 'ai' || !ready ? ' checked' : ''}><span><b>Built-in Resume Agent</b><small>Free, offline, instant — never invents facts.</small></span></label>
      <label class="${ready ? '' : 'off'}"><input type="radio" name="rsEng" value="ai"${p.engine === 'ai' && ready ? ' checked' : ''}${ready ? '' : ' disabled'}><span><b>AI-assisted · ${esc(P.label)}</b><small>${ready ? `More natural rewrites with ${esc(U.ai.model || P.model)}; every fact is checked against your resume.` : 'Connect a model in the <button class="link-btn" data-r="tab:agent">AI agent</button> tab.'}</small></span></label></div>`;
}
const scoreCard = (label, v, was) => `<div class="rs-score ${cls(v)}"><div class="rs-ring" style="--v:${v}"><b>${v}</b></div><div><b>${esc(label)}</b>${was != null ? `<small>${was === v ? 'unchanged' : `was ${was}`}${v > was ? ` · <em>+${v - was}</em>` : ''}</small>` : ''}</div></div>`;
const checksHTML = q => `<ul class="rs-checks">${q.checks.map(c => `<li class="${c.ok ? 'ok' : ''}"><span>${c.ok ? '✓' : '!'}</span><div><b>${esc(c.label)}</b>${c.ok ? '' : `<small>${esc(c.tip)}</small>`}</div><em>${c.pts}/${c.max}</em></li>`).join('')}</ul>`;
const logHTML = () => `<ol class="rs-log" id="rsLog">${U.log.map(s => `<li class="${s.s || 'ok'}"><b>${esc(s.t)}</b><small>${esc(s.d || '')}</small></li>`).join('')}</ol>`;
const busyHTML = () => U.busy ? `<div class="rs-busy" id="rsBusy"><div class="track"><div class="fill" style="width:${U.busy.total ? Math.round(100 * U.busy.done / U.busy.total) : 0}%"></div></div><small>${esc(U.busy.label)} · ${U.busy.done}/${U.busy.total}</small></div>` : '';
function updateBusy() { const b = card.querySelector('#rsBusy'); if (b) b.outerHTML = busyHTML(); else card.querySelector('.m-bar')?.insertAdjacentHTML('beforeend', busyHTML()); }
function refreshLog() { const l = card.querySelector('#rsLog'); if (l) l.outerHTML = logHTML(); else card.querySelector('.rs-go')?.insertAdjacentHTML('afterend', logHTML()); }
const pagesOf = r => RE.layout(r, U.prefs.tpl).length;
const renderOpt = (it, useOut) => (useOut && it.out && U.prefs.bold ? {} : { bold: [] });

/* ------------------------------------------------------------------ single tab */
function reportHTML(it) {
  const out = it.out;
  if (!out) {
    const q = RE.quality(it.src, pagesOf(it.src));
    return `<h3>Resume health</h3><div class="rs-scores">${scoreCard('Resume quality', q.score)}</div>${checksHTML(q)}`
      + note('Choose a target role or paste a job description, then press <b>Tailor with Resume Agent</b> to see the ATS keyword match and the rewritten resume.');
  }
  const R = out.report;
  return `<h3>Tailored for ${esc(out.title)}${R.company ? ` · ${esc(R.company)}` : ''}</h3>
    <div class="rs-scores">${scoreCard('ATS keyword match', R.after, R.before)}${scoreCard('Resume quality', out.q1.score, out.q0.score)}</div>
    <h3>Keywords found <span class="muted">${R.matched.length}</span></h3><div class="rs-kws">${R.matched.map(k => `<span class="rs-kw ok">✓ ${esc(k)}</span>`).join('') || '<span class="muted">None yet</span>'}</div>
    ${R.missing.length ? `<h3>Missing keywords <span class="muted">${R.missing.length}</span></h3><p class="rs-hint">Click a skill you have <b>really</b> used to add it — the agent never adds skills on its own.</p><div class="rs-kws">${R.missing.map(k => `<button class="rs-kw miss" data-r="addkw:${esc(k)}">＋ ${esc(k)}</button>`).join('')}</div>` : ''}
    <h3>What the agent changed</h3><ul class="rs-list">${R.changes.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
    ${out.notes?.length ? `<h3>Fact-check</h3><ul class="rs-list warn">${out.notes.map(c => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}
    <h3>Make it even stronger</h3>${R.sugg.filter(s => s.type !== 'missing').map(s => `<div class="rs-sugg"><p>${esc(s.text)}</p>${s.items ? `<ul>${s.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>` : ''}</div>`).join('')}
    ${(out.aiSugg || []).map(s => `<div class="rs-sugg ai"><p>${esc(s)}</p></div>`).join('')}
    <details class="rs-det"><summary>Quality checklist · ${out.q1.score}/100</summary>${checksHTML(out.q1)}</details>`;
}
function editorHTML() {
  const it = cur(), m = U.edit === 'out' && it.out ? it.out.r : it.src;
  return `<div class="rs-editor"><p class="rs-hint">Editing the <b>${U.edit === 'out' ? 'tailored' : 'original'}</b> resume as plain text: <code># Name</code> <code>## Section</code> <code>### Title | Organisation | Location | Dates</code> <code>- bullet</code> plus <code>Score:</code> and <code>Link:</code> lines.</p>
    <textarea id="rsEdit" class="b-input" spellcheck="true">${esc(RE.toMarkup(m))}</textarea>
    <div class="rs-row"><button class="chip-btn primary" data-r="apply">Apply changes</button><button class="chip-btn" data-r="cancel">Cancel</button></div></div>`;
}
function singleTab() {
  const it = cur(), out = it?.out, t = U.t, showOut = U.view === 'tailored' && !!out;
  const job = t.jobKey && J.byKey.get(t.jobKey);
  const left = `<aside class="rs-side">
    <section class="rs-step"><h4><i>1</i>Your resume</h4>
      ${U.list.length ? `<select id="rsPick" class="b-input">${U.list.map(x => `<option value="${x.id}"${x.id === U.curId ? ' selected' : ''}>${esc(x.src.name || 'Unnamed')}${x.src.file ? ` — ${esc(short(x.src.file, 30))}` : ''}</option>`).join('')}</select>` : ''}
      <button class="rs-drop" data-r="upload"><b>Upload PDF, Word (.docx) or text</b><span>or drop files anywhere on this window</span></button>
      <div class="rs-row"><button class="chip-btn" data-r="sample">Try a sample</button><button class="chip-btn" data-r="blank">Start from the template</button></div>
      ${it ? `<div class="rs-cur"><b>${esc(it.src.name)}</b><small>${esc(stats(it.src))}</small><div class="rs-row"><button class="link-btn" data-r="edit:src">Check / fix what was read</button><button class="link-btn rs-danger" data-r="del:${it.id}">Remove</button></div></div>` : ''}
    </section>
    <section class="rs-step"><h4><i>2</i>Target role &amp; job</h4>
      <label class="rs-l">Role<select id="rsRole" class="b-input">${roleOptions(t.role)}</select></label>
      <label class="rs-l">Live opening <small>optional</small><select id="rsJob" class="b-input">${jobOptions(t)}</select></label>
      <div class="rs-2"><label class="rs-l">Job title<input id="rsTitleIn" class="b-input" value="${esc(t.title)}" placeholder="${esc(t.role && S.ROLE[t.role] ? S.ROLE[t.role].name : 'e.g. Associate Engineer')}"></label><label class="rs-l">Company<input id="rsCompany" class="b-input" value="${esc(t.company)}" placeholder="optional"></label></div>
      <label class="rs-l">Job description <small>paste the full JD for the best match</small><textarea id="rsJD" class="b-input rs-jd" placeholder="Paste the job description — responsibilities, required skills, qualifications…">${esc(t.jd)}</textarea></label>
      ${job ? `<p class="rs-hint">Filled from the live opening. For an exact match open the <a href="${esc(job.url)}" target="_blank" rel="noopener">job page ↗</a> and paste its full description.</p>` : ''}
    </section>
    <section class="rs-step"><h4><i>3</i>Template &amp; agent</h4>${prefsHTML()}
      <button class="chip-btn primary rs-go" data-r="tailor"${it && !U.busy ? '' : ' disabled'}>${ICON_SPARK}Tailor with Resume Agent</button>
      ${U.log.length ? logHTML() : ''}
    </section></aside>`;
  const center = `<section class="rs-center">
    <div class="rs-tool"><div class="m-tabs"><button class="m-tab${showOut ? '' : ' on'}" data-r="view:original">Original</button><button class="m-tab${showOut ? ' on' : ''}" data-r="view:tailored"${out ? '' : ' disabled'}>Tailored${out ? ` · ${esc(short(out.title, 26))}` : ''}</button></div>
      <span class="rs-pn" id="rsPagesN"></span>
      ${it ? `<div class="rs-tool-r"><button class="chip-btn" data-r="edit:${showOut ? 'out' : 'src'}">✎ Edit text</button><button class="chip-btn" data-r="dl:pdf">${ICON_DL}PDF</button><button class="chip-btn" data-r="dl:docx">${ICON_DL}Word</button><button class="chip-btn" data-r="print">Print</button></div>` : ''}</div>
    ${out?.stale && showOut ? note('You edited the original after tailoring — press Tailor again to refresh this version.', true) : ''}
    ${!it ? `<div class="rs-empty"><button class="rs-drop big" data-r="upload"><b>Upload a resume to start</b><span>PDF, Word (.docx) or text — it is read inside your browser, nothing is uploaded</span></button><p>No resume handy? <button class="link-btn" data-r="sample">Load the sample</button> or <button class="link-btn" data-r="blank">start from the ATS template</button>.</p></div>`
      : U.edit ? editorHTML() : `<div class="rs-pages" id="rsPages"><div class="rs-loading">Rendering preview…</div></div>`}
  </section>`;
  return `<div class="rs-grid">${left}${center}<aside class="rs-report">${it ? reportHTML(it) : `<h3>What you get</h3><ul class="rs-list"><li>ATS keyword match score against the role or job description — before and after.</li><li>A rewritten headline, summary, skills and bullets on the proven one-column template.</li><li>Missing keywords, certifications and numbers to add — never invented for you.</li><li>PDF and Word downloads, or a ZIP for a whole batch.</li></ul>`}</aside></div>`;
}
async function renderPreview() {
  const box = card.querySelector('#rsPages'), it = cur(); if (!box || !it) return;
  const token = ++U.token, useOut = U.view === 'tailored' && !!it.out, m = useOut ? it.out.r : it.src;
  try {
    const { blob, pages } = RE.pdfBlob(m, U.prefs.tpl, renderOpt(it, useOut));
    const pn = card.querySelector('#rsPagesN'); if (pn) pn.textContent = `${pages} page${pages > 1 ? 's' : ''} · A4`;
    const lib = await RE.pdfjs();
    const doc = await lib.getDocument({ data: new Uint8Array(await blob.arrayBuffer()), isEvalSupported: false }).promise;
    if (token !== U.token) return;
    const w = Math.max(300, Math.min(box.clientWidth - 28, 800)), dpr = window.devicePixelRatio || 1, canvases = [];
    for (let i = 1; i <= doc.numPages; i++) {
      const pg = await doc.getPage(i), vp = pg.getViewport({ scale: (w / pg.getViewport({ scale: 1 }).width) * dpr });
      const c = document.createElement('canvas'); c.width = Math.round(vp.width); c.height = Math.round(vp.height); c.style.width = w + 'px'; c.className = 'rs-page';
      await pg.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
      if (token !== U.token) return;
      canvases.push(c);
    }
    box.replaceChildren(...canvases);
    if (U.colTops) { const c = card.querySelector('.rs-center'); if (c) c.scrollTop = U.colTops[2]; }
  } catch (e) { if (token === U.token) box.innerHTML = `<div class="b-empty-state">Preview failed: ${esc(e.message)}</div>`; }
}

/* ------------------------------------------------------------------ bulk tab */
function rowHTML(x) {
  const o = x.out, on = U.sel.has(x.id);
  return `<tr class="${on ? 'on' : ''}"><td><input type="checkbox" data-sel="${x.id}"${on ? ' checked' : ''} aria-label="Select ${esc(x.src.name)}"></td>
    <td><b>${esc(x.src.name)}</b><small>${esc(short(x.src.file || 'typed in', 40))} · ${esc(stats(x.src))}</small></td>
    <td>${o ? `${esc(o.title)}${o.report.company ? `<small>${esc(o.report.company)}</small>` : ''}` : '<span class="muted">—</span>'}</td>
    <td>${o ? `<b class="rs-num ${cls(o.report.after)}">${o.report.after}%</b><small>was ${o.report.before}%</small>` : '—'}</td>
    <td>${o ? `<b class="rs-num ${cls(o.q1.score)}">${o.q1.score}</b><small>was ${o.q0.score}</small>` : '—'}</td>
    <td>${o ? o.pages : '—'}</td>
    <td>${x.err ? `<span class="rs-st err" title="${esc(x.err)}">Failed</span>` : o ? (o.stale ? '<span class="rs-st warn">Edited — re-run</span>' : '<span class="rs-st ok">Tailored</span>') : '<span class="rs-st">Ready</span>'}</td>
    <td class="rs-ra"><button class="link-btn" data-r="open:${x.id}">Open</button>${o ? `<button class="link-btn" data-r="dlx:pdf:${x.id}">PDF</button><button class="link-btn" data-r="dlx:docx:${x.id}">Word</button>` : ''}<button class="b-x" data-r="del:${x.id}" title="Remove">×</button></td></tr>`;
}
function bulkTab() {
  const b = U.bt, rows = U.list, sel = rows.filter(x => U.sel.has(x.id)), done = sel.filter(x => x.out).length;
  return `<div class="rs-bulk">
    <button class="rs-drop big" data-r="upload"><b>Drop many resumes here or click to choose</b><span>PDF, Word (.docx) or text — every file is read inside your browser; nothing is uploaded to a server</span></button>
    <div class="rs-bt">
      <section class="rs-step"><h4><i>1</i>Target for the batch</h4>
        <label class="rs-l">Role for each resume<select id="rbMode" class="b-input">${opt('same', 'Same role / job description for every resume', b.mode)}${opt('auto', 'Auto — best-matching role for each resume', b.mode)}</select></label>
        ${b.mode === 'auto' ? `<p class="rs-hint">The agent compares each resume with all ${Object.keys(S.ROLE).length} role profiles in this app (skills, tools and responsibilities) and tailors it to the closest one.</p>` : `
        <div class="rs-2"><label class="rs-l">Role<select id="rbRole" class="b-input">${roleOptions(b.role)}</select></label><label class="rs-l">Live opening<select id="rbJob" class="b-input">${jobOptions(b)}</select></label></div>
        <div class="rs-2"><label class="rs-l">Job title<input id="rbTitle" class="b-input" value="${esc(b.title)}" placeholder="optional"></label><label class="rs-l">Company<input id="rbCompany" class="b-input" value="${esc(b.company)}" placeholder="optional"></label></div>
        <label class="rs-l">Job description<textarea id="rbJD" class="b-input rs-jd" placeholder="Paste one job description to tailor every selected resume to it…">${esc(b.jd)}</textarea></label>`}
      </section>
      <section class="rs-step"><h4><i>2</i>Template, agent &amp; files</h4>${prefsHTML()}
        <div class="rs-row"><span class="rs-l">ZIP contains</span><label class="jf-check"><input type="checkbox" id="rbPdf"${U.prefs.pdf ? ' checked' : ''}> PDF</label><label class="jf-check"><input type="checkbox" id="rbDocx"${U.prefs.docx ? ' checked' : ''}> Word (.docx)</label><span class="muted">+ Excel report</span></div>
      </section>
    </div>
    <div class="rs-actions">
      <label class="jf-check"><input type="checkbox" id="rbAll"${rows.length && sel.length === rows.length ? ' checked' : ''}> Select all</label>
      <span class="muted">${sel.length} of ${rows.length} selected${sel.length ? ` · ${done} tailored` : ''}</span><span class="rs-sp"></span>
      <button class="chip-btn" data-r="bdel"${sel.length ? '' : ' disabled'}>Remove selected</button>
      <button class="chip-btn" data-r="zip"${done && !U.busy ? '' : ' disabled'}>${ICON_DL}Download ZIP (${done})</button>
      <button class="chip-btn primary" data-r="btailor"${sel.length && !U.busy ? '' : ' disabled'}>${ICON_SPARK}Tailor ${sel.length || ''} selected</button>
    </div>
    ${rows.length ? `<div class="rs-table-wrap"><table class="rs-table"><thead><tr><th></th><th>Candidate</th><th>Tailored for</th><th>ATS match</th><th>Quality</th><th>Pages</th><th>Status</th><th></th></tr></thead><tbody>${rows.map(rowHTML).join('')}</tbody></table></div>`
      : `<div class="b-empty-state">No resumes yet. Upload a batch of PDF / Word resumes above — or <button class="link-btn" data-r="sample">add the sample</button> to try it.</div>`}
  </div>`;
}

/* ------------------------------------------------------------------ template + agent tabs */
function templateTab() {
  return `<div class="rs-tpl"><div class="rs-tpl-intro">
    <h3>Why this template gets interviews</h3>
    <p>It is the format recruiters, placement cells and career services recommend most: <b>one column, reverse-chronological</b> — the layout of Harvard Career Services’ guide and the widely shared “Jake’s Resume” template that thousands of candidates have used to land interviews at product companies and IT services firms. It works because it passes both screens:</p>
    <ul><li><b>The ATS screen</b> — standard headings and real text, no photos, icons, tables, columns or text boxes, so Workday, Taleo, SuccessFactors, Greenhouse and Lever read every word in the right order and match your keywords.</li>
      <li><b>The 6-second human scan</b> — name, target title and contact first, skills grouped, and every bullet opens with an action verb and ends with a measurable result.</li></ul>
    <h3>The structure</h3>
    <ol class="rs-ol"><li><b>Header</b> — name, target title, phone, email, city, LinkedIn, GitHub / portfolio.</li><li><b>Summary</b> — 2–3 lines: who you are, the role you want, your strongest matching skills and proof.</li>
      <li><b>Skills</b> — grouped (Languages, Frameworks, Databases, Cloud & DevOps, Core concepts); most relevant first.</li><li><b>Education</b> (first for freshers) — degree, college, years, CGPA.</li>
      <li><b>Experience / internships</b> — 2–4 bullets each, newest first.</li><li><b>Projects</b> — the 2–4 most relevant, with tech stack and link.</li><li><b>Certifications, achievements, leadership</b> — short, with numbers.</li></ol>
    <h3>The bullet formula</h3>
    <p>Google’s X-Y-Z: <i>“Accomplished [X] as measured by [Y] by doing [Z]”.</i></p>
    <div class="rs-ba"><div><small>Before</small><p>Responsible for developing APIs for the ticketing tool.</p></div><div><small>After</small><p><b>Built</b> 14 REST APIs in <b>Node.js</b> for the ticketing tool, cutting average ticket resolution time by 22%.</p></div></div>
    <h3>Rules the Resume Agent enforces</h3>
    <ul><li>One page for freshers, two at most for experienced candidates.</li><li>Keywords copied exactly from the job description — only for skills you really have.</li><li>No “I / my”, no “responsible for”, no declaration, photo, date of birth, religion or marital status.</li><li>Standard fonts and section names; saved as <code>Firstname_Lastname_Role_Resume.pdf</code>.</li></ul>
    <div class="rs-row"><button class="chip-btn primary" data-r="tpldl:docx">${ICON_DL}Blank template (Word)</button><button class="chip-btn" data-r="tpldl:pdf">${ICON_DL}Blank template (PDF)</button><button class="chip-btn" data-r="sample">Open the sample in the studio</button></div>
  </div>
  <div class="rs-tpl-cards">${Object.entries(RE.TEMPLATES).map(([k, t]) => `<figure class="rs-tcard${U.prefs.tpl === k ? ' on' : ''}"><div class="rs-thumb" data-thumb="${k}"><div class="rs-loading">Rendering…</div></div><figcaption><b>${esc(t.label)}</b><button class="chip-btn${U.prefs.tpl === k ? ' primary' : ''}" data-r="tpl:${k}">${U.prefs.tpl === k ? '✓ In use' : 'Use this template'}</button></figcaption></figure>`).join('')}</div></div>`;
}
async function renderThumbs() {
  const token = ++U.token, lib = await RE.pdfjs(), m = thumbModel();
  for (const box of card.querySelectorAll('[data-thumb]')) {
    const { blob } = RE.pdfBlob(m, box.dataset.thumb, {});
    const doc = await lib.getDocument({ data: new Uint8Array(await blob.arrayBuffer()), isEvalSupported: false }).promise;
    if (token !== U.token) return;
    const pg = await doc.getPage(1), w = box.clientWidth || 280, vp = pg.getViewport({ scale: (w / pg.getViewport({ scale: 1 }).width) * (window.devicePixelRatio || 1) });
    const c = document.createElement('canvas'); c.width = Math.round(vp.width); c.height = Math.round(vp.height);
    await pg.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
    if (token !== U.token) return;
    box.replaceChildren(c);
  }
}
function agentTab() {
  const a = U.ai, P = RE.PROVIDERS[a.provider];
  return `<div class="rs-agent"><div>
    <h3>How the Resume Agent works</h3>
    <ol class="rs-flow"><li><b>Read</b><span>Parses your PDF / Word resume into header, sections, entries and bullets.</span></li>
      <li><b>Analyse</b><span>Pulls the must-have skills out of the job description (required counts more than nice-to-have) or out of the role profile in this app.</span></li>
      <li><b>Match</b><span>Scores ATS keyword coverage and resume quality (verbs, numbers, length, contact, sections).</span></li>
      <li><b>Rewrite</b><span>Fixes weak openers, reorders bullets and projects by relevance, regroups skills, writes a targeted headline and summary.</span></li>
      <li><b>Fact-check</b><span>Rejects anything that is not in your resume — new employers, tools, degrees or numbers.</span></li>
      <li><b>Format</b><span>Lays it out on the ATS template, trims low-value lines to fit the page, exports PDF and Word.</span></li></ol>
    ${note('The built-in agent runs entirely in your browser and is always available. Connecting an AI model is optional — it writes more natural bullets and summaries, and every AI change still has to pass the fact-check.')}
  </div>
  <section class="rs-step"><h4>Connect an AI model <small>optional</small></h4>
    <label class="rs-l">Provider<select id="aiProv" class="b-input">${Object.entries(RE.PROVIDERS).map(([k, p]) => opt(k, p.label, a.provider)).join('')}</select></label>
    <label class="rs-l">Model<input id="aiModel" class="b-input" value="${esc(a.model)}" placeholder="${esc(P.model)}"></label>
    ${P.key ? `<label class="rs-l">API key <a href="${esc(P.keyUrl)}" target="_blank" rel="noopener">get a key ↗</a><input id="aiKey" class="b-input" type="password" value="${esc(a.key)}" placeholder="Paste your API key" autocomplete="off" spellcheck="false"></label>`
      : `<p class="rs-hint">Install <a href="${esc(P.keyUrl)}" target="_blank" rel="noopener">Ollama ↗</a>, run <code>ollama pull ${esc(a.model || P.model)}</code>, allow this page with <code>setx OLLAMA_ORIGINS *</code>, then restart Ollama.</p>`}
    ${a.provider === 'compatible' || a.provider === 'ollama' ? `<label class="rs-l">Base URL<input id="aiBase" class="b-input" value="${esc(a.base)}" placeholder="${esc(P.base)}"></label>` : ''}
    <div class="rs-row"><button class="chip-btn primary" data-r="aisave">Save</button><button class="chip-btn" data-r="aitest">Test connection</button>${a.key ? '<button class="chip-btn" data-r="aiclear">Forget key</button>' : ''}</div>
    <div id="aiTest"></div>
    <p class="rs-hint">The key is stored only in this browser and sent only to ${esc(P.label)}. In AI-assisted mode the resume text and job description are sent to that provider.</p>
    <details class="rs-det"><summary>The agent’s instructions (system prompt)</summary><pre class="rs-pre">${esc(RE.AGENT_SYSTEM)}</pre></details>
  </section></div>`;
}

/* ------------------------------------------------------------------ JD-based profile builder */
const ROLE_FIT = new Map();
function roleFits(T) {
  const want = new Map(T.kws.filter(k => !k.soft).map(k => [k.name, k.w])), total = [...want.values()].reduce((a, w) => a + w, 0) || 1;
  return Object.keys(S.ROLE).map(slug => {
    if (!ROLE_FIT.has(slug)) ROLE_FIT.set(slug, new Set(RE.target({ role: slug }).kws.filter(k => !k.soft).map(k => k.name)));
    const set = ROLE_FIT.get(slug);
    return { slug, fit: Math.round(100 * [...want].reduce((a, [k, w]) => a + (set.has(k) ? w : 0), 0) / total) };
  }).filter(x => x.fit >= 20).sort((a, b) => b.fit - a.fit).slice(0, 4);
}
const mapBtn = (keys, label, cls) => `<button class="chip ${cls}" data-r="map:${esc(JSON.stringify(keys))}">${esc(label)}</button>`;
function profilePlan() {
  const T = RE.target(specOf(U.t)), it = cur(), m = it ? RE.match(it.src, T) : null;
  const hard = T.kws.filter(k => !k.soft), soft = T.kws.filter(k => k.soft);
  const have = m ? new Set(m.matched.map(k => k.name)) : null;
  const skills = hard.slice(0, 20).map(k => ({ ...k, ok: have ? have.has(k.name) : null, slugs: skillSlugsFor(k.name) }));
  const gaps = uniq(skills.filter(s => s.ok !== true).flatMap(s => s.slugs)).slice(0, 6);
  return { T, it, m, skills, soft, gaps, roles: roleFits(T) };
}
function profileHTML(p) {
  const { T, it, m, skills, soft, gaps, roles } = p, top = skills.filter(s => s.ok !== false).slice(0, 4).map(s => s.name);
  const P = it ? RE.profile(it.src) : null, now = new Date().getFullYear();
  const who = P?.deg ? `${P.deg}${P.field ? ` ${P.field}` : ''} ${P.grad && P.grad > now ? `student (graduating ${P.grad})` : 'graduate'}` : 'Fresher';
  const summary = `${who} targeting ${T.title} roles${T.company ? ` at ${T.company}` : ''}, with hands-on project work in ${top.length ? top.join(', ') : 'the core skills of the role'}. `
    + `${P?.projects.length ? `Built ${P.projects.length} project${P.projects.length > 1 ? 's' : ''} including ${P.projects[0].title}. ` : 'Built end-to-end projects that show the skills above with measurable results. '}`
    + `Quick learner with a strong foundation in ${soft.length ? soft.slice(0, 2).map(k => k.name.toLowerCase()).join(' and ') : 'problem solving and teamwork'}.`;
  const missing = skills.filter(s => s.ok === false), haveN = skills.filter(s => s.ok).length;
  const row = s => `<li class="pf-sk ${s.ok == null ? '' : s.ok ? 'ok' : 'miss'}"><span>${s.ok == null ? '•' : s.ok ? '✓' : '!'}</span><b>${esc(s.name)}</b>${s.slugs.length ? s.slugs.slice(0, 2).map(sl => mapBtn(['skills', 'sr:' + sl], `${S.SKILL[sl].name} roadmap`, 'k-skill')).join('') : '<small class="muted">no roadmap in the app</small>'}</li>`;
  const ideas = [
    `End-to-end project with ${top.slice(0, 3).join(', ') || 'the core tools'}: build it, test it, deploy it and put the live link and GitHub repo on your resume.`,
    `Rebuild one responsibility from this job description${T.company ? ` at ${T.company}` : ''} as a small demo, and measure one number (users, speed, accuracy, hours saved).`,
    missing.length ? `Close the gaps: add ${missing.slice(0, 3).map(s => s.name).join(', ')} to a project so the skill is backed by real work, not just listed.` : 'Write a short case study (README or blog) for your best project — interviewers ask about it first.',
  ];
  return `<div class="pf-out">
    <section class="pf-card pf-head"><div><span class="pill k-jd">Target profile</span><h3>${esc(T.title)}${T.company ? ` <small>at ${esc(T.company)}</small>` : ''}</h3>
      <p class="muted">${T.years ? `Asks for ${T.years}+ years — as a fresher, lead with projects and internships.` : 'Fresher-friendly: no years of experience asked for.'}</p></div>
      ${m ? `<div class="pf-score ${cls(m.score)}"><b>${m.score}%</b><small>match with ${esc(short(it.src.name || 'your resume', 22))}</small></div>` : ''}</section>
    <section class="pf-card"><h4>Skills this job needs <small>${m ? `${haveN} of ${skills.length} already on your resume` : 'upload a resume to see which ones you already have'}</small></h4><ul class="pf-skills">${skills.map(row).join('')}</ul>
      ${soft.length ? `<p class="rs-hint">Soft skills to show in bullets: ${soft.map(k => esc(k.name)).join(', ')}.</p>` : ''}
      <div class="rs-row"><button class="chip-btn primary" data-r="ptt"${gaps.length ? '' : ' disabled'}>＋ 80-hour timetable for ${m ? 'the missing' : 'these'} skills${gaps.length ? ` (${gaps.length})` : ''}</button>${it ? '<button class="chip-btn" data-r="tab:single">Tailor my resume to this JD</button>' : '<button class="chip-btn" data-r="upload">Upload my resume to compare</button>'}</div></section>
    ${roles.length ? `<section class="pf-card"><h4>Closest role roadmaps</h4><div class="chips">${roles.map(r => mapBtn(['roles', 'rr:' + r.slug], `${S.ROLE[r.slug].name} · ${r.fit}%`, 'k-roadmap')).join('')}</div></section>` : ''}
    <section class="pf-card"><h4>Profile headline &amp; summary</h4><p class="pf-line"><b>${esc(T.title)}</b>${top.length ? ` | ${esc(top.join(' · '))}` : ''}</p><p class="pf-line">${esc(summary)}</p><p class="rs-hint">Use these on your resume, LinkedIn and Naukri profile. Keep only the skills you have really used.</p></section>
    ${T.certs.length ? `<section class="pf-card"><h4>Certifications that help</h4><ul class="rs-list">${T.certs.map(c => `<li>${esc(c)}</li>`).join('')}</ul></section>` : ''}
    <section class="pf-card"><h4>Project ideas for this profile</h4><ul class="rs-list">${ideas.map(i => `<li>${esc(i)}</li>`).join('')}</ul></section></div>`;
}
function profileTab() {
  const it = cur(), t = U.t, job = t.jobKey && J.byKey.get(t.jobKey), ready = t.role || t.jd.trim().length >= 20;
  const left = `<aside class="rs-side">
    <section class="rs-step"><h4><i>1</i>Job description</h4>
      <label class="rs-l">Role<select id="rsRole" class="b-input">${roleOptions(t.role)}</select></label>
      <label class="rs-l">Live opening <small>optional</small><select id="rsJob" class="b-input">${jobOptions(t)}</select></label>
      <div class="rs-2"><label class="rs-l">Job title<input id="rsTitleIn" class="b-input" value="${esc(t.title)}" placeholder="optional"></label><label class="rs-l">Company<input id="rsCompany" class="b-input" value="${esc(t.company)}" placeholder="optional"></label></div>
      <label class="rs-l">Job description<textarea id="rsJD" class="b-input rs-jd" placeholder="Paste the job description — responsibilities, required skills, qualifications…">${esc(t.jd)}</textarea></label>
      ${job ? `<p class="rs-hint">Filled from the live opening — paste the full text from the <a href="${esc(job.url)}" target="_blank" rel="noopener">job page ↗</a> for a sharper profile.</p>` : ''}
    </section>
    <section class="rs-step"><h4><i>2</i>Compare with a resume <small>optional</small></h4>
      ${U.list.length ? `<select id="rsPick" class="b-input">${U.list.map(x => `<option value="${x.id}"${x.id === U.curId ? ' selected' : ''}>${esc(x.src.name || 'Unnamed')}</option>`).join('')}</select>` : '<p class="rs-hint">No resume yet — the profile still lists every skill to build.</p>'}
      <div class="rs-row"><button class="chip-btn" data-r="upload">Upload a resume</button><button class="chip-btn" data-r="sample">Try the sample</button></div>
      <button class="chip-btn primary rs-go" data-r="pbuild">${ICON_SPARK}Build profile</button>
    </section></aside>`;
  return `<div class="rs-grid pf-grid">${left}<section class="rs-center pf-center">${ready ? profileHTML(profilePlan())
    : `<div class="rs-empty"><h3>Build a profile from any job description</h3><p>Pick a role or a live opening, or paste a job description, then press <b>Build profile</b>. You get the skills the job needs (and which ones your resume already shows), the closest role roadmaps, a ready headline and summary, certifications, project ideas and an 80-hour timetable for the gaps.</p></div>`}</section></div>`;
}

/* ------------------------------------------------------------------ render */
const COLS = ['.rs-side', '.rs-report', '.rs-center'];
function render(keep) {
  const body = card.querySelector('.m-body'), top = keep && body ? body.scrollTop : 0, n = U.list.length;
  U.colTops = keep ? COLS.map(s => card.querySelector(s)?.scrollTop || 0) : null;
  const tabs = [['single', 'Tailor one resume'], ['profile', 'JD-based profile builder'], ['bulk', `Bulk tailor${n ? ` (${n})` : ''}`], ['template', 'Template & tips'], ['agent', 'AI agent']];
  card.innerHTML = `<header class="m-head"><div class="m-headl"><span class="pill k-resume">Resume studio · Resume Agent</span><h2 id="rsTitle">Tailor your resume to any role or job description</h2>
      <p>ATS-proven one-column template · upload PDF, Word or text · tailor one resume or a whole batch · download PDF, Word or one ZIP</p></div>
    <div class="m-actions"><button class="chip-btn primary" data-r="upload">${ICON_UP}Upload resumes</button><button class="m-close" data-r="close" aria-label="Close">✕</button></div></header>
    <div class="m-bar"><nav class="m-tabs">${tabs.map(([k, l]) => `<button class="m-tab${U.tab === k ? ' on' : ''}" data-r="tab:${k}">${esc(l)}</button>`).join('')}</nav>${busyHTML()}</div>
    <div class="m-body rs-body${U.tab === 'single' ? ' rs-fixed' : ''}">${U.msg ? note(U.msg.text, U.msg.warn) : ''}${{ single: singleTab, profile: profileTab, bulk: bulkTab, template: templateTab, agent: agentTab }[U.tab]()}</div>`;
  card.querySelector('.m-body').scrollTop = top;
  if (U.colTops) COLS.slice(0, 2).forEach((s, i) => { const c = card.querySelector(s); if (c) c.scrollTop = U.colTops[i]; });
  if (U.tab === 'single') renderPreview();
  else if (U.tab === 'template') renderThumbs();
}

/* ------------------------------------------------------------------ actions */
async function addFiles(list) {
  const files = [...list].filter(f => f.size); if (!files.length) return;
  const ok = [], bad = [];
  U.busy = { label: 'Reading resumes', done: 0, total: files.length }; render(true);
  for (const f of files) {
    try { const r = await RE.readFile(f); U.list.push({ id: r.id, src: r, out: null }); ok.push(r.id); }
    catch (e) { bad.push(`${f.name}: ${e.message}`); }
    U.busy.done++; updateBusy();
  }
  U.busy = null;
  ok.forEach(id => U.sel.add(id));
  if (ok.length) { U.curId = ok[0]; U.view = 'original'; U.edit = false; }
  if (files.length > 1 && U.tab !== 'bulk') U.tab = 'bulk';
  else if (U.tab === 'template' || U.tab === 'agent') U.tab = 'single';
  U.msg = bad.length ? { warn: true, text: `Read ${ok.length} of ${files.length} file${files.length > 1 ? 's' : ''}. ${bad.map(esc).join(' · ')}` }
    : { text: ok.length === 1 ? 'Resume read. Check the preview (use <b>Check / fix what was read</b> if anything is off), choose a target, then press <b>Tailor</b>.' : `Read ${ok.length} resumes. Choose the target and press <b>Tailor selected</b>.` };
  save(); render();
}
function addModel(r) {
  U.list.push({ id: r.id, src: r, out: null }); U.curId = r.id; U.sel.add(r.id); U.view = 'original'; U.edit = false;
  if (U.tab !== 'bulk' && U.tab !== 'profile') U.tab = 'single';
  save();
}
function removeItems(ids) {
  U.list = U.list.filter(x => !ids.includes(x.id)); ids.forEach(id => U.sel.delete(id));
  if (!cur()) U.curId = U.list.at(-1)?.id || null;
  U.edit = false; save(); render(true);
}
async function runAgent(it, spec, engine, log = () => {}) {
  const tpl = U.prefs.tpl, T = RE.target(spec);
  if (!T.kws.length) throw new Error('No skills found in that job description — paste the full description or choose a role.');
  log({ t: 'Read resume', d: `${it.src.name} — ${stats(it.src)}` });
  log({ t: 'Analysed the target', d: `${T.title}${T.company ? ` at ${T.company}` : ''} — key skills: ${T.kws.filter(k => !k.soft).slice(0, 6).map(k => k.name).join(', ')}` });
  await tick();
  const res = RE.tailor(it.src, T, {});
  log({ t: 'Matched keywords', d: `${res.report.matched.length} of ${T.kws.length} found — ${res.report.before}% ATS match before tailoring` });
  let notes = [], aiSugg = [];
  if (engine === 'ai') {
    log({ t: 'AI rewrite', d: `Asked ${RE.PROVIDERS[U.ai.provider].label} (${U.ai.model || RE.PROVIDERS[U.ai.provider].model})` });
    const g = await RE.agentRewrite(U.ai, res.r, it.src, T);
    res.r = g.r; notes = g.notes; aiSugg = g.sugg;
    res.report.changes.push(`AI rewrote the bullets of ${g.rewritten} entr${g.rewritten === 1 ? 'y' : 'ies'} and polished the headline and summary.`);
    log({ t: 'Fact-checked', d: notes.length ? `${notes.length} AI change${notes.length > 1 ? 's' : ''} rejected — your wording kept there` : 'Every AI change matches your resume' });
  } else log({ t: 'Rewrote', d: `${res.report.changes.length} improvements` });
  const maxP = +U.prefs.pages === 0 ? (RE.profile(res.r).fresher ? 1 : 2) : +U.prefs.pages;
  let pages = RE.layout(res.r, tpl).length;
  if (maxP > 0 && pages > maxP) {
    const f = RE.fit(res.r, tpl, maxP, {}, T); pages = f.pages;
    if (f.trimmed) res.report.changes.push(`Trimmed ${f.trimmed} lowest-relevance line${f.trimmed > 1 ? 's' : ''} to fit ${maxP} page${maxP > 1 ? 's' : ''}${f.pages > maxP ? ' — still long, try the Compact template' : ''}.`);
  }
  const m = RE.match(res.r, T);
  log({ t: 'Formatted', d: `${RE.TEMPLATES[tpl].label.split(' — ')[0]} template · ${pages} page${pages > 1 ? 's' : ''} · ${m.score}% ATS match` });
  it.out = { r: res.r, report: { ...res.report, after: m.score, matched: m.matched.map(k => k.name), missing: m.missing.map(k => k.name) }, title: T.title, spec, engine, notes, aiSugg,
    q0: RE.quality(it.src, pagesOf(it.src)), q1: RE.quality(res.r, pages), pages, at: Date.now() };
  it.err = '';
}
async function tailorOne() {
  const it = cur(); if (!it || U.busy) return;
  const spec = specOf(U.t);
  if (!spec.role && spec.jd.trim().length < 20) { U.msg = { warn: true, text: 'Choose a target role or paste a job description first.' }; render(true); return; }
  U.log = []; U.msg = null; U.busy = { label: 'Resume Agent working', done: 0, total: 1 }; render(true);
  try { await runAgent(it, spec, U.prefs.engine === 'ai' && aiReady() ? 'ai' : 'builtin', s => { U.log.push(s); refreshLog(); }); U.view = 'tailored'; }
  catch (e) { U.msg = { warn: true, text: esc(e.message) }; U.log.push({ s: 'err', t: 'Stopped', d: e.message }); }
  U.busy = null; U.edit = false; save(); render(true);
}
async function tailorBulk() {
  const items = U.list.filter(x => U.sel.has(x.id)); if (!items.length || U.busy) return;
  if (U.bt.mode === 'same') { const sp = specOf(U.bt); if (!sp.role && sp.jd.trim().length < 20) { U.msg = { warn: true, text: 'Choose a role or paste a job description for the batch — or switch to Auto.' }; render(true); return; } }
  const engine = U.prefs.engine === 'ai' && aiReady() ? 'ai' : 'builtin';
  U.msg = null; U.busy = { label: 'Tailoring', done: 0, total: items.length }; render(true);
  let fails = 0;
  for (const it of items) {
    try { await runAgent(it, U.bt.mode === 'auto' ? { role: RE.bestRole(it.src) } : specOf(U.bt), engine); }
    catch (e) { it.err = e.message; fails++; }
    U.busy.done++; updateBusy(); await tick();
  }
  U.busy = null; save();
  U.msg = { warn: !!fails, text: `Tailored ${items.length - fails} of ${items.length} resume${items.length > 1 ? 's' : ''}${fails ? ` — ${fails} failed (hover “Failed” to see why)` : ''}. Press <b>Download ZIP</b> to get them all.` };
  render(true);
}
const fileOf = (it, useOut, fmt) => { const m = useOut && it.out ? it.out.r : it.src, o = renderOpt(it, useOut); return fmt === 'pdf' ? RE.pdfBlob(m, U.prefs.tpl, o).blob : RE.docxBlob(m, U.prefs.tpl, o); };
function downloadOne(it, fmt, useOut) { if (it) saveBlob(fileOf(it, useOut, fmt), `${baseName(it, useOut)}.${fmt}`); }
function reportSheets(items) {
  const st = s => v => ({ v, s }), T1 = st(1), SUB = st(2), H = st(3), C = st(4), CC = st(10);
  const sh = { name: 'Report', cols: [5, 24, 30, 28, 18, 11, 11, 11, 11, 8, 44, 80], freeze: 3, merges: ['A1:L1', 'A2:L2'], heights: { 0: 26 },
    rows: [[T1('Resume tailoring report')], [SUB(`${items.length} resumes · ${new Date().toLocaleString('en-IN')} · Career Atlas Resume studio (${RE.TEMPLATES[U.prefs.tpl].label.split(' — ')[0]} template)`)],
      ['#', 'Candidate', 'Original file', 'Tailored for', 'Company', 'ATS match before', 'ATS match after', 'Quality before', 'Quality after', 'Pages', 'Missing keywords', 'What the agent changed'].map(H)] };
  items.forEach((it, i) => {
    const o = it.out, ch = o.report.changes.map(c => '• ' + c).join('\n');
    sh.heights[sh.rows.length] = 15 * Math.max(2, o.report.changes.length + 1);
    sh.rows.push([CC(i + 1), C(o.r.name), C(it.src.file || ''), C(o.title), C(o.report.company || ''), CC(`${o.report.before}%`), CC(`${o.report.after}%`), CC(o.q0.score), CC(o.q1.score), CC(o.pages), C(o.report.missing.join(', ')), C(ch)]);
  });
  return [sh];
}
async function downloadZip() {
  const items = U.list.filter(x => U.sel.has(x.id) && x.out); if (!items.length || U.busy) return;
  if (!U.prefs.pdf && !U.prefs.docx) { U.msg = { warn: true, text: 'Tick PDF and/or Word to choose what goes into the ZIP.' }; render(true); return; }
  U.busy = { label: 'Packing ZIP', done: 0, total: items.length }; render(true);
  const files = [], used = new Set();
  for (const it of items) {
    let base = baseName(it, true); for (let i = 2; used.has(base); i++) base = `${baseName(it, true)}_${i}`; used.add(base);
    if (U.prefs.pdf) files.push({ name: `${base}.pdf`, data: new Uint8Array(await fileOf(it, true, 'pdf').arrayBuffer()) });
    if (U.prefs.docx) files.push({ name: `${base}.docx`, data: new Uint8Array(await fileOf(it, true, 'docx').arrayBuffer()) });
    U.busy.done++; updateBusy(); await tick();
  }
  files.push({ name: 'Tailoring_report.xlsx', data: new Uint8Array(await workbookBlob(reportSheets(items)).arrayBuffer()) });
  saveBlob(zipStore(files, 'application/zip'), `tailored-resumes-${new Date().toISOString().slice(0, 10)}.zip`);
  U.busy = null; U.msg = { text: `Downloaded ${items.length} tailored resume${items.length > 1 ? 's' : ''} (${files.length - 1} files) and an Excel report in one ZIP.` }; render(true);
}
function applyEdit() {
  const it = cur(), ta = card.querySelector('#rsEdit'); if (!it || !ta) return;
  if (U.edit === 'out' && it.out) {
    const m = RE.fromMarkup(ta.value, it.out.r); m.bold = it.out.r.bold;
    const sc = RE.match(m, RE.target(it.out.spec));
    it.out.r = m; it.out.pages = pagesOf(m); it.out.q1 = RE.quality(m, it.out.pages);
    Object.assign(it.out.report, { after: sc.score, matched: sc.matched.map(k => k.name), missing: sc.missing.map(k => k.name) });
  } else { it.src = RE.fromMarkup(ta.value, it.src); if (it.out) it.out.stale = true; }
  U.edit = false; save(); render(true);
}
async function addKeyword(k) {
  const it = cur(); if (!it?.out || U.busy) return;
  if (!confirm(`Add “${k}” to your skills?\n\nOnly add it if you have really used it — interviewers will ask about it.`)) return;
  it.src.added = [...new Set([...(it.src.added || []), k])];
  U.busy = { label: 'Updating', done: 0, total: 1 }; render(true);
  try { await runAgent(it, it.out.spec, it.out.engine === 'ai' && aiReady() ? 'ai' : 'builtin'); } catch (e) { U.msg = { warn: true, text: esc(e.message) }; }
  U.busy = null; save(); render(true);
}
function readAI() {
  const v = id => card.querySelector('#' + id)?.value;
  if (v('aiModel') != null) U.ai.model = v('aiModel').trim();
  if (v('aiKey') != null) U.ai.key = v('aiKey').trim();
  if (v('aiBase') != null) U.ai.base = v('aiBase').trim();
}
async function testAI() {
  readAI(); saveAI();
  const box = card.querySelector('#aiTest'); box.innerHTML = note('Testing…');
  try {
    const txt = await RE.callLLM(U.ai, 'You are a connectivity check. Reply with JSON only.', 'Reply exactly with {"ok": true, "model": "<your model name>"}');
    box.innerHTML = note(`✓ Connected — reply: <code>${esc(short(txt.trim(), 120))}</code>. AI-assisted mode is now available in the Tailor tabs.`);
  } catch (e) { box.innerHTML = note(esc(e.message), true); }
}

el.addEventListener('click', e => {
  if (e.target === el) { closeResume(); return; }
  const t = e.target.closest('[data-r]'); if (!t || t.disabled) return;
  const [act, ...rest] = t.dataset.r.split(':'), arg = rest.join(':');
  switch (act) {
    case 'close': closeResume(); return;
    case 'tab': U.tab = arg; U.edit = false; U.msg = null; render(); return;
    case 'upload': fileIn.value = ''; fileIn.click(); return;
    case 'sample': { const ex = U.list.find(x => x.src.file === 'Sample resume'); if (ex) { U.curId = ex.id; U.view = ex.out ? 'tailored' : 'original'; if (U.tab !== 'bulk' && U.tab !== 'profile') U.tab = 'single'; } else addModel(sampleResume()); U.msg = null; render(); return; }
    case 'blank': { const r = RE.fromMarkup(TEMPLATE_MD); r.file = 'ATS template'; addModel(r); U.edit = 'src'; U.msg = { text: 'Replace the &lt;placeholders&gt; with your details, press <b>Apply changes</b>, then tailor it.' }; render(); return; }
    case 'view': U.view = arg; U.edit = false; render(true); return;
    case 'edit': U.edit = arg; render(true); card.querySelector('#rsEdit')?.focus(); return;
    case 'cancel': U.edit = false; render(true); return;
    case 'apply': applyEdit(); return;
    case 'del': if (confirm('Remove this resume from the studio?')) removeItems([arg]); return;
    case 'bdel': if (confirm(`Remove ${U.sel.size} selected resume${U.sel.size > 1 ? 's' : ''}?`)) removeItems([...U.sel]); return;
    case 'tailor': tailorOne(); return;
    case 'btailor': tailorBulk(); return;
    case 'zip': downloadZip(); return;
    case 'dl': downloadOne(cur(), arg, U.view === 'tailored'); return;
    case 'dlx': { const [fmt, id] = arg.split(':'); downloadOne(U.list.find(x => x.id === id), fmt, true); return; }
    case 'print': { const it = cur(); if (it) window.open(URL.createObjectURL(fileOf(it, U.view === 'tailored', 'pdf')), '_blank'); return; }
    case 'open': U.curId = arg; U.tab = 'single'; U.view = 'tailored'; U.edit = false; U.msg = null; render(); return;
    case 'addkw': addKeyword(arg); return;
    case 'tpl': U.prefs.tpl = arg; savePrefs(); render(true); return;
    case 'tpldl': { const r = RE.fromMarkup(TEMPLATE_MD); saveBlob(arg === 'pdf' ? RE.pdfBlob(r, U.prefs.tpl, { bold: [] }).blob : RE.docxBlob(r, U.prefs.tpl, { bold: [] }), `ATS_Resume_Template.${arg}`); return; }
    case 'aisave': readAI(); saveAI(); if (aiReady()) U.prefs.engine = 'ai'; savePrefs(); U.msg = { text: aiReady() ? 'Saved. AI-assisted mode is selected in the Tailor tabs.' : 'Saved.' }; render(true); return;
    case 'aitest': testAI(); return;
    case 'pbuild': render(true); return;
    case 'map': { const keys = JSON.parse(arg); closeResume(); revealKeys(keys, true); return; }
    case 'ptt': { const p = profilePlan(); closeResume(); openBuilder({ skills: p.gaps, title: `${p.T.title} — JD skills` }); return; }
    case 'aiclear': U.ai.key = ''; saveAI(); U.prefs.engine = 'builtin'; savePrefs(); render(true); return;
  }
});
el.addEventListener('input', e => {
  const map = { rsTitleIn: ['t', 'title'], rsCompany: ['t', 'company'], rsJD: ['t', 'jd'], rbTitle: ['bt', 'title'], rbCompany: ['bt', 'company'], rbJD: ['bt', 'jd'] }[e.target.id];
  if (map) { U[map[0]][map[1]] = e.target.value; if (map[1] === 'jd') U[map[0]].jdAuto = false; }
});
el.addEventListener('change', e => {
  const tg = e.target, id = tg.id, v = tg.type === 'checkbox' ? tg.checked : tg.value;
  if (tg.dataset.sel) { if (tg.checked) U.sel.add(tg.dataset.sel); else U.sel.delete(tg.dataset.sel); render(true); return; }
  if (tg.name === 'rsEng') { U.prefs.engine = v; savePrefs(); return; }
  switch (id) {
    case 'rsPick': U.curId = v; U.edit = false; U.view = 'tailored'; U.msg = null; render(true); return;
    case 'rsRole': case 'rbRole': { const o = id === 'rsRole' ? U.t : U.bt; o.role = v; if (o.jobKey) { o.jobKey = ''; o.title = ''; o.company = ''; if (o.jdAuto) o.jd = ''; } render(true); return; }
    case 'rsJob': case 'rbJob': { const o = id === 'rsJob' ? U.t : U.bt, j = J.byKey.get(v); if (j) fillFromJob(o, j); else o.jobKey = ''; render(true); return; }
    case 'rbMode': U.bt.mode = v; render(true); return;
    case 'rbAll': U.sel = v ? new Set(U.list.map(x => x.id)) : new Set(); render(true); return;
    case 'rsTpl': U.prefs.tpl = v; savePrefs(); render(true); return;
    case 'rsPagesSel': U.prefs.pages = +v; savePrefs(); return;
    case 'rsBold': U.prefs.bold = v; savePrefs(); render(true); return;
    case 'rbPdf': U.prefs.pdf = v; savePrefs(); return;
    case 'rbDocx': U.prefs.docx = v; savePrefs(); return;
    case 'aiProv': readAI(); U.ai.provider = v; U.ai.model = ''; U.ai.base = ''; saveAI(); render(true); return;
  }
});
fileIn.addEventListener('change', () => addFiles(fileIn.files));
el.addEventListener('dragover', e => { if ([...e.dataTransfer.types].includes('Files')) { e.preventDefault(); card.classList.add('rs-dragging'); } });
el.addEventListener('dragleave', e => { if (!el.contains(e.relatedTarget)) card.classList.remove('rs-dragging'); });
el.addEventListener('drop', e => { e.preventDefault(); card.classList.remove('rs-dragging'); addFiles(e.dataTransfer.files); });
$('#btnResume').onclick = () => openResume();
})();
