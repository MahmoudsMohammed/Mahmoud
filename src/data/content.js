export const links = {
  email: 'mahmoudsmohammed24@gmail.com',
  phone: '+20 109 908 8962',
  phoneRaw: '201099088962',
  github: 'https://github.com/MahmoudsMohammed',
  linkedin: 'https://www.linkedin.com/in/mahmoud-s-ayoub/',
  whatsapp: 'https://api.whatsapp.com/send?phone=201099088962&text=Hello%20Mahmoud',
};

export const stats = [
  { value: 2022, label: 'Shipping production frontends since', plain: true },
  { value: 4, suffix: '', label: 'Companies across Egypt, KSA & UAE' },
  { value: 6, suffix: '+', label: 'Products shipped to real users' },
  { value: 2, suffix: 'x', label: 'ICPC Upper Egypt contestant' },
];

export const experience = [
  {
    id: 'eand',
    company: 'e& UAE',
    role: 'Senior Frontend Engineer',
    period: 'Oct 2025 — Present',
    location: 'Cairo, Egypt',
    type: 'Full-time',
    project: 'e& UAE e-shop',
    summary:
      'Part of the micro-frontend team rebuilding the B2C e-shop of one of the largest telecom operators in the region.',
    bullets: [
      'Revamping the B2C e-shop from a legacy MVC AngularJS app to a modern Angular micro-frontend architecture, improving scalability and modularity.',
      'Building the Backend-for-Frontend (BFF) layer with Spring Boot to merge multiple backend services into a single, optimized response for the UI.',
      'Implementing Server-Side Rendering on key pages to improve SEO, perceived performance and initial page load.',
    ],
    stack: ['Angular', 'MFE', 'RxJS', 'NgRx', 'SSR', 'Java Spring'],
  },
  {
    id: 'acuanix',
    company: 'ACUANIX',
    role: 'Frontend Engineer',
    period: 'Sep 2024 — Oct 2025',
    location: 'Cairo, Egypt',
    type: 'Full-time',
    project: 'G-Sense & GeoInTime',
    summary:
      'Built health-tech and geo products from the ground up, owning structure, design system and real-time data flows.',
    bullets: [
      'Set up the G-Sense project structure and converted the design system into reusable, token-based SASS.',
      'Established a real-time WebSocket connection to stream up-to-date glucose readings to patients and clinicians.',
      'Integrated RESTful APIs and visualized health data through interactive Chart.js reports.',
      'Delivered GeoInTime features in Agile cross-functional teams and improved performance through refactoring.',
    ],
    stack: ['Angular', 'RxJS', 'WebSockets', 'PrimeNG', 'Chart.js', 'NGX-Translate'],
  },
  {
    id: 'midtown',
    company: 'Midtown',
    role: 'Frontend Engineer',
    period: 'Jul 2024 — Jan 2025',
    location: 'Riyadh, KSA',
    type: 'Part-time',
    project: 'Rubble',
    summary:
      'Built a GIS-driven platform for tracking rubble removal operations across the city.',
    bullets: [
      'Integrated Esri maps to display rubble details and draw layers of custom objects on the map.',
      'Used d3.js to build reports that visualize every stage of the rubble removal process.',
      'Kept the codebase aligned with coding standards and best practices.',
    ],
    stack: ['Angular', 'Esri Map', 'd3.js', 'Formly', 'PrimeNG', 'SASS'],
  },
  {
    id: 'spatium',
    company: 'Spatium Software',
    role: 'Frontend Engineer',
    period: 'Dec 2023 — Sep 2024',
    location: 'Assiut, Egypt',
    type: 'Full-time',
    project: 'HR System & CMS',
    summary:
      'Delivered enterprise dashboards with a focus on structure, state management and performance.',
    bullets: [
      'Followed best practices for project structure and performance to ship a scalable HR system.',
      'Managed complex application state with NgRx.',
      'Upgraded a CMS to the latest Angular and dependencies, cutting bundle size and render time.',
    ],
    stack: ['Angular', 'NgRx', 'RxJS', 'PrimeNG', 'NGX-Translate', 'Bootstrap'],
  },
];

export const training = [
  {
    title: 'Front-end Developer Intern',
    org: 'Wony',
    period: 'Jul 2022 — Sep 2022',
    text: 'Practical experience with HTML, CSS, JavaScript, SASS and Bootstrap, working with version control in a team alongside backend and UI/UX engineers.',
  },
  {
    title: 'Summer Training Diploma',
    org: 'ITI',
    period: 'Jul 2021 — Sep 2021',
    text: '120 hours of front-end training covering HTML, CSS, JavaScript, jQuery and Bootstrap, with a deep dive into Angular and RxJS.',
  },
];

