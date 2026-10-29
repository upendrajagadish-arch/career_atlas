#!/usr/bin/env node
/*
 * Daily fresher-jobs & hiring-events updater for Career Atlas.
 *
 *   node scripts/update-jobs.js                 full update (re-discovers job boards weekly)
 *   node scripts/update-jobs.js --discover      force job-board discovery for every company
 *   node scripts/update-jobs.js --no-events     skip Google News hiring events
 *   node scripts/update-jobs.js --only=amazon   update one company (by id) — for debugging
 *
 * The deployed site does not see a local run. GitHub Actions
 * (.github/workflows/daily-job-scan.yml) runs this every day and pushes
 * data/jobs.json, which Vercel redeploys. SCAN_TRIGGER is set to
 * "schedule" or "workflow_dispatch" there; a local run records "local".
 *
 * Optional aggregator keys (environment variables or scripts/config.json):
 *   ADZUNA_APP_ID + ADZUNA_APP_KEY   https://developer.adzuna.com  (India job aggregator)
 *   JOOBLE_KEY                       https://jooble.org/api/about
 *
 * Writes data/jobs.json (read by the app), data/ats-map.json (discovered boards)
 * and data/scan-status.json (last scanned time, trigger and outcome).
 * Needs Node 18+ (built-in fetch). No npm packages.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const DATASET = path.join(ROOT, 'Company_Role_Skill_Mind_Map_Data_2026.json');
const SOURCES = path.join(__dirname, 'job-sources.json');
const CONFIG = path.join(__dirname, 'config.json');
const OUT = path.join(DATA_DIR, 'jobs.json');
const ATS_MAP = path.join(DATA_DIR, 'ats-map.json');
const STATUS = path.join(DATA_DIR, 'scan-status.json');
const LOG = path.join(DATA_DIR, 'update.log');

// Skill keywords per opening (same lexicon as the Resume studio) so a resume can be tailored to it
const LEX = require(path.join(ROOT, 'assets', 'resume-lexicon.js'));
const KW_RES = LEX.CATEGORIES.filter(c => c[0] !== 'Soft skills').flatMap(([, , entries]) => entries.map(e => {
  const cs = e[0] === '!', parts = (cs ? e.slice(1) : e).split('|');
  const alt = parts.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '[\\s-]+')).sort((a, b) => b.length - a.length).join('|');
  return [parts[0], new RegExp(`(?<![A-Za-z0-9+#]|[A-Za-z]\\.)(?:${alt})${cs ? "(?![-&.'’]?[A-Za-z0-9+#])" : '(?![A-Za-z0-9+#])'}`, cs ? 'g' : 'gi')];
}));
function jobKeywords(text) {
  const counts = [];
  for (const [name, re] of KW_RES) { const n = (text.match(re) || []).length; if (n) counts.push([name, n]); }
  return counts.sort((a, b) => b[1] - a[1]).slice(0, 18).map(c => c[0]);
}

const argv = process.argv.slice(2);
const flag = n => argv.includes('--' + n);
const opt = n => (argv.find(a => a.startsWith(`--${n}=`)) || '').split('=')[1];
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36 CareerAtlasBot/1.0';
const DISCOVERY_MAX_AGE_DAYS = 7;
const EVENT_MAX_AGE_DAYS = 30;

fs.mkdirSync(DATA_DIR, { recursive: true });
const t0 = Date.now();
const logLines = [];
const log = (...a) => { const l = `[${new Date().toISOString().slice(11, 19)}] ${a.join(' ')}`; logLines.push(l); console.log(l); };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const today = new Date().toISOString().slice(0, 10);
const readJSON = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } };
const uniq = a => [...new Set(a.filter(Boolean))];
const norm = s => String(s || '').toLowerCase().replace(/[’']/g, '').replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim();
function scanTrigger() {
  const t = String(process.env.SCAN_TRIGGER || 'local').trim();
  return t === 'schedule' || t === 'workflow_dispatch' || t === 'local' ? t : (t.slice(0, 40) || 'local');
}
function writeScanStatus(fields) {
  const status = {
    ok: false,
    lastScanned: new Date().toISOString(),
    trigger: scanTrigger(),
    date: today,
    durationSec: Math.round((Date.now() - t0) / 1000),
    ...fields,
  };
  status.ok = !!fields.ok;
  fs.writeFileSync(STATUS, JSON.stringify(status, null, 2) + '\n');
  return status;
}
function urlKey(url) {
  const raw = String(url || '').trim();
  if (!raw) return '';
  try {
    const u = new URL(raw);
    return (u.origin + u.pathname).replace(/\/+$/, '').toLowerCase();
  } catch {
    return raw.replace(/\/+$/, '').toLowerCase();
  }
}
// Same company + title + city, or the same apply link (ignoring tracking query params).
function dedupeJobs(jobs) {
  const seen = new Set();
  const out = [];
  for (const j of jobs) {
    const keys = [`id:${j.cid || norm(j.company)}|${norm(j.title)}|${j.city}`];
    const u = urlKey(j.url);
    if (u) keys.push('url:' + u);
    if (keys.some(k => seen.has(k))) continue;
    keys.forEach(k => seen.add(k));
    out.push(j);
  }
  return out;
}
const stripHTML = s => String(s || '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&rsquo;/g, "'").replace(/\s+/g, ' ').trim();

/* ------------------------------------------------------------------ http */
const stats = { requests: 0, failed: 0 };
async function http(url, { method = 'GET', body, headers = {}, type = 'json', timeout = 25000, retries = 2 } = {}) {
  for (let attempt = 0; ; attempt++) {
    stats.requests++;
    try {
      const r = await fetch(url, {
        method, body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(timeout),
        headers: { 'user-agent': UA, accept: type === 'json' ? 'application/json' : '*/*', ...(body ? { 'content-type': 'application/json' } : {}), ...headers },
      });
      if ((r.status === 429 || r.status >= 500) && attempt < retries) { await sleep(2000 * (attempt + 1)); continue; }
      if (!r.ok) { const e = new Error('HTTP ' + r.status); e.status = r.status; throw e; }
      return type === 'json' ? await r.json() : await r.text();
    } catch (e) {
      if (e.status || attempt >= retries) { stats.failed++; throw e; }
      await sleep(1200 * (attempt + 1));
    }
  }
}
async function pool(items, size, fn) {
  const out = new Array(items.length); let next = 0;
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, async () => {
    while (next < items.length) { const i = next++; try { out[i] = await fn(items[i], i); } catch (e) { out[i] = { error: e }; } }
  }));
  return out;
}

