/* Builds assets/explainers/<slug>.json from the curriculum.
   The JSON files are what the app loads. Edit those to change a lecture.
   Running this script again overwrites them. */
const fs = require('fs');
const path = require('path');
const { CONCEPTS, GLOSSES, ADJECTIVES } = require('./explainer-library');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'assets', 'explainers');

global.window = {};
for (const file of fs.readdirSync(path.join(ROOT, 'assets', 'curriculum')).sort()) {
  if (file.endsWith('.js')) eval(fs.readFileSync(path.join(ROOT, 'assets', 'curriculum', file), 'utf8'));
}
const CURRICULUM = window.CURRICULUM;

const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const CONCEPTS_SORTED = [...CONCEPTS].sort((a, b) => b.phrase.length - a.phrase.length);
const GLOSS_KEYS = Object.keys(GLOSSES).sort((a, b) => b.length - a.length);

function sentences(text) {
  const src = String(text || '').trim();
  if (!src) return [];
  const parts = [];
  let start = 0;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (!/[.!?]/.test(ch)) continue;
    const prev = src[i - 1] || '';
    const next = src[i + 1] || '';
    if (ch === '.' && /\d/.test(prev) && /\d/.test(next)) continue;
    if (ch === '.' && next && !/\s/.test(next)) continue;
    if (next && !/\s/.test(next) && ch !== '?' && ch !== '!') continue;
    const slice = src.slice(start, i + 1).trim();
    if (slice) parts.push(slice);
    while (/\s/.test(src[i + 1] || '')) i++;
    start = i + 1;
  }
  const tail = src.slice(start).trim();
  if (tail) parts.push(tail);
  return parts;
}
function words(text) { return String(text || '').trim().split(/\s+/).filter(Boolean); }
function joinAnd(items) {
  const a = items.filter(Boolean);
  if (a.length <= 1) return a[0] || '';
  if (a.length === 2) return `${a[0]} and ${a[1]}`;
  return `${a.slice(0, -1).join(', ')}, and ${a[a.length - 1]}`;
}
function firstSentence(text, maxWords = 42) {
  const s = sentences(text)[0] || '';
  const w = words(s);
  return w.length > maxWords ? w.slice(0, maxWords).join(' ') + '.' : s;
}
function boundary(phrase) {
  const esc = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
  return new RegExp('(?:^|[^a-z0-9])' + esc + '(?:[^a-z0-9]|$)', 'i');
}
function hasPhrase(text, phrase) {
  return boundary(phrase).test(text);
}
const SKIP_GLOSS = new Set('role node model feature type data set class image stack heap name training object function method error test key view form user state body cost flag port path log hash sort tree lock race query table index cache token cloud trace alert budget ticket focus flex grid box media stream buffer handle syntax bug null float graph queue retry cursor domain call flow page host edge root base core main list array string server client request response module process package library framework session metric schema header status field value item line file files code step steps part parts case cases work job tool tools time end bit row rows map run app use'.split(/\s+/));
function matchConcept(part) {
  const p = part.toLowerCase().replace(/^(the|a|an)\s+/, '').trim();
  const exact = CONCEPTS_SORTED.find(c => c.phrase === p);
  if (exact) return exact;
  let best = null;
  for (const c of CONCEPTS_SORTED) {
    if (c.phrase.length < 8 || !hasPhrase(p, c.phrase)) continue;
    if (c.phrase.length / p.length < 0.62) continue;
    if (!best || c.phrase.length > best.phrase.length) best = c;
  }
  return best;
}
function glossesIn(part, coveredPhrase) {
  const found = [];
  for (const key of GLOSS_KEYS) {
    if (key.length < 4 || SKIP_GLOSS.has(key)) continue;
    if (coveredPhrase && hasPhrase(coveredPhrase, key) && coveredPhrase.length > key.length + 2) continue;
    if (!hasPhrase(part, key)) continue;
    if (found.some(g => hasPhrase(g.term, key) || hasPhrase(key, g.term))) continue;
    found.push({ term: key, say: GLOSSES[key] });
    if (found.length >= 3) break;
  }
  return found;
}
function adjectivesIn(part) {
  const found = [];
  const p = part.toLowerCase();
  for (const [word, say] of Object.entries(ADJECTIVES)) {
    if (hasPhrase(p, word)) found.push({ word, say });
  }
  return found.slice(0, 2);
}
function splitParts(title) {
  let t = title.trim();
  const paren = [];
  t = t.replace(/\(([^)]+)\)/g, (_, p) => { paren.push(p.trim()); return ' '; });
  let bits;
  if (/\bvs\.?\b|\bversus\b/i.test(t)) bits = t.split(/\s+\bvs\.?\b\s+|\s+\bversus\b\s+/i);
  else bits = t.split(/\s*(?:,|&|\band\b|\bwith\b)\s*/i);
  const out = [];
  for (let b of bits) {
    b = b.replace(/^[\s:–-]+|[\s:–-]+$/g, '').trim();
    if (!b) continue;
    if (b.includes(':')) out.push(...b.split(':').map(s => s.trim()).filter(s => s.length > 2));
    else out.push(b);
  }
  for (const p of paren) if (p.length > 2) out.push(p);
  const seen = new Set();
  const clean = [];
  for (const b of out) {
    const k = b.toLowerCase();
    if (seen.has(k) || k.length < 2 || /^(the|a|an|of|to|for|in|on)$/i.test(b)) continue;
    seen.add(k);
    clean.push(b);
  }
  return clean.length ? clean : [title.trim()];
}
function scene(kind, heading, caption, visual) {
  const bits = sentences(caption);
  const groups = [];
  let buf = [];
  let n = 0;
  const flush = () => {
    if (!buf.length) return;
    groups.push(buf.join(' '));
    buf = [];
    n = 0;
  };
  for (const s of bits) {
    const w = words(s).length;
    if (n && n + w > 64) flush();
    buf.push(s);
    n += w;
  }
  flush();
  if (!groups.length) groups.push(caption);
  return groups.map((cap, i) => ({
    kind,
    heading: i ? heading : heading,
    caption: cap,
    visual: i && visual?.layout === 'steps' ? { layout: 'bullets', items: visual.items } : visual,
  }));
}
function push(list, kind, heading, caption, visual) {
  for (const s of scene(kind, heading, caption, visual)) list.push(s);
}
function bulletsFrom(text, extra = []) {
  const items = [...sentences(text).slice(0, 3), ...extra].map(s => s.replace(/\.$/, '')).filter(Boolean);
  const uniq = [];
  for (const it of items) if (!uniq.some(u => u.toLowerCase() === it.toLowerCase())) uniq.push(it);
  return uniq.slice(0, 4);
}
function patternCaption(part, ctx) {
  const p = part.toLowerCase();
  const tool = ctx.tools[0] || ctx.subject;
  if (/^what\b|^why\b|\bis\b.+\?/.test(p)) {
    return `The question in this scene is “${part}”. Answer it in ordinary words before you reach for a formal definition. In ${ctx.subject}, a useful answer names the problem it solves and one place you would meet it while using ${tool}.`;
  }
  if (/introduc|overview|getting started|fundamentals|basics|essentials|orientation/.test(p)) {
    return `${part} is the map, not every street. Leave this scene knowing the three or four words people use in ${ctx.subject}, what each one is for, and which one the later scenes will open up. You are not expected to be fluent yet.`;
  }
  if (/set ?up|install|configur|environment/.test(p)) {
    return `This is setup, and setup is part of the skill. ${part} means your copy of ${tool} matches what the rest of the ${ctx.subject} lectures assume. Do it slowly, then prove it with a tiny example that actually runs. If it does not run, fix that before the next scene.`;
  }
  if (/best practice/.test(p)) {
    return `A best practice is a habit that prevents a known failure. For ${part} during ${ctx.theme}, the habit is small changes, names a stranger can read, and a check you can run again. If you cannot name the failure the habit prevents, it is fashion, not practice.`;
  }
  if (/interview/.test(p)) {
    return `A hiring conversation about ${ctx.subject} rewards a short answer: what it is, one example, and one trade-off. ${part} is practice for that shape. A list of terms with no example sounds memorised, even when the terms are correct.`;
  }
  if (/career|roadmap|certification|portfolio/.test(p)) {
    return `${part} is about the path, not a new syntax. In ${ctx.subject}, the first job is narrower than this whole course. Name the junior work a team will actually hand you, and the proof — a small project you can explain — that you can do it.`;
  }
  if (/test|testing|spec\b/.test(p)) {
    return `A test is a check that fails when behaviour changes by accident. For ${part}, write one example that should pass and one that should fail. If the check never fails, you have not seen it work.`;
  }
  if (/error|exception|debug|troubleshoot/.test(p)) {
    return `When ${part} goes wrong, the program is telling you an assumption broke. Read the first line that is yours, state what you expected, and change one thing. Starting over hides the lesson.`;
  }
  if (/secur|auth|permission|privacy|secret/.test(p)) {
    return `${part} is about a specific thing a stranger, or a mistake, must not be able to do. Name that thing, name who is allowed, and name the check that enforces it. A hidden button is not a check.`;
  }
  if (/deploy|release|pipeline|ci\/?cd|ship/.test(p)) {
    return `${part} means a change leaves your laptop in a way someone else can repeat. If the steps live only in your memory, they will be skipped on a bad day. Write them down where the project already builds.`;
  }
  if (/performance|optimi[sz]|profil/.test(p)) {
    return `For ${part}, start with a measurement. Decide what “slow” means, measure it, change one thing, and measure again. A guess about speed is how people make code harder without making it faster.`;
  }
  if (/architect|trade-?off|when to/.test(p)) {
    return `${part} is a choice with a cost. Say what you gain, what you give up, and which of those matters for a beginner project in ${ctx.subject}. There is no option that is free.`;
  }
  const ing = part.match(/^([A-Za-z]+ing)\s+(.+)$/);
  if (ing && ing[1].length > 5) {
    return `${ing[1]} is an action, and “${ing[2]}” is what it acts on. In ${ctx.subject}, the job is ${ing[1].toLowerCase()} ${ing[2]} so the next step has the right material. Name the thing, check it is the right one, then do only that. Extra material that does not change the result is noise.`;
  }
  return `${ctx.level === 'Beginner' ? 'Start from zero.' : ctx.level === 'Expert' ? 'Talk about this the way someone who does the job would.' : 'This is working knowledge, not a slogan.'} “${part}” is its own idea inside ${ctx.theme}, in the ${ctx.subject} plan. You should be able to say what problem it solves, point at it while using ${tool}, and tell it apart from the neighbouring lecture.`;
}
function exampleLines(part, ctx, concept) {
  if (concept?.example?.length) return concept.example;
  const tool = ctx.tools[0] || ctx.subject;
  return [
    `Open ${tool}.`,
    `Pick a tiny case that needs “${part}” and nothing else.`,
    `Do that one thing. Ignore the rest of ${ctx.theme}.`,
    `Finish this sentence: “I used ${part} to ____.”`,
    `If you cannot fill the blank, the case was too big. Shrink it.`,
  ];
}
function exampleCaption(part, ctx, concept) {
  if (concept?.example?.length) {
    return `Here is a small example of ${part}. Read each line and say what it changes. ${concept.example.join(' ')} If you can change one piece and predict the new result, you have it.`;
  }
  const tool = ctx.tools[0] || ctx.subject;
  return `Try ${part} on something tiny in ${tool}. One case, one result, one sentence you could say out loud: what you did, and what changed. A huge example hides the idea. A tiny one shows it.`;
}
function detailLine(part, ctx, concept) {
  if (concept?.details?.length) return null;
  if (ctx.next && ctx.next !== part) {
    return `Do not fold “${part}” into the next lecture, “${ctx.next}”. This scene is only ${part}. The next lecture will assume you can already explain it.`;
  }
  if (ctx.prev) {
    return `“${part}” follows “${ctx.prev}”, and it is not a repeat of it. If you can explain the previous idea and still cannot explain this one, that gap is exactly what this scene is for.`;
  }
  const tool = ctx.tools[0] || ctx.subject;
  return `Knowing the heading “${part}” is not the same as being able to point at it in ${tool}. Before you move on, point at the place where this idea shows up.`;
}

