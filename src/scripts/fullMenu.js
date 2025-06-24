// src/scripts/fullMenu.js

import { updateMainMenu } from "./textManager.js";

let currentContentKey = "header";
let currentContainerId = "nav-container-sm";

export function initFullMenu() {
	renderCurrentMenu();

	// Cambiar idioma → mantener la sección actual
	document.addEventListener("languageChanged", () => {
		renderCurrentMenu();
	});

	// Clic en un enlace de menú
	document.addEventListener("click", (e) => {
		const target = e.target.closest("a");
		if (!target || !document.getElementById(currentContainerId)?.contains(target)) return;

		const clickedText = target.textContent.toLowerCase();
		const menuTitle = window.currentLang?.header?.menu?.title?.toLowerCase();

		if (clickedText === menuTitle) {
			e.preventDefault();
			currentContentKey = "submenu";
			renderCurrentMenu();
		}
	});

	// Evento personalizado para volver atrás
	document.addEventListener("backToMainMenu", () => {
		currentContentKey = "header";
		renderCurrentMenu();
	});
}

function renderCurrentMenu() {
	let content;
	let showBack = false;

	if (currentContentKey === "submenu") {
		content = window.currentLang?.header?.menu?.submenu;
		showBack = true;
	} else {
		content = window.currentLang?.[currentContentKey];
	}

	if (content) {
		updateMainMenu(content, currentContainerId, showBack);
	}
}
