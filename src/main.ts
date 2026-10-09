import "./style.css";
import type { Country } from "./types/country";
import { fetchCountries } from "./api/countries";
import { renderCountryGrid } from "./render/countryGrid";

// Control accesible del menú de navegación móvil
const menuButton: HTMLButtonElement | null =
  document.querySelector<HTMLButtonElement>("#menu-toggle");

const mainMenu: HTMLElement | null =
  document.querySelector<HTMLElement>("#main-menu");

const openIcon: SVGElement | null =
  document.querySelector<SVGElement>("#menu-open-icon");

const closeIcon: SVGElement | null =
  document.querySelector<SVGElement>("#menu-close-icon");

function setMenuState(isOpen: boolean): void {
  if (!menuButton || !mainMenu || !openIcon || !closeIcon) {
    return;
  }

  mainMenu.classList.toggle("hidden", !isOpen);
  openIcon.classList.toggle("hidden", isOpen);
  closeIcon.classList.toggle("hidden", !isOpen);

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación",
  );
}

if (menuButton && mainMenu) {
  menuButton.addEventListener("click", (): void => {
    const isOpen: boolean =
      menuButton.getAttribute("aria-expanded") === "true";

    setMenuState(!isOpen);
  });

  mainMenu.querySelectorAll<HTMLAnchorElement>("a").forEach(
    (link: HTMLAnchorElement): void => {
      link.addEventListener("click", (): void => setMenuState(false));
    },
  );

  document.addEventListener("keydown", (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      setMenuState(false);
      menuButton.focus();
    }
  });

  const desktopBreakpoint: MediaQueryList =
    window.matchMedia("(min-width: 768px)");

  desktopBreakpoint.addEventListener("change", (): void => {
    setMenuState(false);
  });
}

function getRequiredElement<T extends Element>(
  selector: string
): T {
  const element: T | null =
    document.querySelector<T>(selector);

  if (!element) {
    throw new Error(
      `No se encontró el elemento: ${selector}`
    );
  }

  return element;
}

const countriesContainer: HTMLElement = 
  getRequiredElement<HTMLElement>("#countries-container");

async function initializeApp(): Promise<void> {
  try {
    const countries: Country[] = await fetchCountries();
    countriesContainer.innerHTML = renderCountryGrid(countries);
  } catch (error: unknown) {
    const message: string =
      error instanceof Error
        ? error.message
        : "Ocurrió un error desconocido.";

    countriesContainer.innerHTML = `
      <p
        class="col-span-full text-center text-red-600"
        role="alert"
      >
        ${message}
      </p>
    `;
    console.error(error);
  }
}

void initializeApp();