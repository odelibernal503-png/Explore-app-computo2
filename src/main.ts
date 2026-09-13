import './style.css'

//Control accesible del menú de navegación móvil

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