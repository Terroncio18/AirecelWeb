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

	if (isOpen) {
		fullScreenMenu.classList.add('closing');
		fullScreenMenu.classList.remove('open');
		toggleMenuBtn.classList.remove('open');
		toggleMenuBtn.classList.add('close');

		// Restaurar clase del header si estabas en events
		if (header && window.location.pathname === "/events") {
			header.classList.add("events-page");
		}
	} else {
		fullScreenMenu.classList.add('open');
		fullScreenMenu.classList.remove('closing');
		toggleMenuBtn.classList.add('open');
		toggleMenuBtn.classList.remove('close');

		// Eliminar clase del header para hacer fondo transparente
		header?.classList.remove("events-page");
	}
}



	toggleMenuBtn.addEventListener('click', toggleMenu);

	window.addEventListener('click', (e) => {
		if (e.target === fullScreenMenu) {
			toggleMenu();
		}
	});
}
