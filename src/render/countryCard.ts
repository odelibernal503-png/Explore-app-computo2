import type { Country } from "../types/country";
import { formatPopulation, getCapital, getCommonName, getFlagDescription } from "../utils/format";

export function renderCountryCard(country: Country): string {
  const commonName: string = getCommonName(country);
  const capital: string = getCapital(country);
  const flagDescription: string = getFlagDescription(country, commonName);
  const flagSvg: string = country.flag?.url_svg ?? "";
  const populationText: string = formatPopulation(country.population);

  return `
  <article
    class="group flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300"
  >
    <img
      class="aspect-3/2 w-full shrink-0 object-cover"
      src="${flagSvg}"
      alt="${flagDescription}"
      loading="lazy"
    >

    <div class="flex flex-1 flex-col p-5 bg-white">
      <h2 class="text-xl font-bold text-gray-900">
        ${commonName}
      </h2>

      <dl class="mt-4 space-y-3 text-base text-gray-700">
        <div class="grid grid-cols-[84px_1fr] gap-3">
          <dt class="font-semibold text-gray-900">
            Población:
          </dt>
          <dd>
            ${populationText}
          </dd>
        </div>

        <div class="grid grid-cols-[84px_1fr] gap-3">
          <dt class="font-semibold text-gray-900">
            Región:
          </dt>
          <dd>
            ${country.region ?? "No especificada"}
          </dd>
        </div>

        <div class="grid grid-cols-[84px_1fr] gap-3">
          <dt class="font-semibold text-gray-900">
            Capital:
          </dt>
          <dd>
            ${capital}
          </dd>
        </div>
      </dl>

      <div class="mt-6">
        <button
          type="button"
          class="inline-block rounded-full bg-orange-500 px-7 py-2 text-white font-medium hover:bg-orange-600 transition-colors shadow-sm cursor-pointer"
          aria-label="Ver más información de ${commonName}"
        >
          Ver más
        </button>
      </div>
    </div>
  </article>
  `;
}