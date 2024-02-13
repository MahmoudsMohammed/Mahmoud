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
    duration: 2000,
    reset: true,
  }),
  skills = document.querySelectorAll('.group>span');

skills.forEach((s, i) => {
  reveal.reveal(s, { delay: 50 * (i + 1) });
});
reveal.reveal(`.content,footer .info,.about .descripe`, { origin: 'top' });
reveal.reveal('.computer, footer .container>p,.about .skills', {
  origin: 'bottom',
});
reveal.reveal(`.about .title,.contact .title,.filter`, { origin: 'left' });
reveal.reveal(`.projects .title,form`, { origin: 'right' });
