// src/scripts/fullMenu.js

import { updateMainMenu } from "/src/scripts/textManager.js";

let currentContentKey = "header";
let currentContainerId = "nav-container-sm";

export function initFullMenu() {
	renderCurrentMenu();

	// Cambiar idioma → mantener la sección actual
	document.addEventListener("languageChanged", () => {
		renderCurrentMenu();
	});
}

function renderCurrentMenu() {
	const content = window.currentLang?.[currentContentKey];
	if (content) {
		updateMainMenu(content, currentContainerId);
	}
}
