# Explorer App (Vanilla TypeScript)

Aplicación web desarrollada con **Vanilla TypeScript**, **Vite** y **Tailwind CSS v4** para explorar información detallada de países, cumpliendo con los estándares de tipado estricto, separación de responsabilidades por módulos y manejo de estados de interfaz.

---

## 🛠️ Tecnologías Utilizadas
- **TypeScript**: Tipado estricto (sin uso de `any`), garantizando interfaces sólidas para los datos de los países.
- **Vite**: Entorno de desarrollo rápido y empaquetado del proyecto.
- **Tailwind CSS v4**: Estilos modernos y diseño responsivo adaptado a diferentes dispositivos.
- **pnpm**: Gestor de paquetes eficiente para la instalación y ejecución local.

---

## 📂 Organización de Carpetas (Separación de Responsabilidades)
El proyecto está estructurado de manera modular para evitar concentrar toda la lógica en un solo archivo:
- `src/api/`: Módulo encargado de la obtención de datos y gestión de peticiones asíncronas (`fetch`).
- `src/types/`: Definición estricta de las interfaces de TypeScript (como `Country`) para tipar los datos recibidos.
- `src/utils/`: Funciones reutilizables de formateo, filtrado combinado y debounce (300 ms).
- `src/render/`: Generación dinámica de contenido visual y gestión de los estados de la interfaz (Carga/Skeleton, Vacío y Error).
- `src/main.ts`: Archivo coordinador principal que maneja la carga inicial, eventos de usuario y actualización de la vista.

---

## 📊 Fuente de Datos y Configuración
- **Fuente:** Se utilizó el archivo JSON local facilitado por la docente para asegurar la estabilidad del proyecto y evitar restricciones o límites en las peticiones de la API externa.
- **Implementación:** La aplicación conserva la estructura solicitada mediante peticiones asíncronas (`fetch`), tipado estricto con interfaces y un completo manejo de errores en caso de fallos.

---

## 🚀 Requisitos, Instalación y Ejecución

Sigue estos pasos en tu terminal para clonar, instalar y poner en marcha la aplicación localmente:

1. **Clona el repositorio:**
   ```bash
   git clone [https://github.com/odelibernal503-png/Explore-app-computo2.git](https://github.com/odelibernal503-png/Explore-app-computo2.git)
   cd Explore-app-computo2

  2. **use pnpm dev para ver el localhost:**
