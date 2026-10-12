'use strict';

const DATA_URL = 'Company_Role_Skill_Mind_Map_Data_2026.json';
const CITIES = ['Hyderabad', 'Bengaluru', 'Chennai'];
const ANIM_MS = 420;
const GAP_X = 52, GAP_Y = 12, CHEV = 25;

const ROLE_GROUPS = [
  ['Software development', ['frontend', 'backend', 'full-stack', 'android', 'ios', 'game-developer', 'server-side-game-developer', 'blockchain', 'forward-deployed-engineer']],
  ['Data & AI', ['data-analyst', 'bi-analyst', 'data-engineer', 'ai-engineer', 'ai-data-scientist', 'machine-learning', 'mlops', 'inference-engineering', 'postgresql-dba']],
  ['Infrastructure & security', ['devops', 'devsecops', 'cyber-security', 'network-engineer', 'software-architect']],
  ['Quality, design & product', ['qa', 'product-design', 'ux-design', 'product-manager', 'technical-writer', 'devrel', 'engineering-manager', 'seo']],
  ['Enterprise platforms (CRM, ITSM, ERP)', ['servicenow-developer', 'salesforce-developer', 'sap-abap-developer', 'rpa-developer']],
];
const EXTRA_ROLES = [
  ['ServiceNow Developer', 'servicenow-developer'], ['Salesforce Developer (PD1)', 'salesforce-developer'],
  ['SAP ABAP Developer', 'sap-abap-developer'], ['RPA Developer (UiPath)', 'rpa-developer'],
];
const SKILL_GROUPS = [
  ['Programming languages', ['python', 'java', 'javascript', 'typescript', 'c', 'cpp', 'golang', 'rust', 'kotlin', 'php', 'ruby', 'scala', 'r-programming', 'swift-ui', 'shell-bash']],
  ['Frontend & mobile', ['html', 'css', 'react', 'vue', 'angular', 'nextjs', 'react-native', 'flutter', 'design-system']],
  ['Backend & APIs', ['nodejs', 'spring-boot', 'aspnet-core', 'django', 'laravel', 'ruby-on-rails', 'api-design', 'graphql', 'wordpress']],
  ['Data & databases', ['sql', 'mongodb', 'redis', 'elasticsearch', 'python-data-analysis', 'power-bi']],
  ['Cloud & DevOps', ['linux', 'docker', 'kubernetes', 'aws', 'terraform', 'cloudflare', 'git-github']],
  ['CS fundamentals & interviews', ['computer-science', 'datastructures-and-algorithms', 'leetcode', 'system-design', 'software-design-architecture', 'code-review']],
  ['AI tools & agents', ['claude-code', 'vibe-coding', 'openclaw', 'ai-product-builder', 'prompt-engineering', 'ai-red-teaming', 'ai-agents']],
];

// 80-hour lecture plan: 4 weeks × 5 weekdays × 4 one-hour lectures, no practice blocks.
const LEVELS = [['Beginner', 'Foundations'], ['Intermediate', 'Core skills'], ['Advanced', 'Applied depth'], ['Expert', 'Industry-ready mastery']];
const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const SLOTS = ['09:00 – 10:00', '10:00 – 11:00', '11:15 – 12:15', '12:15 – 13:15'];
const TOTAL_HOURS = 80;

const ROLE_SKILLS = {
  frontend: ['html', 'css', 'javascript', 'typescript', 'react', 'nextjs', 'git-github'],
  backend: ['java', 'python', 'nodejs', 'sql', 'api-design', 'redis', 'docker', 'system-design'],
  'full-stack': ['html', 'css', 'javascript', 'typescript', 'react', 'nodejs', 'sql', 'mongodb', 'docker'],
  android: ['kotlin', 'java', 'api-design', 'git-github'],
  ios: ['swift-ui', 'api-design', 'git-github'],
  'game-developer': ['cpp', 'computer-science', 'datastructures-and-algorithms'],
  'server-side-game-developer': ['cpp', 'golang', 'redis', 'docker', 'kubernetes', 'system-design'],
  blockchain: ['javascript', 'typescript', 'rust', 'golang'],
  'forward-deployed-engineer': ['python', 'sql', 'api-design', 'docker', 'aws', 'prompt-engineering', 'ai-agents'],
  devops: ['linux', 'shell-bash', 'git-github', 'docker', 'kubernetes', 'terraform', 'aws', 'python'],
  devsecops: ['linux', 'docker', 'kubernetes', 'terraform', 'aws', 'git-github', 'python'],
  'cyber-security': ['linux', 'python', 'shell-bash', 'computer-science'],
  'network-engineer': ['linux', 'python', 'cloudflare', 'aws'],
  'software-architect': ['system-design', 'software-design-architecture', 'api-design', 'aws', 'kubernetes'],
  qa: ['python', 'java', 'javascript', 'sql', 'api-design', 'git-github'],
  'data-analyst': ['sql', 'python-data-analysis', 'power-bi', 'python'],
  'bi-analyst': ['sql', 'power-bi', 'python-data-analysis'],
  'data-engineer': ['python', 'sql', 'scala', 'mongodb', 'aws', 'docker'],
  'ai-engineer': ['python', 'prompt-engineering', 'ai-agents', 'api-design', 'docker'],
  'ai-data-scientist': ['python', 'python-data-analysis', 'r-programming', 'sql'],
  'machine-learning': ['python', 'python-data-analysis', 'sql', 'docker'],
  mlops: ['python', 'docker', 'kubernetes', 'aws', 'terraform', 'linux'],
  'inference-engineering': ['python', 'cpp', 'docker', 'kubernetes'],
  'postgresql-dba': ['sql', 'linux', 'shell-bash'],
  'product-design': ['design-system', 'html', 'css'],
  'ux-design': ['design-system', 'html', 'css'],
  'product-manager': ['sql', 'ai-product-builder', 'prompt-engineering'],
  'technical-writer': ['git-github', 'api-design', 'html'],
  devrel: ['javascript', 'python', 'api-design', 'git-github'],
  'engineering-manager': ['system-design', 'software-design-architecture', 'code-review'],
  seo: ['html', 'wordpress', 'python-data-analysis'],
  'servicenow-developer': ['javascript', 'sql', 'api-design', 'git-github'],
  'salesforce-developer': ['java', 'javascript', 'sql', 'api-design', 'git-github'],
  'sap-abap-developer': ['sql', 'software-design-architecture', 'api-design'],
  'rpa-developer': ['python', 'sql', 'api-design', 'git-github'],
};
const ROLE_FAMILY = {
  qa: 'qa', 'data-analyst': 'data', 'bi-analyst': 'data', 'ai-data-scientist': 'data', seo: 'marketing',
  ...Object.fromEntries(['frontend', 'backend', 'full-stack', 'android', 'ios', 'game-developer', 'server-side-game-developer', 'blockchain',
    'forward-deployed-engineer', 'devops', 'devsecops', 'cyber-security', 'network-engineer', 'software-architect', 'data-engineer',
    'ai-engineer', 'machine-learning', 'mlops', 'inference-engineering', 'postgresql-dba',
    'servicenow-developer', 'salesforce-developer', 'sap-abap-developer', 'rpa-developer'].map(s => [s, 'software'])),
};

// Role title -> family, role roadmaps and core skills. `fallback` rules only apply when no family matched yet.
const ROLE_RULES = [
  { re: /recruit|sourcing/i, family: 'talent', roadmaps: [], skills: [] },
  { re: /servicenow|service now/i, family: 'software', roadmaps: ['servicenow-developer'], skills: ['javascript', 'sql', 'api-design'] },
  { re: /salesforce|sfdc|\bpd ?1\b/i, family: 'software', roadmaps: ['salesforce-developer'], skills: ['java', 'javascript', 'sql'] },
  { re: /\bsap\b|abap/i, family: 'software', roadmaps: ['sap-abap-developer'], skills: ['sql'] },
  { re: /\brpa\b|uipath|automation anywhere/i, family: 'software', roadmaps: ['rpa-developer'], skills: ['python', 'sql'] },
  { re: /seo|marketing/i, family: 'marketing', roadmaps: ['seo'], skills: ['python-data-analysis'] },
  { re: /embedded|vlsi/i, family: 'embedded', roadmaps: [], skills: ['c', 'cpp', 'linux', 'computer-science'] },
  { re: /\bqa\b|test|sdet|validation/i, family: 'qa', roadmaps: ['qa'], skills: ['python', 'sql', 'git-github'] },
  { re: /cloud/i, roadmaps: ['devops'], skills: ['linux', 'aws'] },
  { re: /analyst/i, family: 'data', roadmaps: ['data-analyst', 'bi-analyst'], skills: ['sql', 'python-data-analysis', 'power-bi'] },
  { re: /frontend|web developer/i, family: 'software', roadmaps: ['frontend'], skills: ['html', 'css', 'javascript', 'react'] },
  { re: /backend/i, family: 'software', roadmaps: ['backend'], skills: ['nodejs', 'api-design', 'sql'] },
  { re: /support/i, family: 'qa', roadmaps: [], skills: ['linux', 'sql', 'api-design'] },
  { re: /software|sde|developer|engineer|technology intern|trainee/i, fallback: true, family: 'software', roadmaps: ['backend', 'full-stack'], skills: ['datastructures-and-algorithms', 'java', 'python', 'sql', 'git-github'] },
];

const SKILL_RULES = [
  [/\bsql\b|dbms|relational|database/i, ['sql']],
  [/\bgit\b|github/i, ['git-github']],
  [/\bdsa\b|data structure|algorithm|complexity/i, ['datastructures-and-algorithms']],
  [/\bapis?\b|\brest\b/i, ['api-design']],
  [/python/i, ['python']],
  [/\bjava\b(?!script)/i, ['java']],
  [/javascript/i, ['javascript']],
  [/typescript/i, ['typescript']],
  [/c\/c\+\+/i, ['c', 'cpp']],
  [/c\+\+/i, ['cpp']],
  [/linux|unix/i, ['linux']],
  [/cloud|\baws\b/i, ['aws']],
  [/docker|container/i, ['docker']],
  [/kubernetes/i, ['kubernetes']],
  [/\boop\b|object.oriented/i, ['software-design-architecture']],
  [/^programming$|operating system|computer science/i, ['computer-science']],
  [/distributed|system design|multitier|scalab/i, ['system-design']],
  [/reporting|power ?bi|dashboard/i, ['power-bi']],
  [/analytics|data analysis|pandas/i, ['python-data-analysis']],
  [/react/i, ['react']],
  [/node/i, ['nodejs']],
  [/\bhtml\b/i, ['html']],
  [/\bcss\b/i, ['css']],
  [/embedded/i, ['c']],
  [/llm|genai|prompt/i, ['prompt-engineering']],
];

const HR_ROUND = ['HR & culture fit', ['Introduce yourself in 90 seconds', 'Why this company and this role', 'Behavioural stories using the STAR method']];
const FAMILY = {
  software: { label: 'Software engineering', rounds: [
    ['Online assessment', ['Quantitative aptitude & logical reasoning', '2–3 coding problems: arrays, strings, hashing', 'MCQs on OOP, DBMS, OS and networks']],
    ['Technical interview', ['Data structures & algorithms in an editor', 'Deep-dive into one of your projects', 'Clean code and edge-case testing']],
    ['Technical / design round', ['OOP principles and simple class design', 'SQL queries, joins and indexing', 'How the web works: HTTP, APIs, caching']],
    HR_ROUND] },
  qa: { label: 'Quality & support', rounds: [
    ['Online assessment', ['Aptitude & logical reasoning', 'Basic coding: strings and loops', 'Testing MCQs: SDLC, STLC, test levels']],
    ['Testing fundamentals', ['Write test cases for a login page', 'Bug life cycle, severity vs priority', 'Boundary values & equivalence partitioning']],
    ['Automation & tools', ['Selenium / Playwright basics', 'API testing with Postman', 'SQL for test-data validation']],
    HR_ROUND] },
  data: { label: 'Data & analytics', rounds: [
    ['Online assessment', ['Quantitative aptitude & data interpretation', 'SQL query problems', 'Excel and statistics MCQs']],
    ['SQL & analysis round', ['Joins, GROUP BY and window functions', 'Clean and explore a messy dataset', 'Explain a metric and its pitfalls']],
    ['Case & dashboard round', ['Diagnose a sudden metric drop', 'Walk through a dashboard you built', 'Present insights to stakeholders']],
    HR_ROUND] },
  marketing: { label: 'Digital marketing', rounds: [
    ['Assignment or test', ['Keyword research for a sample brand', 'Write ad copy and meta descriptions', 'Marketing math: CTR, CPC, ROAS']],
    ['Functional interview', ['SEO: on-page, technical, off-page', 'Google Ads / Meta Ads campaign structure', 'GA4 events and conversions']],
    ['Portfolio review', ['A blog, site or campaign you grew', 'Explain results with numbers', 'Tools you have used']],
    HR_ROUND] },
  embedded: { label: 'Embedded & VLSI', rounds: [
    ['Online assessment', ['Aptitude & reasoning', 'C programming output questions', 'Digital electronics MCQs']],
    ['Technical interview', ['Pointers, memory and bit manipulation', 'Microcontrollers, interrupts and timers', 'UART, SPI and I2C protocols']],
    ['Domain round', ['RTOS basics and scheduling', 'Digital design / Verilog (for VLSI)', 'Explain your hardware project']],
    HR_ROUND] },
  talent: { label: 'Talent acquisition', rounds: [
    ['Screening call', ['Communication and clarity', 'Interest in HR & recruiting', 'Availability and expectations']],
    ['Functional round', ['Sourcing on LinkedIn and job portals', 'Boolean search strings', 'Screening a resume against a JD']],
    ['Role play', ['Cold-call a candidate', 'Handle a salary discussion', 'Coordinate an interview schedule']],
    HR_ROUND] },
};

const CONCEPT_NOTES = {
  'project portfolio': 'Build 2–3 projects that match the role you want. Host them on GitHub with a clear README, screenshots and a live demo link, and be ready to explain every design decision.',
  'testing': 'Understand unit, integration and end-to-end tests. Write tests for your own projects with one framework (JUnit, PyTest or Jest) and learn how to read a failing test.',
  'excel': 'Master lookups (XLOOKUP / VLOOKUP), pivot tables, conditional formatting, charts and the everyday formulas used in reporting.',
  'aptitude': 'Practise quantitative aptitude (percentages, ratios, time & work, probability), logical reasoning and verbal ability daily with timed sets.',
  'communications': 'Practise structured answers, professional email writing and explaining technical work simply. Record yourself answering common questions and review it.',
  'communication': 'Practise structured answers, professional email writing and explaining your work simply. Record yourself answering common questions and review it.',
  'finance/data basics': 'Learn core finance terms (P&L, balance sheet, KYC, transactions, risk) and how data moves through banking and insurance systems.',
  'seo': 'Learn how search engines crawl, index and rank pages: keyword research, on-page optimisation, technical SEO and link building.',
  'google ads': 'Understand campaign → ad group → ad structure, keyword match types, bidding strategies, Quality Score and conversion tracking.',
  'meta ads': 'Learn Facebook/Instagram campaign objectives, audience targeting, creative testing, the Meta Pixel and reading Ads Manager reports.',
  'ga4': 'Learn GA4 events, conversions, explorations and acquisition reports, and how to connect GA4 with Google Ads and Search Console.',
  'content': 'Practise writing search-friendly blog posts, social captions and landing-page copy. Learn content calendars and basic editing tools.',
  'embedded or domain basics': 'Revise digital electronics, microcontroller architecture, C programming and the basics of the domain the company works in (automotive, semiconductors, devices).',
  'control systems': 'Revise transfer functions, feedback loops, stability (Bode / root locus) and PID control, ideally with a small MATLAB/Simulink exercise.',
  'sourcing': 'Learn to find candidates on LinkedIn, Naukri and GitHub using Boolean search strings, and to write outreach messages that get replies.',
  'ats/crm': 'Get familiar with how applicant-tracking systems (Greenhouse, Lever, Zoho Recruit) move a candidate through pipeline stages and reports.',
  'screening': 'Practise matching a resume against a job description, asking qualifying questions and summarising a candidate for a hiring manager.',
  'healthcare data awareness': 'Learn healthcare data basics: patient records (EHR), claims, HIPAA-style privacy rules and common standards such as HL7 / FHIR.',
};