/* ------------------------------------------------------------------ India locations */
const CITY_RULES = [
  ['Bengaluru', /bengaluru|bangalore|\bblr\b/i],
  ['Hyderabad', /hyderabad|secunderabad|telangana/i],
  ['Chennai', /chennai|madras/i],
  ['Pune', /\bpune\b/i],
  ['Mumbai', /mumbai|thane|\bnavi mumbai/i],
  ['Delhi NCR', /gurgaon|gurugram|noida|new delhi|\bdelhi\b|\bncr\b|faridabad|ghaziabad/i],
  ['Kolkata', /kolkata|calcutta/i],
  ['Kerala', /kochi|cochin|trivandrum|thiruvananthapuram|kerala|technopark|infopark/i],
  ['Coimbatore', /coimbatore/i],
  ['Ahmedabad', /ahmedabad|gandhinagar|vadodara/i],
  ['Other India', /\bindia\b|^IN[\s,-]|\bIND\b|jaipur|indore|chandigarh|mohali|bhubaneswar|visakhapatnam|vizag|nagpur|mysuru|mysore|mangalore|mangaluru|madurai|lucknow|bhopal|karnataka|tamil nadu|maharashtra|andhra pradesh|haryana|gujarat|odisha/],
];
function indiaCity(loc) {
  const t = String(loc || '');
  for (const [city, re] of CITY_RULES) if (re.test(t)) return city;
  return null;
}
const MAIN_CITIES = ['Bengaluru', 'Hyderabad', 'Chennai'];

/* ------------------------------------------------------------------ fresher / intern detection */
const INTERN_RE = /\b(intern|interns|internship|co-?op|apprentice|apprenticeship|summer analyst|summer associate|industrial training)\b/i;
const SENIOR_RE = /\b(senior|sr|snr|lead|leader|principal|staff|manager|mgr|director|head|architect|vp|avp|vice president|chief|president|partner|distinguished|fellow|expert|intermediate|intmd|experienced|officer|c1[1-6]|ii|iii|iv|level\s*[2-9]|l[2-9]|ic[3-9]|mts\s*[2-4]|smts|lmts|specialist\s*[2-4]|engineer\s*[2-4]|analyst\s*[2-4]|developer\s*[2-4]|sde\s*-?\s*[2-4])\b/i;
const ENTRY_RE = /\b(graduates?|grad|new grads?|freshers?|fresh graduates?|trainees?|entry[- ]level|early[- ]career|early[- ]talent|university|campus|junior|jr|beginner|management trainee|graduate engineer trainee|associate[\s-]+(software|engineer|developer|consultant|analyst|data|qa|test|cloud|technical|technology|systems|programmer|application|it|network|security|servicenow|salesforce|sap)|(engineer|developer|analyst|sde|programmer|consultant|scientist|associate)[\s,-]*(i|1)|level[\s-]*1|l1|0[\s-]*(to|-|–)[\s-]*[12][\s-]*(years|yrs)|pd[\s-]?1|nqt|202[5-7] (batch|graduates?|grads?)|class of 202[5-7])\b/i;
const FRESH_DESC_RE = /\b(fresh(er)?s?\s+graduates?|recent\s+graduates?|new\s+grads?|freshers?|no\s+(prior\s+)?(work\s+)?experience\s+(is\s+)?required|0\s*(-|–|to)\s*[12]\s*(years?|yrs)|graduating\s+in\s+202[5-7]|202[5-7]\s+(batch|graduates?|pass(ed)?[- ]?outs?)|final[- ]year\s+students?|pursuing\s+(a\s+|an\s+)?(bachelor|master|b\.?\s?tech|b\.?\s?e\b|degree|undergraduate)|campus\s+hires?|entry[- ]level)\b/i;
const NUM = '(\\d{1,2}|one|two|three|four|five|six|seven|eight|nine|ten)';
const NUM_WORD = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
const ADJ = '(?:(?:relevant|professional|industry|industrial|work|working|hands[- ]on|overall|total|proven|related|software|technical|prior|previous|practical|full[- ]time|post[- ]qualification|domain)\\s+)*';
const YEARS_RES = [
  new RegExp(`\\b${NUM}(?:\\.\\d)?\\s*(?:\\+|plus)?\\s*(?:(?:-|–|to)\\s*${NUM}\\s*)?\\+?\\s*(?:years?|yrs?)(?:'|’)?\\s*(?:of\\s+)?${ADJ}(?:experience|exp\\b)`, 'gi'),
  new RegExp(`\\b(?:experience|exp)\\s*(?:required|requirement|level)?\\s*(?:of|:|-|–)?\\s*(?:a\\s+)?(?:minimum(?:\\s+of)?|min\\.?|at\\s*least|over|more\\s+than)?\\s*${NUM}\\s*(?:\\+|plus)?\\s*(?:(?:-|–|to)\\s*${NUM}\\s*)?\\+?\\s*(?:years?|yrs?)\\b`, 'gi'),
  new RegExp(`\\b(?:minimum(?:\\s+of)?|min\\.?|at\\s*least)\\s+(?:a\\s+)?${NUM}\\s*(?:\\+|plus)?\\s*(?:years?|yrs?)\\b`, 'gi'),
];
const MONTHS_RE = new RegExp(`\\b${NUM}\\s*(?:\\+|plus)?\\s*(?:(?:-|–|to)\\s*${NUM}\\s*)?\\+?\\s*months?(?:'|’)?\\s*(?:of\\s+)?${ADJ}(?:experience|exp\\b)`, 'gi');
const LATERAL_RE = /\b(lateral (hire|hiring|position|role)s?|mid[- ]senior level|experienced (hire|candidates? only)|not (suitable|open) for freshers|freshers (need not|should not|are not eligible))\b/i;
const toNum = s => NUM_WORD[String(s).toLowerCase()] ?? +s;

// Smallest experience the JD accepts (the lower end of each range), taking the strictest statement.
function minYears(desc) {
  const text = stripHTML(desc);
  let req = null;
  for (const re of YEARS_RES) for (const m of text.matchAll(re)) {
    const v = toNum(m[1]); if (!(v <= 20)) continue;
    req = req === null ? v : Math.max(req, v);
  }
  for (const m of text.matchAll(MONTHS_RE)) {
    const v = toNum(m[1]); if (!(v > 0 && v <= 60)) continue;
    req = Math.max(req ?? 0, Math.round(v / 12 * 10) / 10);
  }
  return req;
}
function assess(title, desc, hint) {
  const t = String(title || '');
  const im = t.match(INTERN_RE);
  if (im) return { level: 'Internship', why: `“${im[0]}” in the job title` };
  if (SENIOR_RE.test(t) || /\s[2-9]$/.test(t.trim())) return null;
  const yrs = desc ? minYears(desc) : null;
  if (yrs !== null && yrs > 0) return null;
  if (desc && LATERAL_RE.test(stripHTML(desc))) return null;
  const em = t.match(ENTRY_RE) || t.match(/\bGET\b/);
  if (em) return { level: 'Fresher / entry level', why: `“${em[0]}” in the job title`, yrs };
  if (hint) return { ...hint, yrs };
  if (yrs !== null) return { level: 'Fresher / entry level', why: 'The job description asks for 0 years of experience', yrs };
  const dm = desc && stripHTML(desc).match(FRESH_DESC_RE);
  if (dm) return { level: 'Fresher / entry level', why: `The job description mentions “${dm[0]}”`, yrs };
  return null;
}
const needsDetail = title => !INTERN_RE.test(title) && !SENIOR_RE.test(title);

