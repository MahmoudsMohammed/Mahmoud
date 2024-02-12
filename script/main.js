// typed js
const type = new Typed('.typed', {
  strings: ['Software Engineer', 'Front-end Developer', 'Angular Developer'],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// mixitup
let mixer = mixitup('.work', {
  selectors: {
    target: '.box',
  },
  animation: {
    duration: 500,
  },
});

// activate project category
document.querySelector('.filter').addEventListener('click', activeCategory);
const categories = document.querySelectorAll('.filter li');
function activeCategory(e) {
  categories.forEach((li) => {
    if (e.target.textContent === li.textContent) {
      e.target.classList.add('active-category');
    } else {
      li.classList.remove('active-category');
    }
  });
}
