const CARD_TEMPLATE_ID = "menu-card-template";
const GALLERY_SELECTOR = ".menu__gallery";
const CATEGORY_HEADING_SELECTOR = ".menu__category";
const CATEGORY_BUTTON_SELECTOR = ".menu__controls--button";
const CATEGORY_BUTTON_TITLE_SELECTOR = ".menu__controls--title";
const REFRESH_BUTTON_SELECTOR = ".menu-refresh";
const ACTIVE_BUTTON_CLASS = "button-active";
const MOBILE_QUERY = "(max-width: 768px)";
const CARDS_PER_PAGE = 4;

const state = {
  category: null,
  showedCount: CARDS_PER_PAGE,
};

function createCard(product, index) {
  const template = document.getElementById(CARD_TEMPLATE_ID);
  const card = template.content.cloneNode(true);

  card.querySelector(".menu__gallery--item").dataset.id = index;

  const image = card.querySelector("img");
  image.src = product.src;
  image.alt = product.name;

  card.querySelector(".menu__coffee--title").textContent = product.name;
  card.querySelector(".menu__coffee--description").textContent =
    product.description;
  card.querySelector(".menu__coffee--price").textContent = `$ ${product.price}`;

  return card;
}

function renderCards(items, gallery) {
  gallery.innerHTML = "";
  const fragment = document.createDocumentFragment();

  items.forEach(({ product, index }) =>
    fragment.append(createCard(product, index)),
  );

  gallery.append(fragment);
}

function setActiveButton(buttons, activeButton) {
  buttons.forEach((button) => button.classList.remove(ACTIVE_BUTTON_CLASS));
  activeButton.classList.add(ACTIVE_BUTTON_CLASS);
}

function updateCategoryHeading(heading, activeButton) {
  const title = activeButton.querySelector(
    CATEGORY_BUTTON_TITLE_SELECTOR,
  ).textContent;
  heading.textContent = `${title} menu`;
}

export function initCatalog(products) {
  const gallery = document.querySelector(GALLERY_SELECTOR);
  const heading = document.querySelector(CATEGORY_HEADING_SELECTOR);
  const buttons = document.querySelectorAll(CATEGORY_BUTTON_SELECTOR);
  const refreshButton = document.querySelector(REFRESH_BUTTON_SELECTOR);
  const mobileQuery = window.matchMedia(MOBILE_QUERY);

  function render() {
    const inCategory = products
      .map((product, index) => ({ product, index }))
      .filter(({ product }) => product.category === state.category);

    const isMobile = mobileQuery.matches;
    const visible = isMobile
      ? inCategory.slice(0, state.showedCount)
      : inCategory;
    const hasMore = isMobile && state.showedCount < inCategory.length;

    renderCards(visible, gallery);
    refreshButton.style.display = hasMore ? "block" : "none";
  }

  function selectCategory(button) {
    state.category = button.id;
    state.showedCount = CARDS_PER_PAGE;
    setActiveButton(buttons, button);
    updateCategoryHeading(heading, button);
    render();
  }

  const [firstButton] = buttons;
  selectCategory(firstButton);

  buttons.forEach((button) => {
    button.addEventListener("click", () => selectCategory(button));
  });

  refreshButton.addEventListener("click", () => {
    state.showedCount += CARDS_PER_PAGE;
    render();
  });

  mobileQuery.addEventListener("change", render);
}
