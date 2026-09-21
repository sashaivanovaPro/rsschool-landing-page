// CAROUSEL ANIMATION

let offset = 0;

const SLIDER_LINE = document.querySelector(".slider-line");
console.log(SLIDER_LINE);
const NEXT = document.querySelector(".arrow-next");
const PREV = document.querySelector(".arrow-prev");

const CAROUSEL = document.querySelector(".favorites__carousel");
const COFFEE_IMAGES = document.querySelectorAll(".carousel__image");
const IMAGE_WIDTH = CAROUSEL.offsetWidth;

const CONTROLS = document.querySelectorAll(".controls__span-double");

let sliderCount = 0;

// console.log(CONTROLS);

// Change image width inside slider according to monitor size

const resizeWindow = COFFEE_IMAGES.forEach((element) => {
  element.style.width = IMAGE_WIDTH + "px";
});

CONTROLS[0].classList.add("color-active");

// Change color of controls

const colorChange = () => {
  CONTROLS.forEach((element) => {
    element.classList.remove("color-active");
    element.classList.add("none");
  });
  CONTROLS[sliderCount].classList.remove("none");
  setTimeout(() => {
    CONTROLS[sliderCount].classList.add("color-active");
  }, 0.01);
};

// Swipe images left

const nextSlide = () => {
  offset += IMAGE_WIDTH;
  sliderCount += 1;
  if (offset > IMAGE_WIDTH * 2) {
    offset = 0;
    sliderCount = 0;
  }
  SLIDER_LINE.style.left = -offset + "px";
  colorChange();
};

NEXT.addEventListener("click", () => {
  nextSlide();
  colorChange();
});

// Swipe images right

const prevSlide = () => {
  offset -= IMAGE_WIDTH;
  // sliderCount -= 1;
  if (offset < 0) {
    offset = IMAGE_WIDTH * 2;
  }
  SLIDER_LINE.style.left = -offset + "px";
};

PREV.addEventListener("click", () => {
  prevSlide();
});

// console.log(CAROUSEL.offsetWidth);

const moveCarousel = setInterval(() => nextSlide(), 5000);
