import { gsap, ScrollSmoother, queries, prefersReduced } from './setup.js';

let smoother = null;
const listeners = new Set();

export function initSmoothScroll(mm) {
  mm.add({ isDesktop: queries.isDesktop, motion: queries.motion }, (ctx) => {
    const { isDesktop, motion } = ctx.conditions;
    if (!isDesktop || !motion) return;

    smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.1,
      effects: false,
    });

    return () => {
      smoother?.kill();
      smoother = null;
    };
  });
}

export function lockScroll(locked) {
  smoother?.paused(locked);
  document.body.classList.toggle('is-locked', locked);
}

export function onAnchorNavigate(fn) {
  listeners.add(fn);
}

export function scrollToTarget(hash) {
  const target = hash === '#top' ? 0 : document.querySelector(hash);
  if (target === null) return;
  const offset = hash === '#top' ? 0 : document.querySelector('.nav').offsetHeight + 8;

  if (smoother) {
    smoother.scrollTo(target, true, `top ${offset}px`);
    return;
  }
  gsap.to(window, {
    duration: prefersReduced() ? 0 : 1.1,
    ease: 'power3.inOut',
    scrollTo: { y: target, offsetY: offset, autoKill: true },
  });
}

export function initAnchors() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-scroll]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (!hash?.startsWith('#')) return;
    e.preventDefault();
    listeners.forEach((fn) => fn(hash));
    scrollToTarget(hash);
  });
}

export function initProgress() {
  gsap.to('.progress span', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
  });
}