/* ------------------------------------------------------------------ role tracks */
const TRACKS = [
  ['ServiceNow', ['servicenow-developer'], /servicenow|service now|\bsnow\b|\bitsm\b|\bitom\b/i],
  ['Salesforce', ['salesforce-developer'], /salesforce|\bsfdc\b|\bapex\b|lightning web|\blwc\b|vlocity|\bpd[\s-]?1\b|platform developer/i],
  ['SAP', ['sap-abap-developer'], /\bsap\b|\babap\b|s\/4\s?hana|\bfico\b|\bhana\b|successfactors/i],
  ['RPA & automation', ['rpa-developer'], /\brpa\b|uipath|automation anywhere|blue ?prism|power automate|process automation/i],
  ['Pega', [], /\bpega\b|pegasystems/i],
  ['Microsoft Power Platform & Dynamics', [], /power ?apps|power platform|dynamics 365|\bd365\b|dynamics crm/i],
  ['Oracle & ERP apps', [], /oracle (apps|ebs|fusion|hcm|erp|cloud)|peoplesoft|\berp\b|workday (integration|hcm|consultant|analyst)/i],
  ['Mainframe', [], /mainframe|cobol|\bjcl\b|db2/i],
  ['Cyber security', ['cyber-security'], /security|\bsoc\b|cyber|penetration|\bgrc\b|\biam\b|vulnerability|threat|forensic/i],
  ['Data engineering', ['data-engineer'], /data engineer|\betl\b|big data|spark|databricks|data platform|data pipeline/i],
  ['Data science & AI', ['ai-engineer', 'ai-data-scientist', 'machine-learning'], /data scien|scientist|machine learning|\bml\b|\bai\b|artificial intelligence|gen ?ai|\bllm|deep learning|\bnlp\b|computer vision|research (intern|engineer|scientist)/i],
  ['Business intelligence', ['bi-analyst'], /power ?bi|tableau|business intelligence|\bbi\b|reporting analyst|\bmis\b/i],
  ['Data & business analysis', ['data-analyst'], /data analy|business analy|analytics|insights|quantitative|\bquant\b|risk analy|financial analy|research analy/i],
  ['DevOps & cloud', ['devops'], /devops|\bsre\b|site reliability|cloud|platform engineer|infrastructure|\baws\b|azure|\bgcp\b|kubernetes|systems? engineer|linux/i],
  ['Networking', ['network-engineer'], /network|\bnoc\b|ccna|telecom|\brf\b|wireless/i],
  ['Quality & testing', ['qa'], /\bqa\b|quality assurance|test|sdet|validation|verification engineer/i],
  ['Frontend', ['frontend'], /front[\s-]?end|\bui developer|react|angular|web developer|javascript/i],
  ['Full stack', ['full-stack'], /full[\s-]?stack|\bmern\b|\bmean\b/i],
  ['Backend', ['backend'], /back[\s-]?end|java\b|\.net|node|python developer|golang|\bapi\b|microservices/i],
  ['Mobile', ['android', 'ios'], /android|\bios\b|mobile|flutter|react native|swift|kotlin/i],
  ['Embedded, VLSI & hardware', [], /embedded|firmware|vlsi|asic|\brtl\b|silicon|analog|circuit|\bpcb\b|hardware|fpga|semiconductor|mechanical|electrical|electronics|automotive|\bcad\b|design engineer/i],
  ['Product & design', ['product-manager', 'ux-design'], /product (manager|management|analyst|owner)|\bapm\b|\bux\b|\bui\/ux|ui ux|product design|visual design|interaction design|graphic design/i],
  ['Technical writing', ['technical-writer'], /technical writ|documentation|content develop/i],
  ['Support & operations', [], /support|help ?desk|service desk|operations|\bops\b|customer success|associate$|catalog|process (associate|executive)|\bbpo\b|\bkpo\b/i],
  ['Marketing & sales', ['seo'], /marketing|\bseo\b|sales|business development|\bbd\b|growth|content|social media|brand/i],
  ['Finance, HR & business', [], /finance|financial|accounting|accountant|acctg|audit|\btax\b|payroll|\bhr\b|human resources|talent|recruit|legal|procurement|sourcing|supply chain|consult|treasury|controller|regulatory|compliance|\bkyc\b|\baml\b|banking|fund|credit|lending|investment|wealth|trade|settlement/i],
  ['Software engineering', ['backend', 'full-stack'], /software|\bsde\b|developer|programmer|engineer|\beng\b|technology|technical|coder|application/i],
  ['Graduate programmes', [], /early talent|graduate|trainee|apprentice|intern|campus|summer analyst|summer associate|programme|program\b/i],
  ['Analyst & associate roles', ['data-analyst'], /analyst|associate|specialist|executive|coordinator/i],
];
const PLATFORM_TRACKS = TRACKS.slice(0, 8);
function trackOf(title, desc = '') {
  for (const [label, roles, re] of TRACKS) if (re.test(title)) return { track: label, roles };
  for (const [label, roles, re] of PLATFORM_TRACKS) if (re.test(desc)) return { track: label, roles };
  return { track: 'Other roles', roles: [] };
}

/* ------------------------------------------------------------------ dates */
function isoDay(v) {
  if (v === null || v === undefined || v === '') return null;
  const d = typeof v === 'number' ? new Date(v < 1e12 ? v * 1000 : v) : new Date(v);
  return isNaN(d) ? null : d.toISOString().slice(0, 10);
}
function workdayPosted(txt) {
  const t = String(txt || '').toLowerCase(), d = new Date();
  if (t.includes('today')) return isoDay(d);
  if (t.includes('yesterday')) { d.setDate(d.getDate() - 1); return isoDay(d); }
  const m = t.match(/(\d+)\+?\s*days?/);
  if (m) { d.setDate(d.getDate() - +m[1]); return isoDay(d); }
  return null;
}

