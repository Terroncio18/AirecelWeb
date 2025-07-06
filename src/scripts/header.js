let lastScrollY = window.scrollY;
const header = document.getElementById('main-header');

function handleScroll() {
  if (!header) return;

  const currentScrollY = window.scrollY;
  const menuIsOpen = document.getElementById('fullScreenMenu')?.classList.contains('open');

  // Siempre mostrar si estás en la parte superior
  if (currentScrollY === 0) {
    header.classList.remove('hide-on-scroll');
    header.classList.add('show-on-scroll');
    return;
  }

  // No ocultar si el menú está abierto
  if (menuIsOpen) return;

  // Scroll hacia abajo → ocultar header
  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    header.classList.remove('show-on-scroll');
    header.classList.add('hide-on-scroll');
  }
  // Scroll hacia arriba → mostrar header
  else if (currentScrollY < lastScrollY) {
    header.classList.remove('hide-on-scroll');
    header.classList.add('show-on-scroll');
  }

  lastScrollY = currentScrollY;
}

window.addEventListener('scroll', handleScroll);
