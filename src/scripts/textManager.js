// src/scripts/textManager.js

export function updateMainMenu() {
	const navContainer = document.getElementById("nav-container-sm");
	if (!navContainer || !window.currentLang?.header) return;

	const newDiv = document.createElement("div");
	newDiv.classList.add("nav-container-dynamic");

	Object.entries(window.currentLang.header).forEach(([key, value]) => {
		const isObject = typeof value === "object";
		const label = isObject ? value.title : value;

		const link = document.createElement("a");
		link.className = "nav-address-sm comfortaa-regular nav-address";
		link.textContent = label;

		if (isObject && value.submenu) {
			link.href = `#submenu-${key}`;
			link.dataset.hasSubmenu = "true";
			createSubmenuSection(key, value.submenu);
		} else {
			link.href = `/${key}`;
		}

		newDiv.appendChild(link);
	});

	navContainer.innerHTML = "";
	navContainer.appendChild(newDiv);
}

function createSubmenuSection(key, submenuData) {
	const existing = document.getElementById(`submenu-${key}`);
	if (existing) return;

	const section = document.createElement("section");
	section.id = `submenu-${key}`;
	section.className = "submenu hidden";

	// Botón para volver
	const backBtn = document.createElement("button");
	backBtn.className = "back-button";
	backBtn.textContent = "← Volver";
	backBtn.addEventListener("click", () => {
		section.classList.add("hidden");
		document.getElementById("main-nav").classList.remove("hidden");
	});

	const content = document.createElement("div");
	content.className = "submenu-content";

	Object.entries(submenuData).forEach(([subKey, label]) => {
		const subLink = document.createElement("a");
		subLink.className = "nav-subaddress-sm comfortaa-regular nav-subaddress";
		subLink.href = `/menu/${subKey}`;
		subLink.textContent = label;
		content.appendChild(subLink);
	});

	section.appendChild(backBtn);
	section.appendChild(content);

	// Inserta el submenu después del menú principal
	document.getElementById("fullScreenMenu").appendChild(section);
}
