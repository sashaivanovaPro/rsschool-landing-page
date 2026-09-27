// Burger handler

export function initBurger() {
  const burgerItem = document.querySelector(".burger-menu");
  const burgerLine = document.querySelectorAll(".burger-menu__line");
  const menu = document.querySelector(".header__nav");
  const body = document.querySelector("body");
  const navLinks = document.querySelectorAll(".header__nav--item");
  const menuButton = document.querySelector(".header-menu__link");

  const burgerIconClick = () => {
    menu.classList.toggle("header__nav--active");
    body.classList.toggle("hidden");
    burgerLine.forEach((el) => {
      el.classList.toggle("active");
    });
  };

  const linkClick = () => {
    menu.classList.remove("header__nav--active");
    body.classList.remove("hidden");
    burgerLine.forEach((el) => {
      el.classList.remove("active");
    });
  };

  burgerItem.addEventListener("click", () => {
    burgerIconClick();
  });

  navLinks.forEach((el) => {
    el.addEventListener("click", () => {
      linkClick();
    });
  });

  menuButton.addEventListener("click", () => {
    linkClick();
  });
}
