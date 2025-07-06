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

	// Limpiar clases actuales
	header.classList.remove("dark-header", "transparent-header");

	if (isOpen) {
		fullScreenMenu.classList.add('closing');
		fullScreenMenu.classList.remove('open');

		toggleMenuBtn.classList.remove('close');
		toggleMenuBtn.classList.add('open');

		// Si estamos en home, el fondo sigue siendo transparente
		// Si estamos en otra ruta, volvemos a fondo oscuro
		if (path === "/") {
			header.classList.add("transparent-header");
		} else {
			header.classList.add("dark-header");
		}
	} else {
	
		fullScreenMenu.classList.add('open');
		fullScreenMenu.classList.remove('closing');

		toggleMenuBtn.classList.remove('open');
		toggleMenuBtn.classList.add('close');

		header.classList.add("transparent-header");
	}
}






	toggleMenuBtn.addEventListener('click', toggleMenu);

	window.addEventListener('click', (e) => {
		if (e.target === fullScreenMenu) {
			toggleMenu();
		}
	});
}
