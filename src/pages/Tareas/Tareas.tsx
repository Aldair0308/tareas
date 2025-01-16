import React from "react";
import { TareasModal } from "./TareasModal.tsx";
import { TareasFormModal } from "./TareasFormModal.tsx";
import { UrlTareas } from "../../api/ApiTareas.ts";
import { RenderTareas } from "./RenderTareas.tsx";
import DateTimeDisplay from "../../components/DateDisplay/DateTimeDisplay.tsx";

export function Tareas() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Altura total de la ventana
      }}
    >
      {/* Contenedor fijo para la fecha y el título */}
      <div style={{ flex: "0 0 auto", padding: "16px" }}>
        <DateTimeDisplay />
      </div>

      {/* Contenedor con scroll para las tareas */}
      <div
        style={{
          flex: "1 1 auto",
          overflowY: "auto", // Habilita el scroll vertical
          padding: "16px",
          marginBottom: "90px",
        }}
      >
        <RenderTareas url={UrlTareas} />
      </div>

      {/* Renderizamos ambos modales */}
      <TareasModal />
      <TareasFormModal />
    </div>
  );
}
