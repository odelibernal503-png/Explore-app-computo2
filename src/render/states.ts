export function renderLoading(): string {
  return `
    <section
      class="col-span-full rounded-xl border border-neutral-300
             bg-neutral-0 px-6 py-12 text-center animate-pulse"
      role="status"
      aria-live="polite"
    >
      <div class="flex flex-col items-center justify-center space-y-4">
        <div class="h-8 w-48 rounded bg-neutral-200"></div>
        <div class="h-4 w-64 rounded bg-neutral-200"></div>
      </div>
    </section>
  `;
}

export function renderEmpty(query: string): string {
  const searchDescription: string =
    query.trim().length > 0
      ? `No encontramos resultados para “${query}”.`
      : "No encontramos países para el filtro seleccionado.";

  return `
    <section
      class="col-span-full rounded-xl border border-neutral-300
             bg-neutral-0 px-6 py-12 text-center"
      role="status"
      aria-live="polite"
    >
      <h2 class="text-xl font-bold text-neutral-900">
        No hay resultados
      </h2>
      <p class="mt-2 text-neutral-600">${searchDescription}</p>
      <p class="mt-1 text-sm text-neutral-600">
        Revisa el nombre o prueba con otra región.
      </p>
    </section>
  `;
}

export function renderError(message: string): string {
  return `
    <section
      class="col-span-full rounded-xl border border-red-300
             bg-red-50 px-6 py-12 text-center"
      role="alert"
    >
      <h2 class="text-xl font-bold text-red-700">
        No pudimos cargar los países
      </h2>
      <p class="mt-2 text-red-600">${message}</p>
      <button
        id="retry-button"
        type="button"
        class="mt-6 rounded-lg bg-blue-500 px-5 py-3
               font-semibold text-white transition hover:bg-blue-600
               focus:outline-none focus:ring-2 focus:ring-blue-500
               focus:ring-offset-2"
      >
        Reintentar
      </button>
    </section>
  `;
}