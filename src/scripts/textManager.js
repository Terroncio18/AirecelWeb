///  src/scripts/textManager.js
//Helper
import { getCurrentLanguage } from "./language.js";
////////////////////////////////////////////////////
//             Funciones fullMenu.astro           //
////////////////////////////////////////////////////
export function updateMainMenu(content, containerId = "nav-container-sm") {
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
    if (key === 'booking') {
      link.href = "https://reservation.dish.co/widget/hydra-0011i000002k8B8AAI";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = `/${key}`;
    }

    navContainer.innerHTML = '';
    newDiv.appendChild(link);
  });

  navContainer.innerHTML = '';
  navContainer.appendChild(newDiv);
}


////////////////////////////////////////////////////
//             Funciones header.astro             //
////////////////////////////////////////////////////

export async function updateHeaderAriaLabels() {
  try {
    const lang = getCurrentLanguage();
    const res = await fetch(`/lang/${lang}/global.json`);
    const localized = await res.json();

    const logo = document.getElementById("logo-address");
    const menuBtn = document.getElementById("toggleMenuBtn");

    if (logo) {
      logo.setAttribute("aria-label", localized["header-seo"]?.logo?.label || "Inicio");
    }

    if (menuBtn) {
      menuBtn.setAttribute("aria-label", localized["header-seo"]?.menu?.label || "Abrir menú");
    }
  } catch (error) {
    console.error("Error al actualizar los aria-labels del header:", error);
  }
}

//////////////////////////////////////////////////////
//             Funciones events.astro             //
////////////////////////////////////////////////////


function isWithinNext30Days(dateStr) {
  const today = new Date();
  const target = new Date(dateStr);

  // Truncar horas
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diff = target - today;
  const diffInDays = diff / (1000 * 60 * 60 * 24);

  return diffInDays >= 0 && diffInDays <= 30;
}


export async function renderEvents(containerId = "events-list") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "Cargando eventos...";

  try {
    const lang = getCurrentLanguage();

    const res = await fetch("/lang/shared/events.json");
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

////////////////////////////////////////////////////
//             Funciones Menu.astro               //
////////////////////////////////////////////////////


export async function renderMenusTitles() {
  try {
    const lang = getCurrentLanguage();
    const res = await fetch(`/lang/${lang}/menus.json`);
    const localized = await res.json();

    // Título principal
    const mainTitle = document.getElementById("menus-title");
    if (mainTitle) mainTitle.textContent = localized.title;

    // Recorremos todas las claves excepto "title"
    Object.entries(localized).forEach(([key, value]) => {
      if (key === "title") return;

      const title = value?.title || "";
      const description = value?.description || "";
      const href = value?.href || "";

      const titleSpan = document.getElementById(`${key}-title`);
      const descSpan = document.getElementById(`${key}-description`);
      const anchor = document.getElementById(`${key}-address`);

      if (titleSpan) titleSpan.textContent = title;
      if (descSpan) descSpan.textContent = description;

      if (anchor) {
        // Accesibilidad
        anchor.setAttribute("aria-label", `${title}. ${description}`);

        // Evitar enlaces vacíos (Lighthouse error)
        if (href) {
          anchor.href = href;
        } else {
          anchor.removeAttribute("href");
        }
      }
    });
  } catch (error) {
    console.error("Error al actualizar títulos de los menús:", error);
  }
}


////////////////////////////////////////////////////
//           Funciones Facilities.astro           //
////////////////////////////////////////////////////


export async function renderFacilitiesContent() {
  try {
    const lang = getCurrentLanguage();
    const res = await fetch(`/lang/${lang}/facilities.json`);
    const localized = await res.json();

    const sections = [
      { key: "aforo", data: localized.aforo },
      { key: "comfort", data: localized.comfort },
      { key: "access", data: localized.access },
      { key: "views", data: localized.views },
      { key: "services", data: localized.services }
    ];

    sections.forEach(({ key, data }) => {
      const titleEl = document.getElementById(`tittle-${key}`);
      const descEl = document.getElementById(`description-${key}`);

      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.innerHTML = data.content;
    });
  } catch (error) {
    console.error("Error al cargar textos de facilities:", error);
  }
}



////////////////////////////////////////////////////
//            Funciones conctact.astro            //
////////////////////////////////////////////////////

export async function renderContactContent() {
  try {
    const lang = getCurrentLanguage();
    const res = await fetch(`/lang/${lang}/contact.json`);
    const localized = await res.json();


    // Textos estáticos
    document.getElementById("contact-title").textContent = localized.title;
    document.getElementById("contact-intro").textContent = localized.intro;
    document.getElementById("contact-address").textContent = localized.address;
    document.getElementById("contact-hours").textContent = localized.hours;

    // Formulario
    document.querySelector('label[for="form-name"]').textContent = localized.form.name;
    document.querySelector('label[for="form-email"]').textContent = localized.form.email;
    document.querySelector('label[for="form-message"]').textContent = localized.form.message;

    document.getElementById("form-name").placeholder = localized.form.placeholderName;
    document.getElementById("form-email").placeholder = localized.form.placeholderEmail;
    document.getElementById("form-message").placeholder = localized.form.placeholderMessage;
    document.getElementById("form-submit").textContent = localized.form.submit;

  } catch (error) {
    console.error("Error al cargar textos de contacto:", error);
  }
}

////////////////////////////////////////////////////
//             Funciones blogs.astro              //
////////////////////////////////////////////////////

export async function renderBlogEntries(containerId = "blogs-list") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "Cargando entradas...";

  try {
    const lang = getCurrentLanguage();
    const res = await fetch(`/lang/${lang}/blogs/global.json`);
    const localized = await res.json();

    const entries = localized.entries;

    container.innerHTML = "";

    Object.entries(entries).forEach(([key, blog]) => {
      const card = document.createElement("a");
      card.className = "blog-card";
      card.href = `/blogs/${key}`;
      card.target = "_blank";
      card.rel = "noopener noreferrer";

      const img = document.createElement("img");
      img.src = blog.image;
      img.alt = blog.title;

      const info = document.createElement("div");
      info.className = "blog-info";

      const title = document.createElement("h3");
      title.textContent = blog.title;

      const description = document.createElement("p");
      description.textContent = blog.description;

      const date = document.createElement("span");
      date.className = "blog-date";

      const formattedDate = new Intl.DateTimeFormat(lang, {
        dateStyle: "long" // puedes usar "medium" o "short" si prefieres
      }).format(new Date(blog.date));

      date.textContent = formattedDate;

      info.appendChild(title);
      info.appendChild(description);
      info.appendChild(date);
      card.appendChild(img);
      card.appendChild(info);

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error al cargar blogs:", error);
    container.innerHTML = "No se pudieron cargar las entradas.";
  }
}

export function renderBlogTitles() {
  const titleEl = document.getElementById("blogs-title");
  const subtitleEl = document.getElementById("blogs-subtitle");

  if (!window.currentLang?.blogs) return;

  titleEl.textContent = window.currentLang.blogs.title || "";
  subtitleEl.textContent = window.currentLang.blogs.subtitle || "";
}
