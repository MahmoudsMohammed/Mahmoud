import {
  stats,
  experience,
  training,
  skillGroups,
  marquee,
  projects,
  capabilities,
  community,
  orbitNodes,
} from './data/content.js';

const pad = (n) => String(n).padStart(2, '0');
const chips = (items, cls = 'chip') =>
  items.map((t) => `<span class="${cls}">${t}</span>`).join('');

function mount(selector, html) {
  const el = document.querySelector(selector);
  if (el) el.innerHTML = html;
}

function renderStats() {
  mount(
    '#stats',
    stats
      .map(
        (s) => `
      <div class="stat">
        <span class="stat__value"><span class="stat__num" data-count="${s.value}" data-plain="${!!s.plain}">${s.value}</span>${s.suffix ?? ''}</span>
        <span class="stat__label">${s.label}</span>
      </div>`
      )
      .join('')
  );
}

function orbitRing(nodes, ring) {
  const step = 360 / nodes.length;
  return nodes
    .map(
      (n, i) => `
      <span class="orbit__node" style="--angle:${i * step}deg" data-ring="${ring}">
        <span class="orbit__chip">${n.icon ? `<i class="${n.icon}"></i>` : ''}${n.label}</span>
      </span>`
    )
    .join('');
}

function renderOrbit() {
  mount(
    '#orbit',
    `
    <svg class="orbit__svg" viewBox="0 0 500 500" aria-hidden="true">
      <circle class="orbit__path orbit__path--outer" cx="250" cy="250" r="230" />
      <circle class="orbit__path orbit__path--mid" cx="250" cy="250" r="160" />
      <circle class="orbit__path orbit__path--inner" cx="250" cy="250" r="90" />
    </svg>
    <svg class="orbit__svg orbit__arc-layer orbit__arc-layer--1" viewBox="0 0 500 500" aria-hidden="true">
      <path class="orbit__arc" d="M250 20 A230 230 0 0 1 480 250" />
    </svg>
    <svg class="orbit__svg orbit__arc-layer orbit__arc-layer--2" viewBox="0 0 500 500" aria-hidden="true">
      <path class="orbit__arc orbit__arc--2" d="M250 410 A160 160 0 0 1 90 250" />
    </svg>
    <div class="orbit__glow"></div>
    <div class="orbit__core">
      <span class="orbit__core-code">&lt;/&gt;</span>
      <span class="orbit__core-label">frontend</span>
    </div>
    <div class="orbit__ring orbit__ring--inner">${orbitRing(orbitNodes.inner, 'inner')}</div>
    <div class="orbit__ring orbit__ring--outer">${orbitRing(orbitNodes.outer, 'outer')}</div>
    <div class="orbit__card orbit__card--a">
      <span class="dot dot--live"></span> ws://readings <b>live</b>
    </div>
    <div class="orbit__card orbit__card--b">
      <i class="fa-solid fa-server"></i> render: <b>SSR</b>
    </div>`
  );
}

function renderExperience() {
  const tabs = experience
    .map(
      (e, i) => `
      <button class="exp__tab${i === 0 ? ' is-active' : ''}" role="tab" id="tab-${e.id}"
        aria-controls="panel-${e.id}" aria-selected="${i === 0}" data-id="${e.id}" data-cursor="hover">
        <span class="exp__dot"></span>
        <span class="exp__tab-company">${e.company}</span>
        <span class="exp__tab-period">${e.period}</span>
        ${i === 0 ? '<span class="exp__indicator"></span>' : ''}
      </button>`
    )
    .join('');

  const panels = experience
    .map(
      (e, i) => `
      <article class="exp__panel card${i === 0 ? ' is-active' : ''}" role="tabpanel" id="panel-${e.id}"
        aria-labelledby="tab-${e.id}" ${i === 0 ? '' : 'hidden'}>
        <header class="exp__head">
          <div>
            <p class="eyebrow">${e.project}</p>
            <h3 class="exp__role">${e.role} <span class="accent">@ ${e.company}</span></h3>
          </div>
          <div class="exp__meta">
            <span><i class="fa-regular fa-calendar"></i>${e.period}</span>
            <span><i class="fa-solid fa-location-dot"></i>${e.location}</span>
            <span class="badge">${e.type}</span>
          </div>
        </header>
        <p class="exp__summary">${e.summary}</p>
        <ul class="exp__list">
          ${e.bullets.map((b) => `<li><i class="fa-solid fa-angle-right"></i><span>${b}</span></li>`).join('')}
        </ul>
        <div class="chips">${chips(e.stack)}</div>
      </article>`
    )
    .join('');

  mount(
    '#experience-app',
    `
    <div class="exp__rail" role="tablist" aria-label="Companies">
      <span class="exp__line" aria-hidden="true"><span class="exp__line-fill"></span></span>
      ${tabs}
    </div>
    <div class="exp__panels">${panels}</div>`
  );

  mount(
    '#training',
    training
      .map(
        (t) => `
      <div class="mini-card card" data-reveal>
        <div class="mini-card__top">
          <span class="eyebrow">${t.org}</span>
          <span class="mono muted">${t.period}</span>
        </div>
        <h4>${t.title}</h4>
        <p>${t.text}</p>
      </div>`
      )
      .join('')
  );
}

