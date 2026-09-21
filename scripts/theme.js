const THEME_KEY = "theme";
const DARK = "dark";
const LIGHT = "light";

const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");

const applyTheme = (theme) => {
  root.dataset.theme = theme;
  toggle.setAttribute("aria-pressed", String(theme === DARK));
};

applyTheme(root.dataset.theme === DARK ? DARK : LIGHT);

toggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === DARK ? LIGHT : DARK;
  applyTheme(nextTheme);
  localStorage.setItem(THEME_KEY, nextTheme);
});