export const skillGroups = [
  {
    title: 'Core Web',
    icon: 'fa-solid fa-code',
    note: 'The foundation, written by hand.',
    items: ['HTML', 'CSS', 'SCSS', 'JavaScript (ES6+)', 'TypeScript', 'jQuery'],
  },
  {
    title: 'Angular Ecosystem',
    icon: 'fa-brands fa-angular',
    note: 'Where most of my days are spent.',
    items: ['Angular', 'AngularJS', 'RxJS', 'NgRx', 'SSR', 'Micro-frontends'],
  },
  {
    title: 'UI & Styling',
    icon: 'fa-solid fa-palette',
    note: 'Design systems that scale.',
    items: ['Tailwind', 'Bootstrap', 'PrimeNG', 'Angular Material', 'Formly'],
  },
  {
    title: 'Data Viz & Maps',
    icon: 'fa-solid fa-chart-line',
    note: 'Turning raw data into insight.',
    items: ['Chart.js', 'd3.js', 'Esri Maps'],
  },
  {
    title: 'Real-time & Integration',
    icon: 'fa-solid fa-tower-broadcast',
    note: 'Wiring the UI to the world.',
    items: ['WebSockets', 'REST APIs', 'BFF (Spring Boot)', 'NGX-Translate / i18n'],
  },
  {
    title: 'Workflow',
    icon: 'fa-solid fa-code-branch',
    note: 'How good code gets shipped.',
    items: ['Git & GitHub', 'CI/CD', 'Linting & Formatting', 'Agile / Scrum'],
  },
];

export const marquee = [
  'Angular', 'TypeScript', 'RxJS', 'NgRx', 'SSR', 'Micro-frontends', 'SCSS',
  'Tailwind', 'PrimeNG', 'd3.js', 'Chart.js', 'Esri', 'WebSockets', 'Spring Boot BFF',
  'Git', 'CI/CD',
];

export const projects = [
  {
    id: 'eshop',
    name: 'e& UAE e-shop',
    company: 'e& UAE',
    year: '2025 — Now',
    tagline: 'Re-platforming a telecom e-commerce giant',
    context:
      'The B2C e-shop ran on a legacy MVC AngularJS codebase that was hard to scale and slow to evolve.',
    did: [
      'Migrating journeys to an Angular micro-frontend architecture owned by independent teams.',
      'Building a Spring Boot BFF that aggregates several services into one lean response.',
      'Adding SSR on high-traffic pages for SEO and faster first paint.',
    ],
    stack: ['Angular', 'MFE', 'NgRx', 'RxJS', 'SSR', 'Spring Boot'],
    impact: [
      { k: 'Migration', v: 'AngularJS to Angular MFE' },
      { k: 'Rendering', v: 'SSR for SEO & first load' },
      { k: 'API layer', v: 'One optimized BFF response' },
    ],
  },
  {
    id: 'gsense',
    name: 'G-Sense',
    company: 'ACUANIX',
    year: '2024 — 2025',
    tagline: 'Live glucose monitoring for patients & clinicians',
    context:
      'A health-tech product that needed trustworthy, real-time readings and clear reports from day one.',
    did: [
      'Set up the project architecture and turned the design system into reusable SASS.',
      'Streamed readings over WebSockets so the UI always reflects the latest value.',
      'Built interactive Chart.js reports on top of RESTful APIs.',
    ],
    stack: ['Angular', 'RxJS', 'WebSockets', 'Chart.js', 'PrimeNG', 'NGX-Translate'],
    impact: [
      { k: 'Data', v: 'Real-time via WebSockets' },
      { k: 'UI', v: 'Design system in SASS' },
      { k: 'Reports', v: 'Interactive charts' },
    ],
  },
  {
    id: 'rubble',
    name: 'Rubble',
    company: 'Midtown',
    year: '2024 — 2025',
    tagline: 'Mapping city-wide rubble removal operations',
    context:
      'Operators needed to see every rubble site on a map and track removal progress at a glance.',
    did: [
      'Rendered rubble details on Esri maps with custom drawn layers.',
      'Built d3.js reports covering each step of the removal process.',
      'Handled complex data entry with dynamic Formly forms.',
    ],
    stack: ['Angular', 'Esri Map', 'd3.js', 'Formly', 'PrimeNG'],
    impact: [
      { k: 'GIS', v: 'Custom Esri map layers' },
      { k: 'Reports', v: 'd3.js visualizations' },
      { k: 'Market', v: 'Riyadh, Saudi Arabia' },
    ],
  },
  {
    id: 'geointime',
    name: 'GeoInTime',
    company: 'ACUANIX',
    year: '2024 — 2025',
    tagline: 'Location-aware operations platform',
    context:
      'A multilingual Angular product built by cross-functional teams shipping in short Agile iterations.',
    did: [
      'Defined and designed new features together with product, design and backend.',
      'Refactored and optimized hot paths to improve application performance.',
      'Delivered a fully translatable UI with NGX-Translate and Angular Material.',
    ],
    stack: ['Angular', 'RxJS', 'Angular Material', 'NGX-Translate', 'SASS'],
    impact: [
      { k: 'Process', v: 'Agile, cross-functional' },
      { k: 'Perf', v: 'Optimized & refactored' },
      { k: 'i18n', v: 'Multi-language UI' },
    ],
  },
  {
    id: 'hr',
    name: 'HR System',
    company: 'Spatium Software',
    year: '2023 — 2024',
    tagline: 'Enterprise HR dashboard built to scale',
    context:
      'An HR platform with many interconnected modules and a lot of shared state.',
    did: [
      'Designed a scalable folder and module structure following Angular best practices.',
      'Centralized state management with NgRx for predictable data flow.',
      'Built data-heavy screens with PrimeNG components.',
    ],
    stack: ['Angular', 'NgRx', 'RxJS', 'PrimeNG', 'Bootstrap'],
    impact: [
      { k: 'State', v: 'NgRx store' },
      { k: 'Structure', v: 'Scalable modules' },
      { k: 'Focus', v: 'Performance first' },
    ],
  },
  {
    id: 'cms',
    name: 'Content Management System',
    company: 'Spatium Software',
    year: '2023 — 2024',
    tagline: 'Modernizing a CMS for speed',
    context:
      'An existing CMS running on outdated Angular and dependencies, with a heavy bundle.',
    did: [
      'Upgraded Angular and all dependencies to their latest versions.',
      'Reduced bundle size and rendering time through targeted optimization.',
      'Kept the multilingual experience intact with NGX-Translate.',
    ],
    stack: ['Angular', 'RxJS', 'NGX-Translate', 'Bootstrap', 'SASS'],
    impact: [
      { k: 'Upgrade', v: 'Latest Angular' },
      { k: 'Bundle', v: 'Smaller & faster' },
      { k: 'i18n', v: 'Multi-language' },
    ],
  },
];

