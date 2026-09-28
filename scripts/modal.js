const GALLERY_SELECTOR = ".menu__gallery";
const DIALOG_SELECTOR = ".product-modal";
const CLOSE_BUTTON_SELECTOR = ".product-modal__close";
const OPTION_TEMPLATE_ID = "product-modal-option-template";
const ACTIVE_OPTION_CLASS = "button-active";
const SCROLL_LOCK_CLASS = "scroll-locked";
const DEFAULT_SIZE = "s";

// Состояние модалки — приватно для этого модуля, наружу не отдаётся.
const state = {
  product: null,
  size: DEFAULT_SIZE,
  additives: new Set(),
};

function formatPrice(value) {
  return `$ ${value.toFixed(2)}`;
}

function calculateTotal(product) {
  const sizePrice = Number(product.sizes[state.size]["add-price"]);
  const additivesPrice = product.additives.reduce((sum, additive, index) => {
    if (!state.additives.has(index)) return sum;
    return sum + Number(additive["add-price"]);
  }, 0);

  return Number(product.price) + sizePrice + additivesPrice;
}

function createOption({ key, badge, label, isActive }) {
  const template = document.getElementById(OPTION_TEMPLATE_ID);
  const option = template.content.cloneNode(true);
  const button = option.querySelector(".product-modal__option");

  button.dataset.key = key;
  button.classList.toggle(ACTIVE_OPTION_CLASS, isActive);
  button.querySelector(".product-modal__option-badge").textContent = badge;
  button.querySelector(".product-modal__option-label").textContent = label;

  return option;
}

function renderSizes(container, product) {
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  Object.entries(product.sizes).forEach(([key, value]) => {
    fragment.append(
      createOption({
        key,
        badge: key.toUpperCase(),
        label: value.size,
        isActive: key === state.size,
      }),
    );
  });

  container.append(fragment);
}

function renderAdditives(container, product) {
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  product.additives.forEach((additive, index) => {
    fragment.append(
      createOption({
        key: index,
        badge: index + 1,
        label: additive.name,
        isActive: state.additives.has(index),
      }),
    );
  });

  container.append(fragment);
}

export function initModal(products) {
  const gallery = document.querySelector(GALLERY_SELECTOR);
  const dialog = document.querySelector(DIALOG_SELECTOR);
  const closeButton = document.querySelector(CLOSE_BUTTON_SELECTOR);
  const sizesContainer = dialog.querySelector('[data-role="sizes"]');
  const additivesContainer = dialog.querySelector('[data-role="additives"]');
  const totalValue = dialog.querySelector(".product-modal__total-value");

  function render() {
    const { product } = state;

    dialog.querySelector(".product-modal__image").src = product.src;
    dialog.querySelector(".product-modal__image").alt = product.name;
    dialog.querySelector(".product-modal__title").textContent = product.name;
    dialog.querySelector(".product-modal__description").textContent = product.description;

    renderSizes(sizesContainer, product);
    renderAdditives(additivesContainer, product);

    totalValue.textContent = formatPrice(calculateTotal(product));
  }

  function openModal(product) {
    state.product = product;
    state.size = DEFAULT_SIZE;
    state.additives = new Set();

    render();

    document.body.classList.add(SCROLL_LOCK_CLASS);
    dialog.showModal();
  }

  function closeModal() {
    dialog.close();
  }

  gallery.addEventListener("click", (event) => {
    const card = event.target.closest("[data-id]");
    if (!card) return;
    openModal(products[Number(card.dataset.id)]);
  });

  sizesContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".product-modal__option");
    if (!button) return;
    state.size = button.dataset.key;
    render();
  });

  additivesContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".product-modal__option");
    if (!button) return;
    const index = Number(button.dataset.key);
    if (state.additives.has(index)) {
      state.additives.delete(index);
    } else {
      state.additives.add(index);
    }
    render();
  });

  closeButton.addEventListener("click", closeModal);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeModal();
  });

  dialog.addEventListener("close", () => {
    document.body.classList.remove(SCROLL_LOCK_CLASS);
  });
}
