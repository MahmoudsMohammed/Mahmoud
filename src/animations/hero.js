import { gsap, SplitText, ScrollTrigger, queries } from './setup.js';

function countUp(reduce) {
  document.querySelectorAll('.stat__num').forEach((el) => {
    const end = Number(el.dataset.count);
    const start = el.dataset.plain === 'true' ? end - 12 : 0;
    if (reduce) {
      el.textContent = end;
      return;
    }
    const obj = { v: start };
    gsap.to(obj, {
      v: end,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => (el.textContent = Math.round(obj.v)),
    });
  });
}

export function buildHeroIntro(reduce) {
  const tl = gsap.timeline({ paused: true });

  if (reduce) {
    tl.fromTo(
      '.hero__content, .hero__visual, .stats',
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.6, stagger: 0.1, immediateRender: true }
    ).add(() => countUp(true));
    return tl;
  }

  const split = SplitText.create('.hero__title', { type: 'lines', mask: 'lines' });

  tl.from('.hero__pill', { autoAlpha: 0, y: 20, duration: 0.6 })
    .from(split.lines, { yPercent: 110, duration: 1.1, stagger: 0.1, ease: 'expo.out' }, '-=0.3')
    .to('.grad', { backgroundPosition: '0% 0', duration: 1.8, ease: 'power2.inOut' }, '-=0.7')
    .from('.hero__text', { autoAlpha: 0, y: 24 }, '-=1.5')
    .from('.hero__actions > *', { autoAlpha: 0, y: 20, stagger: 0.1 }, '-=1.2')
    .from('.hero__socials > *', { autoAlpha: 0, y: 12, stagger: 0.06, duration: 0.5 }, '-=0.9')
    .from('.orbit__path', { drawSVG: '50% 50%', duration: 1.4, stagger: 0.15, ease: 'power2.inOut' }, 0.2)
    .from('.orbit__arc', { drawSVG: 0, duration: 1.2, stagger: 0.2, ease: 'power2.inOut' }, 0.8)
    .from('.orbit__core', { scale: 0, autoAlpha: 0, duration: 0.9, ease: 'back.out(1.7)' }, 0.5)
    .from('.orbit__glow', { scale: 0.4, autoAlpha: 0, duration: 1.4 }, 0.6)
    .from('.orbit__chip', { scale: 0, autoAlpha: 0, duration: 0.6, stagger: 0.07, ease: 'back.out(2.2)' }, 1)
    .from('.orbit__card', { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.15 }, 1.4)
    .from('.stat', { autoAlpha: 0, y: 30, stagger: 0.08 }, 1.2)
    .add(() => countUp(false), 1.3)
    .from('.hero__scroll', { autoAlpha: 0, duration: 0.6 }, '-=0.3')
    .add(() => split.revert());

  return tl;
}

export function initHeroMotion(mm) {
  mm.add({ motion: queries.motion, fine: queries.fine }, (ctx) => {
    const { motion, fine } = ctx.conditions;
    if (!motion) return;

    const loops = gsap.timeline({ defaults: { ease: 'none', repeat: -1 } });
    loops
      .to('.orbit__ring--inner', { rotation: 360, duration: 40 }, 0)
      .to('.orbit__ring--inner .orbit__chip', { rotation: -360, duration: 40 }, 0)
      .to('.orbit__ring--outer', { rotation: -360, duration: 60 }, 0)
      .to('.orbit__ring--outer .orbit__chip', { rotation: 360, duration: 60 }, 0)
      .to('.orbit__arc-layer--1', { rotation: 360, duration: 14 }, 0)
      .to('.orbit__arc-layer--2', { rotation: -360, duration: 20 }, 0);

    const floats = [
      gsap.to('.orbit__card--a', { y: -12, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
      gsap.to('.orbit__card--b', { y: 12, duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
      gsap.to('.orbit__glow', { scale: 1.15, opacity: 0.8, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
    ];

    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      onToggle: (self) => [loops, ...floats].forEach((a) => (self.isActive ? a.play() : a.pause())),
    });

    gsap.to('.hero__visual', {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('.hero__content', {
      yPercent: -8,
      autoAlpha: 0.2,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: '30% top', end: 'bottom top', scrub: true },
    });

    if (!fine) return;

    const orbit = document.querySelector('.orbit');
    const hero = document.querySelector('.hero');
    gsap.set(orbit, { transformPerspective: 900 });
    const rx = gsap.quickTo(orbit, 'rotationX', { duration: 0.8, ease: 'power3' });
    const ry = gsap.quickTo(orbit, 'rotationY', { duration: 0.8, ease: 'power3' });
    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      ry(nx * 16);
      rx(-ny * 16);
    };
    const onLeave = () => {
      rx(0);
      ry(0);
    };
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    return () => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
    };
  });
}
