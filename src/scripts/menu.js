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
		if (fullScreenMenu.classList.contains('open')) {
			updateMenuOrigin();
			fullScreenMenu.classList.add('closing');
			fullScreenMenu.classList.remove('open');
		} else {
			updateMenuOrigin();
			fullScreenMenu.classList.add('open');
			fullScreenMenu.classList.remove('closing');
		}
		toggleMenuBtn.classList.toggle('open');
		toggleMenuBtn.classList.toggle('close');
	}

	toggleMenuBtn.addEventListener('click', toggleMenu);

	window.addEventListener('click', (e) => {
		if (e.target === fullScreenMenu) {
			toggleMenu();
		}
	});
}
