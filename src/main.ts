import "./style.css";
import type { Country } from "./types/country";
import { fetchCountries } from "./api/countries";
import { renderCountryGrid } from "./render/countryGrid";
import { filterCountries } from "./utils/filter";
import { renderEmpty, renderError, renderLoading } from "./render/states";

// Control del menú móvil
const menuButton: HTMLButtonElement | null =
  document.querySelector<HTMLButtonElement>("#menu-toggle");
const mainMenu: HTMLElement | null =
  document.querySelector<HTMLElement>("#main-menu");
const openIcon: SVGElement | null =
  document.querySelector<SVGElement>("#menu-open-icon");
const closeIcon: SVGElement | null =
  document.querySelector<SVGElement>("#menu-close-icon");

function setMenuState(isOpen: boolean): void {
  if (!menuButton || !mainMenu || !openIcon || !closeIcon) return;
  mainMenu.classList.toggle("hidden", !isOpen);
  openIcon.classList.toggle("hidden", isOpen);
  closeIcon.classList.toggle("hidden", !isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
}

if (menuButton && mainMenu) {
  menuButton.addEventListener("click", (): void => {
    const isOpen: boolean = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });
}

const countriesContainer: HTMLElement | null =
  document.querySelector<HTMLElement>("#countries-container");
const countrySearch: HTMLInputElement | null =
  document.querySelector<HTMLInputElement>("#country-search");
const regionFilter: HTMLSelectElement | null =
  document.querySelector<HTMLSelectElement>("#region-filter");

let allCountries: Country[] = [];
let debounceTimer: number;
const INITIAL_VISIBLE_COUNTRIES = 8;

function applyFilter(): void {
  if (!countrySearch || !regionFilter || !countriesContainer) return;

  const query: string = countrySearch.value.trim();
  const region: string = regionFilter.value;

  const filteredCountries: Country[] = filterCountries(allCountries, query, region);

  if (filteredCountries.length === 0) {
    countriesContainer.innerHTML = renderEmpty(query);
    return;
  }

  countriesContainer.innerHTML = renderCountryGrid(filteredCountries);
}

countrySearch?.addEventListener("input", (): void => {
  clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(() => {
    applyFilter();
  }, 300);
});

regionFilter?.addEventListener("change", applyFilter);

async function loadCountries(): Promise<void> {
  if (!countriesContainer) {
    console.error("No se encontró #countries-container.");
    return;
  }

  // 1. Mostrar el estado de carga (Loading Skeleton)
  countriesContainer.innerHTML = renderLoading();

  try {
    allCountries = await fetchCountries();

    if (allCountries.length === 0) {
      countriesContainer.innerHTML = renderEmpty("");
      return;
    }

    const initialCountries: Country[] = allCountries.slice(0, INITIAL_VISIBLE_COUNTRIES);
    countriesContainer.innerHTML = renderCountryGrid(initialCountries);
  } catch (error: unknown) {
    const message: string =
      error instanceof Error ? error.message : "Ocurrió un error desconocido.";
    console.error("Error al cargar los países:", message);

    // 2. Mostrar el estado de error y conectar el botón Reintentar
    countriesContainer.innerHTML = renderError("Verifica tu conexión e inténtalo nuevamente.");

    const retryButton: HTMLButtonElement | null =
      document.querySelector<HTMLButtonElement>("#retry-button");

    retryButton?.addEventListener("click", (): void => {
      void loadCountries();
    });
  }
}

void loadCountries();