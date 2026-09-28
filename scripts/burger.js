// Burger handler

const DESKTOP_QUERY = "(min-width: 769px)";

export function initBurger() {
  const burgerItem = document.querySelector(".burger-menu");
  const burgerLine = document.querySelectorAll(".burger-menu__line");
  const menu = document.querySelector(".header__nav");
  const body = document.querySelector("body");
  const navLinks = document.querySelectorAll(".header__nav--item");
  const menuButton = document.querySelector(".header-menu__link");
  const desktopQuery = window.matchMedia(DESKTOP_QUERY);

  const closeMenu = () => {
    menu.classList.remove("header__nav--active");
    body.classList.remove("hidden");
    burgerLine.forEach((line) => {
      line.classList.remove("active");
    });
  };

  const toggleMenu = () => {
    const isOpen = menu.classList.toggle("header__nav--active");
    body.classList.toggle("hidden", isOpen);
    burgerLine.forEach((line) => {
      line.classList.toggle("active", isOpen);
    });
  };

  burgerItem.addEventListener("click", () => {
    toggleMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  menuButton.addEventListener("click", () => {
    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  desktopQuery.addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
}
