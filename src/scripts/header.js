import { updateHeaderAriaLabels } from "./textManager.js";

let lastScrollY = window.scrollY;
const header = document.getElementById("main-header");

function handleScroll() {
  if (!header) return;

  const currentScrollY = window.scrollY;
  const menuIsOpen = document.getElementById("fullScreenMenu")?.classList.contains("open");

  if (currentScrollY === 0) {
    header.classList.remove("hide-on-scroll");
    header.classList.add("show-on-scroll");
    return;
  }

  if (menuIsOpen) return;

  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    header.classList.remove("show-on-scroll");
    header.classList.add("hide-on-scroll");
  } else if (currentScrollY < lastScrollY) {
    header.classList.remove("hide-on-scroll");
    header.classList.add("show-on-scroll");
  }

  lastScrollY = currentScrollY;
}

window.addEventListener("scroll", handleScroll);

// ----------- Accesibilidad (aria-label dinámico) -----------

function setupHeaderAccessibility() {
  updateHeaderAriaLabels();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupHeaderAccessibility);
} else {
  setupHeaderAccessibility();
}

document.addEventListener("languageChanged", setupHeaderAccessibility);
