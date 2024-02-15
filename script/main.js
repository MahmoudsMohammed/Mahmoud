// typed js
const type = new Typed('.typed', {
  strings: ['Software Engineer', 'Front-end Developer', 'Angular Developer'],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// swiper
var swiper = new Swiper('.work', {
  speed: 500,
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
  mousewheel: true,
  keyboard: true,
  centeredSlides: true,
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  },
});
swiper.slideTo(1);
// activate selected projects category
document.querySelector('.filter').addEventListener('click', activeCategory);
const categories = document.querySelectorAll('.filter li'),
  allProjects = [
    `
    <div class="mix box templates swiper-slide">
    <img src="./static/landing5.png" alt="" />
    <div class="decripe">
      <h3>Amon</h3>
      <p>Website for an Egyptian Travel Agency.</p>
    </div>
    <button class="but product-details amon">details</button>
  </div>
  <div class="mix box templates swiper-slide">
    <img src="./static/landing3.png" alt="" />
    <div class="decripe">
      <h3>Business Landing Page</h3>
      <p>
        Responsive landing page with hover and focus effects, an
        animation which makes the User Experience more enjoyable.
      </p>
    </div>
    <button class="but product-details business">details</button>
  </div>
  <div class="mix box templates swiper-slide">
    <img src="./static/landing4.png" alt="" />
    <div class="decripe">
      <h3>Architect</h3>
      <p>
        Interactive Page With Cool Animation Effects To Make The
        User Experience Enjoyable.
      </p>
    </div>
    <button class="but product-details architect">details</button>
  </div>
  <div class="mix box templates swiper-slide">
    <img src="./static/landing1.png" alt="" />
    <div class="decripe">
      <h3>Kasper</h3>
      <p>landing page using HTML 5 and CSS 3.</p>
    </div>
    <button class="but product-details kasper">details</button>
  </div>
  <div class="mix box templates swiper-slide">
    <img src="./static/landing2.png" alt="" />
    <div class="decripe">
      <h3>Leon</h3>
      <p>my first landing page using HTML and CSS</p>
    </div>
    <button class="but product-details leon">details</button>
  </div>
    `,
    `
    <div class="mix box js swiper-slide">
    <img src="./static/whereinworld-js6.png" alt="" />
    <div class="decripe">
      <h3>Where in the world</h3>
      <p>
        Fetch Data From Countries' API and Display It In Beautiful
        and Responsive Design.
      </p>
    </div>
    <button class="but product-details world">details</button>
  </div>
  
  <div class="mix box js swiper-slide">
    <img src="./static/finder-js5.png" alt="" />
    <div class="decripe">
      <h3>GitHub-Finder</h3>
      <p>
        GitHub Finder Project Using the GitHub API to Display the
        User Data and Recently Created Repositories.
      </p>
    </div>
    <button class="but product-details finder">details</button>
  </div>
  <div class="mix box js swiper-slide">
    <img src="./static/loan-js2.png" alt="" />
    <div class="decripe">
      <h3>Loan-Calculator</h3>
      <p>
        Loan Calculator Use To Calculate Loan Total Payment, Monthly
        Payment and Total Interest.
      </p>
    </div>
    <button class="but product-details loan">details</button>
  </div>
  <div class="mix box js swiper-slide">
    <img src="./static/gusser.js3.png" alt="" />
    <div class="decripe">
      <h3>Number-Guesser</h3>
      <p>
        Number guesser game with two options fixed or dynamic range
        and 3 tries of playing.
      </p>
    </div>
    <button class="but product-details gusser">details</button>
  </div>
  <div class="mix box js swiper-slide">
    <img src="./static/library-js4.png" alt="" />
    <div class="decripe">
      <h3>Library-Admin</h3>
      <p>
        An app built with OOP architecture that helps library admin
        manage the library.
      </p>
    </div>
    <button class="but product-details library">details</button>
  </div>
  <div class="mix box js swiper-slide">
    <img src="./static/todo-js1.png" alt="" />
    <div class="decripe">
      <h3>Todo-List</h3>
      <p>
        Todo List with lot of features like add, remove , filter
        tasks, or even clear the whole list.
      </p>
    </div>
    <button class="but product-details todo">details</button>
  </div>
    `,
    `<div class="mix box angular swiper-slide">
    <img src="./static/angular1.png" alt="" />
    <div class="decripe">
      <h3>EGY-Film</h3>
      <p>
        App to display movies, search for movies, filter movies by
        category, and see film details like cast and trailer.
      </p>
    </div>
    <button class="but product-details egy">details</button>
  </div>
  <div class="mix box angular swiper-slide">
    <img src="./static/angualr2.png" alt="" />
    <div class="decripe">
      <h3>Recipe-Book</h3>
      <p>
        Project to manage recipes and their ingredient with the
        ability to add ingredients to a shopping list.
      </p>
    </div>
    <button class="but product-details recipe">details</button>
  </div>`,
  ],
  wrapper = document.querySelector('.swiper-wrapper');

wrapper.innerHTML = `${allProjects.join('')}`;

function activeCategory(e) {
  categories.forEach((li) => {
    if (e.target.textContent === li.textContent) {
      e.target.classList.add('active-category');
      if (li.textContent === 'Templates') {
        swiper.slideTo(1);
        wrapper.innerHTML = allProjects[0];
      } else if (li.textContent === 'JavaScript') {
        swiper.slideTo(1);
        wrapper.innerHTML = allProjects[1];
      } else if (li.textContent === 'Angular') {
        swiper.slideTo(1);
        wrapper.innerHTML = allProjects[2];
      } else {
        swiper.slideTo(1);
        wrapper.innerHTML = `${allProjects.join('')}`;
      }
    } else if (
      e.target.textContent !== li.textContent &&
      !e.target.classList.contains('filter')
    ) {
      li.classList.remove('active-category');
    }
  });
}

// display project details info
const closeDetails = document.querySelectorAll('.close');

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('product-details')) {
    document.getElementById(
      e.target.classList[e.target.classList.length - 1]
    ).style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
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
});

