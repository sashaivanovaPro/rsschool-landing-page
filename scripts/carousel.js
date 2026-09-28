const SLIDER_LINE_SELECTOR = ".slider-line";
const SLIDE_SELECTOR = ".slider-item";
const PREV_SELECTOR = ".arrow-prev";
const NEXT_SELECTOR = ".arrow-next";
const INDICATOR_SELECTOR = ".controls__span-double";
const ACTIVE_INDICATOR_CLASS = "color-active";

export function initCarousel() {
  const sliderLine = document.querySelector(SLIDER_LINE_SELECTOR);
  const slides = document.querySelectorAll(SLIDE_SELECTOR);
  const prevButton = document.querySelector(PREV_SELECTOR);
  const nextButton = document.querySelector(NEXT_SELECTOR);
  const indicators = document.querySelectorAll(INDICATOR_SELECTOR);
  const slideCount = slides.length;

  let currentIndex = 0;

  function render() {
    sliderLine.style.transform = `translateX(-${currentIndex * 100}%)`;

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle(
        ACTIVE_INDICATOR_CLASS,
        index === currentIndex,
      );
    });
  }

  function goTo(index) {
    currentIndex = (index + slideCount) % slideCount;
    render();
  }

  nextButton.addEventListener("click", () => goTo(currentIndex + 1));
  prevButton.addEventListener("click", () => goTo(currentIndex - 1));

  render();
}