/* ------------------------------------------------------------------ job boards */
// Each fetcher returns raw postings: { id, title, loc, url, posted, desc?, hint?, detail? }
const ATS = {
  async greenhouse(b) {
    const d = await http(`https://boards-api.greenhouse.io/v1/boards/${b.slug}/jobs?content=true`);
    return (d.jobs || []).map(j => ({ id: j.id, title: j.title, loc: [j.location?.name, ...(j.offices || []).map(o => o.name)].join(' | '), url: j.absolute_url, posted: j.first_published || j.updated_at, desc: j.content }));
  },
  async lever(b) {
    const d = await http(`https://api.lever.co/v0/postings/${b.slug}?mode=json`);
    return (Array.isArray(d) ? d : []).map(j => ({ id: j.id, title: j.text, loc: [j.categories?.location, ...(j.categories?.allLocations || []), j.country].join(' | '), url: j.hostedUrl, posted: j.createdAt,
      desc: [j.descriptionPlain, ...(j.lists || []).map(l => l.text + ' ' + l.content), j.additionalPlain].join(' '), commitment: j.categories?.commitment }));
  },
  async ashby(b) {
    const d = await http(`https://api.ashbyhq.com/posting-api/job-board/${b.slug}`);
    return (d.jobs || []).filter(j => j.isListed !== false).map(j => ({ id: j.id, title: j.title, loc: [j.location, ...(j.secondaryLocations || []).map(s => s.location), j.address?.postalAddress?.addressCountry].join(' | '),
      url: j.jobUrl, posted: j.publishedAt, desc: j.descriptionPlain, hint: /intern/i.test(j.employmentType || '') ? { level: 'Internship', why: 'Employment type is Intern' } : null }));
  },
  async smartrecruiters(b) {
    const out = [];
    for (let offset = 0; offset < 1000; offset += 100) {
      const d = await http(`https://api.smartrecruiters.com/v1/companies/${b.slug}/postings?limit=100&offset=${offset}&country=in`);
      for (const j of d.content || []) {
        const lvl = j.experienceLevel?.id;
        out.push({ id: j.id, title: j.name, loc: [j.location?.city, j.location?.region, j.location?.country === 'in' ? 'India' : j.location?.country].join(', '),
          url: `https://jobs.smartrecruiters.com/${b.slug}/${j.id}`, posted: j.releasedDate,
          hint: lvl === 'internship' ? { level: 'Internship', why: 'Listed with experience level “Internship”' } : lvl === 'entry_level' ? { level: 'Fresher / entry level', why: 'Listed with experience level “Entry level”' } : null,
          detail: async () => { const x = await http(`https://api.smartrecruiters.com/v1/companies/${b.slug}/postings/${j.id}`); return Object.values(x.jobAd?.sections || {}).map(s => s.text).join(' '); } });
      }
      if (offset + 100 >= (d.totalFound || 0)) break;
    }
    return out;
  },
  async workable(b) {
    const d = await http(`https://apply.workable.com/api/v1/widget/accounts/${b.slug}`);
    return (d.jobs || []).map(j => ({ id: j.shortcode, title: j.title, loc: [j.city, j.state, j.country, ...(j.locations || []).map(l => `${l.city} ${l.country}`)].join(' | '), url: j.url || j.shortlink, posted: j.published_on || j.created_at }));
  },
  async recruitee(b) {
    const d = await http(`https://${b.slug}.recruitee.com/api/offers/`);
    return (d.offers || []).map(j => ({ id: j.id, title: j.title, loc: [j.location, j.city, j.country].join(' | '), url: j.careers_url, posted: j.published_at, desc: j.description + ' ' + j.requirements }));
  },
  async workday(b) {
    const tenant = b.host.split('.')[0], base = `https://${b.host}/wday/cxs/${tenant}/${b.site}`;
    const first = await http(`${base}/jobs`, { method: 'POST', body: { appliedFacets: {}, limit: 1, offset: 0, searchText: '' } });
    const facets = {};
    (function walk(list, inCountry) {
      for (const f of list || []) {
        const isCountry = inCountry || /country/i.test(`${f.facetParameter} ${f.descriptor || ''}`);
        for (const v of f.values || []) {
          if (v.values) walk([{ ...v, facetParameter: v.facetParameter || f.facetParameter }], isCountry);
          else if (isCountry && /^india$/i.test(v.descriptor || '')) (facets[f.facetParameter] ||= []).push(v.id);
        }
      }
    })(first.facets, false);
    const hasFacet = Object.keys(facets).length > 0;
    const seen = new Map();
    for (const q of ['intern', 'graduate', 'fresher', 'trainee', 'entry level', 'associate', 'junior', 'early career', 'apprentice', 'university', 'campus', 'analyst', 'servicenow', 'salesforce', 'sap']) {
      for (let offset = 0; offset < 100; offset += 20) {
        const d = await http(`${base}/jobs`, { method: 'POST', body: { appliedFacets: facets, limit: 20, offset, searchText: hasFacet ? q : `${q} India` } });
        for (const j of d.jobPostings || []) {
          if (!j.externalPath || seen.has(j.externalPath)) continue;
          const pathLoc = decodeURIComponent((j.externalPath.split('/')[2] || '').replace(/-+/g, ' '));
          seen.set(j.externalPath, { id: j.bulletFields?.[0] || j.externalPath, title: j.title, loc: `${j.locationsText || ''} | ${pathLoc}${hasFacet ? ' | India' : ''}`,
            url: `https://${b.host}/en-US/${b.site}${j.externalPath}`, posted: workdayPosted(j.postedOn),
            detail: async () => { const x = await http(`${base}${j.externalPath}`); return x.jobPostingInfo?.jobDescription || ''; } });
        }
        if (offset + 20 >= (d.total || 0)) break;
      }
    }
    return [...seen.values()];
  },
  async amazon() {
    const seen = new Map();
    for (const q of ['intern', 'university', 'graduate', 'new grad', 'SDE I', 'fresher', 'trainee', 'associate', '']) {
      for (let offset = 0; offset < (q ? 200 : 400); offset += 100) {
        const d = await http(`https://www.amazon.jobs/en/search.json?base_query=${encodeURIComponent(q)}&loc_query=India&country=IND&result_limit=100&offset=${offset}&sort=recent`);
        for (const j of d.jobs || []) if (!seen.has(j.id_icims)) seen.set(j.id_icims, {
          id: j.id_icims, title: j.title, loc: `${j.normalized_location || ''} | ${j.location || ''}`, url: 'https://www.amazon.jobs' + j.job_path,
          posted: j.posted_date, desc: `${j.basic_qualifications || ''} ${j.description_short || ''}` });
        if (offset + 100 >= (d.hits || 0)) break;
      }
    }
    return [...seen.values()];
  },
  async microsoft() {
    const seen = new Map();
    for (const q of ['intern', 'graduate', 'university', 'software engineer', 'associate', 'support engineer', '']) {
      for (let start = 0; start < 200; start += 20) {
        const d = await http(`https://apply.careers.microsoft.com/api/pcsx/search?domain=microsoft.com&query=${encodeURIComponent(q)}&location=India&start=${start}&num=20&sort_by=timestamp`);
        const list = d.data?.positions || [];
        for (const j of list) if (!seen.has(j.id)) seen.set(j.id, {
          id: j.id, title: j.name, loc: [...(j.locations || []), ...(j.standardizedLocations || [])].join(' | '), url: 'https://apply.careers.microsoft.com' + j.positionUrl, posted: j.postedTs,
          detail: async () => { const x = await http(`https://apply.careers.microsoft.com/api/pcsx/position_details?position_id=${j.id}&domain=microsoft.com&hl=en`); return x.data?.jobDescription || ''; } });
        if (list.length < 20) break;
      }
    }
    return [...seen.values()];
  },
  async oracle(b) {
    const seen = new Map();
    const api = `https://${b.host}/hcmRestApi/resources/latest`;
    for (const q of ['intern', 'analyst', 'graduate', 'associate', 'trainee', 'fresher', 'program', 'campus']) {
      for (let offset = 0; offset < 200; offset += 25) {
        const d = await http(`${api}/recruitingCEJobRequisitions?onlyData=true&expand=requisitionList.secondaryLocations&finder=findReqs;siteNumber=${b.site},limit=25,offset=${offset},keyword=%22${encodeURIComponent(q)}%22,sortBy=POSTING_DATES_DESC`);
        const list = d.items?.[0]?.requisitionList || [];
        for (const j of list) if (!seen.has(j.Id)) seen.set(j.Id, {
          id: j.Id, title: j.Title, loc: [j.PrimaryLocation, j.PrimaryLocationCountry, ...(j.secondaryLocations || []).map(s => s.Name)].join(' | '),
          url: `https://${b.host}/hcmUI/CandidateExperience/en/sites/${b.site}/job/${j.Id}`, posted: j.PostedDate, desc: j.ShortDescriptionStr,
          detail: async () => { const x = await http(`${api}/recruitingCEJobRequisitionDetails?expand=all&onlyData=true&finder=ById;Id=%22${j.Id}%22,siteNumber=${b.site}`); const it = x.items?.[0] || {}; return `${it.ExternalQualificationsStr || ''} ${it.ExternalResponsibilitiesStr || ''} ${it.ExternalDescriptionStr || ''}`; } });
        if (list.length < 25) break;
      }
    }
    return [...seen.values()];
  },
};
const ATS_LABEL = { greenhouse: 'Greenhouse', lever: 'Lever', ashby: 'Ashby', smartrecruiters: 'SmartRecruiters', workable: 'Workable', recruitee: 'Recruitee', workday: 'Workday', amazon: 'amazon.jobs', microsoft: 'Microsoft Careers', oracle: 'Oracle Recruiting', adzuna: 'Adzuna', jooble: 'Jooble' };

