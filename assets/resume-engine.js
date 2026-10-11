/* Resume engine — no libraries except the vendored pdf.js (used only to read uploaded PDFs).
   Reads PDF / DOCX / TXT resumes into a structured model, analyses a role or job description,
   tailors the resume (Resume Agent, optionally helped by an LLM with fact guardrails) and writes PDF + DOCX. */
(() => {
const LEX = window.RESUME_LEXICON;
const BASE = document.currentScript.src;
const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const clone = o => JSON.parse(JSON.stringify(o));
const clean = s => String(s || '').replace(/[\u00a0\u2002-\u200b]/g, ' ').replace(/\s+/g, ' ').trim();
const cap = s => (s ? s[0].toUpperCase() + s.slice(1) : s);
const listTxt = a => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a.at(-1));
const nid = () => Math.random().toString(36).slice(2, 10);

/* ------------------------------------------------------------------ keyword matching */
const KW = [];
for (const [cat, group, entries] of LEX.CATEGORIES) for (const e of entries) {
  const cs = e[0] === '!', parts = (cs ? e.slice(1) : e).split('|');
  const alt = parts.map(p => reEsc(p).replace(/\s+/g, '[\\s-]+')).sort((a, b) => b.length - a.length).join('|');
  const tail = cs ? "(?![-&.'’]?[A-Za-z0-9+#])" : '(?![A-Za-z0-9+#])';
  KW.push({ name: parts[0], cat, group, soft: cat === 'Soft skills', re: new RegExp(`(?<![A-Za-z0-9+#]|[A-Za-z]\\.)(?:${alt})${tail}`, cs ? 'g' : 'gi') });
}
const KW_BY = new Map(KW.map(k => [k.name, k]));
function findKW(text) {
  const m = new Map();
  if (!text) return m;
  for (const k of KW) { const n = (text.match(k.re) || []).length; if (n) m.set(k.name, n); }
  return m;
}

/* ------------------------------------------------------------------ patterns */
const MON = 'jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec';
const D1 = `(?:(?:${MON})[a-z]*\\.?,?\\s*'?\\d{2,4}|\\d{1,2}[/.-](?:19|20)?\\d{2}|(?:19|20)\\d{2})`;
const DATE_RANGE = new RegExp(`${D1}\\s*(?:-|–|—|to|till|until)\\s*(?:${D1}|present|current|now|ongoing|till date|today)`, 'i');
const DATE_ONE = new RegExp(`(?:expected\\s+|graduating\\s+|since\\s+)?(?:(?:${MON})[a-z]*\\.?,?\\s*'?\\d{2,4}|(?:19|20)\\d{2})`, 'i');
const BULLET = /^\s*(?:[•●▪◦‣∙·*▸►➢➤✓✔■□◆◇○\uf0b7\uf0a7\uf076\uf0d8\uf0fc\uf06e\uf0a8]\s*|[-–—]\s+|\d{1,2}[.)]\s+)/;
const EMAIL = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/;
const URLISH = /^(?:https?:\/\/)?(?:www\.)?(?:[\w-]+\.)+(?:com|in|io|dev|me|app|org|net|co|ai|tech|site|xyz|page)(?:\/\S*)?$/i;
const ROLE_WORDS = /\b(intern|internship|engineer|developer|analyst|associate|trainee|apprentice|manager|consultant|designer|lead|scientist|executive|specialist|tester|administrator|architect|officer|assistant|coordinator|volunteer|member|head|president|secretary|founder|co-founder|representative|ambassador|programmer|researcher|fellow|tutor|teacher|writer|strategist|captain)\b/i;
const DEGREE = /\b(b\.?\s?tech|b\.?\s?e\b\.?|bachelor|master|m\.?\s?tech|m\.?\s?e\b\.?|mca|bca|b\.?\s?sc|m\.?\s?sc|mba|bba|b\.?\s?com|m\.?\s?com|diploma|ph\.?\s?d|12th|10th|xii|hsc|ssc|class\s+(?:xii|x|12|10)|intermediate|senior secondary|higher secondary|puc|cbse|icse|b\.?\s?arch|b\.?\s?pharm|b\.?\s?des|m\.?\s?des|pgdm)\b/i;
const SCHOOL = /\b(university|college|institute|school|academy|vidyalaya|vidyapeeth|polytechnic|iit|nit|iiit|bits|campus)\b/i;
const SCORE = /\b(cgpa|gpa|cpi|sgpa|percentage|marks)\b|\b\d{1,2}(?:\.\d+)?\s*%|\b\d(?:\.\d{1,2})?\s*\/\s*10\b/i;
const CITIES = 'Bengaluru|Bangalore|Hyderabad|Secunderabad|Chennai|Pune|Mumbai|Navi Mumbai|Thane|Delhi|New Delhi|Noida|Greater Noida|Gurugram|Gurgaon|Faridabad|Ghaziabad|Kolkata|Ahmedabad|Gandhinagar|Jaipur|Kochi|Cochin|Coimbatore|Trivandrum|Thiruvananthapuram|Indore|Bhopal|Chandigarh|Mohali|Lucknow|Kanpur|Nagpur|Vadodara|Surat|Rajkot|Mysuru|Mysore|Mangaluru|Mangalore|Hubli|Belgaum|Visakhapatnam|Vizag|Vijayawada|Guntur|Tirupati|Bhubaneswar|Patna|Ranchi|Guwahati|Dehradun|Nashik|Aurangabad|Madurai|Tiruchirappalli|Trichy|Salem|Warangal|Vellore|Manipal|Goa|Panaji|Jammu|Srinagar|Amritsar|Ludhiana|Varanasi|Prayagraj|Allahabad|Agra|Meerut|Raipur|Jodhpur|Udaipur|Kota|Remote|Hybrid|On-site|Onsite|India|USA|United States|Singapore|London|Dubai|Karnataka|Telangana|Tamil Nadu|Maharashtra|Kerala|Gujarat|Rajasthan|Uttar Pradesh|West Bengal|Haryana|Punjab|Andhra Pradesh|Odisha|Madhya Pradesh|Bihar|Assam|Jharkhand|Uttarakhand|Chhattisgarh|Himachal Pradesh|UP|MH|KA|TN|TS|AP';
const CITY_RE = new RegExp(`^(?:${CITIES})$`, 'i');
const isLoc = s => { const p = s.split(/\s*,\s*/).filter(Boolean); return p.length > 0 && p.length <= 3 && p.every(x => CITY_RE.test(x)); };
const isDate = s => DATE_RANGE.test(s) || new RegExp(`^${DATE_ONE.source}$`, 'i').test(s.trim());
const normDate = s => clean(s).replace(/\s*(?:-|–|—|to|till|until)\s*/i, ' – ').replace(/\b(present|current|now|ongoing|till date|today)\b/i, 'Present')
  .replace(new RegExp(`\\b(${MON})[a-z]*\\.?`, 'gi'), m => cap(m.slice(0, 3).toLowerCase())).replace(/\s+,/g, ',');

const SECTIONS = [
  ['summary', /^(professional |career |executive )?(summary|profile|objective|about me|about|career objective|profile summary|personal statement|overview)$/i],
  ['skills', /^((technical|key|core|relevant|it|computer) )?(skills|skill set|skillset|competencies|technologies|tech stack|technical proficiency|areas of expertise|expertise|tools( (&|and) technologies)?)( (&|and) (tools|technologies|interests|certifications))?( summary)?$/i],
  ['experience', /^((work|professional|relevant|industry) )?(experience|employment( history)?|work history|internships?|internship experience|industrial training|experience (&|and) internships|internships? (&|and) training)$/i],
  ['projects', /^((academic|personal|key|major|technical|selected|notable) )?projects?( (&|and) (publications|research))?$/i],
  ['education', /^(education(al)?( background| qualifications?| details)?|academics?|academic (background|qualifications?|details|profile)|qualifications?|scholastic profile)$/i],
  ['certs', /^(certifications?|certificates|licenses?( (&|and) certifications)?|courses|certifications? (&|and) (courses|trainings?|achievements)|trainings?|online courses|courses (&|and) certifications)$/i],
  ['achievements', /^(achievements?|awards?( (&|and) (achievements|recognition))?|honou?rs( (&|and) awards)?|accomplishments|achievements? (&|and) awards?|recognition)$/i],
  ['extra', /^(positions? of responsibility|leadership( (experience|(&|and) activities))?|extra[- ]?curricular( activities)?|activities|volunteer(ing| experience| work)?|co-curricular( activities)?|clubs (&|and) societies)$/i],
  ['languages', /^languages( known)?$/i],
  ['interests', /^(interests|hobbies( (&|and) interests)?)$/i],
  ['publications', /^(publications|research( papers)?|papers)$/i],
  ['drop', /^(personal (details|information|profile)|declaration|references?|strengths|personal data)$/i],
];
const TITLES = { summary: 'Summary', skills: 'Skills', experience: 'Experience', projects: 'Projects', education: 'Education', certs: 'Certifications', achievements: 'Achievements',
  extra: 'Leadership & Activities', languages: 'Languages', interests: 'Interests', publications: 'Publications', drop: 'Other' };
const ENTRY_TYPES = new Set(['experience', 'projects', 'education', 'extra']);