function renderSkills() {
  mount(
    '#skills-grid',
    skillGroups
      .map(
        (g, i) => `
      <div class="skill-card card" data-tilt>
        <div class="skill-card__head">
          <span class="icon-box"><i class="${g.icon}"></i></span>
          <span class="mono muted">${pad(i + 1)}</span>
        </div>
        <h3>${g.title}</h3>
        <p class="muted">${g.note}</p>
        <div class="chips">${chips(g.items)}</div>
      </div>`
      )
      .join('')
  );

  const row = marquee.map((t) => `<span class="marquee__item">${t}<i class="fa-solid fa-asterisk"></i></span>`).join('');
  mount('#marquee', `<div class="marquee__track">${row}${row}</div>`);
}

function renderWork() {
  mount(
    '#work-stack',
    projects
      .map(
        (p, i) => `
      <article class="work-card card" data-cursor="hover">
        <div class="work-card__main">
          <div class="work-card__top">
            <span class="mono accent">${pad(i + 1)} / ${pad(projects.length)}</span>
            <span class="mono muted">${p.company} · ${p.year}</span>
          </div>
          <h3 class="work-card__title">${p.name}</h3>
          <p class="work-card__tagline">${p.tagline}</p>
          <p class="muted">${p.context}</p>
          <ul class="work-card__list">
            ${p.did.map((d) => `<li><i class="fa-solid fa-check"></i><span>${d}</span></li>`).join('')}
          </ul>
          <div class="chips">${chips(p.stack)}</div>
        </div>
        <aside class="work-card__side">
          <p class="eyebrow">Impact</p>
          ${p.impact
            .map(
              (m) => `
            <div class="impact">
              <span class="impact__k">${m.k}</span>
              <span class="impact__v">${m.v}</span>
            </div>`
            )
            .join('')}
          <span class="work-card__index" aria-hidden="true">${pad(i + 1)}</span>
        </aside>
        <span class="work-card__shade" aria-hidden="true"></span>
      </article>`
      )
      .join('')
  );
}

function renderCapabilities() {
  mount(
    '#cap-grid',
    capabilities
      .map(
        (c, i) => `
      <div class="cap card">
        <div class="cap__head">
          <span class="icon-box"><i class="${c.icon}"></i></span>
          <span class="mono muted">${pad(i + 1)}</span>
        </div>
        <h3>${c.title}</h3>
        <p>${c.text}</p>
      </div>`
      )
      .join('')
  );
}

function renderCommunity() {
  mount(
    '#community-list',
    community
      .map(
        (c) => `
      <div class="community__item card" data-reveal>
        <span class="icon-box icon-box--lg"><i class="${c.icon}"></i></span>
        <div>
          <h3>${c.title}</h3>
          <p>${c.text}</p>
        </div>
      </div>`
      )
      .join('')
  );
}

export function renderAll() {
  renderStats();
  renderOrbit();
  renderExperience();
  renderSkills();
  renderWork();
  renderCapabilities();
  renderCommunity();
}
