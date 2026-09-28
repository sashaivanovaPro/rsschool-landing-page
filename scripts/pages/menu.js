import { initTheme } from "../theme.js";
import { initBurger } from "../burger.js";
import { initCatalog } from "../catalog.js";
import { initModal } from "../modal.js";
import products from "../products.js";

initTheme();
initBurger();
initCatalog(products);
initModal(products);
