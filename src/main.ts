import "./style.css";
import type { Country } from "./types/country";
import { fetchCountries } from "./api/countries";
import { renderCountryGrid } from "./render/countryGrid";
import { filterCountries } from "./utils/filter";

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

// 5. REFERENCIAS DE LA SECCIÓN DE PAÍSES
// ========================================================

const countriesContainer: HTMLElement | null =
  document.querySelector<HTMLElement>("#countries-container");

const countrySearch: HTMLInputElement | null =
  document.querySelector<HTMLInputElement>("#country-search");

const regionFilter: HTMLSelectElement | null =
  document.querySelector<HTMLSelectElement>("#region-filter");

// Arreglo global para almacenar los países obtenidos de la API
let allCountries: Country[] = [];

// Variable para controlar el tiempo del debounce
let debounceTimer: number;

// Función para aplicar simultáneamente los filtros de búsqueda y región
function applyFilter(): void {
  if (!countrySearch || !regionFilter || !countriesContainer) {
    return;
  }

  const query: string = countrySearch.value;
  const region: string = regionFilter.value;

  const filteredCountries: Country[] = filterCountries(
    allCountries,
    query,
    region,
  );

  countriesContainer.innerHTML = renderCountryGrid(filteredCountries);
}

// Asignación de eventos con Debounce de 300ms en la caja de búsqueda
countrySearch?.addEventListener("input", (): void => {
  clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(() => {
    applyFilter();
  }, 300);
});

regionFilter?.addEventListener("change", applyFilter);

// Función principal para cargar los países desde la API
async function loadCountries(): Promise<void> {
  if (!countriesContainer) {
    console.error("No se encontró #countries-container.");
    return;
  }

  try {
    allCountries = await fetchCountries();
    applyFilter();
  } catch (error: unknown) {
    const message: string =
      error instanceof Error
        ? error.message
        : "Ocurrió un error desconocido.";

    countriesContainer.innerHTML = `
      <p class="col-span-full text-center text-red-600" role="alert">
        ${message}
      </p>
    `;
    console.error(error);
  }
}

void loadCountries();