export const capabilities = [
  { icon: 'fa-solid fa-cubes', title: 'Micro-frontends', text: 'Splitting large apps into independently delivered Angular MFEs.' },
  { icon: 'fa-solid fa-server', title: 'SSR & SEO', text: 'Server-side rendering for crawlable pages and faster first paint.' },
  { icon: 'fa-solid fa-diagram-project', title: 'State management', text: 'Predictable data flow with NgRx and reactive RxJS streams.' },
  { icon: 'fa-solid fa-bolt', title: 'Real-time data', text: 'WebSocket streams that keep the UI in sync with live data.' },
  { icon: 'fa-solid fa-gauge-high', title: 'Performance', text: 'Smaller bundles and faster rendering through targeted optimization.' },
  { icon: 'fa-solid fa-swatchbook', title: 'Design systems', text: 'Turning design systems into reusable, themeable SCSS.' },
  { icon: 'fa-solid fa-chart-pie', title: 'Data visualization', text: 'Clear, interactive reports with d3.js and Chart.js.' },
  { icon: 'fa-solid fa-map-location-dot', title: 'GIS & maps', text: 'Esri maps with custom layers and geo-driven UI.' },
  { icon: 'fa-solid fa-language', title: 'Internationalization', text: 'Multilingual interfaces built with NGX-Translate.' },
  { icon: 'fa-solid fa-arrows-rotate', title: 'Migrations', text: 'Moving legacy AngularJS and old Angular to modern versions.' },
  { icon: 'fa-solid fa-shield-halved', title: 'Code quality & CI/CD', text: 'Linting, formatting and pipelines that keep main green.' },
  { icon: 'fa-solid fa-people-group', title: 'Collaboration', text: 'Working in Agile teams with product, design and backend.' },
];

export const community = [
  {
    icon: 'fa-solid fa-chalkboard-user',
    title: 'Mentor & Trainee — ICPC Assiut Community',
    text: 'Mentoring college students in data structures, algorithms and problem solving to prepare them for programming contests.',
  },
  {
    icon: 'fa-solid fa-trophy',
    title: 'ICPC Upper Egypt Collegiate Programming Contest',
    text: 'Competed twice in the regional collegiate programming contest.',
  },
  {
    icon: 'fa-solid fa-graduation-cap',
    title: 'B.Sc. Computer Science — Assiut University',
    text: 'Faculty of Computers and Information, 2018 — 2022. GPA 3.11 / 4.',
  },
];

export const orbitNodes = {
  inner: [
    { label: 'Angular', icon: 'fa-brands fa-angular' },
    { label: 'RxJS' },
    { label: 'NgRx' },
  ],
  outer: [
    { label: 'TypeScript' },
    { label: 'SCSS', icon: 'fa-brands fa-sass' },
    { label: 'SSR' },
    { label: 'd3.js' },
    { label: 'MFE' },
  ],
};
