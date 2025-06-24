// src/scripts/fullMenu.js
import { updateMainMenu } from "./textManager.js";

export function initFullMenu() {
	updateMainMenu(); // Primera carga

	// Escuchar cambios de idioma
	document.addEventListener("languageChanged", () => {
		updateMainMenu();
	});

	// Escuchar clicks en botones de submenú
	document.addEventListener("click", (e) => {
		const btn = e.target.closest("[data-submenu]");
		if (!btn) return;

		const submenuId = btn.dataset.submenu;
		const submenu = document.getElementById(submenuId);
		const mainNav = document.getElementById("main-nav");

		if (submenu && mainNav) {
			submenu.classList.add("active");
			mainNav.classList.add("hidden");
		}
	});

	// Escuchar clicks en botones de "volver"
	document.addEventListener("click", (e) => {
		if (e.target.classList.contains("back-button")) {
			const submenu = e.target.closest(".submenu");
			const mainNav = document.getElementById("main-nav");

			if (submenu && mainNav) {
				submenu.classList.remove("active");
				mainNav.classList.remove("hidden");
			}
		}
	});
}
