import { gsap, ScrollTrigger, SplitText, Flip, queries, prefersReduced } from './setup.js';

const reveal = (targets, vars, trigger, start = 'top 82%') =>
  gsap.from(targets, { ...vars, scrollTrigger: { trigger: trigger ?? targets, start } });

function batchReveal(selector, from, stagger = 0.1) {
  gsap.set(selector, from);
  ScrollTrigger.batch(selector, {
    start: 'top 88%',
    once: true,
    onEnter: (els) =>
      gsap.to(els, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotationX: 0,
        stagger,
        duration: 0.9,
        overwrite: true,
      }),
  });
}

function sectionHeads() {
  document.querySelectorAll('.section__head').forEach((head) => {
    const title = head.querySelector('.section__title');
    const split = SplitText.create(title, { type: 'lines', mask: 'lines' });
    gsap
      .timeline({
        scrollTrigger: { trigger: head, start: 'top 82%' },
        onComplete: () => split.revert(),
      })
      .from(head.querySelector('.section__index'), { autoAlpha: 0, x: -24, duration: 0.6 })
      .from(split.lines, { yPercent: 110, duration: 1, stagger: 0.08, ease: 'expo.out' }, '-=0.35')
      .from(head.querySelector('.section__sub'), { autoAlpha: 0, y: 20, duration: 0.7 }, '-=0.6');
  });
}

function about() {
  const split = SplitText.create('.about__lead', { type: 'words' });
  gsap.fromTo(
    split.words,
    { opacity: 0.15 },
    {
      opacity: 1,
      stagger: 0.05,
      ease: 'none',
      scrollTrigger: { trigger: '.about__lead', start: 'top 80%', end: 'bottom 45%', scrub: true },
    }
  );
  reveal('.about__body', { autoAlpha: 0, y: 30 });
  gsap
    .timeline({ scrollTrigger: { trigger: '.about__card', start: 'top 82%' } })
    .from('.about__card', { autoAlpha: 0, x: 60, duration: 0.9 })
    .from('.about__row', { autoAlpha: 0, x: 20, stagger: 0.06, duration: 0.5 }, '-=0.5')
    .from('.about__status', { autoAlpha: 0, y: 12, duration: 0.5 }, '-=0.2');
}

function experience(isDesktop) {
  gsap
    .timeline({ scrollTrigger: { trigger: '.exp', start: 'top 78%' } })
    .from('.exp__tab', { autoAlpha: 0, x: isDesktop ? -30 : 0, y: isDesktop ? 0 : 16, stagger: 0.08, duration: 0.6 })
    .from('.exp__panel.is-active', { autoAlpha: 0, y: 40, duration: 0.9 }, '-=0.5')
    .from('.exp__panel.is-active .exp__list li', { autoAlpha: 0, x: 20, stagger: 0.08, duration: 0.5 }, '-=0.5')
    .from('.exp__panel.is-active .chip', { autoAlpha: 0, scale: 0.8, stagger: 0.04, duration: 0.4 }, '-=0.3');

  if (isDesktop) {
    gsap.fromTo(
      '.exp__line-fill',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.exp', start: 'top 70%', end: 'bottom 60%', scrub: true },
      }
    );
  }

  batchReveal('.training .mini-card', { autoAlpha: 0, y: 40 }, 0.12);
}

function velocityMarquee(track, trigger, duration, direction = 1) {
  const loop = gsap.fromTo(track, { xPercent: direction === 1 ? 0 : -50 }, {
    xPercent: direction === 1 ? -50 : 0,
    duration,
    ease: 'none',
    repeat: -1,
  });
  loop.totalTime(duration * 1000);

  let base = 1;
  let boostTl;
  ScrollTrigger.create({
    trigger,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => (self.isActive ? loop.resume() : loop.pause()),
    onUpdate: (self) => {
      const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 5);
      base = self.direction;
      boostTl?.kill();
      boostTl = gsap
        .timeline()
        .to(loop, { timeScale: base * boost, duration: 0.2 })
        .to(loop, { timeScale: base, duration: 1 });
    },
  });

  return {
    pause: () => {
      boostTl?.kill();
      gsap.to(loop, { timeScale: 0, duration: 0.5, overwrite: true });
    },
    play: () => gsap.to(loop, { timeScale: base, duration: 0.5, overwrite: true }),
  };
}