function buildTopic(meta) {
  const parts = splitParts(meta.title);
  const scenes = [];
  const seenHeadings = new Set();
  const add = (kind, heading, caption, visual) => {
    let text = String(caption || '').trim();
    if (words(text).length < 12) {
      text = `${text.replace(/[.]+$/, '')}. Keep this in mind while you study ${meta.subject}: it is small, and it is easy to skip.`;
    }
    const key = (heading + '|' + text).toLowerCase();
    if (seenHeadings.has(key)) return;
    seenHeadings.add(key);
    push(scenes, kind, heading, text, visual);
  };

  add('title', meta.title,
    `“${meta.title}” is ${meta.level === 'Beginner' ? 'a' : 'an'} ${meta.level.toLowerCase()} lecture in ${meta.subject}, on the day about ${meta.theme}. Nothing in it is skipped. The scenes walk ${joinAnd(parts)}, each with a plain explanation and a small example.`,
    { layout: 'title', kicker: `${meta.subject} · ${meta.level}`, chips: parts.slice(0, 6) });

  const about = firstSentence(meta.about);
  add('concept', 'Why this lecture exists',
    about
      ? `${about} This hour, “${meta.title}”, is where that becomes concrete. If you skip it, later talk about ${meta.theme} turns into words you cannot cash.`
      : `This hour exists so “${meta.title}” is something you can explain, not a heading you once saw. It sits in ${meta.theme} because that is when ${meta.subject} actually needs it.`,
    { layout: 'bullets', items: [
      `${meta.subject}, ${meta.level.toLowerCase()} level`,
      `Today’s theme: ${meta.theme}`,
      parts.length > 1 ? `Separate ideas in this hour: ${joinAnd(parts)}` : `One idea, looked at closely: ${parts[0]}`,
    ] });

  if (meta.siblings.length) {
    add('concept', 'The other hours today',
      `The rest of today is ${joinAnd(meta.siblings)}. Those are separate lectures with their own scenes. You will not be taught them here, and this lecture will not be repeated there. Learn ${joinAnd(parts)} now, well enough that those later hours can use the words.`,
      { layout: 'bullets', items: meta.siblings.slice(0, 4) });
  }

  if (/\bvs\.?\b|\bversus\b/i.test(meta.title) && parts.length === 2) {
    add('concept', `${parts[0]} or ${parts[1]}`,
      `${parts[0]} and ${parts[1]} get compared because teams mix them up. They are not nicknames for the same thing. In the next scenes, learn each one, then say the job each is better at. If you cannot name a job where you would pick ${parts[0]} and refuse ${parts[1]}, you do not know the difference yet.`,
      { layout: 'compare', left: { title: parts[0], items: ['What job it is for', 'What it costs'] }, right: { title: parts[1], items: ['What job it is for', 'What it costs'] } });
  }

  parts.forEach((part, index) => {
    const concept = matchConcept(part);
    const glosses = glossesIn(part, concept?.phrase);
    const adjs = adjectivesIn(part);

    if (concept?.prereqs) {
      for (const [heading, caption] of concept.prereqs) {
        add('concept', `Prerequisite: ${heading}`,
          `${caption} You need this before ${part} will sit still. If it is already familiar, use the scene as a check: explain it in one sentence without looking.`,
          { layout: 'bullets', items: bulletsFrom(caption) });
      }
    }

    if (concept) {
      add('concept', part,
        `${concept.what} ${concept.why}`,
        { layout: 'bullets', items: bulletsFrom(concept.what, [concept.why]) });
      if (concept.steps?.length) {
        add('steps', `Step by step: ${part}`,
          concept.steps.join(' '),
          { layout: 'steps', items: concept.steps });
      }
      for (const d of concept.details || []) {
        add('concept', `Detail: ${part}`, d, { layout: 'bullets', items: [d] });
      }
      add('example', `Example: ${part}`, exampleCaption(part, meta, concept), { layout: 'example', lines: exampleLines(part, meta, concept) });
      for (const m of (concept.mistakes || []).slice(0, 2)) {
        add('mistake', `Mistake: ${part}`, m, { layout: 'warn', items: [m] });
      }
    } else {
      add('concept', part, patternCaption(part, meta), {
        layout: 'bullets',
        items: bulletsFrom(patternCaption(part, meta)).slice(0, 3),
      });
      if (adjs.length) {
        for (const a of adjs) {
          add('concept', `The word “${a.word}”`,
            `${a.say} Inside “${part}”, that word is doing work. If you skip it, the rest of the phrase collapses into a vague noun.`,
            { layout: 'bullets', items: [a.say] });
        }
      }
      for (const g of glosses) {
        add('concept', g.term,
          `${g.say} It shows up here because “${part}” depends on it. Say the definition once, in your own words, before you go back to the larger phrase.`,
          { layout: 'bullets', items: [g.say, `Used inside: ${part}`] });
      }
      add('example', `Example: ${part}`, exampleCaption(part, meta, null), { layout: 'example', lines: exampleLines(part, meta, null) });
      const detail = detailLine(part, { ...meta, prev: index > 0 ? parts[index - 1] : meta.previous, next: parts[index + 1] || meta.next }, null);
      if (detail) add('concept', 'Easy to miss', detail, { layout: 'bullets', items: [detail] });
    }
  });

  if (parts.length > 1) {
    add('steps', 'How the pieces fit',
      `Learn ${joinAnd(parts)} as separate ideas first. Then connect them. In ${meta.theme}, you meet them together because a real task in ${meta.subject} uses more than one. A good check is one sentence that mentions each piece and a verb between them. If the sentence is only a list, you have not connected them yet.`,
      { layout: 'steps', items: parts.map((p, i) => `${i + 1}. ${p} — explain it alone, then say how it touches ${parts[i + 1] || 'the task'}.`) });
  }

  add('mistake', 'A mistake that wastes the hour',
    `Watching every scene and then being unable to do a tiny example is the usual failure. Pause on the example for ${parts[0]} and actually say the result out loud. Recognition is not the same as being able to use ${meta.title}.`,
    { layout: 'warn', items: ['Pause on the example.', 'Say the result out loud.', 'If you cannot, replay that scene before the next one.'] });

  if (meta.next) {
    add('concept', 'What the next lecture will assume',
      `Next is “${meta.next}”. It will talk as if ${joinAnd(parts)} is already clear. If a word from this lecture appears there and you freeze, come back to this scene list. You do not need the next lecture to finish this one.`,
      { layout: 'bullets', items: [`Next: ${meta.next}`, `You should already know: ${joinAnd(parts)}`] });
  }

  add('recap', 'Recap',
    `You can pause here and teach “${meta.title}” back. Cover ${joinAnd(parts.map(p => p))}. For each one: what it is, one example, and one mistake. That is the whole lecture. ${meta.subject} will keep using these words after today.`,
    { layout: 'recap', items: parts.map(p => `${p}: what it is, one example, one mistake`) });

  return {
    title: meta.title,
    subject: meta.subject,
    theme: meta.theme,
    level: meta.level,
    week: meta.week,
    day: meta.day,
    hour: meta.hour,
    index: meta.index,
    scenes: scenes.map((s, i) => ({ ...s, id: String(i + 1) })),
  };
}

