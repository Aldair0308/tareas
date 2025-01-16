/**
 * Obtiene datos desde la URL especificada y los muestra dentro de un contenedor dinámico.
 * Si un contenedor con el mismo ID ya existe, se elimina antes de crear uno nuevo.
 *
 * @param {string} url - El endpoint o recurso a consultar.
 * @param {string} containerId - El identificador único del contenedor donde se renderizará la data.
 * @returns {void}
 */
import { getMaster } from "./GetMaster.tsx";

export function renderMaster(url: string, containerId: string): void {
  getMaster(url)
    .then((data) => {
      // 1. Si ya existe un contenedor con ese ID, lo eliminamos
      const existingContainer = document.getElementById(containerId);
      if (existingContainer) {
        existingContainer.remove();
      }

      // 2. Creamos un nuevo <div> para nuestro contenido
      const container = document.createElement("div");
      container.id = containerId;

      // 3. Convertimos los datos en texto legible (JSON formateado)
      container.textContent = JSON.stringify(data, null, 2);

      // 4. Insertamos el contenedor en el DOM
      document.body.appendChild(container);
    })
    .catch((error) => {
      // Diagnosticar errores específicos
      const errorMessage =
        error.message === "Failed to fetch"
          ? "No se pudo conectar con el servidor. Verifica la URL o el CORS."
          : error.message;
      console.error(
        `Error al renderizar datos en #${containerId}:`,
        errorMessage
      );
    });
}
