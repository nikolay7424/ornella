

// SLIDER

const track = document.querySelector('.slider-track');
const slides = Array.from(track.children);
const nextButtton = document.querySelector('.slider-button-right');
const prevButtton = document.querySelector('.slider-button-left');
const dotsNav = document.querySelector('.slider-nav');
const dots = Array.from(dotsNav.children);
let slideWidth = slides[0].getBoundingClientRect().width;

// arrange slides next to each other
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

// resize fix
window.addEventListener("resize", (event) => {
  slideWidth = slides[0].getBoundingClientRect().width;
  slides.forEach(setSlidePosition);
});


const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}

const hideShowArrows = (targetIndex) => {
  if(targetIndex === 0) {
    prevButtton.classList.add('is-hidden');
    nextButtton.classList.remove('is-hidden');
  } else if(targetIndex === slides.length - 1) {
    prevButtton.classList.remove('is-hidden');
    nextButtton.classList.add('is-hidden');
  } else {
    prevButtton.classList.remove('is-hidden');
    nextButtton.classList.remove('is-hidden');
  }
}

// move to right
nextButtton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide == nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(nextIndex);
});

// move to left
prevButtton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide == prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(prevIndex);
});

// move to selected indicator
dotsNav.addEventListener('click', e => {
  // what indicator was clicked
  const targetDot = e.target.closest('button');

  // if not dot - exit
  if(!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot == targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(targetIndex);

});