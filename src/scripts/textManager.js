///  src/scripts/textManager.js

////////////////////////////////////////////////////
//             Funciones fullMenu.astro           //
////////////////////////////////////////////////////
export function updateMainMenu(content, containerId = "nav-container-sm", showBack = false) {
    const navContainer = document.getElementById(containerId);
    if (!navContainer || !content) return;

    const newDiv = document.createElement("div");
    newDiv.classList.add("nav-container-dynamic");

    // Links del menú
    Object.entries(content).forEach(([key, value]) => {
        const label = typeof value === "string" ? value : value?.title || key;

        const link = document.createElement("a");
        link.className = "comfortaa-regular nav-address";
        link.textContent = label;

        const lang = localStorage.getItem("preferredLanguage") || "es";
        const submenuPDFs = {
            carta: `/pdfs/carta-${lang}.pdf`,
            special: "/pdfs/menu-especial.pdf",
            snack: "/pdfs/menu-snack.pdf",
            group: "/pdfs/menus-grupos.pdf",
            wines: "/pdfs/vinos.pdf",
            drinks: "/pdfs/bebidas.pdf"
        };

        if (key !== "menu") {
            if (submenuPDFs[key]) {
                link.href = submenuPDFs[key];
                link.target = "_blank"; // Abrir en nueva pestaña
                link.rel = "noopener noreferrer";
            } else if(key=="booking"){
                link.href= "https://reservation.dish.co/widget/hydra-0011i000002k8B8AAI";
                link.target = "_blank"; // Abrir en nueva pestaña
                link.rel = "noopener noreferrer";
            }else{
                link.href = `/${key}`;
            }
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


////////////////////////////////////////////////////
//             Funciones events.astro           //
////////////////////////////////////////////////////


function isWithinNext30Days(dateStr) {
    const today = new Date();
    const target = new Date(dateStr);
    const diff = target - today;
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    return diffInDays >= 0 && diffInDays <= 30;
}

export async function renderEvents(containerId = "events-list") {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "Cargando eventos...";

    try {
        const lang = localStorage.getItem("preferredLanguage") || "es";

        const res = await fetch("/lang/events.json");
        const events = await res.json();

        container.innerHTML = "";

        const allEvents = [
            ...events.oneTime
                .filter(e => isWithinNext30Days(e.date))
                .map(e => ({ ...e, recurring: false })),
            ...events.recurring.map(e => ({ ...e, recurring: true }))
        ];

        allEvents.sort((a, b) => {
            if (a.recurring && b.recurring) return 0;
            if (a.recurring) return 1;
            if (b.recurring) return -1;
            return new Date(a.date) - new Date(b.date);
        });

        allEvents.forEach(event => {
            const card = document.createElement("div");
            card.className = "event-card";

            const img = document.createElement("img");
            img.src = event.image;
            img.alt = event.name;

            const info = document.createElement("div");
            info.className = "event-info";

            const title = document.createElement("h3");
            title.textContent = event.name;

            const date = document.createElement("p");
            date.className = "event-date";

            if (event.recurring) {
                const days = event.days?.[lang] || event.days?.es || [];
                date.textContent = `${days.join(", ")} — ${event.time}`;
            } else {
                date.textContent = `${event.date} — ${event.time}`;
            }

            info.appendChild(title);
            info.appendChild(date);
            card.appendChild(img);
            card.appendChild(info);

            container.appendChild(card);
        });
    } catch (err) {
        console.error("Error al cargar eventos:", err);
        container.innerHTML = "No se pudieron cargar los eventos.";
    }
}

export function renderEventTitles() {
    const titleEl = document.getElementById("events-title");
    const subtitleEl = document.getElementById("events-subtitle");

    if (!window.currentLang?.eventsPage) return;

    const { title, subtitle } = window.currentLang.eventsPage;
    if (titleEl) titleEl.textContent = title;
    if (subtitleEl) subtitleEl.textContent = subtitle;
}


////////////////////////////////////////////////////
//             Funciones Footer                   //
////////////////////////////////////////////////////

export function updateFooterText() {
    const footerEl = document.getElementById("footer-copy");
    if (!footerEl || !window.currentLang?.footer?.copyright) return;

    const year = new Date().getFullYear();
    const template = window.currentLang.footer.copyright;
    footerEl.textContent = template.replace("{year}", year);
}