const KIND_LABEL = {
  root: 'Mind map', city: 'City', category: 'Company category', group: 'Group', company: 'Company', section: 'Branch',
  role: 'Fresher role', jd: 'Verified job posting', roadmap: 'Role roadmap', skill: 'Skill roadmap', overview: 'Complete guide',
  week: 'Teaching week', day: 'Teaching day', hour: 'Lecture hour', stage: 'Interview stage', concept: 'Preparation area', info: 'Detail', library: 'Library',
  job: 'Live opening', event: 'Opening / drive', hub: 'Team', tool: 'Tool',
};

/* ------------------------------------------------------------------ state */
const S = {
  data: null, root: null, nodes: new Map(), sel: null, path: new Set(),
  cam: { x: 0, y: 0, k: 1 }, camFrom: null, camGoal: null,
  focus: localStorage.getItem('atlas.focus') !== '0',
  learned: new Set(JSON.parse(localStorage.getItem('atlas.learned.v2') || '[]')),
  ROLE: {}, SKILL: {}, index: [], dragMoved: false,
};
const R = new Map();
const $ = s => document.querySelector(s);
const svg = $('#map'), viewport = $('#viewport'), edgesLayer = $('#edges'), nodesLayer = $('#nodes');
const stage = $('#stage'), panel = $('#panel'), app = $('#app');
const NS = 'http://www.w3.org/2000/svg';

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uniq = a => [...new Set(a.filter(Boolean))];
const slugify = t => String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const short = (t, n) => (t.length > n ? t.slice(0, n - 1).trim() + '…' : t);
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const byName = (a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });

/* ------------------------------------------------------------------ tree model */
function mk(parent, key, title, kind, o = {}) {
  const id = parent ? parent.id + '/' + key : key;
  const n = { id, key, title, kind, parent, depth: parent ? parent.depth + 1 : 0, children: null, factory: o.factory || null,
    expanded: false, data: o.data || {}, sub: o.sub || '', has: o.has || null, rx: null, ry: null, ro: 0 };
  S.nodes.set(id, n);
  return n;
}
function kids(n) {
  if (!n.children) n.children = n.factory ? n.factory(n).filter(Boolean) : [];
  return n.children;
}
const hasKids = n => !!n.factory && kids(n).length > 0;
const lineage = n => { const a = []; for (let x = n; x; x = x.parent) a.unshift(x); return a; };

function grouped(p, items, noun, size = 12, threshold = 16) {
  if (items.length <= threshold) return items.map(it => it.build(p));
  const chunks = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  if (chunks.length > 1 && chunks.at(-1).length < 4) chunks[chunks.length - 2].push(...chunks.pop());
  const initial = s => { const c = (s.trim()[0] || '#').toUpperCase(); return /[A-Z]/.test(c) ? c : '#'; };
  return chunks.map((ch, i) => {
    const a = initial(ch[0].name), b = initial(ch.at(-1).name);
    return mk(p, 'g:' + i, a === b ? `${a}  ·  ${ch.length} ${noun}` : `${a} – ${b}  ·  ${ch.length} ${noun}`, 'group', {
      sub: `${ch[0].name} … ${ch.at(-1).name}`, has: new Set(ch.map(c => c.key)), data: { names: ch.map(c => c.name), noun },
      factory: g => ch.map(c => c.build(g)),
    });
  });
}

function skillSlugsFor(text) {
  const t = String(text || '').trim();
  if (!t) return [];
  const direct = S.data.catalog.skill.find(s => s.name.toLowerCase() === t.toLowerCase());
  if (direct) return [direct.slug];
  const out = [];
  for (const [re, sl] of SKILL_RULES) if (re.test(t)) out.push(...sl);
  return uniq(out).filter(s => S.SKILL[s]);
}
function splitItems(text, sep) {
  const seen = new Set();
  return String(text || '').split(sep).map(s => s.replace(/—.*$/, '').trim()).filter(s => {
    const k = s.toLowerCase(); if (!s || seen.has(k)) return false; seen.add(k); return true;
  });
}
function prepItems(c) {
  const skills = [], concepts = [];
  for (const item of splitItems(c.prep.join(';'), ';')) {
    const sl = skillSlugsFor(item);
    if (sl.length) skills.push(...sl); else concepts.push(item);
  }
  return { skills: uniq(skills), concepts: uniq(concepts) };
}
function splitRoles(c) {
  return uniq(c.roleTargets.join(',').split(/,\s*(?![^()]*\))/).map(s => s.trim()));
}
function planFor(title, c) {
  let family = null; const roadmaps = [], skills = [];
  for (const r of ROLE_RULES) {
    if (r.fallback && family) continue;
    if (r.re.test(title)) { if (r.family && !family) family = r.family; roadmaps.push(...r.roadmaps); skills.push(...r.skills); }
  }
  const prep = c ? prepItems(c) : { skills: [], concepts: [] };
  return {
    family: family || 'software',
    roadmaps: uniq(roadmaps).filter(s => S.ROLE[s]),
    skills: uniq([...skills, ...prep.skills]).filter(s => S.SKILL[s]).slice(0, 8),
    concepts: prep.concepts,
  };
}

// Three team hubs. Each hub's `has` lists the keys reachable below it, so saved paths such as
// ['roles', 'rr:backend'] or ['city:Chennai', …] still resolve from the root.
function buildRoot() {
  const cityKeys = CITIES.map(c => 'city:' + c);
  return mk(null, 'root', 'Fresher Career Atlas 2026', 'root', {
    sub: 'Outreach · Training · Profile development',
    factory: r => [
      mk(r, 'outreach', 'Outreach team', 'hub', {
        sub: 'Jobs & openings for freshers', data: { hub: 'outreach' },
        has: new Set(['live', 'loc', 'jds', 'events', ...cityKeys, ...CITIES.map(c => 'lc:' + c)]),
        factory: o => [
          liveOpeningsNode(o),
          locationsNode(o),
          mk(o, 'jds', 'Verified job openings', 'library', { sub: `${S.data.metadata.jobEvidence} sourced job descriptions`, factory: jdsLibrary }),
          eventsNode(o),
        ],
      }),
      mk(r, 'training', 'Training', 'hub', {
        sub: 'Role & skill roadmaps · 80-hour timetables', data: { hub: 'training' }, has: new Set(['roles', 'skills', 'tbuild']),
        factory: t => [
          mk(t, 'roles', 'Role roadmaps', 'library', { sub: `${S.data.catalog.role.length} career paths`, factory: rolesLibrary }),
          mk(t, 'skills', 'Skill roadmaps', 'library', { sub: `${S.data.catalog.skill.length} skills`, factory: skillsLibrary }),
          mk(t, 'tbuild', 'Timetable builder', 'tool', { sub: 'Combine skills · 4 h a day · carry-forward', data: { tool: 'builder' } }),
        ],
      }),
      mk(r, 'profile', 'Profile development', 'hub', {
        sub: 'Resume & JD-based profile', data: { hub: 'profile' }, has: new Set(['resume', 'pbuild', 'rbulk']),
        factory: p => [
          mk(p, 'resume', 'Resume for the job description', 'tool', { sub: 'Tailor your resume to a role or JD', data: { tool: 'resume' } }),
          mk(p, 'pbuild', 'JD-based profile builder', 'tool', { sub: 'Skills, gaps, training & headline from a JD', data: { tool: 'profile' } }),
          mk(p, 'rbulk', 'Bulk resume tailoring', 'tool', { sub: 'Many resumes · one ZIP', data: { tool: 'bulk' } }),
        ],
      }),
    ],
  });
}

function cityCompanies(city) {
  const byCat = new Map();
  for (const c of S.data.companies) for (const l of c.locations) {
    if (l.city !== city) continue;
    if (!byCat.has(l.category)) byCat.set(l.category, new Map());
    byCat.get(l.category).set(c.id, c);
  }
  return [...byCat].sort((a, b) => b[1].size - a[1].size);
}
function cityNode(p, city, title) {
  const cats = cityCompanies(city);
  const total = new Set(cats.flatMap(([, m]) => [...m.keys()])).size;
  return mk(p, 'city:' + city, title || city, 'city', {
    sub: `${total} companies · ${cats.length} categories`, data: { city, cats, total },
    factory: n => cats.map(([cat, m]) => mk(n, 'cat:' + cat, cat, 'category', {
      sub: `${m.size} companies in ${city}`, data: { city, category: cat, count: m.size },
      factory: cn => grouped(cn, [...m.values()].sort(byName).map(c => ({ key: 'co:' + c.id, name: c.name, build: g => companyNode(g, c, 'co:' + c.id, cat) })), 'companies'),
    })),
  });
}

function companyNode(p, c, key, category) {
  return mk(p, key, c.name, 'company', {
    sub: category || c.categories.join(', '), data: { company: c },
    factory: n => {
      const roles = splitRoles(c).filter(r => !c.jds.some(j => slugify(j.Role) === slugify(r)));
      const prep = prepItems(c);
      return [
        ...companyLiveNodes(n, c),
        c.jds.length && mk(n, 'jdsec', `Verified job postings (${c.jds.length})`, 'section', { data: { company: c, what: 'jds' }, factory: s => c.jds.map((j, i) => jdNode(s, c, j, i)) }),
        roles.length && mk(n, 'roles', 'Target fresher roles', 'section', { data: { company: c, what: 'roles' }, factory: s => roles.map((r, i) => roleNode(s, c, r, i)) }),
        (prep.skills.length || prep.concepts.length) && mk(n, 'prep', 'Preparation focus', 'section', {
          data: { company: c, what: 'prep' },
          factory: s => [...prep.skills.map(sl => roadmapNode(s, S.SKILL[sl], 'skill')), ...prep.concepts.map(t => conceptNode(s, t))],
        }),
        c.locations.length && mk(n, 'where', 'Hiring locations & sources', 'section', {
          data: { company: c, what: 'where' },
          factory: s => c.locations.map((l, i) => mk(s, 'loc:' + i, `${l.city} · ${l.category}`, 'info', { sub: l.confidence, data: { location: l, company: c } })),
        }),
      ];
    },
  });
}

function roleNode(p, c, title, i) {
  const plan = planFor(title, c);
  return mk(p, 'role:' + i, title, 'role', {
    sub: 'Suggested fresher role', data: { title, company: c, plan },
    factory: n => [
      ...plan.roadmaps.map(sl => roadmapNode(n, S.ROLE[sl], 'roadmap')),
      plan.skills.length && mk(n, 'skills', 'Core skills to learn', 'section', { data: { what: 'skills' }, factory: s => plan.skills.map(sl => roadmapNode(s, S.SKILL[sl], 'skill')) }),
      plan.concepts.length && mk(n, 'concepts', 'Also prepare', 'section', { data: { what: 'concepts' }, factory: s => plan.concepts.map(t => conceptNode(s, t)) }),
      interviewNode(n, plan.family),
    ],
  });
}

function interviewNode(p, family) {
  const fam = FAMILY[family];
  return mk(p, 'interview', 'Interview stages (typical)', 'section', {
    data: { what: 'interview', family },
    factory: s => fam.rounds.map((st, i) => mk(s, 'st:' + i, `${i + 1}. ${st[0]}`, 'stage', {
      sub: `${fam.label} hiring pattern`, data: { stage: st, family, i },
      factory: sn => st[1].map((f, j) => mk(sn, 'f:' + j, f, 'info', { data: { text: f, stage: st[0] } })),
    })),
  });
}

function jdNode(p, c, j, i) {
  const plan = planFor(j.Role, c);
  const skills = [], concepts = [];
  for (const item of splitItems(j['JD Mentioned Skills'], ';')) {
    const sl = skillSlugsFor(item.replace(/\(.*?\)/g, ''));
    if (sl.length) skills.push(...sl); else concepts.push(item);
  }
  return mk(p, 'jd:' + i, j.Role, 'jd', {
    sub: `${c.name} · ${j['Evidence Type'] || 'Job posting'}`, data: { jd: j, company: c, plan },
    factory: n => [
      j['Fresher Eligibility'] && mk(n, 'elig', 'Eligibility: ' + j['Fresher Eligibility'], 'info', { data: { text: j['Fresher Eligibility'], label: 'Eligibility' } }),
      j['JD Summary'] && mk(n, 'sum', 'The work: ' + j['JD Summary'], 'info', { data: { text: j['JD Summary'], label: 'Role summary' } }),
      (skills.length || concepts.length) && mk(n, 'jdskills', 'Skills in the JD', 'section', {
        data: { what: 'jdskills' },
        factory: s => [...uniq(skills).map(sl => roadmapNode(s, S.SKILL[sl], 'skill')), ...concepts.map(t => conceptNode(s, t))],
      }),
      plan.roadmaps.length && mk(n, 'paths', 'Learning roadmap', 'section', { data: { what: 'paths' }, factory: s => plan.roadmaps.map(sl => roadmapNode(s, S.ROLE[sl], 'roadmap')) }),
      interviewNode(n, plan.family),
      j['Opening Status'] && mk(n, 'status', 'Status: ' + j['Opening Status'], 'info', { data: { text: `${j['Opening Status']}. Checked on ${j['Checked On'] || 'n/a'}.`, label: 'Opening status', url: j['Source URL'] } }),
    ],
  });
}

/* ------------------------------------------------------------------ 80-hour lecture plan */
const hourNo = (w, d, i) => ((w - 1) * 5 + (d - 1)) * 4 + i;
const dayNo = (w, d) => (w - 1) * 5 + d;

function fallbackDays(rm) {
  const topics = (rm.phases || []).flatMap(ph => ph.topics.map(t => ({ t: t.title, ph: ph.title })));
  if (!topics.length) topics.push({ t: rm.name, ph: rm.name });
  const angles = ['concepts and vocabulary', 'how it works', 'real-world use', 'best practices'];
  const hours = Array.from({ length: TOTAL_HOURS }, (_, k) => {
    if (topics.length >= TOTAL_HOURS) {
      const a = Math.floor(k * topics.length / TOTAL_HOURS), b = Math.floor((k + 1) * topics.length / TOTAL_HOURS);
      return { title: topics.slice(a, b).map(x => x.t).join(', '), ph: topics[a].ph };
    }
    const x = topics[Math.floor(k * topics.length / TOTAL_HOURS)];
    return { title: `${x.t}: ${angles[k % 4]}`, ph: x.ph };
  });
  return Array.from({ length: 20 }, (_, d) => ({ theme: hours[d * 4].ph, hours: hours.slice(d * 4, d * 4 + 4).map(h => h.title) }));
}
function planOf(rm) {
  if (rm._plan) return rm._plan;
  const info = (window.CURRICULUM || {})[rm.slug] || null;
  const days = info
    ? info.plan.trim().split('\n').map(l => { const [theme, rest = ''] = l.split('|'); return { theme: theme.trim(), hours: rest.split(';').map(s => s.trim()).filter(Boolean) }; })
    : fallbackDays(rm);
  rm._plan = { info, days, weeks: [0, 1, 2, 3].map(w => days.slice(w * 5, w * 5 + 5)) };
  return rm._plan;
}
/* ------------------------------------------------------------------ hours actually taught & carry-forward */
const DAY_HOURS = 4;
const DLOG_KEY = 'atlas.taught.v1';
const DLOG = (() => { try { return JSON.parse(localStorage.getItem(DLOG_KEY)) || {}; } catch { return {}; } })();
const taughtLog = id => DLOG[id] || {};
function setTaught(id, day, v) {
  const m = DLOG[id] ||= {};
  if (v === '' || v == null) delete m[day]; else m[day] = clamp(Math.round(+v), 0, DAY_HOURS);
  if (!Object.keys(m).length) delete DLOG[id];
  localStorage.setItem(DLOG_KEY, JSON.stringify(DLOG));
}
function clearTaught(id) { delete DLOG[id]; localStorage.setItem(DLOG_KEY, JSON.stringify(DLOG)); }