function plans() {
  const out = [];
  for (const [slug, info] of Object.entries(CURRICULUM)) {
    const lines = info.plan.trim().split('\n').filter(Boolean);
    const hours = [];
    lines.forEach((line, k) => {
      const [theme, rest = ''] = line.split('|');
      rest.split(';').map(s => s.trim()).filter(Boolean).forEach((title, hi) => {
        hours.push({
          slug,
          subject: slug,
          theme: theme.trim(),
          title,
          week: Math.floor(k / 5) + 1,
          day: (k % 5) + 1,
          hour: hi + 1,
          level: LEVELS[Math.floor(k / 5)] || 'Beginner',
          index: hours.length + 1,
        });
      });
    });
    out.push({ slug, info, hours });
  }
  return out;
}

function displayNames() {
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'Company_Role_Skill_Mind_Map_Data_2026.json'), 'utf8'));
  const names = {};
  for (const r of data.catalog.role) names[r.slug] = r.name;
  for (const s of data.catalog.skill) names[s.slug] = s.name;
  Object.assign(names, {
    'servicenow-developer': 'ServiceNow',
    'salesforce-developer': 'Salesforce',
    'sap-abap-developer': 'SAP ABAP',
    'rpa-developer': 'RPA with UiPath',
  });
  return names;
}

