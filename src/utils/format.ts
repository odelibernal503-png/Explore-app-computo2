import type { Country } from "../types/country";

const populationFormatter: Intl.NumberFormat =
  new Intl.NumberFormat("es-SV");

export function formatPopulation(population: number): string {
  return populationFormatter.format(population ?? 0);
}

export function getCapital(country: Country): string {
  return country.capitals?.[0]?.name ?? "Sin capital registrada";
}

export function getCommonName(country: Country): string {
  return country.names?.common ?? "País sin nombre";
}

export function getFlagDescription(country: Country, commonName: string): string {
  return country.flag?.description || `Bandera de ${commonName}`;
}