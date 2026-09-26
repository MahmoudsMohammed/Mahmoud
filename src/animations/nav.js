import { gsap, ScrollTrigger, prefersReduced } from './setup.js';
import { lockScroll, onAnchorNavigate } from './scroll.js';

const SECTIONS = ['about', 'experience', 'skills', 'work', 'contact'];

function initActiveLink() {
  const links = [...document.querySelectorAll('.nav__links a')];
  const indicator = document.querySelector('.nav__indicator');
  let current = null;

  const setActive = (id) => {
    if (id === current) return;
    current = id;
    const link = links.find((a) => a.getAttribute('href') === `#${id}`);
    links.forEach((a) => a.classList.toggle('is-active', a === link));
    if (!link) {
      gsap.to(indicator, { opacity: 0, duration: 0.3 });
      return;
    }
    gsap.to(indicator, {
      x: link.offsetLeft,
      width: link.offsetWidth,
      opacity: 1,
      duration: prefersReduced() ? 0 : 0.6,
      ease: 'expo.out',
    });
  };

  ScrollTrigger.create({
    trigger: '.hero',
    start: 'top top',
    end: 'bottom center',
    onToggle: (self) => self.isActive && setActive(null),
  });

  SECTIONS.forEach((id) => {
    ScrollTrigger.create({
      trigger: `#${id}`,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => self.isActive && setActive(id),
    });
  });

  window.addEventListener('resize', () => {
    const id = current;
    current = null;
    setActive(id);
  });
}

function initHideOnScroll(isMenuOpen) {
  const nav = document.querySelector('.nav');
  let hidden = false;

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const y = self.scroll();
      nav.classList.toggle('is-scrolled', y > 20);
      if (isMenuOpen()) return;
      const shouldHide = self.direction === 1 && y > window.innerHeight * 0.6;
      if (shouldHide === hidden) return;
      hidden = shouldHide;
      gsap.to(nav, { yPercent: hidden ? -100 : 0, duration: 0.45, ease: 'power3.out', overwrite: true });
    },
  });
}

function initMenu() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.menu');
  let open = false;

  const tl = gsap
    .timeline({ paused: true })
    .set(menu, { visibility: 'visible' })
    .fromTo(
      menu,
      { clipPath: 'circle(0% at 94% 4%)' },
      { clipPath: 'circle(150% at 94% 4%)', duration: 0.8, ease: 'expo.inOut' }
    )
    .from('.menu__links a', { yPercent: 60, autoAlpha: 0, stagger: 0.06, duration: 0.6 }, '-=0.35')
    .from('.menu__foot', { autoAlpha: 0, y: 20, duration: 0.5 }, '-=0.35');

  const setOpen = (value) => {
    open = value;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', String(!open));
    lockScroll(open);
    tl.timeScale(prefersReduced() ? 20 : open ? 1 : 1.4);
    open ? tl.play() : tl.reverse();
  };

  toggle.addEventListener('click', () => setOpen(!open));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && open && setOpen(false));
  window.matchMedia('(min-width: 992px)').addEventListener('change', (e) => e.matches && open && setOpen(false));
  onAnchorNavigate(() => open && setOpen(false));

  return () => open;
}

export function initNav() {
  const isMenuOpen = initMenu();
  initHideOnScroll(isMenuOpen);
  initActiveLink();
}