// Packs lectures into teaching days of DAY_HOURS each. A day where the trainer logged fewer hours keeps only the
// lectures that were taught; the untaught ones open the next day and every later lecture shifts along with them.
function reflow(seq, idAt, log) {
  const days = [];
  let i = 0;
  for (let k = 0; i < seq.length && k < seq.length + 500; k++) {
    const id = idAt(k), logged = log[id] ?? null, cap = logged ?? DAY_HOURS;
    const lectures = seq.slice(i, i + cap).map((l, j) => ({ ...l, slot: j, k, shift: k - Math.floor((i + j) / DAY_HOURS) }));
    if (cap < DAY_HOURS) seq.slice(i + cap, i + DAY_HOURS).forEach(l => { l.carriedFrom ??= k; });
    i += lectures.length;
    days.push({ k, id, cap, logged, lectures, week: Math.floor(k / 5) + 1 });
  }
  const weeks = [];
  days.forEach(d => (weeks[d.week - 1] ||= []).push(d));
  const carried = seq.filter(l => l.carriedFrom != null).length;
  seq.forEach(l => delete l.carriedFrom);
  return { days, weeks, carried, extraDays: Math.max(0, days.length - Math.ceil(seq.length / DAY_HOURS)) };
}
const taughtOptions = logged => `<option value=""${logged == null ? ' selected' : ''}>Planned · ${DAY_HOURS} h</option>`
  + Array.from({ length: DAY_HOURS + 1 }, (_, h) => DAY_HOURS - h).map(h => `<option value="${h}"${logged === h ? ' selected' : ''}>${h === DAY_HOURS ? `Taught all ${h} h ✓` : h ? `Taught only ${h} h` : 'No class (0 h)'}</option>`).join('');
const taughtSelect = (attr, d) => `<label class="tl${d.logged == null ? '' : d.logged < DAY_HOURS ? ' short' : ' done'}" title="Hours the trainer actually taught this day — untaught lectures move to the next day">`
  + `<span>Hours taught</span><select class="tl-sel" ${attr}>${taughtOptions(d.logged)}</select></label>`;

// The 80 lectures of one role / skill plan, laid out over teaching days with the trainer's log applied.
function planSchedule(rm) {
  const seq = [];
  planOf(rm).days.forEach((day, k) => day.hours.forEach((title, hi) => {
    const w = Math.floor(k / 5) + 1, d = k % 5 + 1;
    seq.push({ title, theme: day.theme, w, d, i: hi + 1, n: seq.length + 1, level: LEVELS[w - 1][0] });
  }));
  const s = reflow(seq, k => 'D' + (k + 1), taughtLog('rm:' + rm.slug));
  s.seq = seq;
  return s;
}

const linkedSkills = rm => (ROLE_SKILLS[rm.slug] || []).filter(s => S.SKILL[s]);
const rolesUsing = slug => Object.keys(ROLE_SKILLS).filter(r => ROLE_SKILLS[r].includes(slug) && S.ROLE[r]);

function roadmapNode(p, rm, kind) {
  const key = (kind === 'roadmap' ? 'rr:' : 'sr:') + rm.slug;
  return mk(p, key, kind === 'roadmap' ? `${rm.name} roadmap` : rm.name, kind, {
    sub: '80 lecture hours · 4 weeks · Mon–Fri', data: { rm },
    factory: n => {
      const skills = kind === 'roadmap' ? linkedSkills(rm) : [];
      return [
        mk(n, 'about', kind === 'roadmap' ? `Everything about the ${rm.name} role` : `Everything about ${rm.name}`, 'overview', { sub: 'Complete guide · basic to advanced', data: { rm, kind } }),
        kind === 'roadmap' && roleLiveNode(n, rm),
        skills.length && mk(n, 'rskills', 'Skills for this role', 'section', { data: { what: 'rskills', rm }, factory: s => skills.map(sl => roadmapNode(s, S.SKILL[sl], 'skill')) }),
        ...[1, 2, 3, 4].map(w => weekNode(n, rm, w)),
      ];
    },
  });
}
function weekNode(p, rm, w) {
  const [lvl, focus] = LEVELS[w - 1];
  return mk(p, 'w:' + w, `Week ${w} · ${lvl}`, 'week', {
    sub: `${focus} · Days ${dayNo(w, 1)}–${dayNo(w, 5)} · 20 hours`, data: { rm, w },
    factory: wn => planOf(rm).weeks[w - 1].map((day, di) => mk(wn, 'd:' + (di + 1), `${WEEKDAYS[di].slice(0, 3)} · ${day.theme}`, 'day', {
      sub: `Day ${dayNo(w, di + 1)} of 20 · 4 lecture hours`, data: { rm, w, d: di + 1 },
      factory: dn => day.hours.map((h, hi) => mk(dn, 'h:' + (hi + 1), h, 'hour', {
        sub: `Hour ${hourNo(w, di + 1, hi + 1)} of 80 · ${SLOTS[hi]}`, data: { rm, w, d: di + 1, i: hi + 1 },
      })),
    })),
  });
}

function conceptNode(p, label) {
  return mk(p, 'c:' + slugify(label), label, 'concept', { data: { label } });
}

function rolesLibrary(n) {
  return ROLE_GROUPS.map(([name, slugs], i) => {
    const list = slugs.filter(s => S.ROLE[s]);
    return mk(n, 'rg:' + i, name, 'group', {
      sub: `${list.length} role roadmaps`, has: new Set(list.map(s => 'rr:' + s)),
      factory: g => list.map(s => roadmapNode(g, S.ROLE[s], 'roadmap')),
    });
  });
}
function skillsLibrary(n) {
  const used = new Set(SKILL_GROUPS.flatMap(g => g[1]));
  const groups = [...SKILL_GROUPS, ['Other skills', S.data.catalog.skill.map(s => s.slug).filter(s => !used.has(s))]];
  return groups.map(([name, slugs], i) => {
    const list = slugs.filter(s => S.SKILL[s]);
    if (!list.length) return null;
    return mk(n, 'sg:' + i, name, 'group', {
      sub: `${list.length} skill roadmaps`, has: new Set(list.map(s => 'sr:' + s)),
      factory: g => list.map(s => roadmapNode(g, S.SKILL[s], 'skill')),
    });
  });
}
function jdsLibrary(n) {
  const cos = S.data.companies.filter(c => c.jds.length).sort(byName);
  return grouped(n, cos.map(c => ({
    key: 'jdco:' + c.id, name: c.name,
    build: g => mk(g, 'jdco:' + c.id, c.name, 'company', {
      sub: `${c.jds.length} verified posting${c.jds.length > 1 ? 's' : ''}`, data: { company: c },
      factory: cn => c.jds.map((j, i) => jdNode(cn, c, j, i)),
    }),
  })), 'companies');
}

/* ------------------------------------------------------------------ progress */
const lectureKey = (rm, w, d, i) => `${rm.slug}|${w}|${d}|${i}`;
const hourKey = n => lectureKey(n.data.rm, n.data.w, n.data.d, n.data.i);
const isLearned = n => n.kind === 'hour' && S.learned.has(hourKey(n));
function progressOf(n) {
  const { rm, w, d } = n.data; if (!rm) return { done: 0, total: 0 };
  const [prefix, total] = n.kind === 'day' ? [`${rm.slug}|${w}|${d}|`, 4] : n.kind === 'week' ? [`${rm.slug}|${w}|`, 20] : [`${rm.slug}|`, TOTAL_HOURS];
  let done = 0; for (const k of S.learned) if (k.startsWith(prefix)) done++;
  return { done, total };
}
function saveLearned() { localStorage.setItem('atlas.learned.v2', JSON.stringify([...S.learned])); }
function toggleLearned(n) {
  const k = hourKey(n);
  S.learned.has(k) ? S.learned.delete(k) : S.learned.add(k);
  saveLearned();
  update();
}

/* ------------------------------------------------------------------ measuring & layout */
const mctx = document.createElement('canvas').getContext('2d');
const FONT = getComputedStyle(document.body).getPropertyValue('--font') || 'Segoe UI, sans-serif';
function measure(n) {
  if (n.w) return;
  const big = n.depth === 0, strong = big || n.kind === 'city' || n.kind === 'library' || n.kind === 'hub';
  n.fs = big ? 17 : 14; n.lh = Math.round(n.fs * 1.32);
  mctx.font = `${strong ? 600 : 500} ${n.fs}px ${FONT}`;
  const maxW = big ? 250 : n.kind === 'info' ? 280 : 230;
  const words = n.title.split(/\s+/); const lines = [''];
  for (const w of words) {
    const cand = lines.at(-1) ? lines.at(-1) + ' ' + w : w;
    if (mctx.measureText(cand).width <= maxW || !lines.at(-1)) lines[lines.length - 1] = cand; else lines.push(w);
  }
  if (lines.length > 3) { lines.length = 3; lines[2] = lines[2].replace(/[\s,.;:—-]*$/, '') + '…'; }
  n.lines = lines;
  n.pl = n.kind === 'hour' ? 33 : 15;
  n.bar = ['roadmap', 'skill', 'week', 'day'].includes(n.kind);
  n.w = Math.ceil(Math.max(...lines.map(l => mctx.measureText(l).width)) + n.pl + 15);
  n.h = Math.ceil(lines.length * n.lh + (big ? 24 : 16) + (n.bar ? 6 : 0));
}

function visible() {
  const out = [];
  (function walk(n) { out.push(n); if (n.expanded) kids(n).forEach(walk); })(S.root);
  return out;
}
function outerW(n) { return n.w + (hasKids(n) ? CHEV : 0); }
function layout() {
  const vis = visible();
  vis.forEach(measure);
  const colW = [];
  for (const n of vis) colW[n.depth] = Math.max(colW[n.depth] || 0, outerW(n));
  const colX = [0];
  for (let d = 1; d < colW.length; d++) colX[d] = colX[d - 1] + colW[d - 1] + GAP_X;
  let cursor = 0;
  (function place(n) {
    n.tx = colX[n.depth];
    const ks = n.expanded ? kids(n) : [];
    if (ks.length) {
      const start = cursor;
      ks.forEach(place);
      const mid = (ks[0].ty + ks.at(-1).ty) / 2;
      const top = mid - n.h / 2;
      if (top < start) { const shift = start - top; shiftSub(n, shift); cursor += shift; n.ty = mid + shift; } else n.ty = mid;
      cursor = Math.max(cursor, n.ty + n.h / 2 + GAP_Y);
    } else {
      n.ty = cursor + n.h / 2; cursor += n.h + GAP_Y;
    }
  })(S.root);
  const oy = S.root.ty;
  for (const n of vis) n.ty -= oy;
  return vis;
}
function shiftSub(n, dy) { for (const c of (n.expanded ? kids(n) : [])) { c.ty += dy; shiftSub(c, dy); } }

/* ------------------------------------------------------------------ rendering */
function createEl(n) {
  const g = document.createElementNS(NS, 'g');
  g.dataset.id = n.id;
  nodesLayer.appendChild(g);
  let edge = null;
  if (n.parent) { edge = document.createElementNS(NS, 'path'); edge.setAttribute('class', 'edge'); edgesLayer.appendChild(edge); }
  return { n, g, edge, exiting: false };
}
function paintNode(n, r) {
  const hk = hasKids(n), w = n.w, h = n.h;
  const cls = ['node', 'k-' + n.kind];
  if (n === S.sel) cls.push('sel');
  if (S.path.has(n.id)) cls.push('path');
  if (isLearned(n)) cls.push('learned');
  r.g.setAttribute('class', cls.join(' '));
  let s = `<title>${esc(n.title)}${n.sub ? ' — ' + esc(n.sub) : ''}</title>`;
  s += `<rect class="box" x="0" y="${-h / 2}" width="${w}" height="${h}" rx="${n.depth === 0 ? 16 : 11}"/>`;
  const y0 = -((n.lines.length - 1) * n.lh) / 2 - (n.bar ? 3 : 0);
  n.lines.forEach((ln, i) => { s += `<text class="lbl" x="${n.pl}" y="${(y0 + i * n.lh).toFixed(1)}" style="font-size:${n.fs}px">${esc(ln)}</text>`; });
  if (n.kind === 'hour') s += `<g class="chk" data-act="learn"><circle cx="17" cy="0" r="8"/>${isLearned(n) ? '<path d="M13.2 0.3l2.7 2.7 4.9-5.2"/>' : ''}</g>`;
  if (n.bar) {
    const p = progressOf(n), bw = w - n.pl - 15, by = h / 2 - 8;
    s += `<rect class="bar-bg" x="${n.pl}" y="${by}" width="${bw}" height="3" rx="1.5"/>`;
    if (p.done) s += `<rect class="bar" x="${n.pl}" y="${by}" width="${(bw * p.done / p.total).toFixed(1)}" height="3" rx="1.5"/>`;
  }
  if (hk) {
    const cnt = kids(n).length;
    s += `<g class="chev" data-act="toggle" transform="translate(${w + 14},0)"><circle r="11"/>${n.expanded ? '<path d="M2 -4.5l-4.5 4.5 4.5 4.5"/>' : `<text y="0.5">${cnt > 99 ? '99+' : cnt}</text>`}</g>`;
  }
  r.g.innerHTML = s;
  if (r.edge) r.edge.setAttribute('class', 'edge' + (S.path.has(n.id) ? ' hot' : ''));
}

let animStart = 0, running = false;
function update() {
  const vis = layout();
  const ids = new Set(vis.map(n => n.id));
  for (const n of vis) {
    let r = R.get(n.id);
    if (!r || r.exiting) {
      if (!r) { r = createEl(n); R.set(n.id, r); }
      const p = n.parent;
      if (n.rx == null) {
        if (p && p.rx != null) { n.rx = p.rx + p.w + CHEV; n.ry = p.ry; } else { n.rx = n.tx; n.ry = n.ty; }
        n.ro = 0;
      }
      r.exiting = false;
    }
    paintNode(n, r);
    Object.assign(n, { fx: n.rx, fy: n.ry, fo: n.ro, gx: n.tx, gy: n.ty, go: 1 });
  }
  for (const [id, r] of R) {
    if (ids.has(id)) continue;
    const n = r.n; let a = n.parent;
    while (a && !ids.has(a.id)) a = a.parent;
    r.exiting = true;
    Object.assign(n, { fx: n.rx, fy: n.ry, fo: n.ro, gx: a ? a.tx + a.w + CHEV : n.rx, gy: a ? a.ty : n.ry, go: 0 });
  }
  renderPanel();
  kick();
}
function kick() {
  animStart = performance.now();
  S.camFrom = { ...S.cam };
  if (!running) { running = true; requestAnimationFrame(step); }
}
function edgePath(p, c) {
  const sx = p.rx + p.w + CHEV, sy = p.ry, tx = c.rx, ty = c.ry, mx = sx + Math.max(18, (tx - sx) / 2);
  return `M${sx.toFixed(1)},${sy.toFixed(1)}C${mx.toFixed(1)},${sy.toFixed(1)} ${mx.toFixed(1)},${ty.toFixed(1)} ${tx.toFixed(1)},${ty.toFixed(1)}`;
}
function step(now) {
  const t = Math.min(1, (now - animStart) / ANIM_MS), e = 1 - Math.pow(1 - t, 3);
  for (const r of R.values()) {
    const n = r.n;
    n.rx = lerp(n.fx, n.gx, e); n.ry = lerp(n.fy, n.gy, e); n.ro = lerp(n.fo, n.go, e);
    r.g.setAttribute('transform', `translate(${n.rx.toFixed(1)},${n.ry.toFixed(1)})`);
    r.g.style.opacity = n.ro.toFixed(3);
  }
  for (const r of R.values()) {
    if (!r.edge) continue;
    const p = r.n.parent;
    if (p.rx == null) continue;
    r.edge.setAttribute('d', edgePath(p, r.n));
    r.edge.style.opacity = Math.min(r.n.ro, p.ro).toFixed(3);
  }
  if (S.camGoal) {
    S.cam = { x: lerp(S.camFrom.x, S.camGoal.x, e), y: lerp(S.camFrom.y, S.camGoal.y, e), k: lerp(S.camFrom.k, S.camGoal.k, e) };
    applyCam();
  }
  if (t < 1) { requestAnimationFrame(step); return; }
  running = false; S.camGoal = null;
  for (const [id, r] of R) if (r.exiting) { r.g.remove(); r.edge?.remove(); r.n.rx = null; R.delete(id); }
}

