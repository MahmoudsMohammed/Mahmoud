import { gsap, queries } from './setup.js';

const HOVER_TARGETS = 'a, button, [data-cursor], input, textarea, .chip';

export function initCursor(mm) {
  mm.add({ fine: queries.fine, motion: queries.motion }, (ctx) => {
    const { fine, motion } = ctx.conditions;
    if (!fine || !motion) return;

    const cursor = document.querySelector('.cursor');
    const dot = cursor.querySelector('.cursor__dot');
    const ring = cursor.querySelector('.cursor__ring');
    const label = cursor.querySelector('.cursor__label');

    gsap.set([dot, ring], { x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });

    const onMove = (e) => {
      cursor.classList.remove('is-hidden');
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e) => {
      const target = e.target.closest(HOVER_TARGETS);
      if (!target) return;
      const text = target.dataset.cursorLabel;
      label.textContent = text ?? '';
      cursor.classList.toggle('is-label', !!text);
      cursor.classList.toggle('is-hover', !text);
    };

    const onOut = (e) => {
      const from = e.target.closest(HOVER_TARGETS);
      if (!from || from.contains(e.relatedTarget)) return;
      cursor.classList.remove('is-hover', 'is-label');
    };

    const onLeaveWindow = () => cursor.classList.add('is-hidden');
    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.2 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.documentElement.addEventListener('mouseleave', onLeaveWindow);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cursor.classList.remove('is-hover', 'is-label', 'is-hidden');
    };
  });
}
