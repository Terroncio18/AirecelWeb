///  src/scripts/textManager.js


//Funcion para Actualizar el menu de navegación

export function updateMainMenu(content, containerId = "nav-container-sm", showBack = false) {
    const navContainer = document.getElementById(containerId);
    if (!navContainer || !content) return;

    const newDiv = document.createElement("div");
    newDiv.classList.add("nav-container-dynamic");

    // Links del menú
    Object.entries(content).forEach(([key, value]) => {
        const label = typeof value === "string" ? value : value?.title || key;

        const link = document.createElement("a");
        link.className = "nav-address-sm comfortaa-regular nav-address";
        link.textContent = label;

        if (key !== "menu" && key !== "blog") {
            link.href = `/${key}`;
        }

        newDiv.appendChild(link);
    });

     // Botón volver (si aplica)
    if (showBack) {
        const backLink = document.createElement("a");
        backLink.textContent = "←";
        backLink.className = "back-button";
        backLink.href = "#";

        const handleBack = (e) => {
            e.preventDefault();
            document.dispatchEvent(new CustomEvent("backToMainMenu"));
        };

        backLink.addEventListener("click", handleBack);
        backLink.addEventListener("touchstart", handleBack, { passive: true });

        newDiv.appendChild(backLink);
    }
    
    navContainer.innerHTML = '';
    navContainer.appendChild(newDiv);
}
