const CARD_TEMPLATE_ID = "menu-card-template";
const GALLERY_SELECTOR = ".menu__gallery";
const CATEGORY_HEADING_SELECTOR = ".menu__category";
const CATEGORY_BUTTON_SELECTOR = ".menu__controls--button";
const CATEGORY_BUTTON_TITLE_SELECTOR = ".menu__controls--title";
const ACTIVE_BUTTON_CLASS = "button-active";

function createCard(product, index) {
  const template = document.getElementById(CARD_TEMPLATE_ID);
  const card = template.content.cloneNode(true);

  card.querySelector(".menu__gallery--item").dataset.id = index;

  const image = card.querySelector("img");
  image.src = product.src;
  image.alt = product.name;

  card.querySelector(".menu__coffee--title").textContent = product.name;
  card.querySelector(".menu__coffee--description").textContent = product.description;
  card.querySelector(".menu__coffee--price").textContent = `$ ${product.price}`;

  return card;
}

function renderCategory(products, category, gallery) {
  gallery.innerHTML = "";
  const fragment = document.createDocumentFragment();

  products.forEach((product, index) => {
    if (product.category !== category) return;
    fragment.append(createCard(product, index));
  });

  gallery.append(fragment);
}

function setActiveButton(buttons, activeButton) {
  buttons.forEach((button) => button.classList.remove(ACTIVE_BUTTON_CLASS));
  activeButton.classList.add(ACTIVE_BUTTON_CLASS);
}

function updateCategoryHeading(heading, activeButton) {
  const title = activeButton.querySelector(CATEGORY_BUTTON_TITLE_SELECTOR).textContent;
  heading.textContent = `${title} menu`;
}

function selectCategory(products, button, context) {
  const { buttons, gallery, heading } = context;

  renderCategory(products, button.id, gallery);
  setActiveButton(buttons, button);
  updateCategoryHeading(heading, button);
}

export function initCatalog(products) {
  const gallery = document.querySelector(GALLERY_SELECTOR);
  const heading = document.querySelector(CATEGORY_HEADING_SELECTOR);
  const buttons = document.querySelectorAll(CATEGORY_BUTTON_SELECTOR);
  const context = { buttons, gallery, heading };

  const [firstButton] = buttons;
  selectCategory(products, firstButton, context);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      selectCategory(products, button, context);
    });
  });
}
