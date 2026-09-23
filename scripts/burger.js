// Burger handler

const burgerItem = document.querySelector(".burger-menu");

const burgerLine = document.querySelectorAll(".burger-menu__line");

const MENU = document.querySelector(".header__nav");

const BODY = document.querySelector("body");

const NAVLINKS = document.querySelectorAll(".header__nav--item");

const MENU_BUTTON = document.querySelector(".header-menu__link");

const burgerIconClick = () => {
  MENU.classList.toggle("header__nav--active");
  BODY.classList.toggle("hidden");
  burgerLine.forEach((el) => {
    el.classList.toggle("active");
  });
};

const linkClick = () => {
  MENU.classList.remove("header__nav--active");
  BODY.classList.remove("hidden");
  burgerLine.forEach((el) => {
    el.classList.remove("active");
  });
};

burgerItem.addEventListener("click", () => {
  burgerIconClick();
});

NAVLINKS.forEach((el) => {
  el.addEventListener("click", () => {
    linkClick();
  });
});

MENU_BUTTON.addEventListener("click", () => {
  linkClick();
});
