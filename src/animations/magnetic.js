import { gsap, queries } from './setup.js';

export function initMagnetic(mm) {
  mm.add({ fine: queries.fine, motion: queries.motion }, (ctx) => {
    const { fine, motion } = ctx.conditions;
    if (!fine || !motion) return;

    const cleanups = [...document.querySelectorAll('[data-magnetic]')].map((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      const strength = el.classList.contains('btn') ? 0.3 : 0.45;

      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  });
}
