/* In-app animated lectures. Scripts load per training, the first time a lecture opens. */
'use strict';

(function () {
  const modal = document.getElementById('explainModal');
  if (!modal) return;
  const card = modal.querySelector('.ex-card');
  const cache = new Map();
  let ticket = 0;
  let state = null;
  let pending = null;

  const words = text => String(text || '').trim().split(/\s+/).filter(Boolean).length;
  const duration = caption => Math.min(24000, Math.max(5600, Math.round(words(caption) / 2.2 * 1000) + 900));
  const voiceOn = () => localStorage.getItem('atlas.voice') !== 'off';

  function pickVoice() {
    const voices = window.speechSynthesis?.getVoices?.() || [];
    return voices.find(v => /en[-_]US/i.test(v.lang) && /natural|premium|enhanced/i.test(v.name))
      || voices.find(v => /en[-_]US/i.test(v.lang) && /google/i.test(v.name))
      || voices.find(v => /^en[-_]GB/i.test(v.lang))
      || voices.find(v => /^en/i.test(v.lang))
      || null;
  }
  if (window.speechSynthesis) {
    speechSynthesis.getVoices();
    speechSynthesis.addEventListener?.('voiceschanged', () => pickVoice());
  }

  function speak(text) {
    if (!window.speechSynthesis || !state || state.muted) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.96;
    const voice = pickVoice();
    if (voice) u.voice = voice;
    speechSynthesis.speak(u);
  }
  function hush() { window.speechSynthesis?.cancel(); }

  function loadPack(slug) {
    if (!/^[a-z0-9-]+$/.test(slug)) return Promise.reject(new Error('bad slug'));
    if (cache.has(slug)) return cache.get(slug);
    const p = fetch(`assets/explainers/${slug}.json`).then(r => {
      if (!r.ok) throw new Error('missing');
      return r.json();
    });
    cache.set(slug, p);
    p.catch(() => cache.delete(slug));
    return p;
  }

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function visual(v) {
    const box = el('div', 'ex-visual');
    const layout = v?.layout || 'bullets';
    if (layout === 'title') {
      const h = el('h3', 'ex-h ex-pop', state.topic.title);
      box.append(el('p', 'ex-kicker ex-pop', v.kicker || state.topic.subject), h);
      const chips = el('div', 'ex-chips');
      (v.chips || []).forEach((c, i) => {
        const s = el('span', 'ex-pop', c);
        s.style.animationDelay = `${i * 70}ms`;
        chips.append(s);
      });
      box.append(chips);
    } else if (layout === 'steps') {
      const ol = el('ol', 'ex-steps');
      (v.items || []).forEach((item, i) => {
        const li = el('li', 'ex-pop');
        li.style.animationDelay = `${i * 70}ms`;
        li.append(el('b', '', String(i + 1)), el('span', '', item));
        ol.append(li);
      });
      box.append(ol);
    } else if (layout === 'flow') {
      const row = el('div', 'ex-flow');
      (v.nodes || []).forEach((n, i) => {
        if (i) row.append(el('i', 'ex-pop', '→'));
        row.append(el('span', 'ex-pop', n));
      });
      box.append(row);
    } else if (layout === 'compare') {
      const grid = el('div', 'ex-compare');
      for (const side of [v.left, v.right]) {
        if (!side) continue;
        const art = el('article', 'ex-pop');
        art.append(el('h3', '', side.title || ''));
        const ul = el('ul');
        (side.items || []).forEach(item => ul.append(el('li', '', item)));
        art.append(ul);
        grid.append(art);
      }
      box.append(grid);
    } else if (layout === 'example') {
      const pre = el('ol', 'ex-code');
      (v.lines || []).forEach((line, i) => {
        const li = el('li', '', line);
        li.style.animationDelay = `${i * 180}ms`;
        pre.append(li);
      });
      box.append(pre);
    } else if (layout === 'warn') {
      (v.items || []).forEach(item => box.append(el('div', 'ex-warn ex-pop', item)));
    } else if (layout === 'recap') {
      const ul = el('ul', 'ex-recap');
      (v.items || []).forEach((item, i) => {
        const li = el('li', 'ex-pop', item);
        li.style.animationDelay = `${i * 80}ms`;
        ul.append(li);
      });
      box.append(ul);
    } else {
      const ul = el('ul', 'ex-points');
      (v.items || []).forEach((item, i) => {
        const li = el('li', 'ex-pop', item);
        li.style.animationDelay = `${i * 70}ms`;
        ul.append(li);
      });
      box.append(ul);
    }
    return box;
  }

  function paintScene() {
    const sc = state.topic.scenes[state.scene];
    const stage = card.querySelector('.ex-stage');
    stage.querySelector('.ex-visual')?.remove();
    const cap = stage.querySelector('.ex-caption');
    stage.insertBefore(visual(sc.visual || {}), cap);
    cap.querySelector('span').textContent = sc.caption;
    const now = card.querySelector('.ex-now');
    if (now) now.textContent = sc.heading;
    card.querySelector('.ex-count').textContent = `Scene ${state.scene + 1} of ${state.topic.scenes.length}`;
    card.querySelectorAll('.ex-rail button').forEach((b, i) => {
      b.classList.toggle('on', i === state.scene);
      if (i === state.scene) b.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
    const bar = card.querySelector('.ex-progress > span');
    bar.classList.remove('run');
    bar.style.animationDuration = `${duration(sc.caption)}ms`;
    void bar.offsetWidth;
    if (state.playing) bar.classList.add('run');
    card.classList.toggle('is-paused', !state.playing);
    card.classList.toggle('is-ended', !!state.ended);
    const play = card.querySelector('[data-ex="play"]');
    play.textContent = state.playing ? 'Pause' : (state.ended ? 'Play' : 'Play');
    play.setAttribute('aria-label', state.playing ? 'Pause lecture' : 'Play lecture');
  }

  function clearTimer() { if (state?.timer) clearTimeout(state.timer); }

  function arm(index) {
    if (!state) return;
    clearTimer();
    hush();
    state.ended = false;
    state.scene = index;
    paintScene();
    const sc = state.topic.scenes[index];
    if (state.playing) {
      if (!state.muted) speak(sc.caption);
      state.timer = setTimeout(advance, duration(sc.caption));
    }
  }

  function advance() {
    if (!state || !state.playing) return;
    if (state.scene + 1 >= state.topic.scenes.length) {
      state.playing = false;
      state.ended = true;
      hush();
      paintScene();
      return;
    }
    arm(state.scene + 1);
  }

  function toggle() {
    if (!state) return;
    if (state.ended) { state.playing = true; arm(0); return; }
    state.playing = !state.playing;
    if (state.playing) arm(state.scene);
    else { clearTimer(); hush(); paintScene(); }
  }

  function shell(topic, meta) {
    card.replaceChildren();
    const top = el('header', 'ex-top');
    const titles = el('div');
    titles.append(
      el('p', 'ex-kicker', `${topic.subject} · Lecture ${meta.index} of 80 · ${topic.level}`),
      el('h2', '', topic.title),
    );
    titles.lastChild.id = 'exTitle';
    const close = el('button', 'ex-x', '×');
    close.dataset.ex = 'close';
    close.setAttribute('aria-label', 'Close lecture');
    top.append(titles, close);

    const progress = el('div', 'ex-progress');
    progress.append(el('span'));

    const body = el('div', 'ex-body');
    const rail = el('ol', 'ex-rail');
    topic.scenes.forEach((sc, i) => {
      const li = el('li');
      const b = el('button');
      b.dataset.ex = 'scene';
      b.dataset.i = String(i);
      b.append(el('small', '', `Scene ${i + 1}`), document.createTextNode(sc.heading));
      li.append(b);
      rail.append(li);
    });
    const stage = el('div', 'ex-stage');
    const now = el('p', 'ex-now ex-kicker', topic.scenes[0]?.heading || '');
    const cap = el('p', 'ex-caption');
    cap.setAttribute('aria-live', 'polite');
    cap.append(el('b', '', 'Caption'), el('span'));
    stage.append(now, cap);
    body.append(rail, stage);

    const bar = el('div', 'ex-bar');
    const eq = el('span', 'ex-eq');
    eq.setAttribute('aria-hidden', 'true');
    eq.append(el('i'), el('i'), el('i'));
    const btn = (act, label, cls) => {
      const b = el('button', `chip-btn${cls ? ' ' + cls : ''}`, label);
      b.dataset.ex = act;
      return b;
    };
    const play = btn('play', 'Pause', 'primary');
    const mute = btn('mute', voiceOn() ? 'Voice on' : 'Voice off');
    mute.setAttribute('aria-pressed', voiceOn() ? 'true' : 'false');
    const count = el('span', 'ex-count');
    const q = `${topic.title} ${topic.subject} tutorial lecture`;
    const yt = el('a', 'ex-yt', 'More on YouTube');
    yt.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
    yt.target = '_blank';
    yt.rel = 'noopener noreferrer';
    const note = el('p', 'ex-note', 'Captions stay on. Voice is this browser’s English voice. Space pauses, arrows move between scenes.');
    bar.append(eq, btn('prev', 'Back'), play, btn('next', 'Next'), btn('replay', 'Replay'), mute, count, yt, note);

    card.append(top, progress, body, bar);
    card.classList.remove('is-paused', 'is-ended');
  }

  function showMessage(title, text, retry) {
    card.replaceChildren();
    const box = el('div', 'ex-error');
    box.append(el('h2', '', title), el('p', '', text));
    if (retry) {
      const b = el('button', 'chip-btn primary', 'Try again');
      b.dataset.ex = 'retry';
      box.append(b);
    }
    const close = el('button', 'chip-btn', 'Close');
    close.dataset.ex = 'close';
    box.append(close);
    card.append(box);
  }

  function openExplainerFor(rm, w, d, i) {
    if (!rm || !w || !d || !i) return;
    pending = { rm, w, d, i };
    const my = ++ticket;
    const key = `${w}-${d}-${i}`;
    state = null;
    hush();
    S.explainer = true;
    modal.hidden = false;
    card.replaceChildren();
    const loading = el('div', 'ex-loading');
    loading.append(el('div', 'spinner'), el('p', '', 'Preparing this lecture…'));
    card.append(loading);
    loadPack(rm.slug).then(pack => {
      if (my !== ticket) return;
      const topic = pack.topics?.[key];
      if (!topic?.scenes?.length) throw new Error('empty');
      const index = ((w - 1) * 5 + (d - 1)) * 4 + i;
      state = {
        topic, rm, w, d, i, key, index,
        scene: 0, playing: true, ended: false,
        muted: !voiceOn(), timer: null,
      };
      shell(topic, { index });
      arm(0);
      card.querySelector('[data-ex="play"]')?.focus();
    }).catch(() => {
      if (my !== ticket) return;
      showMessage('This lecture could not be opened', 'The explainer file for this training did not load. Check your connection and try again.', true);
    });
  }

  function closeExplainer() {
    ticket++;
    clearTimer();
    hush();
    state = null;
    S.explainer = false;
    modal.hidden = true;
    card.replaceChildren();
  }

  card.addEventListener('click', e => {
    const t = e.target.closest('[data-ex]');
    if (!t) return;
    const act = t.dataset.ex;
    if (act === 'close') closeExplainer();
    else if (act === 'play') toggle();
    else if (act === 'next' && state) { state.playing = true; arm(Math.min(state.topic.scenes.length - 1, state.scene + 1)); }
    else if (act === 'prev' && state) { state.playing = true; arm(Math.max(0, state.scene - 1)); }
    else if (act === 'replay' && state) { state.playing = true; arm(0); }
    else if (act === 'scene' && state) { state.playing = true; arm(+t.dataset.i); }
    else if (act === 'mute' && state) {
      state.muted = !state.muted;
      localStorage.setItem('atlas.voice', state.muted ? 'off' : 'on');
      t.textContent = state.muted ? 'Voice off' : 'Voice on';
      t.setAttribute('aria-pressed', state.muted ? 'false' : 'true');
      if (state.muted) hush();
      else if (state.playing) speak(state.topic.scenes[state.scene].caption);
    } else if (act === 'retry' && pending) openExplainerFor(pending.rm, pending.w, pending.d, pending.i);
  });
  modal.addEventListener('click', e => { if (e.target === modal) closeExplainer(); });

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-explain]');
    if (!t) return;
    const [slug, w, d, i] = (t.dataset.explain || '').split('|');
    const rm = S.ROLE?.[slug] || S.SKILL?.[slug];
    if (!rm) return;
    e.preventDefault();
    openExplainerFor(rm, +w, +d, +i);
  }, true);

  window.openExplainerFor = openExplainerFor;
  window.openExplainer = function (n) {
    if (!n || n.kind !== 'hour') return;
    openExplainerFor(n.data.rm, n.data.w, n.data.d, n.data.i);
  };
  window.closeExplainer = closeExplainer;
  window.explainerKey = function (e) {
    if (!S.explainer) return false;
    if (e.key === 'Tab') return false;
    if (e.key === 'Escape') { e.preventDefault(); closeExplainer(); return true; }
    if (!state) return true;
    if (e.key === ' ') { e.preventDefault(); toggle(); return true; }
    if (e.key === 'ArrowRight') { e.preventDefault(); state.playing = true; arm(Math.min(state.topic.scenes.length - 1, state.scene + 1)); return true; }
    if (e.key === 'ArrowLeft') { e.preventDefault(); state.playing = true; arm(Math.max(0, state.scene - 1)); return true; }
    if (e.key === 'r' || e.key === 'R') { e.preventDefault(); state.playing = true; arm(0); return true; }
    return true;
  };
})();