/* ------------------------------------------------------------------ camera */
function applyCam() {
  const { x, y, k } = S.cam;
  viewport.setAttribute('transform', `translate(${x.toFixed(2)},${y.toFixed(2)}) scale(${k.toFixed(4)})`);
  stage.style.backgroundSize = `${22 * k}px ${22 * k}px`;
  stage.style.backgroundPosition = `${x}px ${y}px`;
}
function viewSize() { const r = svg.getBoundingClientRect(); return { w: r.width || 800, h: r.height || 600 }; }
function moveCam(goal, animate = true) {
  if (!animate) { S.cam = goal; S.camGoal = null; applyCam(); return; }
  S.camGoal = goal; kick();
}
function bbox(nodes) {
  let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
  for (const n of nodes) { x1 = Math.min(x1, n.tx); x2 = Math.max(x2, n.tx + outerW(n)); y1 = Math.min(y1, n.ty - n.h / 2); y2 = Math.max(y2, n.ty + n.h / 2); }
  return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
}
function fit(animate = true) {
  const b = bbox(visible()), v = viewSize(), pad = 60;
  const k = clamp(Math.min((v.w - 2 * pad) / b.w, (v.h - 2 * pad) / b.h), 0.2, 1.15);
  moveCam({ k, x: v.w / 2 - (b.x + b.w / 2) * k, y: v.h / 2 - (b.y + b.h / 2) * k }, animate);
}
function reveal(nodes, anchor) {
  const b = bbox(nodes), v = viewSize(), pad = 56;
  let { x, y, k } = S.cam;
  const fitK = Math.min((v.w - 2 * pad) / b.w, (v.h - 2 * pad) / b.h);
  if (fitK < k) {
    k = Math.max(0.5, fitK);
    x = b.w * k <= v.w - 2 * pad ? v.w / 2 - (b.x + b.w / 2) * k : pad - b.x * k;
    y = b.h * k <= v.h - 2 * pad ? v.h / 2 - (b.y + b.h / 2) * k : v.h / 2 - anchor.ty * k;
  } else {
    const L = b.x * k + x, Rr = (b.x + b.w) * k + x, T = b.y * k + y, B = (b.y + b.h) * k + y;
    if (L < pad) x += pad - L; else if (Rr > v.w - pad) x -= Rr - (v.w - pad);
    if (T < pad) y += pad - T; else if (B > v.h - pad) y -= B - (v.h - pad);
  }
  moveCam({ x, y, k });
}
const revealBranch = n => reveal([n, ...(n.expanded ? kids(n) : [])], n);
function centerOn(n) {
  const v = viewSize(), k = Math.max(S.cam.k, 0.8);
  moveCam({ k, x: v.w / 2 - (n.tx + n.w / 2) * k, y: v.h / 2 - n.ty * k });
}
function zoomBy(f, cx, cy, animate = true) {
  const v = viewSize(); cx ??= v.w / 2; cy ??= v.h / 2;
  const base = S.camGoal || S.cam, k = clamp(base.k * f, 0.15, 2.5);
  moveCam({ k, x: cx - (cx - base.x) * k / base.k, y: cy - (cy - base.y) * k / base.k }, animate);
}

/* ------------------------------------------------------------------ interaction */
function setExpanded(n, v) {
  if (v) {
    if (!hasKids(n)) return;
    if (S.focus && n.parent) for (const s of kids(n.parent)) if (s !== n && s.expanded) collapseDeep(s);
    n.expanded = true;
  } else n.expanded = false;
}
function collapseDeep(n) { n.expanded = false; if (n.children) n.children.forEach(collapseDeep); }
function select(n) {
  S.sel = n; S.path = new Set(lineage(n).map(a => a.id));
}
function onNodeClick(n, forceToggle) {
  const wasSel = S.sel === n;
  select(n);
  $('#hint').classList.add('gone');
  if (hasKids(n) && (forceToggle || wasSel || !n.expanded)) {
    setExpanded(n, !n.expanded); update(); revealBranch(n);
  } else { update(); reveal([n], n); }
}
function go(id, expand) {
  const n = S.nodes.get(id); if (!n) return;
  for (const a of lineage(n).slice(0, -1)) if (!a.expanded) setExpanded(a, true);
  if (expand && hasKids(n) && !n.expanded) setExpanded(n, true);
  $('#hint').classList.add('gone');
  select(n); update(); revealBranch(n);
}
function revealKeys(keys, expand, from = S.root) {
  let n = from;
  for (const k of keys) {
    setExpanded(n, true);
    let c = kids(n).find(x => x.key === k);
    for (let depth = 0; !c && depth < 4; depth++) {
      const g = kids(n).find(x => x.has && x.has.has(k));
      if (!g) break;
      setExpanded(g, true);
      n = g;
      c = kids(n).find(x => x.key === k);
    }
    if (!c) break;
    n = c;
  }
  if (expand && hasKids(n)) setExpanded(n, true);
  select(n); update();
  if (n.expanded) revealBranch(n); else centerOn(n);
}
function expandLevels(n, levels) {
  let budget = 260;
  (function walk(x, d) {
    if (d > levels || !hasKids(x) || budget <= 0) return;
    x.expanded = true; budget -= kids(x).length;
    if (d < levels) kids(x).forEach(c => walk(c, d + 1));
  })(n, 1);
  update(); revealBranch(n);
}
function collapseAll() {
  kids(S.root).forEach(collapseDeep);
  S.root.expanded = true;
  select(S.root); update(); fit();
}
function siblingOf(n, dir) {
  if (!n.parent) return null;
  const ks = kids(n.parent), i = ks.indexOf(n);
  return ks[i + dir] || null;
}
// Next/previous node of the same kind, crossing into adjacent days and weeks when needed.
function neighbour(n, dir, levels) {
  const s = siblingOf(n, dir); if (s && s.kind === n.kind) return s;
  if (!levels || !n.parent) return null;
  const up = neighbour(n.parent, dir, levels - 1); if (!up) return null;
  const ks = kids(up).filter(k => k.kind === n.kind);
  return dir > 0 ? ks[0] : ks.at(-1);
}

nodesLayer.addEventListener('click', e => {
  if (S.dragMoved) return;
  const g = e.target.closest('g.node'); if (!g) return;
  const n = S.nodes.get(g.dataset.id); if (!n) return;
  const act = e.target.closest('[data-act]')?.dataset.act;
  if (act === 'learn') { select(n); toggleLearned(n); return; }
  onNodeClick(n, act === 'toggle');
});

/* pan / zoom / pinch */
const pointers = new Map();
let drag = null;
stage.addEventListener('pointerdown', e => {
  if (e.target.closest('.zoom,.hint')) return;
  S.dragMoved = false;
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (e.target.closest('g.node') && pointers.size === 1) return;
  stage.setPointerCapture(e.pointerId);
  drag = { x: e.clientX, y: e.clientY, cx: S.cam.x, cy: S.cam.y, dist: null, k: S.cam.k };
  S.camGoal = null;
  stage.classList.add('dragging');
});
stage.addEventListener('pointermove', e => {
  if (!pointers.has(e.pointerId)) return;
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (!drag) return;
  if (pointers.size === 2) {
    const [a, b] = [...pointers.values()];
    const d = Math.hypot(a.x - b.x, a.y - b.y), rect = svg.getBoundingClientRect();
    const mx = (a.x + b.x) / 2 - rect.left, my = (a.y + b.y) / 2 - rect.top;
    if (!drag.dist) { drag.dist = d; drag.k = S.cam.k; return; }
    const k = clamp(drag.k * d / drag.dist, 0.15, 2.5);
    S.cam = { k, x: mx - (mx - S.cam.x) * k / S.cam.k, y: my - (my - S.cam.y) * k / S.cam.k };
    S.dragMoved = true; applyCam(); return;
  }
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
  if (Math.abs(dx) + Math.abs(dy) > 3) S.dragMoved = true;
  S.cam.x = drag.cx + dx; S.cam.y = drag.cy + dy; applyCam();
});
const endPointer = e => {
  pointers.delete(e.pointerId);
  if (pointers.size === 0) { drag = null; stage.classList.remove('dragging'); }
  else if (drag) { const p = [...pointers.values()][0]; drag = { x: p.x, y: p.y, cx: S.cam.x, cy: S.cam.y, dist: null, k: S.cam.k }; }
};
stage.addEventListener('pointerup', endPointer);
stage.addEventListener('pointercancel', endPointer);
stage.addEventListener('wheel', e => {
  e.preventDefault();
  const rect = svg.getBoundingClientRect();
  if (e.ctrlKey || Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.shiftKey && e.deltaMode === 0 && Math.abs(e.deltaY) >= 40 || e.deltaMode !== 0) {
    zoomBy(Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0018)), e.clientX - rect.left, e.clientY - rect.top, false);
  } else {
    S.camGoal = null; S.cam.x -= e.deltaX; S.cam.y -= e.deltaY; applyCam();
  }
}, { passive: false });
stage.addEventListener('dblclick', e => { if (!e.target.closest('g.node,.zoom')) fit(); });

