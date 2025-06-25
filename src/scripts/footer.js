// src/scripts/footer.js
import { updateFooterText } from "./textManager.js";

export function initFooter() {
	updateFooterText();

	document.addEventListener("languageChanged", () => {
		updateFooterText();
	});
}