function skills(fine) {
  batchReveal('.skill-card', { autoAlpha: 0, y: 60, rotationX: -18, transformPerspective: 900 }, 0.1);

  const marqueeEl = document.querySelector('#marquee');
  const marquee = velocityMarquee('.marquee__track', marqueeEl, 40);
  marqueeEl.addEventListener('mouseenter', marquee.pause);
  marqueeEl.addEventListener('mouseleave', marquee.play);

  if (!fine) return () => {};

  const cleanups = [...document.querySelectorAll('[data-tilt]')].map((card) => {
    gsap.set(card, { transformPerspective: 900 });
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3' });
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 12);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
    };
    const onLeave = () => {
      rx(0);
      ry(0);
    };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  });

  return () => {
    marqueeEl.removeEventListener('mouseenter', marquee.pause);
    marqueeEl.removeEventListener('mouseleave', marquee.play);
    cleanups.forEach((fn) => fn());
  };
}

function work(isDesktop) {
  const cards = gsap.utils.toArray('.work-card');

  cards.forEach((card) => {
    gsap
      .timeline({ scrollTrigger: { trigger: card, start: 'top 80%' } })
      .from(card.querySelector('.work-card__main'), { autoAlpha: 0, y: 50, duration: 0.9 })
      .from(card.querySelector('.work-card__side'), { autoAlpha: 0, x: 40, duration: 0.9 }, '<0.1')
      .from(card.querySelectorAll('.work-card__list li'), { autoAlpha: 0, x: 16, stagger: 0.07, duration: 0.5 }, '-=0.6')
      .from(card.querySelectorAll('.impact'), { autoAlpha: 0, y: 16, stagger: 0.08, duration: 0.5 }, '<')
      .from(card.querySelector('.work-card__index'), { yPercent: 40, autoAlpha: 0, duration: 1 }, '<');
  });

  const top = () => document.querySelector('.nav').offsetHeight + (isDesktop ? 24 : 12);
  // Cards taller than the viewport pin by their bottom edge so their full content is read before being covered.
  const fits = (card) => card.offsetHeight <= window.innerHeight - top();
  const last = cards[cards.length - 1];

  // Scaling and shading repaint the whole card every scroll frame unless each gets its own layer.
  gsap.set(cards, { willChange: 'transform' });
  gsap.set(cards.map((c) => c.querySelector('.work-card__shade')), { willChange: 'opacity' });

  cards.forEach((card, i) => {
    if (card === last) return;
    ScrollTrigger.create({
      trigger: card,
      start: () => (fits(card) ? `top ${top()}px` : 'bottom bottom'),
      endTrigger: last,
      end: () => `top ${top()}px`,
      pin: true,
      pinSpacing: false,
    });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: cards[i + 1],
          start: 'top bottom',
          end: () => `top ${top()}px`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
      .to(
        card,
        {
          scale: isDesktop ? 0.9 : 0.94,
          transformOrigin: () => (fits(card) ? '50% 0%' : '50% 100%'),
          ease: 'none',
        },
        0
      )
      .to(card.querySelector('.work-card__shade'), { opacity: 0.65, ease: 'none' }, 0);
  });
}

function capabilities(fine) {
  batchReveal('.cap', { autoAlpha: 0, y: 40, scale: 0.96 }, 0.07);

  if (!fine) return () => {};
  const grid = document.querySelector('#cap-grid');
  const setters = new Map(
    [...grid.querySelectorAll('.cap')].map((c) => [
      c,
      { x: gsap.quickSetter(c, '--mx', 'px'), y: gsap.quickSetter(c, '--my', 'px') },
    ])
  );
  const onMove = (e) => {
    const el = e.target.closest('.cap');
    if (!el) return;
    const { x, y } = setters.get(el);
    const r = el.getBoundingClientRect();
    x(e.clientX - r.left);
    y(e.clientY - r.top);
  };
  grid.addEventListener('mousemove', onMove);
  return () => grid.removeEventListener('mousemove', onMove);
}

function community() {
  batchReveal('.community__item', { autoAlpha: 0, y: 40 }, 0.12);
}

