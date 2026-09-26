import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/main.scss';

import { renderAll } from './render.js';
import { initContact } from './contact.js';
import { gsap, ScrollTrigger, prefersReduced } from './animations/setup.js';
import { initSmoothScroll, initAnchors, initProgress } from './animations/scroll.js';
import { runPreloader } from './animations/preloader.js';
import { buildHeroIntro, initHeroMotion } from './animations/hero.js';
import { initNav } from './animations/nav.js';
import { initCursor } from './animations/cursor.js';
import { initMagnetic } from './animations/magnetic.js';
import { initSections, initExperienceTabs } from './animations/sections.js';

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

renderAll();
document.getElementById('year').textContent = new Date().getFullYear();
initContact();
initExperienceTabs();

const fontsReady = Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2500))]);

fontsReady.then(async () => {
  const reduce = prefersReduced();
  const mm = gsap.matchMedia();

  initSmoothScroll(mm);
  const heroIntro = buildHeroIntro(reduce);
  initHeroMotion(mm);
  initNav();
  initProgress();
  initAnchors();
  initCursor(mm);
  initMagnetic(mm);
  initSections(mm);

  await runPreloader(reduce);
  heroIntro.play();
  ScrollTrigger.refresh();
});
