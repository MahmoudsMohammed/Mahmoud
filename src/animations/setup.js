import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Flip } from 'gsap/Flip';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin, Flip, ScrollToPlugin);

gsap.defaults({ ease: 'power3.out', duration: 0.8 });

export const queries = {
  isDesktop: '(min-width: 992px)',
  isMobile: '(max-width: 991.98px)',
  isTall: '(min-height: 720px)',
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  fine: '(hover: hover) and (pointer: fine)',
};

export const prefersReduced = () => window.matchMedia(queries.reduce).matches;

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin, Flip };
