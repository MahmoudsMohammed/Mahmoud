import { gsap, SplitText } from './setup.js';
import { lockScroll } from './scroll.js';

export function runPreloader(reduce) {
  const el = document.querySelector('.preloader');
  if (!el) return Promise.resolve();

  lockScroll(true);
  const finish = () => {
    el.remove();
    lockScroll(false);
  };

  return new Promise((resolve) => {
    if (reduce) {
      gsap.to(el, {
        autoAlpha: 0,
        duration: 0.4,
        delay: 0.2,
        onComplete: () => {
          finish();
          resolve();
        },
      });
      return;
    }

    const split = SplitText.create('.preloader__name', { type: 'words,chars', mask: 'chars' });
    const countEl = el.querySelector('.preloader__count');
    const counter = { v: 0 };

    gsap
      .timeline({ onComplete: finish })
      .set('.preloader__inner', { autoAlpha: 1 })
      .from('.preloader__logo', { autoAlpha: 0, y: 12, scale: 0.85, duration: 0.5 })
      .from(split.chars, { yPercent: 110, duration: 0.8, stagger: 0.03, ease: 'expo.out' }, '<0.1')
      .from('.preloader__role', { autoAlpha: 0, y: 12, duration: 0.5 }, '-=0.45')
      .to(
        counter,
        {
          v: 100,
          duration: 1.7,
          ease: 'power2.inOut',
          onUpdate: () => (countEl.textContent = Math.round(counter.v)),
        },
        0
      )
      .to('.preloader__bar span', { scaleX: 1, duration: 1.7, ease: 'power2.inOut' }, 0)
      .to(split.chars, { yPercent: -110, duration: 0.45, stagger: 0.012, ease: 'power3.in' }, '+=0.1')
      .to(['.preloader__logo', '.preloader__role', '.preloader__count', '.preloader__bar'], { autoAlpha: 0, duration: 0.3 }, '<')
      .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'expo.inOut' }, '-=0.1')
      .add(resolve, '-=0.5');
  });
}