function contact() {
  const split = SplitText.create('.contact__title', { type: 'words', mask: 'words' });
  gsap
    .timeline({
      scrollTrigger: { trigger: '.contact__box', start: 'top 78%' },
      onComplete: () => split.revert(),
    })
    .from('.contact__box', { autoAlpha: 0, y: 60, duration: 1 })
    .from('.contact__info .section__index', { autoAlpha: 0, x: -24, duration: 0.6 }, '-=0.6')
    .from(split.words, { yPercent: 110, duration: 0.9, stagger: 0.06, ease: 'expo.out' }, '-=0.4')
    .from('.contact__info > p.muted', { autoAlpha: 0, y: 20, duration: 0.6 }, '-=0.6')
    .from('.contact__list li', { autoAlpha: 0, x: -20, stagger: 0.08, duration: 0.5 }, '-=0.4')
    .from('.form .field, .form__submit', { autoAlpha: 0, y: 24, stagger: 0.08, duration: 0.6 }, '-=0.8');
}

function footer() {
  velocityMarquee('.footer__track', '.footer', 30, -1);
  gsap.from('.footer__inner > *', {
    autoAlpha: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.6,
    scrollTrigger: { trigger: '.footer__inner', start: 'top 95%' },
  });
}

function reducedReveals() {
  ScrollTrigger.batch('.section__head, .card, .marquee, .footer', {
    start: 'top 92%',
    once: true,
    onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, stagger: 0.05 }),
  });
}

export function initSections(mm) {
  mm.add(
    {
      isDesktop: queries.isDesktop,
      motion: queries.motion,
      fine: queries.fine,
    },
    (ctx) => {
      const { isDesktop, motion, fine } = ctx.conditions;

      if (!motion) {
        reducedReveals();
        return;
      }

      sectionHeads();
      about();
      experience(isDesktop);
      const cleanSkills = skills(fine);
      work(isDesktop);
      const cleanCaps = capabilities(fine);
      community();
      contact();
      footer();

      return () => {
        cleanSkills();
        cleanCaps();
      };
    }
  );
}

export function initExperienceTabs() {
  const rail = document.querySelector('.exp__rail');
  const tabs = [...rail.querySelectorAll('.exp__tab')];
  const indicator = rail.querySelector('.exp__indicator');
  let busy = false;

  const select = (tab) => {
    const current = rail.querySelector('.exp__tab.is-active');
    if (tab === current || busy) return;
    busy = true;
    const reduce = prefersReduced();
    const oldPanel = document.getElementById(current.getAttribute('aria-controls'));
    const newPanel = document.getElementById(tab.getAttribute('aria-controls'));

    const state = Flip.getState(indicator);
    current.classList.remove('is-active');
    current.setAttribute('aria-selected', 'false');
    current.tabIndex = -1;
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    tab.tabIndex = 0;
    tab.appendChild(indicator);
    Flip.from(state, { duration: reduce ? 0 : 0.6, ease: 'power3.inOut' });

    rail.scrollTo({ left: tab.offsetLeft - rail.clientWidth / 2 + tab.offsetWidth / 2, behavior: 'smooth' });

    const done = () => {
      busy = false;
      ScrollTrigger.refresh();
    };

    if (reduce) {
      oldPanel.hidden = true;
      oldPanel.classList.remove('is-active');
      newPanel.hidden = false;
      newPanel.classList.add('is-active');
      done();
      return;
    }

    gsap
      .timeline({ onComplete: done })
      .to(oldPanel, {
        autoAlpha: 0,
        y: -16,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          oldPanel.hidden = true;
          oldPanel.classList.remove('is-active');
          newPanel.hidden = false;
          newPanel.classList.add('is-active');
        },
      })
      .fromTo(newPanel, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.55 })
      .from(newPanel.querySelector('.exp__head'), { autoAlpha: 0, y: 12, duration: 0.4 }, '<0.05')
      .from(newPanel.querySelectorAll('.exp__list li'), { autoAlpha: 0, x: 20, stagger: 0.07, duration: 0.45 }, '<0.1')
      .from(newPanel.querySelectorAll('.chip'), { autoAlpha: 0, scale: 0.8, stagger: 0.035, duration: 0.35 }, '-=0.3');
  };

  tabs.forEach((tab, i) => {
    tab.tabIndex = i === 0 ? 0 : -1;
    tab.addEventListener('click', () => select(tab));
  });

  rail.addEventListener('keydown', (e) => {
    const idx = tabs.indexOf(document.activeElement);
    if (idx === -1) return;
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next = null;
    if (e.key in keys) next = tabs[(idx + keys[e.key] + tabs.length) % tabs.length];
    if (e.key === 'Home') next = tabs[0];
    if (e.key === 'End') next = tabs[tabs.length - 1];
    if (!next) return;
    e.preventDefault();
    next.focus();
    select(next);
  });
}
