// typed js
const type = new Typed('.typed', {
  strings: ['Software Engineer', 'Front-end Developer', 'Angular Developer'],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// mixitup to filter projects
let mixer = mixitup('.work', {
  selectors: {
    target: '.box',
  },
  animation: {
    duration: 500,
  },
});

// activate selected projects category
document.querySelector('.filter').addEventListener('click', activeCategory);
const categories = document.querySelectorAll('.filter li');

function activeCategory(e) {
  categories.forEach((li) => {
    if (e.target.textContent === li.textContent) {
      e.target.classList.add('active-category');
    } else if (
      e.target.textContent !== li.textContent &&
      !e.target.classList.contains('filter')
    ) {
      li.classList.remove('active-category');
    }
  });
}

// display project details info
const detailsBtn = document.querySelectorAll('.product-details'),
  details = document.querySelectorAll('#product-details'),
  closeDetails = document.querySelectorAll('.close');

detailsBtn.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.target.nextElementSibling.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
});

closeDetails.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.target.parentElement.parentElement.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
});

// Scroll reveal
const reveal = ScrollReveal({
    distance: '100px',
    duration: 2500,
    reset: true,
  }),
  skills = document.querySelectorAll('.group>span');

reveal.reveal(`.content`, { origin: 'top' });
reveal.reveal(`.computer`, { origin: 'bottom' });
reveal.reveal(`.about .descripe`, { origin: 'top' });
reveal.reveal(`.about .skills`, { origin: 'bottom' });
reveal.reveal(`.about .title`, { origin: 'left' });
skills.forEach((s, i) => {
  reveal.reveal(s, { origin: 'bottom', delay: 50 * (i + 1) });
});
reveal.reveal(`.projects .title`, { origin: 'right' });
reveal.reveal(`.projects .filter`, { origin: 'left' });
reveal.reveal(`.contact .title`, { origin: 'left' });
reveal.reveal(`.contact form`, { origin: 'right' });
reveal.reveal(`footer .info`, { origin: 'top' });
reveal.reveal(`footer .copy`, { origin: 'bottom' });

// display to top
window.addEventListener('scroll', () => {
  if (window.scrollY > 650) {
    document.querySelector('.up').style.display = 'flex';
  } else {
    document.querySelector('.up').style.display = 'none';
  }
});

// active link based on section
window.addEventListener('scroll', () => {
  const home =
      document.querySelector('.landing').getBoundingClientRect().y - 85,
    about = document.querySelector('.about').getBoundingClientRect().y - 85,
    projects =
      document.querySelector('.projects').getBoundingClientRect().y - 85,
    contact = document.querySelector('.contact').getBoundingClientRect().y - 85;
  if (about <= 50 && projects > 50) {
    activeLink(1);
  } else if (projects <= 50 && contact > 50) {
    activeLink(2);
  } else if (contact <= 50 && contact >= 0) {
    activeLink(3);
  } else if (about > 50) {
    activeLink(0);
  } else {
    activeLink(3);
  }
  console.log(home, '####', about, '####', projects, '####', contact);
});

function activeLink(selected) {
  document.querySelectorAll('.nav-link').forEach((e, i) => {
    if (i === selected) {
      e.classList.add('active-link');
    } else {
      e.classList.remove('active-link');
    }
  });
}

// control over loader
const loader = document.querySelector('.loader'),
  main = document.querySelector('main');

window.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflowY = 'hidden';
  window.scroll(0, 0);
});
setTimeout(() => {
  loader.style.top = '-100%';
}, 3500);

setTimeout(() => {
  document.body.style.overflowY = 'scroll';
}, 4500);