$('#zIn').onclick = () => zoomBy(1.25);
$('#zOut').onclick = () => zoomBy(0.8);
$('#zFit').onclick = () => fit();
$('#zSel').onclick = () => S.sel && centerOn(S.sel);
$('#btnCollapse').onclick = collapseAll;
const focusBtn = $('#btnFocus');
focusBtn.classList.toggle('on', S.focus);
focusBtn.onclick = () => { S.focus = !S.focus; focusBtn.classList.toggle('on', S.focus); localStorage.setItem('atlas.focus', S.focus ? '1' : '0'); };
const setTheme = t => { document.documentElement.dataset.theme = t; localStorage.setItem('atlas.theme', t); };
setTheme(localStorage.getItem('atlas.theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
$('#btnTheme').onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
$('#btnPanel').onclick = () => {
  const hidden = app.classList.toggle('no-panel');
  $('#btnPanel').classList.toggle('on', !hidden);
};

document.addEventListener('keydown', e => {
  if (S.resume) { if (e.key === 'Escape' && !e.target.matches('input,select,textarea')) closeResume(); return; }
  if (S.builder) { if (e.key === 'Escape' && !e.target.matches('input,select')) closeBuilder(); return; }
  if (S.jobs) { if (e.key === 'Escape' && !e.target.matches('input,select')) closeJobs(); return; }
  if (S.modal) { if (e.key === 'Escape') closePlan(); return; }
  if (e.target.matches('input,textarea')) return;
  if (e.key === '/') { e.preventDefault(); $('#search').focus(); return; }
  if (!S.sel) return;
  const n = S.sel; let t = null;
  switch (e.key) {
    case 'ArrowRight': if (hasKids(n) && !n.expanded) { onNodeClick(n, true); return; } t = n.expanded ? kids(n)[0] : null; break;
    case 'ArrowLeft': if (n.expanded) { setExpanded(n, false); update(); reveal([n], n); return; } t = n.parent; break;
    case 'ArrowDown': t = siblingOf(n, 1); break;
    case 'ArrowUp': t = siblingOf(n, -1); break;
    case 'Enter': case ' ': onNodeClick(n, true); e.preventDefault(); return;
    case 'f': case 'F': fit(); return;
    case 'c': case 'C': centerOn(n); return;
    case '+': case '=': zoomBy(1.25); return;
    case '-': case '_': zoomBy(0.8); return;
    case 'Escape': $('#btnPanel').click(); return;
    default: return;
  }
  e.preventDefault();
  if (t) { select(t); update(); reveal([t], t); }
});

/* ------------------------------------------------------------------ search */
function buildIndex() {
  const idx = [];
  for (const c of S.data.companies) {
    const seen = new Set();
    for (const l of c.locations) {
      const k = l.city + '|' + l.category;
      if (seen.has(k) || !CITIES.includes(l.city)) continue;
      seen.add(k);
      idx.push({ label: c.name, sub: `${l.category} · ${l.city}`, type: 'company', keys: ['city:' + l.city, 'cat:' + l.category, 'co:' + c.id] });
    }
    c.jds.forEach((j, i) => idx.push({ label: j.Role, sub: `${c.name} · verified job posting`, type: 'jd', keys: ['jds', 'jdco:' + c.id, 'jd:' + i] }));
  }
  for (const [list, lib, pre, type] of [[S.data.catalog.role, 'roles', 'rr:', 'roadmap'], [S.data.catalog.skill, 'skills', 'sr:', 'skill']]) {
    for (const rm of list) {
      const base = [lib, pre + rm.slug];
      idx.push({ label: type === 'roadmap' ? rm.name + ' roadmap' : rm.name, sub: '80-hour lecture plan · 4 weeks', type, keys: base });
      planOf(rm).days.forEach((day, k) => {
        const w = Math.floor(k / 5) + 1, d = k % 5 + 1, dk = [...base, 'w:' + w, 'd:' + d];
        idx.push({ label: day.theme, sub: `${rm.name} · Week ${w} ${LEVELS[w - 1][0]} · ${WEEKDAYS[d - 1]}`, type: 'day', keys: dk });
        day.hours.forEach((h, hi) => idx.push({ label: h, sub: `${rm.name} · Week ${w} · ${WEEKDAYS[d - 1].slice(0, 3)} · Hour ${hourNo(w, d, hi + 1)} of 80`, type: 'hour', keys: [...dk, 'h:' + (hi + 1)] }));
      });
    }
  }
  liveIndex(idx);
  idx.forEach(x => { x.l = x.label.toLowerCase(); x.s = (x.sub || '').toLowerCase(); });
  S.index = idx;
}
const TYPE_NAME = { company: 'Company', jd: 'Job', job: 'Opening', event: 'Event', roadmap: 'Role', skill: 'Skill', day: 'Day', hour: 'Lecture' };
const TYPE_RANK = { company: 0, roadmap: 1, skill: 2, jd: 3, job: 3, event: 4, day: 5, hour: 6 };
const searchEl = $('#search'), resultsEl = $('#results');
let hits = [], active = 0;
function runSearch() {
  const q = searchEl.value.trim().toLowerCase();
  if (!q) { resultsEl.classList.remove('open'); return; }
  const scored = [];
  for (const x of S.index) {
    let sc = x.l.startsWith(q) ? 0 : x.l.includes(' ' + q) ? 1 : x.l.includes(q) ? 2 : x.s.includes(q) ? 4 : -1;
    if (sc >= 0) scored.push([sc, x]);
  }
  scored.sort((a, b) => a[0] - b[0] || TYPE_RANK[a[1].type] - TYPE_RANK[b[1].type] || a[1].label.localeCompare(b[1].label));
  hits = scored.slice(0, 40).map(s => s[1]); active = 0;
  const hl = t => { const i = t.toLowerCase().indexOf(q); return i < 0 ? esc(t) : esc(t.slice(0, i)) + '<mark>' + esc(t.slice(i, i + q.length)) + '</mark>' + esc(t.slice(i + q.length)); };
  resultsEl.innerHTML = hits.length
    ? hits.map((h, i) => `<button class="result${i === 0 ? ' active' : ''}" data-i="${i}"><span class="rt k-${h.type === 'roadmap' ? 'roadmap' : h.type}">${TYPE_NAME[h.type]}</span><span class="rl"><b>${hl(h.label)}</b><small>${esc(h.sub || '')}</small></span></button>`).join('')
    : `<div class="empty">No matches for “${esc(searchEl.value)}”</div>`;
  resultsEl.classList.add('open');
}
function pick(i) {
  const h = hits[i]; if (!h) return;
  resultsEl.classList.remove('open'); searchEl.blur();
  revealKeys(h.keys, ['roadmap', 'skill', 'day'].includes(h.type));
}
searchEl.addEventListener('input', runSearch);
searchEl.addEventListener('focus', () => searchEl.value && runSearch());
searchEl.addEventListener('keydown', e => {
  const items = resultsEl.querySelectorAll('.result');
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault(); if (!items.length) return;
    active = (active + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
    items.forEach((el, i) => el.classList.toggle('active', i === active));
    items[active].scrollIntoView({ block: 'nearest' });
  } else if (e.key === 'Enter') { e.preventDefault(); pick(active); }
  else if (e.key === 'Escape') { resultsEl.classList.remove('open'); searchEl.blur(); }
});
resultsEl.addEventListener('mousedown', e => { const b = e.target.closest('.result'); if (b) { e.preventDefault(); pick(+b.dataset.i); } });
document.addEventListener('click', e => { if (!e.target.closest('#searchWrap')) resultsEl.classList.remove('open'); });

/* ------------------------------------------------------------------ notes panel */
const facts = rows => { const r = rows.filter(x => x[1]); return r.length ? `<dl class="facts">${r.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${v}</dd>`).join('')}</dl>` : ''; };
const note = (t, warn) => `<div class="note${warn ? ' warn' : ''}">${t}</div>`;
const links = arr => { const a = arr.filter(x => x && /^https?:\/\//.test(x[1])); return a.length ? `<div class="links">${a.map(([l, u, p]) => `<a href="${esc(u)}" target="_blank" rel="noopener"${p ? ' class="primary"' : ''}>${esc(l)} ↗</a>`).join('')}</div>` : ''; };
const tags = arr => arr.length ? `<div class="tags">${arr.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>` : '';
const ul = arr => `<ul>${arr.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;
const progressBar = p => p.total ? `<div class="progress"><div class="track"><div class="fill" style="width:${(100 * p.done / p.total).toFixed(1)}%"></div></div><small>${p.done} of ${p.total} lecture hours learned${p.done === p.total ? ' 🎉' : ''}</small></div>` : '';
const search = q => `https://www.google.com/search?q=${encodeURIComponent(q)}`;
const yt = q => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
const splitList = (t, sep) => String(t || '').split(sep).map(s => s.trim()).filter(Boolean);
const revealAttr = keys => `data-reveal="${esc(JSON.stringify(keys))}"`;
const goBtn = (n, label, open) => `<button class="link-btn" data-go="${esc(n.id)}"${open ? ' data-open="1"' : ''}>${esc(label ?? n.title)}</button>`;

function companyKeys(c) {
  const l = c.locations.find(x => CITIES.includes(x.city));
  if (l) return ['city:' + l.city, 'cat:' + l.category, 'co:' + c.id];
  return c.jds.length ? ['jds', 'jdco:' + c.id] : null;
}
function companiesFor(rm, kind) {
  if (rm._cos) return rm._cos;
  const out = [];
  for (const c of S.data.companies) {
    if (!companyKeys(c)) continue;
    const titles = [...splitRoles(c), ...c.jds.map(j => j.Role)];
    const hit = kind === 'roadmap'
      ? titles.some(t => slugify(t).includes(rm.slug) || planFor(t, c).roadmaps.includes(rm.slug))
      : prepItems(c).skills.includes(rm.slug) || titles.some(t => planFor(t, c).skills.includes(rm.slug));
    if (hit) out.push(c);
  }
  return (rm._cos = out.sort(byName));
}

function timetable(n) {
  const days = kids(n).filter(k => k.kind === 'week').map(kids);
  return `<div class="tt"><span></span>${LEVELS.map(([l], wi) => `<div class="tt-h">Week ${wi + 1}<small>${l}</small></div>`).join('')}${WEEKDAYS.map((wd, di) =>
    `<div class="tt-w">${wd.slice(0, 3)}</div>` + days.map((wk, wi) => {
      const dn = wk[di], p = progressOf(dn), theme = planOf(dn.data.rm).weeks[wi][di].theme;
      return `<button class="tt-c${p.done === p.total ? ' done' : ''}" data-go="${esc(dn.id)}" data-open="1" title="${esc(`Week ${wi + 1} · ${wd} · Day ${dayNo(wi + 1, di + 1)} · ${theme}`)}"><b>${esc(theme)}</b><small>Day ${dayNo(wi + 1, di + 1)} · ${p.done}/4 h</small></button>`;
    }).join('')).join('')}</div>`;
}
function syllabus(rm, openWeek) {
  return `<div class="syl">${planOf(rm).weeks.map((days, wi) => {
    const w = wi + 1, wp = progressOf({ kind: 'week', data: { rm, w } });
    return `<details${w === openWeek ? ' open' : ''}><summary>Week ${w} · ${LEVELS[wi][0]} — ${LEVELS[wi][1]}<small>${wp.done}/20 h</small></summary>${days.map((day, di) =>
      `<div class="day"><b>${WEEKDAYS[di]} · Day ${dayNo(w, di + 1)} — ${esc(day.theme)}</b><ol start="${hourNo(w, di + 1, 1)}">${day.hours.map((h, hi) =>
        `<li class="${S.learned.has(lectureKey(rm, w, di + 1, hi + 1)) ? 'done' : ''}">${esc(h)}</li>`).join('')}</ol></div>`).join('')}</details>`;
  }).join('')}</div>`;
}
function lectureParts(t) {
  const sep = t.includes(',') ? /\s*(?:,|\band\b|&)\s*/i : /\s*(?:&|:|\bvs\.?\s)\s*/i;
  const parts = t.split(sep).map(s => s.trim()).filter(s => s.length > 1);
  return parts.length > 1 ? parts : null;
}
const WEEK_DESC = ['Builds the vocabulary, mental models and fundamentals that everything else depends on.', 'Covers the core tools and techniques used in everyday professional work.',
  'Goes deeper into architecture, performance, security and real-world scale.', 'Industry-level topics, professional practices and interview-ready understanding.'];
const kindOf = rm => (S.ROLE[rm.slug] === rm ? 'roadmap' : 'skill');

function guideHTML(rm, kind, withSyllabus) {
  const plan = planOf(rm), info = plan.info || {}, role = kind === 'roadmap';
  let h = `<p>${esc(info.about || `${rm.name}, from the basics to advanced, industry-level practice.`)}</p>`;
  if (role) {
    if (info.does) h += `<h3>What a ${esc(rm.name)} professional does</h3>${ul(splitList(info.does, ';'))}`;
    if (info.tools) h += `<h3>Tools &amp; technologies</h3>${tags(splitList(info.tools, ','))}`;
    if (info.career) h += `<h3>Career path</h3><div class="steps">${splitList(info.career, '→').map(s => `<span>${esc(s)}</span>`).join('<i>→</i>')}</div>`;
    const sk = linkedSkills(rm);
    if (sk.length) h += `<h3>Skills to learn</h3><div class="chips">${sk.map(s => `<button class="chip k-skill" ${revealAttr(['skills', 'sr:' + s])}>${esc(S.SKILL[s].name)}</button>`).join('')}</div>`;
    const fam = FAMILY[ROLE_FAMILY[rm.slug]];
    if (fam) h += `<h3>Typical fresher interview stages</h3><ol>${fam.rounds.map(r => `<li><b>${esc(r[0])}</b> — ${esc(r[1].join('; '))}</li>`).join('')}</ol>`;
  } else {
    if (info.prereq) h += facts([['Prerequisites', esc(info.prereq)]]);
    if (info.tools) h += `<h3>Tools &amp; ecosystem</h3>${tags(splitList(info.tools, ','))}`;
    const rs = rolesUsing(rm.slug);
    if (rs.length) h += `<h3>Roles that use ${esc(rm.name)}</h3><div class="chips">${rs.map(r => `<button class="chip k-roadmap" ${revealAttr(['roles', 'rr:' + r])}>${esc(S.ROLE[r].name)}</button>`).join('')}</div>`;
  }
  const cos = companiesFor(rm, kind);
  h += `<h3>Companies in the map hiring for it <span class="muted">${cos.length}</span></h3>` + (cos.length
    ? `<div class="chips">${cos.slice(0, 36).map(c => `<button class="chip k-company" ${revealAttr(companyKeys(c))}>${esc(c.name)}</button>`).join('')}${cos.length > 36 ? `<span class="muted">+${cos.length - 36} more</span>` : ''}</div>`
    : '<p class="muted">No company in this directory lists this role yet.</p>');
  h += `<h3>Basic to advanced</h3>${facts(LEVELS.map(([l, f], i) => [`Week ${i + 1} · ${l}`, `<b>${f}</b> — ${esc(plan.weeks[i].map(x => x.theme).join(', '))}`]))}`;
  if (withSyllabus) h += `<h3>Full 80-lecture syllabus</h3>${syllabus(rm, 1)}`;
  return h;
}

/* ------------------------------------------------------------------ Excel (.xlsx) export, written without libraries */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  return t;
})();
function crc32(b) { let c = 0xFFFFFFFF; for (let i = 0; i < b.length; i++) c = CRC_TABLE[(c ^ b[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
function zipStore(files, type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
  const enc = new TextEncoder(), out = [], central = [], DATE = ((2026 - 1980) << 9) | (1 << 5) | 1;
  let offset = 0;
  for (const f of files) {
    const name = enc.encode(f.name), data = typeof f.data === 'string' ? enc.encode(f.data) : f.data, crc = crc32(data);
    const lh = new DataView(new ArrayBuffer(30));
    lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true); lh.setUint16(6, 0x0800, true); lh.setUint16(12, DATE, true);
    lh.setUint32(14, crc, true); lh.setUint32(18, data.length, true); lh.setUint32(22, data.length, true); lh.setUint16(26, name.length, true);
    out.push(new Uint8Array(lh.buffer), name, data);
    const ch = new DataView(new ArrayBuffer(46));
    ch.setUint32(0, 0x02014b50, true); ch.setUint16(4, 20, true); ch.setUint16(6, 20, true); ch.setUint16(8, 0x0800, true); ch.setUint16(14, DATE, true);
    ch.setUint32(16, crc, true); ch.setUint32(20, data.length, true); ch.setUint32(24, data.length, true); ch.setUint16(28, name.length, true); ch.setUint32(42, offset, true);
    central.push(new Uint8Array(ch.buffer), name);
    offset += 30 + name.length + data.length;
  }
  const size = central.reduce((a, b) => a + b.length, 0), end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true); end.setUint16(8, files.length, true); end.setUint16(10, files.length, true); end.setUint32(12, size, true); end.setUint32(16, offset, true);
  return new Blob([...out, ...central, new Uint8Array(end.buffer)], { type });
}
const xesc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
const colName = i => { let s = ''; for (i++; i; i = Math.floor((i - 1) / 26)) s = String.fromCharCode(65 + (i - 1) % 26) + s; return s; };
const XML_HEAD = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
const NS_MAIN = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main', NS_REL = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
// Cell styles: 1 title, 2 subtitle, 3 header, 4 bordered wrap, 5 time column, 6 break row, 7 theme row, 8 bold label, 9 plain wrap, 10 bordered centred
const XLSX_STYLES = `${XML_HEAD}<styleSheet xmlns="${NS_MAIN}">
<fonts count="5"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="16"/><color rgb="FF1D2433"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font><font><i/><sz val="10"/><color rgb="FF5F6B80"/><name val="Calibri"/></font></fonts>
<fills count="6"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>${['FF3B6CF6', 'FFE8EEFC', 'FFF1F3F8', 'FFFFF4D6'].map(c => `<fill><patternFill patternType="solid"><fgColor rgb="${c}"/><bgColor indexed="64"/></patternFill></fill>`).join('')}</fills>
<borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border>${['left', 'right', 'top', 'bottom'].map(e => `<${e} style="thin"><color rgb="FFC9D1DE"/></${e}>`).join('')}<diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="11">${[[0, 0, 0, ''], [2, 0, 0, ''], [4, 0, 0, 'vertical="center"'], [3, 2, 1, 'horizontal="center" vertical="center" wrapText="1"'], [0, 0, 1, 'vertical="top" wrapText="1"'],
  [1, 3, 1, 'horizontal="center" vertical="center" wrapText="1"'], [4, 4, 1, 'horizontal="center" vertical="center"'], [1, 5, 1, 'horizontal="center" vertical="center" wrapText="1"'],
  [1, 0, 0, 'vertical="top" wrapText="1"'], [0, 0, 0, 'vertical="top" wrapText="1"'], [0, 0, 1, 'horizontal="center" vertical="top" wrapText="1"']]
  .map(([f, fi, b, al]) => `<xf numFmtId="0" fontId="${f}" fillId="${fi}" borderId="${b}" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1">${al ? `<alignment ${al}/>` : ''}</xf>`).join('')}</cellXfs>
<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`;

function sheetXML({ rows, cols = [], merges = [], heights = {}, freeze }) {
  const data = rows.map((row, ri) => `<row r="${ri + 1}"${heights[ri] ? ` ht="${heights[ri]}" customHeight="1"` : ''}>${row.map((c, ci) => {
    if (c == null) return '';
    const o = typeof c === 'object' ? c : { v: c }, ref = colName(ci) + (ri + 1), s = o.s ? ` s="${o.s}"` : '';
    if (o.v == null || o.v === '') return s ? `<c r="${ref}"${s}/>` : '';
    return typeof o.v === 'number' ? `<c r="${ref}"${s}><v>${o.v}</v></c>` : `<c r="${ref}"${s} t="inlineStr"><is><t xml:space="preserve">${xesc(o.v)}</t></is></c>`;
  }).join('')}</row>`).join('');
  return `${XML_HEAD}<worksheet xmlns="${NS_MAIN}" xmlns:r="${NS_REL}">`
    + (freeze ? `<sheetViews><sheetView workbookViewId="0"><pane ySplit="${freeze}" topLeftCell="A${freeze + 1}" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>` : '')
    + (cols.length ? `<cols>${cols.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('')}</cols>` : '')
    + `<sheetData>${data}</sheetData>`
    + (merges.length ? `<mergeCells count="${merges.length}">${merges.map(m => `<mergeCell ref="${m}"/>`).join('')}</mergeCells>` : '')
    + '<pageMargins left="0.4" right="0.4" top="0.5" bottom="0.5" header="0.3" footer="0.3"/><pageSetup orientation="landscape"/></worksheet>';
}
function workbookBlob(sheets) {
  const files = [
    { name: '[Content_Types].xml', data: `${XML_HEAD}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}</Types>` },
    { name: '_rels/.rels', data: `${XML_HEAD}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="${NS_REL}/officeDocument" Target="xl/workbook.xml"/></Relationships>` },
    { name: 'xl/workbook.xml', data: `${XML_HEAD}<workbook xmlns="${NS_MAIN}" xmlns:r="${NS_REL}"><sheets>${sheets.map((s, i) => `<sheet name="${xesc(s.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets></workbook>` },
    { name: 'xl/_rels/workbook.xml.rels', data: `${XML_HEAD}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="${NS_REL}/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('')}<Relationship Id="rId${sheets.length + 1}" Type="${NS_REL}/styles" Target="styles.xml"/></Relationships>` },
    { name: 'xl/styles.xml', data: XLSX_STYLES },
    ...sheets.map((s, i) => ({ name: `xl/worksheets/sheet${i + 1}.xml`, data: sheetXML(s) })),
  ];
  return zipStore(files);
}
const lines = (t, width) => String(t || '').split('\n').reduce((a, l) => a + Math.max(1, Math.ceil(l.length / width)), 0);

function planWorkbook(rm) {
  const kind = kindOf(rm), plan = planOf(rm), info = plan.info || {}, role = kind === 'roadmap';
  const st = s => v => ({ v, s }), T = st(1), SUB = st(2), H = st(3), C = st(4), TM = st(5), BRK = st(6), TH = st(7), L = st(8), W = st(9), CC = st(10);
  const done = (w, d, i) => S.learned.has(lectureKey(rm, w, d, i));
  const typeLabel = role ? 'Role' : 'Skill';
  const sch = planSchedule(rm), logged = sch.days.filter(d => d.logged != null);

  const ov = { name: 'Overview', rows: [[T(`${rm.name} — 80-hour lecture plan`)], [SUB(`${typeLabel} roadmap · 4 weeks · Monday – Friday · 4 one-hour lectures a day · lecture-only (no practice, lab or assignment blocks)`)], []],
    cols: [20, 16, 24, 14, 16, 64], merges: ['A1:F1', 'A2:F2'], heights: { 0: 26 } };
  const rowsFacts = [['About', info.about], role ? ['What they do', splitList(info.does, ';').map(s => '• ' + s).join('\n')] : ['Prerequisites', info.prereq],
    ['Tools', info.tools], role ? ['Career path', info.career] : ['Used in roles', rolesUsing(rm.slug).map(r => S.ROLE[r].name).join(', ')],
    ['Total', '80 lecture hours'], ['Duration', `${sch.weeks.length} weeks · ${sch.days.length} teaching days`], ['Schedule', `Monday – Friday, ${DAY_HOURS} lecture hours a day`],
    ['Daily timings', `${SLOTS.join('   |   ')}   (break 11:00 – 11:15)`], ['Format', 'Lectures only — no practice, lab or assignment blocks'],
    ['Hours taught', logged.length ? `${logged.length} days logged · ${logged.reduce((a, d) => a + d.cap, 0)} of ${logged.length * DAY_HOURS} hours taught · ${sch.carried} lecture hours carried forward to the following days` : ''],
    ['Progress', `${progressOf({ kind, data: { rm } }).done} of 80 lecture hours learned`]].filter(f => f[1]);
  for (const [k, v] of rowsFacts) {
    const r = ov.rows.length;
    ov.rows.push([L(k), W(v)]); ov.merges.push(`B${r + 1}:F${r + 1}`); ov.heights[r] = 15 * lines(v, 125) + 4;
  }
  ov.rows.push([], [H('Week'), H('Level'), H('Focus'), H('Days'), H('Lecture hours'), H('Day themes')]);
  plan.weeks.forEach((days, wi) => {
    const w = wi + 1, themes = days.map((d, di) => `${WEEKDAYS[di]}: ${d.theme}`).join('\n');
    ov.heights[ov.rows.length] = 15 * 5 + 4;
    ov.rows.push([CC(`Week ${w}`), CC(LEVELS[wi][0]), C(`${LEVELS[wi][1]} — ${WEEK_DESC[wi]}`), CC(`${dayNo(w, 1)} – ${dayNo(w, 5)}`), CC(`${hourNo(w, 1, 1)} – ${hourNo(w, 5, 4)}`), C(themes)]);
  });

  const carryTxt = l => (l.carriedFrom != null ? `Carried forward from day ${l.carriedFrom + 1}` : '');
  const weekSheets = sch.weeks.map((days, wi) => {
    const w = wi + 1, last = colName(days.length), ls = days.flatMap(d => d.lectures);
    const sh = { name: `Week ${w} - ${weekLevels(days).split(' → ').at(-1)}`.slice(0, 31), cols: [18, ...days.map(() => 34)], merges: [`A1:${last}1`, `A2:${last}2`], heights: { 0: 26 }, freeze: 5 };
    sh.rows = [[T(`${rm.name} · Week ${w} — ${weekLevels(days)}`)],
      [SUB(`Days ${days[0].k + 1} – ${days.at(-1).k + 1}${ls.length ? ` · Lecture hours ${ls[0].n} – ${ls.at(-1).n}` : ''} · ${wi < 4 ? WEEK_DESC[wi] : 'Lectures carried forward to finish the plan.'}`)], [],
      [H('Time'), ...days.map(d => H(`${WEEKDAYS[d.k % 5]}\nDay ${d.k + 1}${d.logged != null ? `\nTaught ${d.cap} of ${DAY_HOURS} h` : ''}`))],
      [TM('Theme'), ...days.map(d => TH(dayThemes(d)))]];
    sh.heights[3] = 46; sh.heights[4] = 34;
    SLOTS.forEach((slot, hi) => {
      if (hi === 2) { sh.merges.push(`B${sh.rows.length + 1}:${last}${sh.rows.length + 1}`); sh.rows.push([BRK('11:00 – 11:15'), BRK('Break'), ...days.slice(1).map(() => BRK(''))]); }
      sh.heights[sh.rows.length] = 64;
      sh.rows.push([TM(`${slot}\nLecture ${hi + 1}`), ...days.map(d => {
        const l = d.lectures[hi];
        if (!l) return C(d.logged != null && hi >= d.cap ? 'Not taught — moved to the next day' : '');
        return C(`Hour ${l.n}${done(l.w, l.d, l.i) ? '  ✓ learned' : ''}${l.carriedFrom != null ? `  ↻ from day ${l.carriedFrom + 1}` : ''}\n${l.title}`);
      })]);
    });
    sh.rows.push([], [H('Hour'), H('Day'), H('Time'), H('Theme'), H('Lecture'), H('Key topics')]);
    ls.forEach(l => {
      const parts = lectureParts(l.title);
      sh.heights[sh.rows.length] = 15 * Math.max(lines(l.title, 32), lines(l.theme, 32), parts ? parts.length : 1) + 6;
      sh.rows.push([CC(l.n), C(`${WEEKDAYS[l.k % 5]} · Day ${l.k + 1}`), C(SLOTS[l.slot]), C(l.theme), C(l.title + (l.carriedFrom != null ? `\n(${carryTxt(l)})` : '')), C(parts ? parts.map(p => '• ' + p).join('\n') : '')]);
    });
    return sh;
  });

  const syl = { name: 'Full syllabus', cols: [7, 9, 13, 6, 12, 15, 30, 44, 44, 52, 11, 26], freeze: 3, merges: ['A1:L1'], heights: { 0: 26 },
    rows: [[T(`${rm.name} — full 80-lecture syllabus (basic to advanced)`)], [SUB('Every lecture in teaching order, with its key topics and learning outcome. Lectures the trainer could not cover move to the next day.')],
      ['Hour', 'Week', 'Level', 'Day', 'Weekday', 'Time', 'Day theme', 'Lecture', 'Key topics', 'Learning outcome', 'Status', 'Note'].map(H)] };
  sch.days.forEach(d => d.lectures.forEach(l => {
    const parts = lectureParts(l.title), outcome = `Explain “${l.title}” and how it is used in real ${rm.name} work.`;
    syl.heights[syl.rows.length] = 15 * Math.max(lines(l.title, 42), parts ? parts.length : 1, lines(outcome, 50)) + 6;
    syl.rows.push([CC(l.n), CC(d.week), CC(l.level), CC(d.k + 1), C(WEEKDAYS[d.k % 5]), C(SLOTS[l.slot]), C(l.theme), C(l.title),
      C(parts ? parts.map(p => '• ' + p).join('\n') : ''), C(outcome), CC(done(l.w, l.d, l.i) ? 'Learned' : 'Not yet'), C(carryTxt(l))]);
  }));
  return [ov, ...weekSheets, syl];
}
function downloadXLSX(rm) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(workbookBlob(planWorkbook(rm)));
  a.download = `${rm.slug}-80-hour-timetable.xlsx`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

function body(n) {
  const d = n.data, D = S.data;
  const live = liveBody(n);
  if (live != null) return live;
  switch (n.kind) {
    case 'root': {
      kids(n);
      const m = D.metadata;
      return `<p>This mind map connects <b>${m.allCompanyNames}</b> hiring companies across Hyderabad, Bengaluru and Chennai to the roles freshers target, the skills those roles need, and a complete 80-hour lecture plan for every role and skill.</p>
        <div class="stats"><div class="stat"><b>${m.allCompanyNames}</b><span>Companies</span></div><div class="stat"><b>${m.jobEvidence}</b><span>Verified job postings</span></div><div class="stat"><b>${m.roleRoadmaps + m.skillRoadmaps}</b><span>Roles &amp; skills with a plan</span></div><div class="stat"><b>80 h</b><span>Lectures per role / skill</span></div></div>
        ${liveRootHTML()}
        <h3>Three teams, three branches</h3>${facts([['Outreach team', `${goBtn(S.nodes.get('root/outreach'), 'Live fresher openings, location-wise openings, verified job openings, drives, internships & hackathons', true)}`],
          ['Training', `${goBtn(S.nodes.get('root/training'), 'Role roadmaps, skill roadmaps and the timetable builder', true)}`],
          ['Profile development', `${goBtn(S.nodes.get('root/profile'), 'Resume for the job description and the JD-based profile builder', true)}`]])}
        <h3>The 80-hour plan</h3>${facts([['Duration', '4 weeks · 20 teaching days'], ['Schedule', 'Monday – Friday, 4 one-hour lectures a day'], ['Format', 'Lecture-only — no practice, lab or assignment blocks'], ['Progression', 'Beginner → Intermediate → Advanced → Expert']])}
        <h3>How to explore</h3>${ul(['Click any node to open its branch; click the circle on the right edge to open or close it.', 'Outreach team → Location-wise openings → City → Category → Company → Role, or Training → Role / Skill roadmaps → Week → Day → Lecture hour.', 'Open “Everything about …” on any role or skill for the complete guide: responsibilities, tools, career path, hiring companies and full syllabus.', 'Tick the circle on a lecture hour to mark it learned — progress is saved in this browser.', 'Press / to search, arrow keys to walk the map, F to fit and C to center.'])}
        <h3>Your learning progress</h3><p><b>${S.learned.size}</b> lecture hour${S.learned.size === 1 ? '' : 's'} marked as learned.</p>
        ${S.learned.size ? '<button class="chip-btn" data-act="reset">Reset progress</button>' : ''}
        ${note(`Company directory checked on ${esc(m.date)}. Today's openings come from the live job feed, refreshed daily — always confirm on the employer’s careers page before applying.`)}`;
    }
    case 'hub': return hubBody(n);
    case 'tool': return toolBody(n);
    case 'city': {
      return `<p><b>${d.total}</b> companies in ${esc(d.city)} are grouped into <b>${d.cats.length}</b> categories. Open a category to browse companies alphabetically.</p>
        ${facts(d.cats.map(([c, m]) => [c, `${m.size}`]))}`;
    }
    case 'category':
      return `<p><b>${d.count}</b> ${esc(d.category)} companies in ${esc(d.city)}. Large lists are split into alphabetical groups so the map stays readable.</p>${note('Inclusion in the directory means the company hires in this city ecosystem, not that it currently has a fresher opening.')}`;
    case 'group':
      if (d.names) return `<p>${d.names.length} ${esc(d.noun)} in this alphabetical group.</p>${tags(d.names)}`;
      return `<p>${esc(n.sub)}. Open one to see its complete guide and 80-hour lecture plan.</p>`;
    case 'library': {
      const txt = { roles: 'Every career role, grouped by domain. Each opens into a complete guide to the role and an 80-hour lecture plan (4 weeks × 5 days × 4 hours) from beginner to expert.', skills: 'Every technology and skill, grouped by area. Each opens into a complete guide and an 80-hour lecture plan. Mark lecture hours as learned to track progress.', jds: 'Companies with a sourced, paraphrased job description for a fresher or intern role, including eligibility and skills mentioned.' }[n.key];
      return `<p>${txt}</p>`;
    }
    case 'company': {
      const c = d.company, plan = splitRoles(c), prep = prepItems(c);
      const loc = c.locations[0];
      return facts([['Category', esc(c.categories.join(', '))], ['Cities', esc(c.cities.join(', '))], ['Verified postings', c.jds.length ? `${c.jds.length}` : 'None sourced yet']])
        + `<h3>Fresher roles they target</h3>${tags(plan)}`
        + `<h3>Suggested preparation</h3>${tags([...prep.skills.map(s => S.SKILL[s].name), ...prep.concepts])}`
        + (c.jds.length ? '' : note('Roles and preparation are suggestions based on the company type, not a confirmed job description.', true))
        + companyLiveHTML(c)
        + links([['Find fresher jobs', loc?.search || search(`${c.name} fresher jobs`), true], ['Careers page', search(`${c.name} careers`)]]);
    }
    case 'section': {
      const t = {
        jds: 'Job descriptions sourced from the employer or a job board, paraphrased. Each one opens into eligibility, skills, a learning roadmap and typical interview stages.',
        roles: 'Typical entry-level roles for this kind of company. Each role opens into the roadmaps, core skills and interview stages that prepare you for it.',
        prep: 'What to study before applying here. Skills open into their own 80-hour lecture plan; the rest have short study notes.',
        where: 'Where this company appears in the city directories, with the source used.',
        skills: 'Core skills for this role. Each opens into its own 80-hour lecture plan.',
        rskills: 'Skills this role uses day to day. Each opens into its own complete guide and 80-hour lecture plan.',
        concepts: 'Supporting areas without a dedicated roadmap. Open one for study notes.',
        interview: `A typical ${FAMILY[d.family]?.label.toLowerCase() || ''} hiring flow. Use it to plan preparation.`,
        jdskills: 'Skills explicitly mentioned in the job description, linked to roadmaps where one exists.',
        paths: 'Role plans that best match this job description, each with an 80-hour lecture schedule.',
      }[d.what] || 'Open this branch to see what is inside.';
      return `<p>${t}</p>` + (d.what === 'interview' ? note('These stages are a common pattern for the role family, not this company’s confirmed process.', true) : '');
    }
    case 'role': {
      const p = d.plan;
      return `<p>A suggested entry-level role at <b>${esc(d.company.name)}</b>. The branches show what to learn and how hiring usually works for ${esc(FAMILY[p.family].label.toLowerCase())} roles.</p>`
        + facts([['Role family', esc(FAMILY[p.family].label)], ['Roadmaps', esc(p.roadmaps.map(s => S.ROLE[s].name).join(', ') || '—')], ['Core skills', esc(p.skills.map(s => S.SKILL[s].name).join(', ') || '—')]])
        + note('Suggested from the company directory — not a verified opening. Check the careers page before applying.', true)
        + links([['Search this role', search(`${d.company.name} ${d.title} fresher`), true]]);
    }
    case 'jd': {
      const j = d.jd;
      return `<p>${esc(j['JD Summary'] || '')}</p>`
        + facts([['Company', esc(d.company.name)], ['City', esc(j.City)], ['Eligibility', esc(j['Fresher Eligibility'])], ['Skills', esc(j['JD Mentioned Skills'])], ['Evidence', esc(j['Evidence Type'])], ['Status', esc(j['Opening Status'])], ['Checked', esc(j['Checked On'])]])
        + (j.Notes ? note(esc(j.Notes)) : '')
        + links([['Open job posting', j['Source URL'], true]]);
    }
    case 'roadmap': case 'skill': {
      const rm = d.rm, p = progressOf(n), info = planOf(rm).info;
      const about = info?.about || `${rm.name}, taught from the fundamentals to industry-level depth.`;
      return `<p>${esc(about)}</p>${progressBar(p)}`
        + facts([['Total', '80 lecture hours'], ['Duration', '4 weeks · 20 teaching days'], ['Schedule', 'Monday – Friday, 4 hours a day'], ['Daily timings', SLOTS.join('<br>')],
          ['If a day is cut short', 'Log the hours taught in the full timetable — untaught lectures carry forward to the next day'],
          ['Format', 'Lectures only — no practice, lab or assignment blocks'], ['Progression', LEVELS.map(l => l[0]).join(' → ')]])
        + `<h3 class="h-row">Weekly timetable <button class="link-btn" data-act="plan">⤢ Expand</button></h3>${timetable(n)}`
        + (() => { const s = planSchedule(rm); return s.carried ? note(`<b>Reframed:</b> the trainer's hours-taught log carried ${s.carried} lecture hour${s.carried > 1 ? 's' : ''} forward — the timetable now runs ${s.days.length} teaching days. <button class="link-btn" data-act="plan">See the re-arranged timetable</button>`, true) : ''; })()
        + `<div class="btn-row"><button class="chip-btn primary" data-act="plan">⤢ Open full timetable &amp; syllabus</button><button class="chip-btn" data-act="xlsx">Download Excel</button><button class="chip-btn" data-go="${esc(n.id + '/about')}">Complete guide</button></div>`
        + `<div class="b-promo"><b>Combine with other skills?</b><span>${n.kind === 'roadmap' ? `Pick from the ${esc(rm.name)} skills and build one 80-hour timetable with calendar dates.` : `Add ${esc(rm.name)} to a combined 80-hour timetable with other skills and calendar dates.`}</span>`
        + `<button class="chip-btn primary" data-act="build">${n.kind === 'roadmap' ? 'Build timetable from this role' : '＋ Add to combined timetable'}</button></div>`
        + (n.kind === 'roadmap' ? `<div class="b-promo"><b>Applying for ${esc(rm.name)} roles?</b><span>Upload your resume and the Resume Agent rewrites it on the ATS-proven template for this role — or paste a job description for an exact match.</span><button class="chip-btn primary" data-act="resume" data-f="${esc(JSON.stringify({ role: rm.slug }))}">Tailor my resume for this role</button></div>` + roleLiveHTML(rm) : '')
        + `<h3>What each week covers</h3>${facts(LEVELS.map(([l, f], i) => [`Week ${i + 1} · ${l}`, `<b>${f}</b> — ${esc(planOf(rm).weeks[i].map(x => x.theme).join(', '))}`]))}`;
    }
    case 'overview':
      return `<div class="btn-row"><button class="chip-btn primary" data-act="plan">⤢ Open full timetable &amp; syllabus</button><button class="chip-btn" data-act="xlsx">Download Excel</button></div>` + guideHTML(d.rm, d.kind, true);
    case 'week': {
      const { w } = d, p = progressOf(n), [lvl, focus] = LEVELS[w - 1];
      return `<p><b>Week ${w} — ${lvl} level (${focus}).</b> ${WEEK_DESC[w - 1]}</p>${progressBar(p)}`
        + facts([['Teaching days', `Day ${dayNo(w, 1)} – ${dayNo(w, 5)} of 20`], ['Lecture hours', `Hour ${hourNo(w, 1, 1)} – ${hourNo(w, 5, 4)} of 80`], ['Schedule', 'Mon – Fri · 4 lectures a day']])
        + kids(n).map(dn => `<h4>${goBtn(dn, null, true)}<small>${progressOf(dn).done}/4</small></h4><ul class="topic-list">${kids(dn).map(hn => `<li class="${isLearned(hn) ? 'done' : ''}">${esc(hn.title)}</li>`).join('')}</ul>`).join('');
    }
    case 'day': {
      const { rm, w } = d, day = d.d, theme = planOf(rm).weeks[w - 1][day - 1].theme, p = progressOf(n);
      const prev = neighbour(n, -1, 1), next = neighbour(n, 1, 1);
      return `<p>${WEEKDAYS[day - 1]} of week ${w} (${LEVELS[w - 1][0]}) — teaching day <b>${dayNo(w, day)} of 20</b> in the ${esc(rm.name)} plan. Today's theme is <b>${esc(theme)}</b>.</p>${progressBar(p)}`
        + `<h3>Today's timetable</h3><div class="slots">${kids(n).map((hn, hi) => `${hi === 2 ? '<div class="brk">Break · 11:00 – 11:15</div>' : ''}<div class="t">${SLOTS[hi]}</div><div>${goBtn(hn)}</div><div class="ok">${isLearned(hn) ? '✓' : ''}</div>`).join('')}</div>`
        + note('Four one-hour lectures with a 15-minute break. No practice, lab or assignment time is scheduled.')
        + `<div class="nav-row">${prev ? `<button class="chip-btn" data-go="${esc(prev.id)}" data-open="1"><small>← Previous day</small>${esc(short(prev.title, 34))}</button>` : ''}${next ? `<button class="chip-btn" data-go="${esc(next.id)}" data-open="1"><small>Next day →</small>${esc(short(next.title, 34))}</button>` : ''}</div>`;
    }
    case 'hour': {
      const { rm, w, i } = d, day = d.d, t = n.title, L = isLearned(n), theme = planOf(rm).weeks[w - 1][day - 1].theme;
      const prev = neighbour(n, -1, 2), next = neighbour(n, 1, 2), parts = lectureParts(t);
      const core = parts ? parts.map(x => `${x} — definition, how it works and where it is used`)
        : ['Definitions and key vocabulary', 'How it works, step by step, with diagrams', `Where it shows up in real ${rm.name} work`, 'Common misconceptions and pitfalls'];
      const q = `“${t}”`;
      return `<p>Lecture <b>${hourNo(w, day, i)} of 80</b> · ${WEEKDAYS[day - 1]}, week ${w} (${LEVELS[w - 1][0]}) · ${SLOTS[i - 1]}. Part of the day on <i>${esc(theme)}</i> in the ${esc(rm.name)} plan.</p>
        <button class="chip-btn ${L ? 'ok' : 'primary'}" data-act="learn">${L ? '✓ Learned — click to undo' : 'Mark as learned'}</button>
        <h3>60-minute lecture outline</h3><ul class="outline">
          <li><span class="mins">0–10 min</span><div><b>Introduction</b>${ul([prev ? `Recap of “${prev.title}”` : 'Course goals and how the 80 hours are organised', `Why ${q} matters for ${rm.name}`])}</div></li>
          <li><span class="mins">10–35 min</span><div><b>Core concepts</b>${ul(core)}</div></li>
          <li><span class="mins">35–50 min</span><div><b>Instructor demonstration</b>${ul(['A worked example walked through live by the instructor', 'Reading real code, configuration or output and explaining each step'])}</div></li>
          <li><span class="mins">50–60 min</span><div><b>Summary &amp; Q&amp;A</b>${ul(['Key takeaways in three sentences', next ? `Preview of the next lecture: “${next.title}”` : 'Course wrap-up and next steps'])}</div></li>
        </ul>
        <h3>Learning objectives</h3>${ul([`Explain ${q} in your own words using the correct terminology.`, `Describe how it works and why it is designed that way.`, `Recognise where it is used in real ${rm.name} projects and interviews.`])}
        ${facts([['Builds on', prev ? goBtn(prev) : 'Start of the course'], ['Leads to', next ? goBtn(next) : 'End of the 80-hour plan 🎓']])}
        <h3>Key questions</h3>${ul([`What problem does ${q} address, and what would break without it?`, 'What mistakes do beginners commonly make here?', `How would you explain ${q} in a 60-second interview answer?`])}
        ${note('Lecture-only hour. The schedule has no practice, lab or assignment blocks.')}
        ${links([['Read tutorials', search(`${t} ${rm.name} tutorial`), true], ['Watch lectures', yt(`${t} ${rm.name}`)]])}
        <div class="nav-row">${prev ? `<button class="chip-btn" data-go="${esc(prev.id)}"><small>← Previous lecture</small>${esc(short(prev.title, 34))}</button>` : ''}${next ? `<button class="chip-btn" data-go="${esc(next.id)}"><small>Next lecture →</small>${esc(short(next.title, 34))}</button>` : ''}</div>`;
    }
    case 'stage': {
      const [name, focus] = d.stage;
      return `<p><b>${esc(name)}</b> is stage ${d.i + 1} of a typical ${esc(FAMILY[d.family].label.toLowerCase())} hiring process.</p><h3>Prepare for</h3>${ul(focus)}`
        + note('Illustrative pattern only. Real rounds vary by company and year — check recent candidate experiences.', true)
        + links([['Interview experiences', search(`${name} ${FAMILY[d.family].label} fresher interview experience`), true]]);
    }
    case 'concept': {
      const txt = CONCEPT_NOTES[d.label.toLowerCase()] || `Build working knowledge of ${d.label}: learn the key terms, try it hands-on in a small exercise, and be ready to explain how you used it.`;
      return `<p>${esc(txt)}</p>${links([['Learn more', search(`${d.label} for freshers`), true], ['Videos', yt(`${d.label} tutorial`)]])}`;
    }
    case 'info': {
      if (d.location) {
        const l = d.location;
        return facts([['City', esc(l.city)], ['Category', esc(l.category)], ['Confidence', esc(l.confidence)]]) + links([['Search openings', l.search, true], ['Directory source', l.source]]);
      }
      if (d.stage) return `<p>Part of the <b>${esc(d.stage)}</b> stage.</p><p>Practise this out loud and on paper, time yourself, and keep two concrete examples from your own projects ready.</p>${links([['Practice resources', search(`${d.text} interview preparation`), true]])}`;
      return `${d.label ? `<h3>${esc(d.label)}</h3>` : ''}<p>${esc(d.text || n.title)}</p>${links([['Source', d.url]])}`;
    }
  }
  return '';
}

function hubBody(n) {
  const t = J.data?.totals;
  switch (n.data.hub) {
    case 'outreach':
      return `<p>Everything the outreach team needs to place freshers: <b>today's live openings</b>, openings <b>city by city</b>, <b>verified job descriptions</b> and fresher <b>drives, internships &amp; hackathons</b> — only roles open to 0 years of experience.</p>`
        + (t ? `<div class="stats"><div class="stat"><b>${t.jobs}</b><span>Live fresher openings</span></div><div class="stat"><b>${t.companiesWithJobs}</b><span>Companies hiring today</span></div><div class="stat"><b>${S.data.metadata.jobEvidence}</b><span>Verified job openings</span></div><div class="stat"><b>${t.events}</b><span>Drives, internships &amp; hackathons</span></div></div>` : '')
        + `<div class="btn-row"><button class="chip-btn primary" data-act="jobs" data-f="{}">Open the live job feed</button><button class="chip-btn" data-act="jobs" data-f="${esc(JSON.stringify({ tab: 'events' }))}">Drives, internships &amp; hackathons</button></div>` + (typeof staleNote === 'function' ? staleNote() : '');
    case 'training':
      return `<p>Lecture-only training plans: every <b>role</b> and <b>skill</b> has an 80-hour timetable — 4 weeks, Monday – Friday, ${DAY_HOURS} one-hour lectures a day — from beginner to expert. The <b>timetable builder</b> combines several skills into one dated timetable.</p>`
        + facts([['Role roadmaps', `${S.data.catalog.role.length}`], ['Skill roadmaps', `${S.data.catalog.skill.length}`], ['Day plan', `${DAY_HOURS} lecture hours · 09:00 – 13:15`],
          ['Short day?', 'Set “Hours taught” under the day in any timetable — untaught lectures carry forward to the next day and the rest of the timetable re-arranges itself']])
        + `<div class="btn-row"><button class="chip-btn primary" data-act="tool" data-tool="builder">Open the timetable builder</button></div>`;
    case 'profile':
      return `<p>Build a job-ready profile from a real job description: tailor the <b>resume</b> on the ATS-proven template, and use the <b>JD-based profile builder</b> to see which skills the job asks for, which ones you are missing, a headline and summary to use, and an 80-hour training plan for the gaps.</p>`
        + `<div class="btn-row"><button class="chip-btn primary" data-act="tool" data-tool="resume">Tailor my resume</button><button class="chip-btn" data-act="tool" data-tool="profile">JD-based profile builder</button></div>`;
  }
  return '';
}
function toolBody(n) {
  switch (n.data.tool) {
    case 'builder':
      return `<p>Pick skills from any role, choose the syllabus levels and get one combined <b>80-hour lecture timetable</b> with real calendar dates, holidays and Excel / calendar downloads.</p>`
        + ul([`${DAY_HOURS} one-hour lectures a day, Monday – Friday`, 'Mark holidays on the calendar — lectures move to the next working day', 'Log the hours the trainer actually taught; untaught lectures carry forward and the timetable is re-arranged automatically'])
        + `<div class="btn-row"><button class="chip-btn primary" data-act="tool" data-tool="builder">Open the timetable builder</button></div>`;
    case 'resume':
      return `<p>Upload your resume (PDF, Word or text), pick a role or a live opening, or paste the job description. The Resume Agent rewrites it on the ATS-proven one-column template and shows the keyword match before and after.</p>`
        + `<div class="btn-row"><button class="chip-btn primary" data-act="tool" data-tool="resume">Open the Resume studio</button></div>`;
    case 'profile':
      return `<p>Paste a job description or pick a live opening. The profile builder lists the skills it asks for — ticked when your resume already shows them — and gives you the closest role roadmaps, a headline and summary, certifications to aim for, and a one-click 80-hour timetable for the missing skills.</p>`
        + `<div class="btn-row"><button class="chip-btn primary" data-act="tool" data-tool="profile">Open the profile builder</button></div>`;
    case 'bulk':
      return `<p>Upload many resumes at once, tailor each one to the same job description or to its best-matching role, and download every PDF and Word file plus an Excel report in one ZIP.</p>`
        + `<div class="btn-row"><button class="chip-btn primary" data-act="tool" data-tool="bulk">Open bulk tailoring</button></div>`;
  }
  return '';
}
function openTool(tool) {
  if (tool === 'builder') openBuilder();
  else openResume({ tab: { resume: 'single', profile: 'profile', bulk: 'bulk' }[tool] });
}

let panelFor = null;
function renderPanel() {
  const n = S.sel; if (!n) return;
  const keepScroll = panelFor === n ? panel.scrollTop : 0;
  panelFor = n;
  const hk = hasKids(n);
  const crumbs = lineage(n).slice(0, -1).map(a => `<button class="crumb" data-go="${esc(a.id)}">${esc(short(a.title, 26))}</button>`).join('<span class="sep">›</span>');
  let html = `<div class="p-head"><span class="pill k-${n.kind}">${KIND_LABEL[n.kind]}</span>${crumbs ? `<div class="crumbs">${crumbs}</div>` : ''}<h2>${esc(n.title)}</h2>${n.sub ? `<p class="p-sub">${esc(n.sub)}</p>` : ''}
    <div class="p-actions">${hk ? `<button class="chip-btn primary" data-act="toggle">${n.expanded ? 'Collapse branch' : 'Expand branch'}</button><button class="chip-btn" data-act="expand2">Expand 2 levels</button>` : ''}${['week', 'day', 'hour'].includes(n.kind) ? '<button class="chip-btn" data-act="plan">⤢ Full timetable</button>' : ''}<button class="chip-btn" data-act="center">Center on map</button></div></div>
    <div class="p-body">${body(n)}</div>`;
  if (hk) {
    const ks = kids(n);
    html += `<div class="p-explore"><h3>Explore next <span>${ks.length}</span></h3><div class="chips">${ks.slice(0, 48).map(c => `<button class="chip k-${c.kind}" data-go="${esc(c.id)}" data-open="1">${esc(short(c.title, 44))}</button>`).join('')}${ks.length > 48 ? `<span class="muted">+${ks.length - 48} more on the map</span>` : ''}</div></div>`;
  }
  panel.innerHTML = html;
  panel.scrollTop = keepScroll;
}
panel.addEventListener('click', e => {
  const t = e.target.closest('[data-go],[data-act],[data-reveal]'); if (!t) return;
  if (t.dataset.go) { go(t.dataset.go, !!t.dataset.open); return; }
  if (t.dataset.reveal) { $('#hint').classList.add('gone'); revealKeys(JSON.parse(t.dataset.reveal), true); return; }
  const n = S.sel;
  switch (t.dataset.act) {
    case 'toggle': onNodeClick(n, true); break;
    case 'expand2': expandLevels(n, 2); break;
    case 'center': centerOn(n); break;
    case 'learn': toggleLearned(n); break;
    case 'plan': openPlan(n.data.rm, n.data); break;
    case 'xlsx': downloadXLSX(n.data.rm); break;
    case 'build': openBuilder(kindOf(n.data.rm) === 'roadmap' ? { role: n.data.rm.slug } : { skill: n.data.rm.slug }); break;
    case 'buildrole': openBuilder({ role: t.dataset.role }); break;
    case 'jobs': openJobs(JSON.parse(t.dataset.f || '{}')); break;
    case 'resume': openResume(JSON.parse(t.dataset.f || '{}')); break;
    case 'tool': openTool(t.dataset.tool); break;
    case 'reset': if (confirm('Clear all learned lecture hours?')) { S.learned.clear(); saveLearned(); update(); } break;
  }
});

/* ------------------------------------------------------------------ full-screen timetable & syllabus */
const modal = $('#planModal'), modalCard = modal.firstElementChild;
const bar = (done, total) => `<div class="track"><div class="fill" style="width:${(100 * done / total).toFixed(1)}%"></div></div>`;

function openPlan(rm, focus = {}) {
  S.modal = { rm, kind: kindOf(rm), tab: 'tt', focus: { w: focus.w, d: focus.d, i: focus.i } };
  modal.hidden = false;
  renderModal();
  if (focus.w) (modalCard.querySelector('.g-c.focus')?.closest('.m-week') || modalCard.querySelector('#mw-' + focus.w))?.scrollIntoView({ block: 'start' });
  modalCard.querySelector('.m-close').focus({ preventScroll: true });
}
function closePlan() { S.modal = null; modal.hidden = true; modalCard.innerHTML = ''; }

const weekLevels = days => { const ls = uniq(days.flatMap(d => d.lectures.map(l => l.level))); return ls.length > 1 ? `${ls[0]} → ${ls.at(-1)}` : ls[0] || 'Carry-forward'; };
const dayThemes = d => uniq(d.lectures.map(l => l.theme)).join(' / ') || (d.cap === 0 ? 'No class held' : '');
const carryTag = l => (l.carriedFrom != null ? `<em class="g-carry" title="Not taught on day ${l.carriedFrom + 1} — carried forward">↻ from Day ${l.carriedFrom + 1}</em>` : '');
const movedCell = d => `<div class="g-c g-moved"><b>Not taught</b><small>${d.cap === 0 ? 'No class — every lecture moved on' : 'Moved to the next day'}</small></div>`;
function reframeNote(sch, resetAttr) {
  const logged = sch.days.filter(d => d.logged != null);
  if (!logged.length) return note(`Trainer took fewer hours on a day? Set <b>Hours taught</b> under that day — the untaught lectures move to the start of the next day and the whole timetable re-arranges itself, still ${DAY_HOURS} hours a day, Monday – Friday.`);
  const taught = logged.reduce((a, d) => a + d.cap, 0);
  return `<div class="note reframe"><b>Reframed timetable.</b> ${logged.length} day${logged.length > 1 ? 's' : ''} logged · ${taught} of ${logged.length * DAY_HOURS} hours taught`
    + (sch.carried ? ` · <b>${sch.carried} lecture hour${sch.carried > 1 ? 's' : ''} carried forward</b> · the plan now runs <b>${sch.days.length} teaching days</b>${sch.extraDays ? ` (${sch.extraDays} more than planned)` : ''}` : ' · nothing carried forward')
    + `. <button class="link-btn" ${resetAttr}>Clear the hours-taught log</button></div>`;
}
function modalTimetable({ rm, focus }) {
  const sch = planSchedule(rm);
  return reframeNote(sch, 'data-mact="untaught"') + sch.weeks.map((days, wi) => {
    const w = wi + 1, ls = days.flatMap(d => d.lectures), done = ls.filter(l => S.learned.has(lectureKey(rm, l.w, l.d, l.i))).length;
    let g = `<div class="g-h">Time</div>${days.map(d => `<div class="g-h">${WEEKDAYS[d.k % 5]}<small>Day ${d.k + 1}</small>${taughtSelect(`data-mtaught="${d.id}"`, d)}</div>`).join('')}`
      + `<div class="g-t">Theme</div>${days.map(d => `<div class="g-theme">${esc(dayThemes(d))}</div>`).join('')}`;
    SLOTS.forEach((slot, hi) => {
      if (hi === 2) g += '<div class="g-break">Break · 11:00 – 11:15</div>';
      g += `<div class="g-t">${slot}<small>Lecture ${hi + 1}</small></div>` + days.map(d => {
        const l = d.lectures[hi];
        if (!l) return d.logged != null && hi >= d.cap ? movedCell(d) : '<div class="g-c g-empty"></div>';
        const ref = `${l.w}|${l.d}|${l.i}`, ok = S.learned.has(lectureKey(rm, l.w, l.d, l.i));
        const foc = focus.w === l.w && focus.d === l.d && (!focus.i || focus.i === l.i);
        return `<div class="g-c${ok ? ' done' : ''}${foc ? ' focus' : ''}${l.carriedFrom != null ? ' carried' : ''}"><span class="g-no">Hour ${l.n}${carryTag(l)}</span>`
          + `<button class="g-title" data-mgo="${ref}" title="Show this lecture on the map">${esc(l.title)}</button>`
          + `<button class="g-chk" data-mlearn="${ref}" title="${ok ? 'Learned — click to undo' : 'Mark as learned'}">${ok ? '✓' : ''}</button></div>`;
      }).join('');
    });
    const range = ls.length ? ` · lecture hours ${ls[0].n}–${ls.at(-1).n}` : '';
    return `<section class="m-week" id="mw-${w}"><div class="m-week-h"><div><h3>Week ${w} · ${weekLevels(days)}</h3>`
      + `<p>${wi < 4 ? WEEK_DESC[wi] + ' ' : 'Lectures carried forward to finish the plan. '}Days ${days[0].k + 1}–${days.at(-1).k + 1}${range}.</p></div>`
      + `<div class="m-wp">${bar(done, ls.length || 1)}<small>${done} / ${ls.length} hours learned</small></div></div>`
      + `<div class="m-gridwrap"><div class="m-grid" style="grid-template-columns:120px repeat(${days.length},minmax(150px,1fr))">${g}</div></div></section>`;
  }).join('');
}
function modalSyllabus({ rm }) {
  const sch = planSchedule(rm);
  return sch.weeks.map((days, wi) => {
    const w = wi + 1;
    return `<section class="m-week" id="ms-${w}"><div class="m-week-h"><div><h3>Week ${w} · ${weekLevels(days)}</h3><p>${wi < 4 ? WEEK_DESC[wi] : 'Lectures carried forward to finish the plan.'}</p></div></div>`
      + `<div class="m-days">${days.map(d => `<article class="m-day"><h4>${WEEKDAYS[d.k % 5]} · Day ${d.k + 1}${d.logged != null ? ` <em class="tl-tag${d.cap < DAY_HOURS ? ' short' : ''}">${d.cap}/${DAY_HOURS} h taught</em>` : ''}<span>${esc(dayThemes(d))}</span></h4>`
        + (d.lectures.length ? `<ol start="${d.lectures[0].n}">${d.lectures.map(l => {
          const parts = lectureParts(l.title), ok = S.learned.has(lectureKey(rm, l.w, l.d, l.i));
          return `<li class="${ok ? 'done' : ''}"><b>${esc(l.title)}</b><small>${SLOTS[l.slot]}${ok ? ' · ✓ learned' : ''}${l.carriedFrom != null ? ` · ↻ carried forward from Day ${l.carriedFrom + 1}` : ''}</small>${parts ? ul(parts) : ''}</li>`;
        }).join('')}</ol>` : '<p class="muted">No class held — the lectures moved to the next day.</p>') + '</article>').join('')}</div></section>`;
  }).join('');
}
function renderModal(keepScroll) {
  const M = S.modal; if (!M) return;
  const { rm, kind, tab } = M, p = progressOf({ kind, data: { rm } });
  const top = keepScroll ? modalCard.querySelector('.m-body')?.scrollTop || 0 : 0;
  const tabs = [['tt', 'Week-wise timetable'], ['syl', 'Full syllabus'], ['about', kind === 'roadmap' ? 'About the role' : 'About the skill']];
  const content = tab === 'tt' ? modalTimetable(M) : tab === 'syl' ? modalSyllabus(M) : tab === 'all' ? modalTimetable(M) + `<h2 class="m-print-h">Full syllabus</h2>` + modalSyllabus(M)
    : `<div class="p-body m-about">${guideHTML(rm, kind, false)}</div>`;
  const sch = planSchedule(rm), nw = sch.weeks.length;
  modalCard.innerHTML = `<header class="m-head"><div class="m-headl"><span class="pill k-${kind}">${kind === 'roadmap' ? 'Role roadmap' : 'Skill roadmap'}</span>`
    + `<h2 id="mTitle">${esc(rm.name)} — 80-hour lecture timetable</h2><p>${nw} weeks · ${sch.days.length} teaching days${sch.carried ? ` (reframed — ${sch.carried} h carried forward)` : ''} · Monday – Friday · ${DAY_HOURS} one-hour lectures a day (09:00 – 13:15) · lecture-only, no practice, lab or assignment blocks</p>`
    + `<div class="m-prog">${bar(p.done, TOTAL_HOURS)}<small>${p.done} of 80 lecture hours learned</small></div></div>`
    + `<div class="m-actions"><button class="chip-btn primary" data-mact="xlsx"><svg class="ico" viewBox="0 0 24 24"><path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14"/></svg>Download Excel</button><button class="chip-btn" data-mact="print">Print / PDF</button>`
    + `<button class="m-close" data-mact="close" title="Close (Esc)" aria-label="Close">×</button></div></header>`
    + `<div class="m-bar"><div class="m-tabs">${tabs.map(([k, l]) => `<button class="m-tab${tab === k ? ' on' : ''}" data-mtab="${k}">${l}</button>`).join('')}</div>`
    + (tab === 'about' ? '' : `<div class="m-weeknav">${sch.weeks.map((days, wi) => `<button data-mweek="${wi + 1}">Week ${wi + 1} · ${esc(weekLevels(days).split(' → ').at(-1))}</button>`).join('')}</div>`) + '</div>'
    + `<div class="m-body">${content}</div>`;
  modalCard.querySelector('.m-body').scrollTop = top;
}
function roadmapAnchor(rm) {
  const own = S.sel && lineage(S.sel).find(a => (a.kind === 'roadmap' || a.kind === 'skill') && a.data.rm === rm);
  if (own) return { from: own, keys: [] };
  const role = kindOf(rm) === 'roadmap';
  return { from: S.root, keys: [role ? 'roles' : 'skills', (role ? 'rr:' : 'sr:') + rm.slug] };
}
function printModal() {
  const M = S.modal, prev = M.tab;
  M.tab = 'all'; renderModal();
  const restore = () => { window.removeEventListener('afterprint', restore); if (S.modal) { S.modal.tab = prev; renderModal(); } };
  window.addEventListener('afterprint', restore);
  window.print();
}
modal.addEventListener('click', e => {
  if (e.target === modal) { closePlan(); return; }
  const t = e.target.closest('[data-mact],[data-mtab],[data-mweek],[data-mlearn],[data-mgo],[data-reveal]'); if (!t) return;
  const M = S.modal, ds = t.dataset;
  if (ds.mact === 'close') closePlan();
  else if (ds.mact === 'untaught') { if (confirm(`Clear every hours-taught entry for ${M.rm.name} and go back to the original timetable?`)) { clearTaught('rm:' + M.rm.slug); renderModal(true); renderPanel(); } }
  else if (ds.mact === 'xlsx') downloadXLSX(M.rm);
  else if (ds.mact === 'print') printModal();
  else if (ds.mtab) { M.tab = ds.mtab; renderModal(); }
  else if (ds.mweek) modalCard.querySelector(`#mw-${ds.mweek},#ms-${ds.mweek}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  else if (ds.mlearn) {
    const [w, d, i] = ds.mlearn.split('|').map(Number), k = lectureKey(M.rm, w, d, i);
    S.learned.has(k) ? S.learned.delete(k) : S.learned.add(k);
    saveLearned(); update(); renderModal(true);
  } else if (ds.mgo) {
    const [w, d, i] = ds.mgo.split('|'), a = roadmapAnchor(M.rm);
    closePlan(); $('#hint').classList.add('gone');
    revealKeys([...a.keys, 'w:' + w, 'd:' + d, 'h:' + i], false, a.from);
  } else if (ds.reveal) { closePlan(); revealKeys(JSON.parse(ds.reveal), true); }
});
modal.addEventListener('change', e => {
  const s = e.target.closest('[data-mtaught]'); if (!s || !S.modal) return;
  setTaught('rm:' + S.modal.rm.slug, s.dataset.mtaught, s.value);
  renderModal(true); renderPanel();
});

/* ------------------------------------------------------------------ boot */
function start(data) {
  S.data = data;
  for (const [name, slug] of EXTRA_ROLES) if (!data.catalog.role.some(r => r.slug === slug)) data.catalog.role.push({ name, slug, kind: 'role' });
  data.metadata.roleRoadmaps = data.catalog.role.length;
  for (const r of data.catalog.role) S.ROLE[r.slug] = r;
  for (const s of data.catalog.skill) S.SKILL[s.slug] = s;
  S.root = buildRoot();
  buildIndex();
  S.root.expanded = true;
  select(S.root);
  layout();
  fit(false);
  update();
  $('#loader').classList.add('hidden');
}

fetch(DATA_URL)
  .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(data => loadJobs().then(() => start(data)))
  .catch(() => {
    $('#loader').innerHTML = `<p>Could not load <b>${DATA_URL}</b> automatically.<br>Run a local server in this folder, or pick the file below.</p><input type="file" accept=".json" id="filePick">`;
    $('#filePick').onchange = e => {
      const f = e.target.files[0]; if (!f) return;
      f.text().then(t => start(JSON.parse(t))).catch(err => alert('Invalid JSON: ' + err.message));
    };
  });

new ResizeObserver(() => applyCam()).observe(stage);