function headingKey(line) {
  let t = line.trim().replace(/^[#•●▪■\-–—*\s]+/, '').replace(/[:\-–—_\s]+$/, '');
  if (/^(?:[A-Za-z&] ){2,}[A-Za-z&](?:\s{2,}(?:[A-Za-z&] ?)+)*$/.test(t)) t = t.split(/\s{2,}/).map(w => w.replace(/\s/g, '')).join(' ');
  t = t.replace(/\s+/g, ' ');
  if (!t || t.length > 48 || t.split(' ').length > 6) return null;
  for (const [key, re] of SECTIONS) if (re.test(t)) return key;
  return null;
}

/* ------------------------------------------------------------------ model */
const blank = () => ({ id: nid(), file: '', name: '', headline: '', contact: { email: '', phone: '', location: '', links: [] }, summary: '', skills: [], sections: [], added: [] });
const entry = o => ({ title: '', org: '', loc: '', date: '', score: '', link: '', bullets: [], ...o });

function parseHeader(lines, r) {
  const tokens = [];
  for (const l of lines) tokens.push(...l.split(/\s*[|•·◦▪♦⋄✉☎📞📧]\s*|\s{2,}|\t/).map(clean).filter(Boolean));
  for (let t of tokens) {
    t = t.replace(/^(e-?mail|phone|mobile|mob|tel|contact|linkedin|github|portfolio|address|location)\s*[:\-]\s*/i, '');
    const em = t.match(EMAIL);
    if (em) { r.contact.email ||= em[0]; t = clean(t.replace(em[0], '')); if (!t) continue; }
    const digits = t.replace(/\D/g, '');
    if (/^[+()\d\s.-]{10,20}$/.test(t) && digits.length >= 10 && digits.length <= 13) { r.contact.phone ||= t; continue; }
    if (/linkedin\.com|github\.com|gitlab\.com|behance\.net|dribbble\.com|leetcode\.com|kaggle\.com|medium\.com/i.test(t) || URLISH.test(t)) { r.contact.links.push(t.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '')); continue; }
    if (isLoc(t)) { r.contact.location ||= t; continue; }
    const words = t.split(' ');
    if (!r.name && words.length >= 1 && words.length <= 5 && /^[A-Za-z][A-Za-z.' -]+$/.test(t) && t.length <= 40) { r.name = t.replace(/\b([a-z])/g, (m, c) => c.toUpperCase()); continue; }
    if (r.name && !r.headline && t.length <= 90 && !/[.!?]$/.test(t)) { r.headline = t; continue; }
    if (t.length > 90) r.summary = clean(r.summary + ' ' + t);
  }
  if (r.name && r.name === r.name.toUpperCase()) r.name = r.name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

function parseEntryHead(lines, type) {
  let text = lines.join(' | ');
  const e = entry();
  const dm = text.match(DATE_RANGE) || text.match(DATE_ONE);
  if (dm) { e.date = normDate(dm[0]); text = text.replace(dm[0], ' | '); }
  const trimPart = p => {
    p = clean(p).replace(/^[,\s]+|[,\s]+$/g, '');
    if (p.startsWith('(') && !p.includes(')')) p = p.slice(1);
    if (p.endsWith(')') && !p.includes('(')) p = p.slice(0, -1);
    return p.trim();
  };
  let parts = text.split(/\s*(?:\||\t|\s{2,}|\s[–—]\s|\s-\s|\s@\s|\bat\b(?=\s+[A-Z]))\s*/).map(trimPart).filter(p => p && !/^(from|to|-|–|—|,)$/i.test(p));
  if (type === 'education') parts = parts.flatMap(p => (p.includes(',') && (SCHOOL.test(p) || SCORE.test(p)) ? p.split(/\s*,\s*/).map(trimPart).filter(Boolean) : [p]));
  parts = parts.flatMap(p => { const m = p.match(/^(.*?),\s*([^,]+(?:,\s*[^,]+)?)$/); return m && isLoc(m[2]) && m[1].length > 2 ? [m[1], m[2]] : [p]; });
  const take = f => { const i = parts.findIndex(f); return i < 0 ? '' : parts.splice(i, 1)[0]; };
  e.loc = take(isLoc);
  e.link = take(p => URLISH.test(p) || /github\.com|gitlab\.com|vercel\.app|netlify\.app|herokuapp/i.test(p)).replace(/^https?:\/\/(www\.)?/i, '');
  if (type === 'education') {
    e.score = take(p => SCORE.test(p));
    e.title = take(p => DEGREE.test(p)); e.org = take(p => SCHOOL.test(p));
    if (!e.title) e.title = parts.shift() || ''; if (!e.org) e.org = parts.shift() || '';
  } else if (type === 'projects') {
    e.title = parts.shift() || '';
    e.org = take(p => /^(tech(nologies|nology| stack)?|tools|stack|built with|skills)\s*[:\-]/i.test(p) || findKW(p).size >= 1).replace(/^(tech(nologies|nology| stack)?|tools|stack|built with|skills)\s*[:\-]\s*/i, '');
  } else if (type === 'experience') {
    e.title = take(p => ROLE_WORDS.test(p)); e.org = parts.shift() || '';
    if (!e.title) { e.title = e.org; e.org = parts.shift() || ''; }
  } else { e.title = parts.shift() || ''; e.org = parts.shift() || ''; }
  if (parts.length) e.org = [e.org, ...parts].filter(Boolean).join(', ');
  return e;
}

function parseEntries(lines, type) {
  const out = []; let cur = null, heads = [], lastBullet = false;
  const startEntry = l => { heads = [l]; cur = { ...parseEntryHead(heads, type) }; out.push(cur); };
  for (const raw of lines) {
    const bm = raw.match(BULLET), line = clean(bm ? raw.slice(bm[0].length) : raw);
    if (!line) continue;
    const first = line.split(/\s/)[0].toLowerCase().replace(/[^a-z-]/g, '');
    const scoreOnly = SCORE.test(line) && line.replace(/\b(cgpa|gpa|cpi|sgpa|percentage|marks|score|aggregate|out of)\b|[\d.:/%\-–|,()\s]+/gi, '').length < 4;
    if (type === 'education' && cur && scoreOnly && !cur.score) { cur.score = line.replace(/^[•\-\s]+/, ''); lastBullet = false; continue; }
    if (bm || (cur && LEX.ACTION.has(first) && line.length > 25)) {
      if (!cur) { cur = entry(); out.push(cur); }
      cur.bullets.push(line); lastBullet = true; continue;
    }
    const prev = cur && cur.bullets.at(-1);
    if (lastBullet && prev && (/^[a-z0-9(&,%]/.test(line) || (!/[.!?]$/.test(prev) && !/\|/.test(line) && !DATE_RANGE.test(line) && !(type === 'education' && DEGREE.test(line)) && line.length > 45))) {
      cur.bullets[cur.bullets.length - 1] = prev + ' ' + line; continue;
    }
    lastBullet = false;
    const hasDate = DATE_RANGE.test(line) || DATE_ONE.test(line);
    if (cur && !cur.bullets.length && heads.length < 3 && !(hasDate && cur.date) && !(type === 'education' && DEGREE.test(line) && DEGREE.test(cur.title))) {
      heads.push(line);
      const h = parseEntryHead(heads, type);
      Object.assign(cur, h, { bullets: cur.bullets, score: cur.score || h.score });
      continue;
    }
    startEntry(line);
  }
  return out;
}

function parseList(lines) {
  const out = [];
  for (const raw of lines) {
    const bm = raw.match(BULLET), line = clean(bm ? raw.slice(bm[0].length) : raw);
    if (!line) continue;
    if (!bm && out.length && /^[a-z0-9(&,]/.test(line)) out[out.length - 1] += ' ' + line; else out.push(line);
  }
  return out;
}
function parseSkills(lines) {
  const groups = [];
  for (const raw of lines) {
    const line = clean(raw.replace(BULLET, ''));
    if (!line) continue;
    const m = line.match(/^([A-Za-z&/,.\- ]{2,40}?)\s*[:–—-]\s+(.+)$/);
    const items = (m ? m[2] : line).split(/\s*[,;|•·]\s*|\s{2,}/).map(clean).filter(x => x && x.length < 60);
    if (m) groups.push({ group: clean(m[1]), items });
    else if (groups.length && !groups.at(-1).group) groups.at(-1).items.push(...items);
    else groups.push({ group: '', items });
  }
  return groups.map(g => ({ group: g.group || 'Skills', items: [...new Set(g.items)] })).filter(g => g.items.length);
}

function parseLines(rawLines) {
  const lines = rawLines.map(l => String(l).replace(/[\u00a0\u2002-\u200b]/g, ' ').replace(/\s+$/, '')).filter(l => l.trim());
  const r = blank(), header = [], blocks = [];
  for (const l of lines) {
    const k = headingKey(l);
    if (k && (blocks.length || header.length)) { blocks.push({ type: k, title: clean(l.replace(/[:\-–—_\s]+$/, '')), lines: [] }); continue; }
    (blocks.length ? blocks.at(-1).lines : header).push(l);
  }
  parseHeader(header.slice(0, 8), r);
  if (header.length > 8) r.summary = clean(r.summary + ' ' + header.slice(8).join(' '));
  for (const b of blocks) {
    const title = b.title === b.title.toUpperCase() ? b.title.toLowerCase().replace(/(^|\s|&)\w/g, c => c.toUpperCase()) : b.title;
    if (b.type === 'summary') r.summary = clean(r.summary + ' ' + b.lines.map(l => l.replace(BULLET, '')).join(' '));
    else if (b.type === 'skills') r.skills.push(...parseSkills(b.lines));
    else if (ENTRY_TYPES.has(b.type)) r.sections.push({ type: b.type, title, entries: parseEntries(b.lines, b.type) });
    else r.sections.push({ type: b.type, title, items: parseList(b.lines) });
  }
  return r;
}

/* ------------------------------------------------------------------ editable plain-text format (round trip) */
function toMarkup(r) {
  const c = r.contact, out = [`# ${r.name || 'Your Name'}`];
  if (r.headline) out.push(r.headline);
  out.push([c.email, c.phone, c.location, ...c.links].filter(Boolean).join(' | '), '');
  out.push('## Summary', r.summary || '', '');
  out.push('## Skills', ...r.skills.map(g => `${g.group}: ${g.items.join(', ')}`), '');
  for (const s of r.sections) {
    out.push(`## ${s.title}${headingKey(s.title) === s.type ? '' : ` [${s.type}]`}`);
    if (s.entries) for (const e of s.entries) {
      const pos = [e.title, e.org, e.loc]; while (pos.length > 1 && !pos.at(-1)) pos.pop();
      out.push(`### ${[...pos, e.link, e.date].filter((x, i) => i < pos.length || x).join(' | ')}`);
      if (e.score) out.push(`Score: ${e.score}`);
      out.push(...e.bullets.map(b => `- ${b}`));
    }
    else out.push(...s.items.map(i => `- ${i}`));
    out.push('');
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}
function fromMarkup(text, prev) {
  const r = blank(); if (prev) { r.id = prev.id; r.file = prev.file; r.added = prev.added || []; }
  const lines = text.replace(/\r/g, '').split('\n');
  let sec = null, cur = null, head = [];
  for (const raw of lines) {
    const l = raw.trim();
    if (!l) continue;
    if (/^#\s/.test(l)) { r.name = clean(l.slice(2)); continue; }
    if (/^##\s/.test(l)) {
      const m = l.slice(3).match(/^(.*?)\s*(?:\[(\w+)\])?$/), title = clean(m[1]), type = m[2] || headingKey(title) || 'interests';
      cur = null;
      if (type === 'summary' || type === 'skills') { sec = { type }; continue; }
      sec = ENTRY_TYPES.has(type) ? { type, title, entries: [] } : { type, title, items: [] };
      r.sections.push(sec); continue;
    }
    if (!sec) { head.push(l); continue; }
    if (sec.type === 'summary') { r.summary = clean(r.summary + ' ' + l); continue; }
    if (sec.type === 'skills') { r.skills.push(...parseSkills([l])); continue; }
    if (sec.entries) {
      if (/^###\s/.test(l)) {
        const parts = l.slice(4).split(/\s*\|\s*/), e = entry();
        const di = parts.findIndex((p, i) => i > 0 && isDate(p)); if (di > 0) e.date = normDate(parts.splice(di, 1)[0]);
        const li = parts.findIndex((p, i) => i > 0 && (URLISH.test(p) || /github\.com|vercel\.app|netlify\.app/i.test(p))); if (li > 0) e.link = parts.splice(li, 1)[0];
        [e.title = '', e.org = '', e.loc = ''] = parts.map(clean);
        cur = e; sec.entries.push(e); continue;
      }
      if (/^score\s*:/i.test(l) && cur) { cur.score = clean(l.replace(/^score\s*:/i, '')); continue; }
      if (/^link\s*:/i.test(l) && cur) { cur.link = clean(l.replace(/^link\s*:/i, '')); continue; }
      if (!cur) { cur = entry(); sec.entries.push(cur); }
      cur.bullets.push(clean(l.replace(/^[-•*]\s*/, ''))); continue;
    }
    sec.items.push(clean(l.replace(/^[-•*]\s*/, '')));
  }
  if (head.length) { const t = blank(); parseHeader(head, t); r.headline = head.length > 1 && !EMAIL.test(head[0]) && !/\|/.test(head[0]) ? head[0] : t.headline; r.contact = t.contact; }
  return r;
}

/* ------------------------------------------------------------------ reading files */
let pdfjsP = null;
const pdfjs = () => (pdfjsP ||= import(new URL('vendor/pdfjs/pdf.min.mjs', BASE).href).then(m => { m.GlobalWorkerOptions.workerSrc = new URL('vendor/pdfjs/pdf.worker.min.mjs', BASE).href; return m; }));
async function pdfLines(buf) {
  const lib = await pdfjs();
  const doc = await lib.getDocument({ data: new Uint8Array(buf), isEvalSupported: false }).promise, out = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const tc = await (await doc.getPage(p)).getTextContent(), rows = [];
    for (const it of tc.items) {
      if (typeof it.str !== 'string' || !it.str) continue;
      const x = it.transform[4], y = it.transform[5], h = Math.hypot(it.transform[2], it.transform[3]) || 10;
      let row = rows.find(r => Math.abs(r.y - y) < Math.max(2, Math.min(r.h, h) * 0.45));
      if (!row) rows.push(row = { y, h, items: [] });
      row.items.push({ x, w: it.width, s: it.str });
    }
    rows.sort((a, b) => b.y - a.y);
    for (const r of rows) {
      r.items.sort((a, b) => a.x - b.x);
      let s = '', end = null;
      for (const it of r.items) {
        if (end != null) { const gap = it.x - end; if (gap > r.h * 1.8) s += '  |  '; else if (gap > r.h * 0.12 && !/\s$/.test(s) && !/^\s/.test(it.s)) s += ' '; }
        s += it.s; end = it.x + it.w;
      }
      if (s.trim()) out.push(s.replace(/[ \t]+/g, ' ').replace(/^\s*\|\s*|\s*\|\s*$/g, '').trim());
    }
  }
  return out;
}
async function unzip(buf) {
  const u8 = new Uint8Array(buf), dv = new DataView(buf);
  let eocd = -1;
  for (let i = u8.length - 22; i >= Math.max(0, u8.length - 65600); i--) if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
  if (eocd < 0) throw new Error('This file is not a valid .docx document.');
  const files = new Map(); let off = dv.getUint32(eocd + 16, true);
  for (let i = 0, n = dv.getUint16(eocd + 10, true); i < n; i++) {
    const nl = dv.getUint16(off + 28, true), el = dv.getUint16(off + 30, true), cl = dv.getUint16(off + 32, true);
    files.set(new TextDecoder().decode(u8.subarray(off + 46, off + 46 + nl)), { method: dv.getUint16(off + 10, true), size: dv.getUint32(off + 20, true), lho: dv.getUint32(off + 42, true) });
    off += 46 + nl + el + cl;
  }
  return {
    names: [...files.keys()],
    async read(name) {
      const f = files.get(name); if (!f) return null;
      const start = f.lho + 30 + dv.getUint16(f.lho + 26, true) + dv.getUint16(f.lho + 28, true), data = u8.subarray(start, start + f.size);
      if (f.method === 0) return new TextDecoder().decode(data);
      return new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
    },
  };
}
function wordLines(xml) {
  const doc = new DOMParser().parseFromString(xml, 'application/xml'), out = [];
  const para = (p, sink) => {
    let s = '';
    const walk = node => {
      for (const ch of node.childNodes) {
        if (ch.nodeType !== 1) continue;
        const ln = ch.localName;
        if (ln === 'Fallback' || ln === 'instrText' || ln === 'delText' || ln === 'pPr' || ln === 'rPr') continue;
        if (ln === 'p') { if (s.trim()) sink.push(s); s = ''; para(ch, sink); continue; }
        if (ln === 't') s += ch.textContent; else if (ln === 'tab') s += '\t'; else if (ln === 'br' || ln === 'cr') s += '\n'; else walk(ch);
      }
    };
    walk(p);
    const pPr = [...p.children].find(c => c.localName === 'pPr');
    const pStyle = pPr && [...pPr.children].find(c => c.localName === 'pStyle');
    const bullet = pPr && ([...pPr.children].some(c => c.localName === 'numPr') || /list/i.test(pStyle?.getAttribute('w:val') || ''));
    s.split('\n').forEach((l, i) => { const t = l.replace(/^\t+/, '').replace(/\t+/g, '  |  ').trim(); if (t) sink.push((bullet && i === 0 ? '• ' : '') + t); });
  };
  const block = (node, sink) => {
    for (const el of node.children) {
      if (el.localName === 'p') para(el, sink);
      else if (el.localName === 'tbl') {
        for (const tr of [...el.children].filter(c => c.localName === 'tr')) {
          const cells = [...tr.children].filter(c => c.localName === 'tc').map(tc => { const a = []; block(tc, a); return a; });
          if (cells.length > 1 && cells.every(c => c.length <= 1)) { const t = cells.map(c => c[0] || '').filter(Boolean).join('  |  '); if (t) sink.push(t); }
          else cells.forEach(c => sink.push(...c));
        }
      } else if (el.localName !== 'sectPr') block(el, sink);
    }
  };
  block(doc.documentElement, out);
  return out;
}
async function docxLines(buf) {
  const z = await unzip(buf), main = await z.read('word/document.xml');
  if (!main) throw new Error('This .docx has no document body.');
  const lines = [];
  for (const h of z.names.filter(n => /^word\/header\d*\.xml$/.test(n)).sort()) lines.push(...wordLines(await z.read(h)));
  lines.push(...wordLines(main));
  return lines.filter((l, i) => l !== lines[i - 1]);
}
async function readFile(file) {
  const ext = (file.name.split('.').pop() || '').toLowerCase(), buf = await file.arrayBuffer();
  let lines;
  if (ext === 'pdf' || file.type === 'application/pdf') lines = await pdfLines(buf);
  else if (ext === 'docx') lines = await docxLines(buf);
  else if (['txt', 'md', 'text'].includes(ext)) lines = new TextDecoder().decode(buf).split(/\r?\n/);
  else if (ext === 'doc') throw new Error('Old Word .doc format — open it in Word, choose “Save as” .docx or PDF and upload that.');
  else throw new Error(`.${ext} files are not supported — upload PDF, DOCX or TXT.`);
  if (lines.join('').replace(/\s/g, '').length < 60) throw new Error('No readable text — this looks like a scanned image. Export the resume as a text-based PDF or DOCX.');
  const r = parseLines(lines);
  r.file = file.name;
  if (!r.name) r.name = file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').replace(/\b(resume|cv|final|updated|new|\d+)\b/gi, '').trim() || 'Unnamed candidate';
  return r;
}

/* ------------------------------------------------------------------ analysis */
function analyseJD(text) {
  const w = new Map(); let mode = 1, title = '', years = null;
  for (const raw of String(text).split(/\r?\n/)) {
    const line = raw.trim(); if (!line) continue;
    const short = line.length < 70;
    if (short && /\b(preferred|nice to have|good to have|bonus|desirable|optional|plus)\b/i.test(line)) mode = 0.6;
    else if (short && /\b(required|requirements|must have|mandatory|minimum qualifications|basic qualifications|what you need|you have|you bring|skills|qualifications|eligibility)\b/i.test(line)) mode = 1.4;
    else if (short && /\b(responsibilit|what you('|’)ll do|the role|about the job|job description|about us)\b/i.test(line)) mode = 1;
    if (!title) { const m = line.match(/^(?:job title|title|role|position|designation)\s*[:\-]\s*(.{3,70})$/i); if (m) title = m[1]; }
    const strong = /\b(must|required|mandatory|strong|expert|proficien)/i.test(line) ? 1.3 : 1;
    for (const [k, c] of findKW(line)) w.set(k, (w.get(k) || 0) + Math.min(c, 3) * mode * strong * (KW_BY.get(k).soft ? 0.45 : 1));
    const y = line.match(/(\d{1,2})\s*(?:\+|-\s*\d{1,2}|to\s*\d{1,2})?\s*(?:years?|yrs?)\b/i);
    if (y && years == null && /experience/i.test(line)) years = +y[1];
  }
  if (!title) {
    const first = String(text).split(/\r?\n/).map(s => s.trim()).find(Boolean) || '';
    if (first.length <= 70 && !/[.:]$/.test(first) && !/^(about|job description|we are|company)/i.test(first)) title = first;
  }
  return { weights: w, title: clean(title).replace(/\s*[-–|].*$/, ''), years };
}
function roleText(slug) {
  const rm = S.ROLE[slug], info = (window.CURRICULUM || {})[slug] || {};
  const skills = typeof linkedSkills === 'function' ? linkedSkills(rm).map(s => S.SKILL[s].name) : [];
  return `${rm.name}\nRequirements:\n${info.tools || ''}\n${skills.join(', ')}\nResponsibilities:\n${info.does || ''}`;
}
const roleTitle = slug => S.ROLE[slug].name.replace(/\s*\(.*?\)\s*/g, ' ').trim();
function target({ role = '', jd = '', company = '', title = '' } = {}) {
  const w = new Map(), add = (m, f) => m.forEach((v, k) => w.set(k, (w.get(k) || 0) + v * f));
  let years = null, ttl = clean(title);
  if (jd && jd.trim().length > 15) { const a = analyseJD(jd); add(a.weights, 1); years = a.years; ttl ||= a.title; }
  if (role && S.ROLE[role]) { add(analyseJD(roleText(role)).weights, w.size ? 0.5 : 1); ttl ||= roleTitle(role); }
  const kws = [...w].sort((a, b) => b[1] - a[1]).slice(0, 32).map(([name, wt]) => ({ name, w: +wt.toFixed(2), group: KW_BY.get(name).group, soft: KW_BY.get(name).soft }));
  ttl = ttl.replace(/\s*[([](?:freshers?|entry[- ]level|graduates?|new grad|campus|0\s*[-–]\s*\d+\s*(?:years?|yrs?))[)\]]/gi, '').trim();
  return { title: ttl || 'Software Engineer', company: clean(company), role, jd, kws, years, certs: LEX.CERTS[role] || [] };
}

const bodyText = r => [r.headline, r.summary, ...r.skills.map(g => g.items.join(', ')), ...(r.added || []),
  ...r.sections.flatMap(s => s.entries ? s.entries.flatMap(e => [e.title, e.org, e.score, ...e.bullets]) : s.items)].filter(Boolean).join('\n');
const haveKW = r => findKW(bodyText(r));
function match(r, T) {
  const have = haveKW(r), total = T.kws.reduce((a, k) => a + k.w, 0) || 1;
  const matched = T.kws.filter(k => have.has(k.name)), missing = T.kws.filter(k => !have.has(k.name));
  return { score: Math.round(100 * matched.reduce((a, k) => a + k.w, 0) / total), matched, missing, have };
}
const allBullets = r => r.sections.filter(s => s.entries && s.type !== 'education').flatMap(s => s.entries.flatMap(e => e.bullets));
const startsWithAction = b => LEX.ACTION.has((b.split(/\s/)[0] || '').toLowerCase().replace(/[^a-z-]/g, ''));
const WEAK_ANY = /\b(responsible for|worked on|involved in|helped (with|in)|duties included|tasks included|part of a team)\b/i;
function quality(r, pages = 1) {
  const b = allBullets(r), n = b.length || 1, checks = [];
  const add = (pts, max, label, ok, tip) => checks.push({ pts: Math.round(pts), max, label, ok, tip });
  const act = b.filter(startsWithAction).length / n, num = b.filter(x => /\d/.test(x)).length / n, weak = b.filter(x => WEAK_ANY.test(x)).length;
  const fp = b.filter(x => /\b(I|my|me)\b/.test(x)).length + (/\b(I|my|me)\b/.test(r.summary) ? 1 : 0), long = b.filter(x => x.length > 230).length;
  const c = r.contact, skills = r.skills.reduce((a, g) => a + g.items.length, 0);
  const has = t => r.sections.some(s => s.type === t && (s.entries ? s.entries.length : s.items.length));
  add((c.email ? 4 : 0) + (c.phone ? 3 : 0) + (c.links.length ? 3 : 0), 10, 'Contact details', c.email && c.phone && c.links.length, 'Add email, phone and a LinkedIn or GitHub link.');
  const sl = r.summary.length; add(sl >= 150 && sl <= 650 ? 8 : sl ? 4 : 0, 8, 'Focused summary (2–3 sentences)', sl >= 150 && sl <= 650, sl ? 'Keep the summary to 2–3 sentences aimed at the role.' : 'Add a 2–3 sentence summary aimed at the role.');
  add(skills >= 8 ? 8 : skills * 1, 8, 'Skills section', skills >= 8, 'List at least 8 relevant tools and skills, grouped.');
  add(has('education') ? 7 : 0, 7, 'Education', has('education'), 'Add your degree, college, years and CGPA.');
  add(b.length >= 4 ? 7 : b.length * 1.75, 7, 'Experience / project bullets', b.length >= 4, 'Describe internships and projects with 2–4 bullets each.');
  add(14 * Math.min(1, act / 0.85), 14, `Bullets start with action verbs (${Math.round(act * 100)}%)`, act >= 0.85, 'Start every bullet with a past-tense verb: Built, Designed, Automated…');
  add(14 * Math.min(1, num / 0.5), 14, `Bullets with numbers (${Math.round(num * 100)}%)`, num >= 0.5, 'Quantify results: users, %, time saved, accuracy, rank.');
  add(Math.max(0, 10 - weak * 3), 10, 'No weak phrases', !weak, '“Responsible for”, “worked on” and “involved in” hide what you did.');
  add(fp ? Math.max(0, 6 - fp * 2) : 6, 6, 'No first-person words', !fp, 'Drop “I”, “my” and “me” — resumes are written without them.');
  add(Math.max(0, 6 - long * 2), 6, 'Concise bullets (≤ 2 lines)', !long, 'Split or trim bullets longer than two lines.');
  add(pages <= 1 ? 6 : pages === 2 ? 3 : 0, 6, `Length: ${pages} page${pages > 1 ? 's' : ''}`, pages <= 1, 'Freshers should fit on one page; experienced candidates on two.');
  const junk = r.sections.filter(s => s.type === 'drop').length; add(junk ? 0 : 4, 4, 'No unnecessary sections', !junk, 'Remove declaration, references and personal details (age, religion, marital status).');
  return { score: Math.min(100, checks.reduce((a, x) => a + x.pts, 0)), checks };
}

/* ------------------------------------------------------------------ tailoring (built-in Resume Agent) */
function polish(raw) {
  let t = clean(raw).replace(/[.;,\s]+$/, ''), stripped = '';
  const lead = t.match(/^(?:i\s+)?(?:was\s+|am\s+)?(responsible\s+for|worked\s+on|involved\s+in|(?:a\s+)?part\s+of\s+(?:a\s+|the\s+)?team\s+(?:that|which)|duties\s+included|tasks?\s+included)\s+/i);
  if (lead) { stripped = lead[1].toLowerCase(); t = t.slice(lead[0].length); }
  t = t.replace(/^I\s+(?=[a-z])/i, '').replace(/^(?:have|had)\s+(?=\w+ed\b)/i, '').replace(/^successfully\s+/i, '');
  const m = t.match(/^([A-Za-z]+)\b(\s+\S+)?/);
  if (m) {
    const w = m[1].toLowerCase(), next = (m[2] || '').trim();
    if (LEX.GERUND[w] && (stripped || /^(a|an|the|and|multiple|several|new|over|end-to-end|\d|[A-Z])/.test(next))) {
      t = LEX.GERUND[w] + t.slice(m[1].length);
      t = t.replace(/(\b(?:and|or)|,)\s+(\w+ing)\b/g, (s, j, g) => (LEX.GERUND[g.toLowerCase()] ? `${j} ${LEX.GERUND[g.toLowerCase()].toLowerCase()}` : s));
    }
    else if (stripped && /^(the|a|an|all|various|daily|data|testing|development|maintenance)\b/i.test(t)) t = (stripped.startsWith('responsible') ? 'Owned ' : 'Contributed to ') + t;
    else if (stripped && !startsWithAction(t)) t = (stripped.startsWith('responsible') ? 'Handled ' : 'Contributed to ') + t;
  }
  return cap(t);
}
const relScore = (text, wt) => { let s = 0; for (const [k] of findKW(text)) s += wt.get(k) || 0; return s; };
const stableSort = (a, f) => a.map((x, i) => [x, i]).sort((p, q) => f(q[0]) - f(p[0]) || p[1] - q[1]).map(p => p[0]);
const yearOf = d => { const y = String(d || '').match(/(?:19|20)\d{2}(?!.*(?:19|20)\d{2})/); return y ? +y[0] : null; };
function monthsOf(d) {
  const ps = String(d).split(/\s*–\s*/); if (ps.length < 2) return 0;
  const toM = s => { if (/present/i.test(s)) { const n = new Date(); return n.getFullYear() * 12 + n.getMonth(); } const y = s.match(/(19|20)\d{2}/); if (!y) return null; const mi = MON.split('|').findIndex(m => new RegExp(`^${m}`, 'i').test(s.trim())); return +y[0] * 12 + (mi < 0 ? 0 : Math.min(mi, 11)); };
  const a = toM(ps[0]), b = toM(ps[1]); return a != null && b != null && b >= a ? b - a + 1 : 0;
}
const DEG_SHORT = [[/bachelor of technology|b\.?\s?tech/i, 'B.Tech'], [/bachelor of engineering|\bb\.?\s?e\b/i, 'B.E.'], [/master of computer applications|\bmca\b/i, 'MCA'], [/bachelor of computer applications|\bbca\b/i, 'BCA'],
  [/master of technology|m\.?\s?tech/i, 'M.Tech'], [/master of business administration|\bmba\b/i, 'MBA'], [/bachelor of science|b\.?\s?sc/i, 'B.Sc.'], [/master of science|m\.?\s?sc/i, 'M.Sc.'], [/bachelor of commerce|b\.?\s?com/i, 'B.Com'], [/diploma/i, 'Diploma']];
function profile(r) {
  const exp = r.sections.filter(s => s.type === 'experience').flatMap(s => s.entries);
  const interns = exp.filter(e => /intern|trainee|apprentice/i.test(`${e.title} ${e.date}`)), jobs = exp.filter(e => !interns.includes(e));
  const months = jobs.reduce((a, e) => a + monthsOf(e.date), 0);
  const edu = r.sections.filter(s => s.type === 'education').flatMap(s => s.entries).find(e => /bachelor|master|b\.?\s?tech|b\.?\s?e\b|mca|bca|b\.?\s?sc|m\.?\s?tech|mba|diploma|degree/i.test(e.title)) || null;
  const deg = edu ? (DEG_SHORT.find(([re]) => re.test(edu.title))?.[1] || edu.title.split(/[,(|]/)[0].trim()) : '';
  const field = edu ? ((edu.title.match(/\b(?:in|of)\s+((?:computer|information|electronics|electrical|mechanical|civil|data|artificial|software|business|commerce|mathematics|statistics|physics|chemical|instrumentation)[\w &]*)/i) || [])[1] || '').replace(/\s+and\s+engineering$/i, ' Engineering').trim() : '';
  const grad = edu ? yearOf(edu.date) : null;
  return { interns, jobs, months, fresher: months < 12, deg, field, grad, projects: r.sections.filter(s => s.type === 'projects').flatMap(s => s.entries) };
}
function makeSummary(r, T, top) {
  const P = profile(r), now = new Date().getFullYear(), skills = top.slice(0, 4);
  const degTxt = P.deg ? `${P.deg}${P.field ? ` ${P.field}` : ''}` : '';
  let s1;
  if (P.fresher) {
    const who = degTxt ? `${degTxt} ${P.grad && P.grad > now ? `student (graduating ${P.grad})` : 'graduate'}` : 'Early-career candidate';
    s1 = `${who} targeting ${T.title} roles${T.company ? ` at ${T.company}` : ''}${skills.length ? `, with hands-on experience in ${listTxt(skills)}` : ''}.`;
  } else {
    const yrs = Math.floor(P.months / 12);
    s1 = `${T.title} with ${yrs}+ year${yrs > 1 ? 's' : ''} of experience${P.jobs[0]?.org ? `, most recently at ${P.jobs[0].org}` : ''}${skills.length ? `, skilled in ${listTxt(skills)}` : ''}.`;
  }
  const bits = [];
  if (P.interns.length) bits.push(P.interns.length === 1 ? `completed an internship as ${P.interns[0].title}${P.interns[0].org ? ` at ${P.interns[0].org}` : ''}` : `completed ${P.interns.length} internships, most recently at ${P.interns[0].org || P.interns[0].title}`);
  if (P.projects.length) { const p = P.projects[0]; bits.push(`built ${P.projects.length > 1 ? `${P.projects.length} projects including ` : ''}${p.title}${p.org ? ` (${p.org.split(/,\s*/).slice(0, 3).join(', ')})` : ''}`); }
  const s2 = bits.length ? cap(bits.join(' and ')) + '.' : '';
  const have = haveKW(r);
  const concepts = T.kws.filter(k => ['CS fundamentals', 'Practices'].includes(KW_BY.get(k.name).cat) && have.has(k.name)).map(k => k.name).slice(0, 3);
  const certs = r.sections.filter(s => s.type === 'certs').flatMap(s => s.items).slice(0, 1).map(c => c.replace(/\s*\(.*?\)\s*$/, ''));
  const s3 = concepts.length ? `Strong foundation in ${listTxt(concepts)}${certs.length ? `; certified: ${certs[0]}` : ''}.` : certs.length ? `Certified: ${certs[0]}.` : '';
  return [s1, s2, s3].filter(Boolean).join(' ');
}
const ORDER_FRESHER = ['education', 'experience', 'projects', 'certs', 'achievements', 'extra', 'publications', 'languages', 'interests'];
const ORDER_EXP = ['experience', 'projects', 'education', 'certs', 'achievements', 'publications', 'extra', 'languages', 'interests'];

function tailor(src, T, opt = {}) {
  const r = clone(src), changes = [], sugg = [];
  const before = match(src, T), wt = new Map(T.kws.map(k => [k.name, k.w]));
  const drop = r.sections.filter(s => s.type === 'drop' || (s.type === 'interests' && opt.dropInterests !== false && T.kws.length));
  if (drop.length) { r.sections = r.sections.filter(s => !drop.includes(s)); changes.push(`Removed ${listTxt(drop.map(s => `“${s.title}”`))} — recruiters skip these and they take space a strong bullet could use.`); }
  let fixed = 0, reordered = 0;
  for (const s of r.sections) if (s.entries) for (const e of s.entries) {
    e.bullets = e.bullets.map(b => { const nb = polish(b); if (nb !== cap(clean(b).replace(/[.;,\s]+$/, ''))) fixed++; return nb; }).filter(Boolean);
    if (s.type !== 'education') { const sorted = stableSort(e.bullets, b => relScore(b, wt) + (/\d/.test(b) ? 0.6 : 0)); if (sorted.join() !== e.bullets.join()) reordered++; e.bullets = sorted; }
  }
  if (fixed) changes.push(`Rewrote ${fixed} bullet${fixed > 1 ? 's' : ''} to open with a strong action verb (e.g. “Responsible for developing…” → “Developed…”).`);
  if (reordered) changes.push(`Moved the bullets that prove the role’s key skills to the top in ${reordered} entr${reordered > 1 ? 'ies' : 'y'}.`);
  for (const s of r.sections.filter(x => x.type === 'projects')) {
    const sorted = stableSort(s.entries, e => relScore([e.title, e.org, ...e.bullets].join(' '), wt));
    if (sorted[0] !== s.entries[0]) changes.push(`Put “${sorted[0].title}” first in ${s.title} — it matches the role best.`);
    s.entries = sorted;
  }
  // skills: regroup by category, surface skills already proven in bullets, most relevant first
  const listed = r.skills.flatMap(g => g.items).concat(r.added || []);
  const listedKW = findKW(listed.join(', '));
  const surfaced = [...haveKW(r).keys()].filter(k => !listedKW.has(k) && !KW_BY.get(k).soft && wt.has(k));
  if (surfaced.length) changes.push(`Added ${listTxt(surfaced.map(k => `“${k}”`))} to Skills — already shown in your experience or projects, and the role asks for ${surfaced.length > 1 ? 'them' : 'it'}.`);
  const groups = new Map(), seen = new Set();
  const put = (g, item) => { const key = item.toLowerCase(); if (seen.has(key)) return; seen.add(key); if (!groups.has(g)) groups.set(g, []); groups.get(g).push(item); };
  for (const item of [...listed, ...surfaced]) {
    const ks = [...findKW(item).keys()], k = ks.length === 1 && KW_BY.get(ks[0]);
    const g = k ? (k.soft ? 'Soft skills' : k.group) : (r.skills.find(x => x.items.includes(item))?.group || 'Other');
    put(/^(skills|technical skills|other)$/i.test(g) ? 'Other' : g, k && item.length <= k.name.length + 2 ? k.name : item);
  }
  const gScore = items => items.reduce((a, i) => a + relScore(i, wt), 0);
  r.skills = stableSort([...groups].map(([group, items]) => ({ group, items: stableSort(items, i => relScore(i, wt)) })), g => (g.group === 'Soft skills' ? -2 : g.group === 'Other' ? -1 : gScore(g.items)));
  if (r.skills.map(g => g.group).join() !== src.skills.map(g => g.group).join()) changes.push('Regrouped Skills into ATS-friendly categories with the most relevant group and tools first.');
  // headline + summary
  const after0 = match(r, T), topHard = after0.matched.filter(k => !k.soft).map(k => k.name);
  const fallbackTop = [...haveKW(r).keys()].filter(k => !KW_BY.get(k).soft);
  const top = topHard.length ? topHard : fallbackTop;
  r.headline = [T.title, ...top.slice(0, 3)].join(' | ');
  changes.push(`Set the headline to the target title: “${r.headline}”.`);
  r.summary = makeSummary(r, T, top);
  changes.push(src.summary ? 'Rewrote the summary around the target role, your strongest matching skills and your best evidence.' : 'Added a 2–3 sentence summary aimed at the target role.');
  // section order
  const P = profile(r), order = P.fresher ? ORDER_FRESHER : ORDER_EXP;
  const rank = s => { const i = order.indexOf(s.type); return i < 0 ? 99 : i; };
  const ordered = r.sections.map((s, i) => [s, i]).sort((a, b) => rank(a[0]) - rank(b[0]) || a[1] - b[1]).map(x => x[0]);
  if (ordered.some((s, i) => s !== r.sections[i])) changes.push(P.fresher ? 'Ordered sections for a fresher: Education, Experience, Projects, then certifications and achievements.' : 'Ordered sections for an experienced candidate: Experience first, then Projects and Education.');
  r.sections = ordered;
  for (const s of r.sections) if (TITLES[s.type] && /^(work experience|internships?|academic projects|personal projects|educational? qualifications?|academic details|certificates|awards?)$/i.test(s.title)) s.title = TITLES[s.type];
  r.bold = opt.bold === false ? [] : after0.matched.filter(k => !k.soft).map(k => k.name);
  // suggestions
  const after = match(r, T);
  const missHard = after.missing.filter(k => !k.soft).slice(0, 10);
  if (missHard.length) sugg.push({ type: 'missing', text: `The role asks for ${listTxt(missHard.slice(0, 6).map(k => k.name))}. Add any you have genuinely used — to Skills and to a bullet that shows where.`, items: missHard.map(k => k.name) });
  const noNum = allBullets(r).filter(b => !/\d/.test(b)).slice(0, 4);
  if (noNum.length) sugg.push({ type: 'numbers', text: 'Add a real number to these bullets (users, %, time saved, accuracy, records, rank):', items: noNum });
  const certsHave = r.sections.filter(s => s.type === 'certs').flatMap(s => s.items).join(' ').toLowerCase();
  const certs = T.certs.filter(c => !certsHave.includes(c.toLowerCase().split(/[(–-]/)[0].trim().slice(0, 18)));
  if (certs.length) sugg.push({ type: 'certs', text: 'Certifications recruiters search for in this role:', items: certs });
  if (!r.contact.links.some(l => /linkedin/i.test(l))) sugg.push({ type: 'contact', text: 'Add your LinkedIn profile URL to the contact line.' });
  if (!r.contact.links.some(l => /github|gitlab|portfolio|behance|vercel|netlify/i.test(l)) && /developer|engineer|data|scien|design/i.test(T.title)) sugg.push({ type: 'contact', text: 'Add a GitHub or portfolio link so reviewers can see your code.' });
  if (T.years && P.months / 12 < T.years) sugg.push({ type: 'years', text: `The job description mentions ${T.years}+ years of experience; you show ${P.months ? Math.round(P.months / 12 * 10) / 10 + ' years' : 'internship-level experience'}. Apply anyway if most skills match, and lead with projects.` });
  sugg.push({ type: 'file', text: `Save and send it as ${(r.name || 'Name').replace(/\s+/g, '_')}_${T.title.replace(/[^A-Za-z0-9]+/g, '_').replace(/_+$/, '')}_Resume.pdf` });
  return { r, report: { title: T.title, company: T.company, before: before.score, after: after.score, matched: after.matched.map(k => k.name), missing: after.missing.map(k => k.name), changes, sugg } };
}

/* ------------------------------------------------------------------ PDF writer (Helvetica, WinAnsi) */
const W_R = '278 278 355 556 556 889 667 191 333 333 389 584 278 333 278 278 556 556 556 556 556 556 556 556 556 556 278 278 584 584 584 556 1015 667 667 722 722 667 611 778 722 278 500 667 556 833 722 778 667 778 722 667 611 722 667 944 667 667 611 278 278 278 469 556 333 556 556 500 556 556 278 556 556 222 222 500 222 833 556 556 556 556 333 500 278 556 500 722 500 500 500 334 260 334 584'.split(' ').map(Number);
const W_B = '278 333 474 556 556 889 722 238 333 333 389 584 278 333 278 278 556 556 556 556 556 556 556 556 556 556 333 333 584 584 584 611 975 722 722 722 722 667 611 778 722 278 556 722 611 833 722 778 667 778 722 667 611 722 667 944 667 667 611 333 278 333 584 556 333 556 611 556 611 556 333 611 611 278 278 556 278 889 611 611 611 611 389 556 333 611 556 778 556 556 500 389 280 389 584'.split(' ').map(Number);
const WIN = { '€': 128, '‚': 130, 'ƒ': 131, '„': 132, '…': 133, '†': 134, '‡': 135, 'ˆ': 136, '‰': 137, 'Š': 138, '‹': 139, 'Œ': 140, 'Ž': 142, '‘': 145, '’': 146, '“': 147, '”': 148, '•': 149, '–': 150, '—': 151, '˜': 152, '™': 153, 'š': 154, '›': 155, 'œ': 156, 'ž': 158, 'Ÿ': 159 };
const WIN_W = { 128: 556, 133: 1000, 145: 222, 146: 222, 147: 333, 148: 333, 149: 350, 150: 556, 151: 1000, 153: 1000 };
const SUBST = { '₹': 'Rs.', '→': '->', '←': '<-', '✓': '-', '✔': '-', '●': '•', '▪': '•', '◦': '•', '■': '•', '≥': '>=', '≤': '<=', '×': 'x', '\u2009': ' ', '\u200b': '', '\u2212': '-', '\u2011': '-', '\u2010': '-', '\u00ad': '' };
const pdfSafe = s => String(s ?? '').replace(/[^\x20-\x7e]/g, ch => (SUBST[ch] ?? ((ch.charCodeAt(0) >= 160 && ch.charCodeAt(0) <= 255) || WIN[ch] ? ch : ch.normalize('NFKD').replace(/[^\x20-\x7e]/g, '') || '?')));
const code = ch => { const c = ch.charCodeAt(0); return c < 128 ? c : WIN[ch] || (c <= 255 ? c : 63); };
const textW = (s, bold, size) => { let w = 0; for (const ch of s) { const c = code(ch); w += c >= 32 && c <= 126 ? (bold ? W_B : W_R)[c - 32] : (WIN_W[c] || 556); } return w * size / 1000; };
const pdfStr = s => { let o = ''; for (const ch of s) { const c = code(ch); o += c === 40 || c === 41 || c === 92 ? '\\' + ch : c > 126 || c < 32 ? '\\' + c.toString(8).padStart(3, '0') : ch; } return o; };

const TEMPLATES = {
  classic: { label: 'Classic ATS — one column, black & white (recommended)', size: 10, name: 21, margin: 40, center: true, accent: [0, 0, 0], head: [0.1, 0.1, 0.1], upper: true, lh: 1.3, gap: 7, docAccent: '000000' },
  modern: { label: 'Modern — blue headings, still ATS-safe', size: 10, name: 23, margin: 40, center: false, accent: [0.13, 0.33, 0.74], head: [0.13, 0.33, 0.74], upper: true, lh: 1.3, gap: 7, docAccent: '2154BD' },
  compact: { label: 'Compact — fits more on one page', size: 9.2, name: 18, margin: 30, center: true, accent: [0, 0, 0], head: [0.1, 0.1, 0.1], upper: true, lh: 1.24, gap: 5, docAccent: '000000' },
};
const GRAY = [0.28, 0.3, 0.35], INK = [0.08, 0.08, 0.1];

function boldRuns(text, bold, base = 'R') {
  const s = pdfSafe(text);
  if (!bold || !bold.length) return [{ s, f: base }];
  const kws = bold.map(n => KW_BY.get(n)).filter(Boolean), marks = [];
  for (const k of kws) { k.re.lastIndex = 0; let m; while ((m = k.re.exec(s))) marks.push([m.index, m.index + m[0].length]); }
  marks.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  const out = []; let pos = 0;
  for (const [a, b] of marks) { if (a < pos) continue; if (a > pos) out.push({ s: s.slice(pos, a), f: base }); out.push({ s: s.slice(a, b), f: 'B' }); pos = b; }
  if (pos < s.length) out.push({ s: s.slice(pos), f: base });
  return out;
}

function layout(r, tplKey = 'classic', opt = {}) {
  const T = TEMPLATES[tplKey] || TEMPLATES.classic, PW = 595.28, PH = 841.89, M = T.margin, CW = PW - 2 * M, fs = T.size, LH = fs * T.lh;
  const pages = []; let page, y;
  const newPage = () => { page = { ops: [], links: [] }; pages.push(page); y = PH - M; };
  newPage();
  const ensure = h => { if (y - h < M) newPage(); };
  const isB = f => f === 'B' || f === 'BI';
  const put = (x, s, f, size, color, link) => { if (!s) return; page.ops.push({ t: 'text', x, y, s, f, size, color }); if (link) page.links.push({ rect: [x, y - 2, x + textW(s, isB(f), size), y + size * 0.8], uri: link }); };
  function wrap(runs, size, maxW) {
    const lines = [[]]; let w = 0;
    for (const run of runs) for (const tok of run.s.split(/(\s+)/)) {
      if (!tok) continue;
      const tw = textW(tok, isB(run.f), size);
      if (/^\s+$/.test(tok)) { if (lines.at(-1).length) { lines.at(-1).push({ s: ' ', f: run.f, w: textW(' ', isB(run.f), size), link: run.link }); w += textW(' ', isB(run.f), size); } continue; }
      if (w + tw > maxW && lines.at(-1).length) { const l = lines.at(-1); while (l.length && l.at(-1).s === ' ') l.pop(); lines.push([]); w = 0; }
      if (tw > maxW) { let chunk = ''; for (const ch of tok) { if (textW(chunk + ch, isB(run.f), size) > maxW) { lines.at(-1).push({ s: chunk, f: run.f, w: textW(chunk, isB(run.f), size), link: run.link }); lines.push([]); chunk = ''; } chunk += ch; } lines.at(-1).push({ s: chunk, f: run.f, w: textW(chunk, isB(run.f), size), link: run.link }); w = textW(chunk, isB(run.f), size); continue; }
      lines.at(-1).push({ s: tok, f: run.f, w: tw, link: run.link }); w += tw;
    }
    return lines.filter(l => l.length).map(l => { while (l.length && l.at(-1).s === ' ') l.pop(); return l; });
  }
  const lineW = l => l.reduce((a, x) => a + x.w, 0);
  function drawLine(l, x, size, color) { for (const seg of l) { put(x, seg.s, seg.f, size, seg.color || color, seg.link); x += seg.w; } }
  function para(runs, { x = M, w = CW, size = fs, color = INK, lh = LH, align = 'left' } = {}) {
    for (const l of wrap(runs, size, w)) { ensure(lh); y -= size; const lw = lineW(l); drawLine(l, align === 'center' ? x + (w - lw) / 2 : x, size, color); y -= lh - size; }
  }
  function twoCol(leftRuns, right, size, rightF = 'R', color = INK) {
    const rs = pdfSafe(right || ''), rw = rs ? textW(rs, isB(rightF), size) : 0;
    const lines = wrap(leftRuns, size, CW - (rw ? rw + 12 : 0));
    lines.forEach((l, i) => { ensure(LH); y -= size; drawLine(l, M, size, color); if (i === 0 && rs) put(M + CW - rw, rs, rightF, size, color); y -= LH - size; });
    if (!lines.length && rs) { ensure(LH); y -= size; put(M + CW - rw, rs, rightF, size, color); y -= LH - size; }
  }
  // header
  const al = T.center ? 'center' : 'left';
  y -= 2; para([{ s: pdfSafe(r.name || 'Your Name'), f: 'B' }], { size: T.name, lh: T.name * 1.12, align: al });
  if (r.headline) { y -= 1; para([{ s: pdfSafe(r.headline), f: 'R' }], { size: fs + 1.4, lh: (fs + 1.4) * 1.3, align: al, color: tplKey === 'modern' ? T.accent : GRAY }); }
  const c = r.contact, cr = [];
  const items = [c.phone && [c.phone], c.email && [c.email, 'mailto:' + c.email], c.location && [c.location], ...c.links.map(l => [l, /^https?:/i.test(l) ? l : 'https://' + l])].filter(Boolean);
  items.forEach(([t, u], i) => { if (i) cr.push({ s: '  |  ', f: 'R', color: [0.6, 0.62, 0.66] }); cr.push({ s: pdfSafe(t), f: 'R', link: u }); });
  if (cr.length) { y -= 1; para(cr, { size: fs - 0.4, align: al, color: GRAY }); }
  if (tplKey === 'modern') { y -= 3; page.ops.push({ t: 'line', x1: M, x2: M + CW, y, color: T.accent, w: 1.4 }); }
  const heading = title => {
    ensure(fs * 1.5 + LH * 3); y -= T.gap + 2;
    const t = pdfSafe(T.upper ? title.toUpperCase() : title), hs = fs + 1.3;
    y -= hs; put(M, t, 'B', hs, T.head);
    y -= 3.2; page.ops.push({ t: 'line', x1: M, x2: M + CW, y, color: tplKey === 'modern' ? T.accent : [0.15, 0.15, 0.15], w: 0.7 }); y -= 4;
  };
  const bullet = (text, indent = 0) => {
    const x0 = M + indent, lines = wrap(boldRuns(text, opt.bold ?? r.bold), fs, CW - indent - 11);
    lines.forEach((l, i) => { ensure(LH); y -= fs; if (i === 0) put(x0 + 1.5, '•', 'R', fs, INK); drawLine(l, x0 + 11, fs, INK); y -= LH - fs; });
  };
  if (r.summary) { heading('Summary'); para(boldRuns(r.summary, opt.bold ?? r.bold), { size: fs }); }
  if (r.skills.length) {
    heading(opt.skillsTitle || 'Skills');
    for (const g of r.skills) para([{ s: pdfSafe(g.group) + ': ', f: 'B' }, { s: pdfSafe(g.items.join(', ')), f: 'R' }], { size: fs });
  }
  for (const s of r.sections) {
    const list = s.entries ? s.entries : s.items; if (!list.length) continue;
    heading(s.title || TITLES[s.type]);
    if (!s.entries) { s.items.forEach(i => bullet(i)); continue; }
    s.entries.forEach((e, ei) => {
      if (!e.org && !e.date && !e.bullets.length && !e.loc) { bullet(e.title); return; }
      ensure(LH * 3); if (ei) y -= T.gap * 0.45;
      if (s.type === 'projects') {
        const left = [{ s: pdfSafe(e.title), f: 'B' }]; if (e.org) left.push({ s: '  |  ', f: 'R', color: GRAY }, { s: pdfSafe(e.org), f: 'I', color: GRAY });
        twoCol(left, e.date, fs, 'R');
        if (e.link) para([{ s: pdfSafe(e.link), f: 'R', link: /^https?:/i.test(e.link) ? e.link : 'https://' + e.link }], { size: fs - 0.8, color: T.accent[2] ? T.accent : [0.13, 0.33, 0.74] });
      } else {
        twoCol([{ s: pdfSafe(e.title || e.org), f: 'B' }], e.date, fs, 'R');
        const sec = [e.title ? e.org : '', e.score].filter(Boolean).join('  |  ');
        if (sec || e.loc) twoCol([{ s: pdfSafe(sec), f: 'I' }], e.loc, fs, 'I', GRAY);
      }
      e.bullets.forEach(b => bullet(b, 2));
    });
  }
  return pages;
}
function pdfBlob(r, tplKey, opt) {
  const pages = layout(r, tplKey, opt), objs = [];
  const add = s => { objs.push(s); return objs.length; };
  add('<< /Type /Catalog /Pages 2 0 R >>'); add('');
  const fonts = { F1: 'Helvetica', F2: 'Helvetica-Bold', F3: 'Helvetica-Oblique', F4: 'Helvetica-BoldOblique' };
  const fontRef = Object.fromEntries(Object.entries(fonts).map(([k, v]) => [k, add(`<< /Type /Font /Subtype /Type1 /BaseFont /${v} /Encoding /WinAnsiEncoding >>`)]));
  const F = { R: 'F1', B: 'F2', I: 'F3', BI: 'F4' }, n2 = v => +v.toFixed(2);
  const kids = [];
  for (const p of pages) {
    let cs = '';
    for (const o of p.ops) {
      if (o.t === 'text') cs += `BT /${F[o.f] || 'F1'} ${n2(o.size)} Tf ${o.color.map(n2).join(' ')} rg 1 0 0 1 ${n2(o.x)} ${n2(o.y)} Tm (${pdfStr(o.s)}) Tj ET\n`;
      else cs += `${n2(o.w)} w ${o.color.map(n2).join(' ')} RG ${n2(o.x1)} ${n2(o.y)} m ${n2(o.x2)} ${n2(o.y)} l S\n`;
    }
    const content = add(`<< /Length ${cs.length} >>\nstream\n${cs}endstream`);
    const annots = p.links.map(l => add(`<< /Type /Annot /Subtype /Link /Rect [${l.rect.map(n2).join(' ')}] /Border [0 0 0] /A << /S /URI /URI (${pdfStr(pdfSafe(l.uri))}) >> >>`));
    kids.push(add(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << ${Object.entries(fontRef).map(([k, v]) => `/${k} ${v} 0 R`).join(' ')} >> >> /Contents ${content} 0 R${annots.length ? ` /Annots [${annots.map(a => `${a} 0 R`).join(' ')}]` : ''} >>`));
  }
  objs[1] = `<< /Type /Pages /Kids [${kids.map(k => `${k} 0 R`).join(' ')}] /Count ${kids.length} >>`;
  const info = add(`<< /Title (${pdfStr(pdfSafe(`${r.name} - Resume`))}) /Author (${pdfStr(pdfSafe(r.name))}) /Creator (Career Atlas Resume studio) /Producer (Career Atlas) >>`);
  let out = '%PDF-1.4\n', xref = [];
  objs.forEach((o, i) => { xref.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const xs = out.length;
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${xref.map(o => `${String(o).padStart(10, '0')} 00000 n \n`).join('')}trailer\n<< /Size ${objs.length + 1} /Root 1 0 R /Info ${info} 0 R >>\nstartxref\n${xs}\n%%EOF`;
  return { blob: new Blob([out], { type: 'application/pdf' }), pages: pages.length };
}
function fit(r, tplKey, maxPages, opt = {}, T) {
  const wt = new Map((T?.kws || []).map(k => [k.name, k.w]));
  let pages = layout(r, tplKey, opt).length, trimmed = 0;
  while (pages > maxPages && trimmed < 60) {
    let best = null;
    for (const s of r.sections) if (s.entries && s.type !== 'education') for (const e of s.entries) if (e.bullets.length > 2) {
      const b = e.bullets.at(-1), sc = relScore(b, wt) + (/\d/.test(b) ? 0.6 : 0) + e.bullets.length * -0.05;
      if (!best || sc < best.sc) best = { e, sc };
    }
    if (best) best.e.bullets.pop();
    else { const p = r.sections.find(s => s.type === 'projects' && s.entries.length > 3) || r.sections.find(s => ['interests', 'languages', 'publications'].includes(s.type)); if (!p) break; if (p.entries) p.entries.pop(); else r.sections.splice(r.sections.indexOf(p), 1); }
    trimmed++; pages = layout(r, tplKey, opt).length;
  }
  return { pages, trimmed };
}

/* ------------------------------------------------------------------ DOCX writer */
const xe = s => String(s ?? '').replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch])).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
const WNS = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"';
function docxBlob(r, tplKey = 'classic', opt = {}) {
  const T = TEMPLATES[tplKey] || TEMPLATES.classic, sz = Math.round(T.size * 2.1), RIGHT = 11906 - 2 * Math.round(T.margin * 20);
  const run = (t, o = {}) => `<w:r><w:rPr>${o.b ? '<w:b/>' : ''}${o.i ? '<w:i/>' : ''}${o.color ? `<w:color w:val="${o.color}"/>` : ''}${o.sz ? `<w:sz w:val="${o.sz}"/><w:szCs w:val="${o.sz}"/>` : ''}</w:rPr><w:t xml:space="preserve">${xe(t)}</w:t></w:r>`;
  const tab = '<w:r><w:tab/></w:r>';
  const p = (runs, o = {}) => `<w:p><w:pPr>${o.style ? `<w:pStyle w:val="${o.style}"/>` : ''}${o.keep ? '<w:keepNext/>' : ''}${o.num ? '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>' : ''}${o.tabs ? `<w:tabs><w:tab w:val="right" w:pos="${RIGHT}"/></w:tabs>` : ''}<w:spacing w:before="${o.before || 0}" w:after="${o.after || 0}"/>${o.center ? '<w:jc w:val="center"/>' : ''}</w:pPr>${runs}</w:p>`;
  const bolded = text => boldRuns(text, opt.bold ?? r.bold).map(x => run(x.s, { b: x.f === 'B' })).join('');
  const body = [], al = T.center;
  body.push(p(run(r.name || 'Your Name', { b: true, sz: Math.round(T.name * 2) }), { style: 'Title', center: al }));
  if (r.headline) body.push(p(run(r.headline, { sz: sz + 3, color: tplKey === 'modern' ? T.docAccent : '444A55' }), { center: al, after: 20 }));
  const c = r.contact, ci = [c.phone, c.email, c.location, ...c.links].filter(Boolean);
  if (ci.length) body.push(p(run(ci.join('  |  '), { sz: sz - 1, color: '444A55' }), { center: al, after: 60 }));
  const H = t => body.push(p(run(t), { style: 'Heading1', keep: true }));
  if (r.summary) { H('Summary'); body.push(p(bolded(r.summary), { after: 40 })); }
  if (r.skills.length) { H('Skills'); r.skills.forEach(g => body.push(p(run(g.group + ': ', { b: true }) + run(g.items.join(', ')), { after: 10 }))); }
  for (const s of r.sections) {
    const list = s.entries || s.items; if (!list.length) continue;
    H(s.title || TITLES[s.type]);
    if (!s.entries) { s.items.forEach(i => body.push(p(bolded(i), { num: true }))); continue; }
    s.entries.forEach((e, i) => {
      if (!e.org && !e.date && !e.bullets.length && !e.loc) { body.push(p(bolded(e.title), { num: true })); return; }
      if (s.type === 'projects') {
        body.push(p(run(e.title, { b: true }) + (e.org ? run('  |  ' + e.org, { i: true, color: '444A55' }) : '') + (e.date ? tab + run(e.date) : ''), { tabs: true, keep: true, before: i ? 80 : 20 }));
        if (e.link) body.push(p(run(e.link, { sz: sz - 2, color: '2154BD' }), { keep: true }));
      } else {
        body.push(p(run(e.title || e.org, { b: true }) + (e.date ? tab + run(e.date) : ''), { tabs: true, keep: true, before: i ? 80 : 20 }));
        const sec = [e.title ? e.org : '', e.score].filter(Boolean).join('  |  ');
        if (sec || e.loc) body.push(p(run(sec, { i: true }) + (e.loc ? tab + run(e.loc, { i: true, color: '444A55' }) : ''), { tabs: true, keep: !!e.bullets.length }));
      }
      e.bullets.forEach(b => body.push(p(bolded(b), { num: true })));
    });
  }
  const mg = Math.round(T.margin * 20);
  const doc = `${XML_HEAD}<w:document ${WNS}><w:body>${body.join('')}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="${mg}" w:right="${mg}" w:bottom="${mg}" w:left="${mg}" w:header="400" w:footer="400" w:gutter="0"/></w:sectPr></w:body></w:document>`;
  const styles = `${XML_HEAD}<w:styles ${WNS}><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri" w:cs="Calibri"/><w:color w:val="15161A"/><w:sz w:val="${sz}"/><w:szCs w:val="${sz}"/><w:lang w:val="en-IN"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="0" w:line="252" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>`
    + `<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>`
    + `<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:after="20"/></w:pPr><w:rPr><w:b/><w:sz w:val="${Math.round(T.name * 2)}"/></w:rPr></w:style>`
    + `<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="${T.docAccent === '000000' ? '333333' : T.docAccent}"/></w:pBdr><w:spacing w:before="${Math.round(T.gap * 22)}" w:after="60"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:caps/><w:color w:val="${T.docAccent === '000000' ? '1A1A1A' : T.docAccent}"/><w:sz w:val="${sz + 3}"/></w:rPr></w:style></w:styles>`;
  const numbering = `${XML_HEAD}<w:numbering ${WNS}><w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="hybridMultilevel"/><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="300" w:hanging="220"/></w:pPr></w:lvl></w:abstractNum><w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num></w:numbering>`;
  const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
  const files = [
    { name: '[Content_Types].xml', data: `${XML_HEAD}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>` },
    { name: '_rels/.rels', data: `${XML_HEAD}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>` },
    { name: 'docProps/core.xml', data: `${XML_HEAD}<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${xe(r.name)} - Resume</dc:title><dc:creator>${xe(r.name)}</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created></cp:coreProperties>` },
    { name: 'word/_rels/document.xml.rels', data: `${XML_HEAD}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/></Relationships>` },
    { name: 'word/document.xml', data: doc }, { name: 'word/styles.xml', data: styles }, { name: 'word/numbering.xml', data: numbering },
  ];
  return zipStore(files, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
}

/* ------------------------------------------------------------------ LLM-assisted Resume Agent (optional, user's own API key) */
const PROVIDERS = {
  openai: { label: 'OpenAI (ChatGPT)', model: 'gpt-4.1-mini', key: true, keyUrl: 'https://platform.openai.com/api-keys' },
  anthropic: { label: 'Anthropic (Claude)', model: 'claude-sonnet-4-5', key: true, keyUrl: 'https://console.anthropic.com/settings/keys' },
  gemini: { label: 'Google Gemini (free tier available)', model: 'gemini-2.5-flash', key: true, keyUrl: 'https://aistudio.google.com/app/apikey' },
  compatible: { label: 'OpenAI-compatible (Groq, OpenRouter, LM Studio…)', model: 'llama-3.3-70b-versatile', key: true, base: 'https://api.groq.com/openai/v1', keyUrl: 'https://console.groq.com/keys' },
  ollama: { label: 'Ollama — free, runs on this computer', model: 'llama3.1', key: false, base: 'http://localhost:11434', keyUrl: 'https://ollama.com/download' },
};
const AGENT_SYSTEM = `You are "Resume Agent", an expert technical recruiter and resume writer. Your only job is to tailor one candidate's resume to one target role / job description so it passes ATS keyword screening and convinces a hiring manager to shortlist the candidate.

Hard rules — never break them:
1. Truth only. Never invent employers, job titles, dates, degrees, schools, certifications, tools, metrics or achievements. Every fact must come from the candidate's resume.
2. You may rewrite bullets with strong past-tense action verbs, tighten wording, reorder bullets by relevance, merge duplicates, and use the job description's exact wording for skills the candidate genuinely shows.
3. Numbers: keep every number that exists; never create a new one. If a bullet would be stronger with a metric, keep it as is and add a suggestion asking the candidate for the real figure.
4. Each bullet is at most two lines (≤ 28 words): action verb + what was done + tool/skill + result. No "I", "my", "responsible for", "worked on".
5. Summary: 2–3 sentences, ≤ 60 words, naming the target role and the candidate's strongest matching skills and evidence.
6. Skills: only skills present in the resume, most relevant first, canonical names (e.g. "JavaScript", "Node.js").
7. Reply with ONLY valid JSON (no markdown) in exactly this shape:
{"headline": string, "summary": string, "skills": [{"group": string, "items": [string]}], "entries": [{"id": string, "bullets": [string]}], "suggestions": [string]}
Return every entry id you were given, in the same order.`;

async function callLLM(cfg, system, user) {
  const p = cfg.provider, P = PROVIDERS[p], model = (cfg.model || P.model).trim(), key = (cfg.key || '').trim();
  if (P.key && !key) throw new Error(`Add your ${P.label} API key in the AI agent tab.`);
  const go = async (url, init) => {
    let res;
    try { res = await fetch(url, { method: 'POST', ...init, headers: { 'content-type': 'application/json', ...init.headers } }); }
    catch { throw new Error(p === 'ollama' ? 'Cannot reach Ollama. Start it and allow this page: set OLLAMA_ORIGINS=* then restart Ollama.' : `Cannot reach ${P.label} — check the internet connection or the base URL.`); }
    const txt = await res.text(); let data = null; try { data = JSON.parse(txt); } catch { /* not JSON */ }
    if (!res.ok) throw new Error(`${P.label} error ${res.status}: ${data?.error?.message || data?.error || txt.slice(0, 180)}`);
    return data;
  };
  if (p === 'anthropic') {
    const d = await go('https://api.anthropic.com/v1/messages', { headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' }, body: JSON.stringify({ model, max_tokens: 4096, system, messages: [{ role: 'user', content: user }] }) });
    return (d.content || []).map(c => c.text || '').join('');
  }
  if (p === 'gemini') {
    const d = await go(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`, { headers: {}, body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: [{ role: 'user', parts: [{ text: user }] }], generationConfig: { temperature: 0.3, responseMimeType: 'application/json' } }) });
    return d.candidates?.[0]?.content?.parts?.map(x => x.text || '').join('') || '';
  }
  if (p === 'ollama') {
    const d = await go(`${(cfg.base || P.base).replace(/\/+$/, '')}/api/chat`, { headers: {}, body: JSON.stringify({ model, stream: false, format: 'json', options: { temperature: 0.3 }, messages: [{ role: 'system', content: system }, { role: 'user', content: user }] }) });
    return d.message?.content || '';
  }
  const base = (p === 'openai' ? 'https://api.openai.com/v1' : cfg.base || P.base).replace(/\/+$/, '');
  const d = await go(`${base}/chat/completions`, { headers: key ? { authorization: `Bearer ${key}` } : {}, body: JSON.stringify({ model, response_format: { type: 'json_object' }, messages: [{ role: 'system', content: system }, { role: 'user', content: user }] }) });
  return d.choices?.[0]?.message?.content || '';
}
function looseJSON(t) {
  const s = String(t).replace(/^```(?:json)?\s*|\s*```$/g, ''), a = s.indexOf('{'), b = s.lastIndexOf('}');
  if (a < 0 || b < a) throw new Error('The AI reply was not JSON.');
  return JSON.parse(s.slice(a, b + 1));
}
async function agentRewrite(cfg, base, src, T) {
  const ids = [];
  const resume = {
    name: base.name, headline: base.headline, summary: src.summary, skills: base.skills,
    entries: base.sections.flatMap((s, si) => (s.entries && s.type !== 'education' ? s.entries.map((e, ei) => { const id = `${si}.${ei}`; ids.push(id); return { id, section: s.title, title: e.title, organisation: e.org, dates: e.date, bullets: e.bullets }; }) : [])),
    education: base.sections.filter(s => s.type === 'education').flatMap(s => s.entries.map(e => `${e.title}, ${e.org} ${e.date} ${e.score}`.trim())),
    certifications: base.sections.filter(s => s.type === 'certs').flatMap(s => s.items),
  };
  const ask = { target: { title: T.title, company: T.company || undefined, jobDescription: (T.jd || '').slice(0, 7000) || undefined, priorityKeywords: T.kws.slice(0, 20).map(k => k.name) }, resume };
  const out = looseJSON(await callLLM(cfg, AGENT_SYSTEM, JSON.stringify(ask)));
  return guard(out, base, src, ids);
}
function guard(o, base, src, ids) {
  const r = clone(base), notes = [], srcText = bodyText(src) + '\n' + [src.name, src.contact.location].join(' ');
  const srcKW = new Set(findKW(srcText).keys()), low = srcText.toLowerCase();
  const nums = s => String(s).match(/\d+(?:[.,]\d+)?/g) || [];
  const allNums = new Set(nums(srcText));
  const kwOK = s => [...findKW(s).keys()].every(k => srcKW.has(k));
  const numOK = (s, pool) => nums(s).every(n => pool.has(n));
  if (typeof o.headline === 'string' && o.headline.trim() && o.headline.length < 140 && kwOK(o.headline) && numOK(o.headline, allNums)) r.headline = clean(o.headline);
  if (typeof o.summary === 'string' && o.summary.trim().length > 40 && o.summary.length < 900) {
    if (kwOK(o.summary) && numOK(o.summary, allNums) && !/\b(I|my|me)\b/.test(o.summary)) r.summary = clean(o.summary);
    else notes.push('Kept the built-in summary — the AI version mentioned a skill or number that is not in your resume.');
  }
  if (Array.isArray(o.skills) && o.skills.length) {
    const rejected = [], groups = [], seen = new Set();
    for (const g of o.skills) {
      if (!g || !Array.isArray(g.items)) continue;
      const items = g.items.map(clean).filter(i => {
        if (!i || seen.has(i.toLowerCase())) return false;
        const ok = low.includes(i.toLowerCase()) || (findKW(i).size && kwOK(i));
        if (ok) seen.add(i.toLowerCase()); else rejected.push(i);
        return ok;
      });
      if (items.length) groups.push({ group: clean(g.group) || 'Skills', items: [...new Set(items)] });
    }
    const keep = new Set(groups.flatMap(g => g.items.map(i => i.toLowerCase())));
    const lost = base.skills.flatMap(g => g.items).filter(i => !keep.has(i.toLowerCase()));
    if (groups.length) { r.skills = groups; if (lost.length) r.skills.push({ group: 'Other', items: lost }); }
    if (rejected.length) notes.push(`Did not add ${listTxt(rejected.slice(0, 6).map(x => `“${x}”`))} — the AI suggested ${rejected.length > 1 ? 'them' : 'it'} but your resume does not show ${rejected.length > 1 ? 'them' : 'it'}.`);
  }
  let rewritten = 0;
  const byId = new Map((Array.isArray(o.entries) ? o.entries : []).map(e => [String(e?.id), e]));
  for (const id of ids) {
    const [si, ei] = id.split('.').map(Number), e = r.sections[si]?.entries?.[ei], got = byId.get(id);
    if (!e || !got || !Array.isArray(got.bullets)) continue;
    const pool = new Set(nums([e.title, e.org, e.date, ...e.bullets].join(' ')));
    const nb = got.bullets.map(clean).filter(Boolean);
    const ok = nb.length && nb.length <= e.bullets.length + 1 && nb.every(b => b.length < 420 && numOK(b, pool) && kwOK(b));
    if (ok) { e.bullets = nb.map(polish); rewritten++; } else notes.push(`Kept your wording for “${e.title || e.org}” — the AI rewrite added a fact, tool or number that is not in your resume.`);
  }
  const sugg = (Array.isArray(o.suggestions) ? o.suggestions : []).map(clean).filter(Boolean).slice(0, 8);
  return { r, notes, rewritten, sugg };
}

const ROLE_T = new Map();
window.RE = {
  pdfjs, readFile, parseLines, toMarkup, fromMarkup, blank, target, match, quality, tailor, layout, pdfBlob, docxBlob, fit, findKW, profile,
  bestRole(r) {
    const have = haveKW(r); let best = null;
    for (const slug of Object.keys(S.ROLE)) {
      if (!ROLE_T.has(slug)) ROLE_T.set(slug, target({ role: slug }));
      const hard = ROLE_T.get(slug).kws.filter(k => !k.soft), hit = hard.filter(k => have.has(k.name));
      const cover = hit.reduce((a, k) => a + k.w, 0) / (hard.reduce((a, k) => a + k.w, 0) || 1);
      const sc = cover * (0.4 + 0.6 * Math.min(1, hit.length / 8));
      if (!best || sc > best.sc) best = { slug, sc };
    }
    return best && best.slug;
  },
  agentRewrite, callLLM, PROVIDERS, AGENT_SYSTEM, TEMPLATES, TITLES, KW,
};
})();
