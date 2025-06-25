import { initMenu } from "./menu.js";
import { initLanguage } from "./language.js";
import { initFullMenu } from "./fullMenu.js";
import { initFooter } from "./footer.js";

document.addEventListener("DOMContentLoaded", () => {
	initMenu();
	initLanguage();
	initFullMenu();
	initFooter();
});
