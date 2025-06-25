// src/scripts/menu.js

export function initMenu() {
	const toggleMenuBtn = document.getElementById('toggleMenuBtn');
	const fullScreenMenu = document.getElementById('fullScreenMenu');

	function getMenuOrigin() {
		const rect = toggleMenuBtn.getBoundingClientRect();
		const x = rect.left + rect.width / 2;
		const y = rect.top + rect.height / 2;
		return { x, y };
	}

	function updateMenuOrigin() {
		const { x, y } = getMenuOrigin();
		fullScreenMenu.style.setProperty('--menu-origin-x', `${x}px`);
		fullScreenMenu.style.setProperty('--menu-origin-y', `${y}px`);
	}

	function toggleMenu() {
		updateMenuOrigin();
		const isOpen = fullScreenMenu.classList.contains('open');
		const header = document.getElementById('main-header');
		const path = window.location.pathname;

		if (!header) return;

		// Eliminar clases existentes
		header.classList.remove("events-page", "facilities-page");

		if (isOpen) {
			fullScreenMenu.classList.add('closing');
			fullScreenMenu.classList.remove('open');
			toggleMenuBtn.classList.remove('open');
			toggleMenuBtn.classList.add('close');

			// Restaurar clase de fondo oscuro según la página actual
			if (path === "/events") {
				header.classList.add("events-page");
			} else if (path === "/facilities") {
				header.classList.add("facilities-page");
			}
		} else {
			fullScreenMenu.classList.add('open');
			fullScreenMenu.classList.remove('closing');
			toggleMenuBtn.classList.add('open');
			toggleMenuBtn.classList.remove('close');

			// Hacer transparente el fondo eliminando clases
			// (ya lo hicimos arriba)
		}
	}





	toggleMenuBtn.addEventListener('click', toggleMenu);

	window.addEventListener('click', (e) => {
		if (e.target === fullScreenMenu) {
			toggleMenu();
		}
	});
}
