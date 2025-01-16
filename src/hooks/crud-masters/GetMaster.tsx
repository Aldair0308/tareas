/**
 * Hace la petición fetch a la URL indicada y retorna la promesa.
 * @param {string} url - El endpoint o recurso a consultar.
 * @param {string} method - Método HTTP (por defecto, GET).
 * @returns {Promise<any>} - La promesa con los datos (o error).
 */
export function getMaster(url: string, method = "GET"): Promise<any> {
  return fetch(url, {
    mode: "no-cors",
    method: method,
    headers: {
      "Content-Type": "application/json",
      // Agrega un token si es necesario en tu backend
      Authorization: "Bearer <tu_token>",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      return console.log(data);
    })
    .catch((error) => {
      console.error("Error en getMaster:", error.message || error);
      throw error;
    });
}