function main() {
  const only = process.argv[2];
  const names = displayNames();
  fs.mkdirSync(OUT, { recursive: true });
  let topics = 0;
  let scenes = 0;
  let minScenes = Infinity;
  const files = [];
  for (const pack of plans()) {
    if (only && pack.slug !== only) continue;
    const name = names[pack.slug] || pack.slug;
    const tools = String(pack.info.tools || '').split(',').map(s => s.trim()).filter(Boolean);
    const about = pack.info.about || '';
    const topicsOut = {};
    pack.hours.forEach((h, idx) => {
      const meta = {
        ...h,
        subject: name,
        tools,
        about,
        previous: pack.hours[idx - 1]?.title || '',
        next: pack.hours[idx + 1]?.title || '',
        siblings: pack.hours.filter(o => o.week === h.week && o.day === h.day && o.title !== h.title).map(o => o.title),
      };
      const topic = buildTopic(meta);
      topicsOut[`${h.week}-${h.day}-${h.hour}`] = topic;
      topics += 1;
      scenes += topic.scenes.length;
      minScenes = Math.min(minScenes, topic.scenes.length);
    });
    const file = {
      edit: 'Edit topics["week-day-hour"].scenes. caption is shown and spoken. visual drives the animation. The app loads this file the first time you open a lecture in this training.',
      subject: name,
      about: firstSentence(about, 60),
      topics: topicsOut,
    };
    for (const topic of Object.values(topicsOut)) {
      if (!topic.scenes || topic.scenes.length < 8) throw new Error(`thin lecture ${pack.slug} ${topic.title}`);
      for (const s of topic.scenes) {
        if (!s.caption || !s.heading || !s.kind || !s.visual?.layout) throw new Error(`bad scene ${pack.slug} ${topic.title}`);
        if (words(s.caption).length < 8) throw new Error(`short caption ${pack.slug} ${topic.title} ${s.heading}`);
      }
      const blob = (topic.scenes.map(s => `${s.heading} ${s.caption}`).join(' ')).toLowerCase();
      for (const part of splitParts(topic.title)) {
        const token = part.toLowerCase().slice(0, 24);
        if (token && !blob.includes(token)) throw new Error(`missing part “${part}” in ${pack.slug} / ${topic.title}`);
      }
    }
    const dest = path.join(OUT, `${pack.slug}.json`);
    fs.writeFileSync(dest, JSON.stringify(file, null, 2));
    files.push(dest);
  }
  const bytes = files.reduce((a, f) => a + fs.statSync(f).size, 0);
  console.log(JSON.stringify({
    files: files.length,
    topics,
    scenes,
    minScenes,
    avgScenes: topics ? +(scenes / topics).toFixed(1) : 0,
    megabytes: +(bytes / 1048576).toFixed(2),
  }, null, 2));
}

main();
