
//Menu VARS
const toggleMenuBtn = document.getElementById('toggleMenuBtn');
const fullScreenMenu = document.getElementById('fullScreenMenu');

//Menu Functions
// Función para obtener la posición del botón
function getMenuOrigin() {
    const rect = toggleMenuBtn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    return { x, y };
}

// Función para actualizar las variables CSS con la posición del botón
function updateMenuOrigin() {
    const { x, y } = getMenuOrigin();
    fullScreenMenu.style.setProperty('--menu-origin-x', `${x}px`);
    fullScreenMenu.style.setProperty('--menu-origin-y', `${y}px`);
}

// Función para abrir o cerrar el menú
function toggleMenu() {
    // Si el menú ya está abierto, cerrarlo
    if (fullScreenMenu.classList.contains('open')) {
        updateMenuOrigin();  // Actualiza la posición para el cierre
        fullScreenMenu.classList.add('closing');
        fullScreenMenu.classList.remove('open');
    } else {
        updateMenuOrigin();  // Actualiza la posición para la apertura
        fullScreenMenu.classList.add('open');
        fullScreenMenu.classList.remove('closing');
    }
    toggleMenuBtn.classList.toggle('open');
    toggleMenuBtn.classList.toggle('close');
}

// Evento para el botón toggle
toggleMenuBtn.addEventListener('click', toggleMenu);

// Cerrar el menú si se hace clic fuera de él
window.addEventListener('click', (e) => {
    if (e.target === fullScreenMenu) {
        toggleMenu();  // Llama a la función para cerrar el menú
    }
});



//Language Variables
const flagsElements = document.querySelectorAll(".flags-sm");

//Cambia el idioma y dispara el evento
const changeLanguage = async (language) => {
    try {
        const response = await fetch(`/lang/${language}.json`);
        if (!response.ok) throw new Error(`Error loading language: ${language}`);

        window.currentLang = await response.json();
        localStorage.setItem("preferredLanguage", language);

        //Emitir evento global para actualizar los componentes
        const langEvent = new CustomEvent('languageChanged', {
            detail: { language }
        });

        document.dispatchEvent(langEvent);
        console.log("Idioma cargado y evento enviado:", language);

    } catch (error) {
        console.error("Error al cargar el idioma:", error);
    }
};

//Función para actualizar la navegación
function AddText() {
    const navContainer = document.getElementById("nav-container-sm");
    if (navContainer && window.currentLang.header) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('nav-container-dynamic');

        Object.keys(currentLang.header).forEach(key => {
            const navAddress = document.createElement('a');
            navAddress.classList.add('nav-address-sm', 'comfortaa-regular', 'nav-address');
            navAddress.textContent = currentLang.header[key];
            navAddress.href = `/${key}`;
            newDiv.appendChild(navAddress);
        });

        navContainer.innerHTML = '';
        navContainer.appendChild(newDiv);
    }
}

//Cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    // Cargar el idioma guardado o "es" por defecto
    const savedLanguage = localStorage.getItem("preferredLanguage") || "es";
    changeLanguage(savedLanguage);

    // Escuchar clicks en banderas
    flagsElements.forEach(flagsContainer => {
        flagsContainer.addEventListener("click", (e) => {
            const clickedElement = e.target.closest(".flags__item-sm");
            if (clickedElement) {
                const language = clickedElement.dataset.language || "es";
                changeLanguage(language);
            }
        });
    });
});

// Actualizar componentes cuando se cambie el idioma
document.addEventListener('languageChanged', (event) => {
    console.log("Idioma actualizado a:", event.detail.language);
    AddText();
});
