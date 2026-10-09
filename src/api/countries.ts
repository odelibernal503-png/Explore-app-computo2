import type { Country } from "../types/country";
import type { CountryDetail } from "../types/country-detail";

let countriesPromise: Promise<CountryDetail[]> | undefined;

function loadCountries(): Promise<CountryDetail[]> {
  if (!countriesPromise) {
    countriesPromise = (async (): Promise<CountryDetail[]> => {
      const response: Response = await fetch(
        `${import.meta.env.BASE_URL}data/countries.json`,
      );

      if (!response.ok) {
        throw new Error(`Error al cargar los datos de la demo: ${response.status}`);
      }

      const data: unknown = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("El archivo de países está vacío o tiene un formato incorrecto.");
      }

      return data as CountryDetail[];
    })().catch((error: unknown) => {
      countriesPromise = undefined;
      throw error;
    });
  }

  return countriesPromise;
}

export async function fetchCountries(): Promise<Country[]> {
  const countries = await loadCountries();
  return countries.map((item: any) => ({
    name: item.names?.common || item.name?.common || "Nombre no disponible",
    capital: item.capitals?.[0] || item.capital?.[0] || "No disponible",
    region: item.region || "No especificada",
    population: item.population || 0,
    flags: item.flags || { svg: item.flag?.url_svg || "", png: "" },
    cca2: item.codes?.alpha_2 || item.cca2 || "",
    ...item
  }));
}

export async function fetchCountryByCode(code: string): Promise<CountryDetail> {
  const countries: CountryDetail[] = await loadCountries();
  const normalizedCode: string = code.trim().toUpperCase();
  
  const country: any = countries.find(
    (item: any): boolean =>
      (item.codes?.alpha_2 && item.codes.alpha_2.toUpperCase() === normalizedCode) ||
      (item.cca2 && item.cca2.toUpperCase() === normalizedCode)
  );

  if (!country) {
    throw new Error(`No se encontró el país solicitado con el código "${code}".`);
  }

  return country;
}