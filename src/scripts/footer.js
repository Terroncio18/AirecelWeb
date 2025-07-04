// src/scripts/footer.js
import { updateFooterText } from "/src/scripts/textManager.js";

export function initFooter() {
	updateFooterText();

	document.addEventListener("languageChanged", () => {
		updateFooterText();
	});
}
