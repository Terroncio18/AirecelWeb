// src/scripts/language.js

export async function changeLanguage(language) {
	try {
		const response = await fetch(`/lang/${language}/global.json`);
		if (!response.ok) throw new Error(`Error loading language: ${language}`);

		const langData = await response.json();
		window.currentLang = langData;

		// Guardar tanto el idioma como el contenido
		localStorage.setItem("preferredLanguage", language);

		// Actualizar el atributo lang del <html>
		document.documentElement.lang = language;
		updateMetadata(langData);

		document.dispatchEvent(new CustomEvent("languageChanged", {
			detail: { language }
		}));
	} catch (error) {
		console.error("Error al cargar el idioma:", error);
	}
}

export function initLanguage() {
	const flagsElements = document.querySelectorAll(".lang_flags");
	const savedLanguage = getCurrentLanguage();

	changeLanguage(savedLanguage);

	flagsElements.forEach(flagsContainer => {
		flagsContainer.addEventListener("click", (e) => {
			const clicked = e.target.closest(".flags__item");
			if (clicked) {
				const language = clicked.dataset.language || "es";
				changeLanguage(language);
			}
		});
	});
}

function updateMetadata(languageData) {
	const path = window.location.pathname;
	let pageKey = "home";

	if (path.includes("/menus")) pageKey = "menus";
	else if (path.includes("/events")) pageKey = "events";
	else if (path.includes("/facilities")) pageKey = "facilities";
	else if (path.includes("/contact")) pageKey = "contact";
	else if (path.includes("/blogs")) pageKey = "blogs";

	const meta = languageData.meta?.[pageKey];
	if (!meta) return;

	// Cambiar el <title>
	document.title = meta.title;

	// Cambiar o crear el meta description
	let descTag = document.querySelector("meta[name='description']");
	if (!descTag) {
		descTag = document.createElement("meta");
		descTag.name = "description";
		document.head.appendChild(descTag);
	}
	descTag.content = meta.description;
}

export function getCurrentLanguage() {
	return localStorage.getItem("preferredLanguage") || "es";
}
