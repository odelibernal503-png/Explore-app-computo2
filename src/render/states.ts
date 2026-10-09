// 1. Estado de carga: Genera 8 tarjetas skeleton con animación
export function renderLoading(): string {
  return Array.from({ length: 8 })
    .map(
      () => `
      <article class="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md animate-pulse">
        <div class="aspect-3/2 w-full bg-gray-200"></div>
        <div class="flex flex-1 flex-col p-5 space-y-4">
          <div class="h-6 bg-gray-200 rounded w-3/4"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div class="h-9 bg-gray-200 rounded-full w-28 mt-2"></div>
        </div>
      </article>
    `
    )
    .join("");
}

// 2. Estado vacío: Mensaje cuando la búsqueda no arroja resultados
export function renderEmpty(query: string): string {
  return `
    <div class="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center">
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="text-xl font-bold text-gray-800 mb-2">País no encontrado</h3>
      <p class="text-gray-600 max-w-md">
        No pudimos encontrar ningún resultado para "<span class="font-semibold text-gray-900">${query}</span>". Intenta buscar con otro término o verifica la ortografía.
      </p>
    </div>
  `;
}

// 3. Estado de error: Mensaje con un botón "Reintentar"
export function renderError(message: string): string {
  return `
    <div class="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center">
      <div class="text-5xl mb-4 text-red-500">⚠️</div>
      <h3 class="text-xl font-bold text-gray-800 mb-2">Ocurrió un error</h3>
      <p class="text-gray-600 max-w-md mb-6">${message}</p>
      <button
        type="button"
        id="retry-button"
        class="rounded-full bg-orange-500 px-6 py-2.5 text-white font-medium hover:bg-orange-600 transition-colors shadow-sm cursor-pointer"
      >
        Reintentar
      </button>
    </div>
  `;
}