# Mahmoud Ayoub — Portfolio

Personal portfolio of Mahmoud Ayoub, Senior Frontend Engineer. A dark, motion-rich single page built with Vite, vanilla JavaScript, SCSS and GSAP.

Live site: [mahmoudsmohammed.github.io/Mahmoud](https://mahmoudsmohammed.github.io/Mahmoud/)

## Highlights

- Preloader with a SplitText name reveal and a clip-path wipe into the hero.
- Hero with a masked headline reveal, a gradient sweep, count-up stats and an animated SVG "orbit" of the stack (DrawSVG rings, orbiting chips, mouse tilt).
- ScrollSmoother on desktop, a scroll progress bar, a nav that hides on scroll with a sliding active-link indicator, and a full-screen mobile menu.
- Custom cursor and magnetic buttons on pointer devices.
- Scroll-scrubbed word highlighting, an experience switcher animated with Flip, 3D-tilt skill cards, a scroll-velocity marquee, pinned and stacked case-study cards, and spotlight capability cards.
- Contact form powered by EmailJS with validation, shake feedback and an animated toast.
- Fully responsive, with a `prefers-reduced-motion` mode that falls back to simple fades.

## Tech

Vite, vanilla JavaScript (ES modules), SCSS, GSAP (ScrollTrigger, ScrollSmoother, SplitText, DrawSVG, Flip, ScrollTo), EmailJS and Font Awesome.

## Project structure

```
index.html              page markup
src/main.js             entry point
src/data/content.js     CV-driven content (experience, projects, skills, ...)
src/render.js           renders data into the page
src/contact.js          form validation, EmailJS and toast
src/animations/         GSAP setup, preloader, hero, nav, cursor, sections
src/styles/             SCSS tokens, base, components and section styles
public/cv/              downloadable CV
```

To update the content, edit `src/data/content.js` and replace `public/cv/Mahmoud-Ayoub-CV.pdf`.

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173/Mahmoud/
npm run build    # outputs dist/
npm run preview
```

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. In the repository settings, set **Pages > Source** to **GitHub Actions** once.

## Contact

- [LinkedIn](https://www.linkedin.com/in/mahmoud-s-ayoub/)
- [GitHub](https://github.com/MahmoudsMohammed)
- mahmoudsmohammed24@gmail.com