/* ------------------------------------------------------------------ board discovery */
const STOP = /\b(technologies|technology|tech|solutions|solution|services|systems|software|labs?|global|india|pvt|private|ltd|limited|inc|group|corp|corporation|company|the|consulting|digital|centre|center|gcc|research|and|development|innovation|engineering|technology center|see)\b/g;
function slugCandidates(name) {
  const base = String(name).replace(/\(.*?\)/g, '').replace(/[’'.]/g, '').toLowerCase().trim();
  const joined = base.replace(/&/g, 'and').replace(/[^a-z0-9]/g, '');
  const hyphen = base.replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const core = base.replace(STOP, ' ').replace(/[^a-z0-9]/g, '');
  const first = base.split(/[^a-z0-9]+/)[0];
  return uniq([joined, hyphen, core, first.length >= 4 ? first : null]).filter(s => s.length >= 2).slice(0, 4);
}
const BLOCKED = new Set(readJSON(SOURCES, {}).blockedBoards || []);
async function discover(company) {
  const found = [];
  const tries = [];
  for (const slug of slugCandidates(company.name)) for (const ats of ['greenhouse', 'lever', 'ashby', 'workable', 'smartrecruiters', 'recruitee']) tries.push({ ats, slug });
  for (const t of tries) {
    if (found.some(f => f.ats === t.ats) || BLOCKED.has(`${t.ats}/${t.slug}`)) continue;
    let jobs;
    try { jobs = await ATS[t.ats]({ slug: t.slug }); } catch { continue; }
    if (!jobs?.length) continue;
    const india = jobs.filter(j => indiaCity(j.loc)).length;
    if (!india) continue;
    if (t.ats === 'greenhouse') {
      try { const meta = await http(`https://boards-api.greenhouse.io/v1/boards/${t.slug}`); if (meta.name && !norm(meta.name).includes(norm(company.name).split(' ')[0])) continue; } catch { /* keep */ }
    }
    found.push({ ats: t.ats, slug: t.slug, india, total: jobs.length });
  }
  return found;
}

/* ------------------------------------------------------------------ aggregators (optional keys) */
async function aggregatorJobs(cfg, queries) {
  const out = [];
  const adzId = process.env.ADZUNA_APP_ID || cfg.ADZUNA_APP_ID, adzKey = process.env.ADZUNA_APP_KEY || cfg.ADZUNA_APP_KEY;
  const jooble = process.env.JOOBLE_KEY || cfg.JOOBLE_KEY;
  const used = [];
  if (adzId && adzKey) {
    used.push('Adzuna');
    for (const q of queries) {
      try {
        const d = await http(`https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${adzId}&app_key=${adzKey}&what=${encodeURIComponent(q)}&max_days_old=3&results_per_page=50&content-type=application/json`);
        for (const j of d.results || []) out.push({ ats: 'adzuna', company: j.company?.display_name, id: j.id, title: j.title, loc: j.location?.display_name + ' India', url: j.redirect_url, posted: j.created, desc: j.description });
      } catch (e) { log('  Adzuna', q, e.message); }
    }
  }
  if (jooble) {
    used.push('Jooble');
    for (const q of queries) {
      try {
        const d = await http(`https://jooble.org/api/${jooble}`, { method: 'POST', body: { keywords: q, location: 'India', datecreatedfrom: new Date(Date.now() - 3 * 864e5).toISOString().slice(0, 10) } });
        for (const j of d.jobs || []) out.push({ ats: 'jooble', company: j.company, id: j.id, title: j.title, loc: j.location + ' India', url: j.link, posted: j.updated, desc: j.snippet });
      } catch (e) { log('  Jooble', q, e.message); }
    }
  }
  return { jobs: out, used };
}

/* ------------------------------------------------------------------ hiring events (Google News RSS) */
// Only openings a fresher can act on: fresher jobs and drives, internships and hackathons. News about
// hiring (layoffs, results, statistics, opinions, winners) is dropped.
const EVENT_KINDS = [
  ['Hackathon', /hackathon|codevita|hackwithinfy|hack ?the ?\w+|coding (contest|challenge|competition|championship)|code ?jam|ideathon|codeathon|datathon|buildathon|designathon|capture the flag/i,
    /regist|appl(y|ication)|launch|announc|invit|calls? for|\bopen|last date|deadline|season \d|edition|20(2[6-8])|prize|participat|\bjoin (the|us|now)\b|how to|eligib|students can|teams can/i],
  ['Internship', /\bintern\b|internships?|summer (analyst|associate)|apprentice(ship)?s?\b|industrial training/i,
    /appl(y|ication)|regist|enrol|invit|calls? for|\bopen|launch|announc|offer|opportunit|opening|vacanc|hiring|hires?\b|recruit|stipend|eligib|last date|deadline|20(2[6-8])|program(me)?\b|scheme|how to|selection/i],
  ['Fresher job / drive', /off[\s-]?campus|walk[\s-]?in|hiring drive|recruitment drive|mass hiring|pool campus|mega drive|freshers?|graduate (engineer )?trainee|graduate program(me)?|trainee (program(me)?|engineer)|\bnqt\b|\bGET\b|entry[- ]level|new grads?|early[- ]career program|20(2[5-7]) (batch|pass ?outs?|graduates?)/i,
    /\bapply|applications?|regist|invit|calls? for|openings?|vacanc|\bdrive\b|walk[\s-]?in|eligib|last date|deadline|how to|selection process|(role|roles|jobs?|posts?) (at|in|for)\b/i],
];
const FRESHER_SIGNAL = /freshers?|graduates?|\bgrads?\b|batch|pass ?outs?|students?|trainees?|\bnqt\b|\bGET\b|entry[- ]level|off[\s-]?campus|pool campus|early[- ]career|no (prior )?experience|0\s*(-|–|to)\s*[12]\s*(years?|yrs)|zero experience/i;
const EVENT_NEWS = /layoffs?|laid[- ]off|job cuts|\bcuts?\b.*\bjobs?\b|\bfir(es|ed|ing)\b|retrench|hiring freeze|stocks?\b|shares?\b|price target|sensex|nifty|\bq[1-4]\b|quarter|revenue|profit|earnings|valuation|funding|\bipo\b|acqui(re|sition)|merger|visa|h-?1b|green[- ]card|immigration|survey|study finds|\breport(s|ed)?\b|research|data shows|\bsays\b|\bsaid\b|\bceo\b|\bcfo\b|chairman|opinion|explained|analysis|podcast|\bwinners?\b|\bwins\b|\bwon\b|\bwin (at|the|first|top|big)\b|\bwinning\b|\bjoins\b|emerge|\bplacements?\b|\bbags\b|clinch|finale|conclude|culminat|felicitat|\battend(s|ed)\b|inaugurat|celebrat|ceremony|highest (package|salary)|average (package|salary)|median salary|placement (rate|record|report|stat)|best colleges|top colleges|ranking|admission|merit list|cut-?off|senior citizens|seasonal|festive|delivery (partners?|executives?)|gig workers?|take part|took part|participated|\d[\d,]*\+?\s+(students|teams|participants|candidates)\s+(participate|join|attend|register)|doubled|hiked|protest|\bfir\b|\blanded\b|\btargets\b|to get (rs|₹|inr)|\?\s*$/i;
const EVENT_EXPERIENCED = /experienced|lateral|\bsenior\b|\bsr\.?\s|mid[- ]level|leadership|\bmanagers?\b|\bdirectors?\b|\bcxo\b|\b[1-9]\d?\s*\+?\s*(?:(-|–|to)\s*\d+\s*)?(years?|yrs)\b(?!\s*(old|of age|of (service|operations|presence|legacy)))/i;
const NOT_INDIA = /nigeria|pakistan|lahore|karachi|kenya|ghana|bangladesh|nepal|sri lanka|philippines|malaysia|mauritius|saudi|qatar|\bUAE\b|\bUSA?\b|\bUK\b|canada|australia/;
const NOT_PRIVATE_HIRING = /teacher|lecturer|vacanc(y|ies) in|sarkari|govt|government|police|railway|\bssc\b|upsc|\bpsc\b|army|navy|air force|constable|admit card|answer key|exam date|result 20\d\d|apply online for|notification out|bank recruitment|court|municipal|anganwadi|\bnhm\b|aiims|deputy manager & manager/i;
const EVENT_TREND = /%|per ?cent|growth|growing|trends?\b|outlook|sentiment|slowdown|declin|surge|\bjumps?\b|\bdips?\b|boost|\bcould\b|\bmay\b|\bwill\b|\bplans?\b|\bto hire\b|expects?|likely|\bamid\b|hiring (rises|falls|up|down)|demand for|market|\bvs\b|why |what |how (engineering|freshers|students|ai)|shifts?\b|reshap|raises|\bvar(y|ies)\b|needed|skills? gap|expand|invest|commit|spree|\bbegins?\b|\bbegan\b|kicks? off|underway|organi[sz]ed|\bhosts?\b|hosted|internal hackathon|finalists?|shortlist|showcase|to be held/i;
const EVENT_APPLY = /\bapply\b|applications? (open|invited)|call for applications|regist(er|ration)|walk[\s-]?in|off[\s-]?campus drive|last date|deadline|eligibility|how to apply|selection process/i;
function eventType(title) {
  const t = String(title || ''), clean = t.replace(/\b0\s*(-|–|to)\s*[12]\s*(years?|yrs)\b/gi, '');
  if (EVENT_NEWS.test(t) || EVENT_EXPERIENCED.test(clean) || NOT_INDIA.test(t) || NOT_PRIVATE_HIRING.test(t)) return null;
  if (EVENT_TREND.test(t) && !EVENT_APPLY.test(t)) return null;
  for (const [type, what, open] of EVENT_KINDS) {
    if (!what.test(t)) continue;
    if (!open.test(t)) return null;
    if (type === 'Fresher job / drive' && !FRESHER_SIGNAL.test(t)) return null;
    return type;
  }
  return null;
}
function parseRSS(xml) {
  const items = [];
  for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const x = m[1], get = tag => (x.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`)) || [])[1] || '';
    const source = stripHTML(get('source'));
    let title = stripHTML(get('title').replace(/<!\[CDATA\[|\]\]>/g, ''));
    if (source && title.endsWith(' - ' + source)) title = title.slice(0, -(source.length + 3));
    items.push({ title, url: stripHTML(get('link')), date: isoDay(get('pubDate')), source });
  }
  return items;
}
const gnews = q => `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-IN&gl=IN&ceid=IN:en`;
function newsName(c) { return c.name.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+in India$/i, '').trim(); }

/* ------------------------------------------------------------------ main */
if (require.main !== module) module.exports = { eventType, assess, minYears, dedupeJobs };
else (async () => {
  const dataset = readJSON(DATASET, null);
  if (!dataset) { console.error('Dataset not found: ' + DATASET); process.exit(1); }
  log(`Job scan started (${scanTrigger()})`);
  const sources = readJSON(SOURCES, { boards: [] });
  const cfg = readJSON(CONFIG, {});
  const prev = readJSON(OUT, { jobs: [], events: [] });
  const firstSeen = new Map(prev.jobs.map(j => [j.key, j.first]));
  const companies = dataset.companies.filter(c => !opt('only') || c.id === opt('only'));
  const byNorm = new Map(dataset.companies.map(c => [norm(c.name), c]));
  const errors = [];

  /* 1. job boards */
  const atsMap = readJSON(ATS_MAP, { generatedAt: null, boards: {} });
  const curated = {};
  for (const b of sources.boards) {
    const c = byNorm.get(norm(b.company));
    if (!c) { log('! curated company not in dataset:', b.company); continue; }
    (curated[c.id] ||= []).push(b);
  }
  const ageDays = atsMap.generatedAt ? (Date.now() - Date.parse(atsMap.generatedAt)) / 864e5 : Infinity;
  if (!flag('no-discover') && (flag('discover') || ageDays > DISCOVERY_MAX_AGE_DAYS)) {
    const todo = companies.filter(c => !curated[c.id]);
    log(`Discovering job boards for ${todo.length} companies…`);
    let done = 0;
    await pool(todo, 12, async c => {
      const found = await discover(c);
      atsMap.boards[c.id] = found;
      if (found.length) log(`  + ${c.name}: ${found.map(f => `${f.ats}/${f.slug} (${f.india} in India)`).join(', ')}`);
      if (++done % 50 === 0) log(`  … ${done}/${todo.length}`);
    });
    if (!opt('only')) atsMap.generatedAt = new Date().toISOString();
    fs.writeFileSync(ATS_MAP, JSON.stringify(atsMap, null, 1));
  }

  const boardsFor = c => [...(curated[c.id] || []), ...(atsMap.boards[c.id] || []).filter(b => !BLOCKED.has(`${b.ats}/${b.slug}`))];
  const claimed = new Map();
  const tracked = companies.filter(c => boardsFor(c).length);
  log(`Fetching openings from ${tracked.length} companies with a public job board…`);
  const jobs = [], coverage = {};
  const boardCache = new Map();
  await pool(tracked, 8, async c => {
    const cov = coverage[c.id] = { boards: [], jobs: 0, scanned: 0 };
    for (const b of boardsFor(c)) {
      const bkey = JSON.stringify(b, ['ats', 'slug', 'host', 'site']);
      cov.boards.push({ ats: b.ats, label: ATS_LABEL[b.ats], url: boardURL(b) });
      let raw;
      try {
        if (!boardCache.has(bkey)) boardCache.set(bkey, ATS[b.ats](b));
        raw = await boardCache.get(bkey);
      } catch (e) { errors.push(`${c.name} (${ATS_LABEL[b.ats]}): ${e.message}`); continue; }
      if (claimed.has(bkey) && claimed.get(bkey) !== c.id) { cov.sharedWith = claimed.get(bkey); continue; }
      claimed.set(bkey, c.id);
      const india = raw.filter(j => indiaCity(j.loc));
      cov.scanned += india.length;
      const bank = c.categories.some(x => /BFSI/.test(x)) || /bank|financial|capital|invest|trust|chase|morgan|citi|barclays|hsbc|ubs|schwab|fidelity/i.test(c.name);
      const items = india.map(j => {
        const hint = j.hint || (bank && /\banalyst\b/i.test(j.title) ? { level: 'Fresher / entry level', why: 'At banks and financial firms “Analyst” is the entry-level title — confirm the experience in the JD' } : null);
        return { j, hint, desc: j.desc, a: assess(j.title, j.desc, hint) };
      });
      // Read the full JD for listings without one, including ones already kept on their title, so an
      // experience requirement in the JD can still rule them out.
      const toDetail = items.filter(x => x.j.detail && needsDetail(x.j.title) && stripHTML(x.desc).length < 400)
        .sort((a, b) => !!b.a - !!a.a).slice(0, 140);
      await pool(toDetail, 6, async x => {
        try { x.desc = `${x.desc || ''} ${await x.j.detail()}`; x.a = assess(x.j.title, x.desc, x.hint); } catch { /* keep listing-only verdict */ }
      });
      for (const { j, a, desc } of items) {
        if (flag('debug')) log(`    ${a ? 'KEEP' : 'skip'} ${j.title} · ${desc ? `min ${minYears(desc)} yrs` : 'no JD'}${a ? ' · ' + a.why : ''}`);
        if (!a) continue;
        jobs.push(makeJob(c, b.ats, j, a, desc));
        cov.jobs++;
      }
    }
    log(`  ${c.name}: ${cov.jobs} fresher/intern openings (from ${cov.scanned} India postings)`);
  });

  /* 2. aggregators */
  const agg = await aggregatorJobs(cfg, sources.aggregatorQueries || []);
  for (const j of agg.jobs) {
    if (!indiaCity(j.loc)) continue;
    const a = assess(j.title, j.desc); if (!a) continue;
    const c = byNorm.get(norm(j.company)) || null;
    jobs.push(makeJob(c, j.ats, j, a, j.desc, j.company));
  }

  function makeJob(c, ats, j, a, desc, companyName) {
    const key = `${ats}:${c ? c.id : norm(companyName)}:${j.id}`;
    const { track, roles } = trackOf(j.title, stripHTML(desc).slice(0, 400));
    const city = indiaCity(j.loc);
    return {
      key, cid: c ? c.id : null, company: c ? c.name : (companyName || 'Unknown company'), title: String(j.title).trim(),
      loc: uniq(String(j.loc).replace(/\(do not use\)/gi, '').split('|').map(s => s.replace(/\s+/g, ' ').trim())).filter(s => s && s !== 'India').slice(0, 3).join(' · ') || 'India',
      city: MAIN_CITIES.includes(city) ? city : city || 'Other India', remote: /remote/i.test(j.loc),
      url: j.url, posted: isoDay(j.posted), source: ATS_LABEL[ats], level: a.level, why: a.why, yrs: a.yrs ?? null,
      track, roles, kw: jobKeywords(`${j.title} ${stripHTML(desc || '')}`), first: firstSeen.get(key) || today,
    };
  }

  // de-duplicate (same company + title + city, and the same apply URL)
  const finalJobs = dedupeJobs(jobs)
    .sort((a, b) => (b.first || '').localeCompare(a.first || '') || (b.posted || '').localeCompare(a.posted || '') || a.company.localeCompare(b.company));
  for (const cov of Object.values(coverage)) cov.jobs = 0;
  for (const j of finalJobs) if (j.cid && coverage[j.cid]) coverage[j.cid].jobs++;

  /* 3. hiring events */
  let events = (prev.events || []).map(e => ({ ...e, type: eventType(e.title) })).filter(e => e.type);
  if (!flag('no-events')) {
    log('Collecting hiring events & drives from Google News…');
    const found = new Map();
    const cutoff = isoDay(Date.now() - EVENT_MAX_AGE_DAYS * 864e5);
    const nameRes = dataset.companies.map(c => {
      const n = newsName(c);
      return { c, re: n.length >= 3 || /^[A-Z]{2,}$/.test(n) ? new RegExp(`(^|[^A-Za-z0-9])${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^A-Za-z0-9])`) : null };
    }).filter(x => x.re);
    const add = (it, cids, q) => {
      if (!it.title || !it.date || it.date < cutoff) return;
      const type = eventType(it.title); if (!type) return;
      const k = norm(it.title).slice(0, 90);
      const e = found.get(k) || { id: 'e' + found.size, title: it.title, url: it.url, source: it.source, date: it.date, type, cids: [], q };
      e.cids = uniq([...e.cids, ...cids]);
      found.set(k, e);
    };
    const queries = [
      ...(sources.generalNews || []).map(q => ({ q: q + ' when:14d' })),
      ...companies.map(c => ({ c, q: `${sources.newsAliases?.[c.name] ? `(${sources.newsAliases[c.name]})` : `"${newsName(c)}"`} (freshers OR "off campus" OR internship OR hackathon OR "walk-in" OR "graduate trainee" OR "recruitment drive" OR "hiring drive" OR "2026 batch" OR "2027 batch") when:${EVENT_MAX_AGE_DAYS}d` })),
    ];
    let failed = 0;
    await pool(queries, 4, async ({ c, q }) => {
      let xml;
      try { xml = await http(gnews(q), { type: 'text', retries: 3 }); } catch (e) { failed++; return; }
      await sleep(250);
      for (const it of parseRSS(xml)) {
        const hits = nameRes.filter(x => x.re.test(it.title)).map(x => x.c.id);
        if (c) { if (hits.includes(c.id)) add(it, [c.id], q); }
        else add(it, hits, q);
      }
    });
    if (failed) errors.push(`Google News: ${failed} of ${queries.length} searches failed`);
    events = [...found.values()].sort((a, b) => b.date.localeCompare(a.date));
    const perCo = {};
    events = events.filter(e => !e.cids.length || e.cids.some(id => (perCo[id] = (perCo[id] || 0) + 1) <= 10)).slice(0, 1500);
    log(`  ${events.length} events (${events.filter(e => e.cids.length).length} linked to companies in the map)`);
  }
  for (const e of events) for (const id of e.cids) (coverage[id] ||= { boards: [], jobs: 0, scanned: 0 }).events = ((coverage[id].events) || 0) + 1;

  /* 4. write */
  // Jobs found on the first day of the feed are the baseline, not "new".
  const baselineDate = prev.baselineDate || (prev.jobs.length ? prev.date : today);
  const firstRun = baselineDate === today;
  const scannedAt = new Date().toISOString();
  const result = {
    generatedAt: scannedAt, lastScanned: scannedAt, trigger: scanTrigger(), date: today, baselineDate, firstRun, durationSec: Math.round((Date.now() - t0) / 1000),
    sources: { boards: uniq(Object.values(coverage).flatMap(c => c.boards.map(b => b.label))), aggregators: agg.used, news: 'Google News (India edition)' },
    totals: { jobs: finalJobs.length, newToday: firstRun ? 0 : finalJobs.filter(j => j.first === today).length, companiesWithJobs: new Set(finalJobs.map(j => j.cid).filter(Boolean)).size, trackedCompanies: tracked.length, events: events.length, requests: stats.requests },
    coverage, errors: errors.slice(0, 200), jobs: finalJobs, events,
  };
  if (opt('only')) { console.log(JSON.stringify({ ...result, coverage: undefined }, null, 1).slice(0, 4000)); return; }
  if (prev.jobs.length >= 10 && finalJobs.length === 0) {
    const msg = `Scan returned no openings (previous feed has ${prev.jobs.length}). Kept the previous feed.`;
    log(msg);
    writeScanStatus({ ok: false, error: msg, previousJobs: prev.jobs.length, errorCount: errors.length });
    fs.appendFileSync(LOG, logLines.join('\n') + '\n\n');
    process.exit(1);
  }
  const tmp = OUT + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(result));
  fs.renameSync(tmp, OUT);
  log(`Done in ${result.durationSec}s · ${result.totals.jobs} openings (${result.totals.newToday} new) at ${result.totals.companiesWithJobs} companies · ${events.length} events · ${errors.length} errors`);
  writeScanStatus({
    ok: true, lastScanned: scannedAt, durationSec: result.durationSec, totals: result.totals,
    errorCount: errors.length, previousJobs: prev.jobs.length,
  });
  fs.appendFileSync(LOG, logLines.join('\n') + '\n\n');
})().catch(e => {
  console.error(e);
  try {
    fs.appendFileSync(LOG, `[${new Date().toISOString()}] FAILED ${e.stack}\n\n`);
    writeScanStatus({ ok: false, error: e.message || String(e) });
  } catch (err) { console.error(err); }
  process.exit(1);
});

function boardURL(b) {
  return {
    greenhouse: `https://boards.greenhouse.io/${b.slug}`, lever: `https://jobs.lever.co/${b.slug}`, ashby: `https://jobs.ashbyhq.com/${b.slug}`,
    smartrecruiters: `https://careers.smartrecruiters.com/${b.slug}`, workable: `https://apply.workable.com/${b.slug}`, recruitee: `https://${b.slug}.recruitee.com`,
    workday: b.host && `https://${b.host}/${b.site}`, amazon: 'https://www.amazon.jobs/en/locations/india', microsoft: 'https://jobs.careers.microsoft.com/global/en/search?lc=India',
    oracle: b.host && `https://${b.host}/hcmUI/CandidateExperience/en/sites/${b.site}`,
  }[b.ats] || null;
}
