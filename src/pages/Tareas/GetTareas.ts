import { UrlTareas } from "../../api/ApiTareas.ts";

export async function GetTareas() {
  try {
    const response = await fetch(UrlTareas, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Datos recibidos:", data);
    let dataFilted = data.filter((task) => task.status !== "archived");
    return dataFilted;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error; // Lanza el error para manejarlo donde se necesite
  }
}