reveal.reveal(`.content`, { origin: 'top' });
reveal.reveal(`.computer`, { origin: 'bottom' });
reveal.reveal(`.work`, { origin: 'bottom' });
reveal.reveal(`.about .descripe *`, { origin: 'left', interval: 100 });
reveal.reveal(`.about .title`, { origin: 'top' });
reveal.reveal(`.about .skills *`, { origin: 'right', interval: 30 });
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
  const about = document.querySelector('.about').getBoundingClientRect().y - 85,
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

// email js
const form = document.querySelector('form'),
  name = document.getElementById('name'),
  email = document.getElementById('email'),
  message = document.getElementById('message'),
  alert = document.querySelector('form>p');

form.addEventListener('submit', (e) => {
  if (name.value === '' || email.value === '' || message.value === '') {
    alert.textContent = 'Please, Fill All The Input Fields ⛔️';
    alert.className = 'error';
    alert.style.display = 'block';
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      email.value
    )
  ) {
    alert.textContent = 'Please, enter valid email 📧';
    alert.className = 'error';
    alert.style.display = 'block';
  } else {
    emailjs
      .sendForm(
        'service_cg0kdwt',
        'template_3kqzz2c',
        '#form',
        '0RGJJ45VdilTT11ha'
      )
      .then(() => {
        alert.textContent =
          'message sent I will get back to you as soon as possible ✅';
        alert.className = 'accept';
        alert.style.display = 'block';
        // clear fields
        name.value = '';
        email.value = '';
        message.value = '';
      })
      .catch((error) => {
        console.log(error);
      });
  }
  setTimeout(() => {
    alert.style.display = 'none';
  }, 3500);
  e.preventDefault();
});

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
