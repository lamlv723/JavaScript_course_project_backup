'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

const allSections = document.querySelectorAll('section');

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const dotContainer = document.querySelector('.dots');
btnScrollTo.addEventListener('click', function (e) {
   section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
   e.preventDefault();

   // NOTE
   if (e.target.classList.contains('nav__link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
   }
});

// Tabbed components

tabsContainer.addEventListener('click', function (e) {
   const clicked = e.target.closest('.operations__tab');
   console.log(clicked);

   // NOTE Guard clause => Modern way
   if (!clicked) return;

   // active tabs
   tabs.forEach(t => t.classList.remove('operations__tab--active'));
   clicked.classList.add('operations__tab--active');

   // active content
   tabsContent.forEach(c => c.classList.remove('operations__content--active'));

   console.log(clicked.dataset.tab);
   document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
});

// Nav fade animation
const handleHover = function (e) {
   if (e.target.classList.contains('nav__link')) {
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      const logo = link.closest('.nav').querySelector('img');
      siblings.forEach(el => {
         if (el !== e.target) el.style.opacity = this;
      });
      logo.style.opacity = this;
   }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
   const [entry] = entries;

   if (!entry.isIntersecting) nav.classList.add('sticky');
   else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
   root: null,
   threshold: 0,
   rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal section

const revealSection = function (entries, observer) {
   const [entry] = entries;
   // console.log(entry);

   if (!entry.isIntersecting) return;
   entry.target.classList.remove('section--hidden');
   observer.unobserve(entry.target);
};

const sectionObsever = new IntersectionObserver(revealSection, {
   root: null,
   threshold: 0.15,
});

allSections.forEach(function (section) {
   sectionObsever.observe(section);
   // section.classList.add('section--hidden');
});

// lazy loading image
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
   const [entry] = entries;

   if (!entry.isIntersecting) return;
   entry.target.src = entry.target.dataset.src;

   entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
   });
};
const imgObserver = new IntersectionObserver(loadImg, {
   root: null,
   threshold: 0,
   rootMargin: '200px',
});

imgTargets.forEach(image => imgObserver.observe(image));

// slide animation

// slider.style.overflow = 'visible';

let currentSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (cur) {
   slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - cur) * 100}%)`;
   });
};

const nextSlide = function () {
   if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
   } else {
      currentSlide++;
   }
   goToSlide(currentSlide);
   activateDot(currentSlide);
};

const prevSlide = function () {
   if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
   } else {
      currentSlide--;
   }
   goToSlide(currentSlide);
   activateDot(currentSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
   // console.log(e);
   if (e.key === 'ArrowRight') {
      nextSlide();
   } else if (e.key === 'ArrowLeft') {
      prevSlide();
   }
});

// add dot

const createDot = function () {
   slides.forEach((_, index) => {
      dotContainer.insertAdjacentHTML(
         'beforeend',
         `<button class="dots__dot" data-slide="${index}"></button>`
      );
   });
};

const activateDot = function (currentSlide) {
   document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
   document
      .querySelector(`.dots__dot[data-slide="${currentSlide}"]`)
      .classList.add('dots__dot--active');
};

dotContainer.addEventListener('click', function (e) {
   if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
   }
});

const init = function () {
   createDot();
   goToSlide(0);
   activateDot(0);
};
init();
