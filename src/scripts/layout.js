import { initMenu } from "/src/scripts/menu.js";
import { initLanguage } from "/src/scripts/language.js";
import { initFullMenu } from "/src/scripts/fullMenu.js";
import { initFooter } from "/src/scripts/footer.js";

document.addEventListener("DOMContentLoaded", () => {
	initMenu();
	initLanguage();
	initFullMenu();
	initFooter();
});
