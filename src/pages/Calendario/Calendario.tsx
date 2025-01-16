import React, { useState } from "react";
import Diario from "../../components/Diario/Diario.tsx";
import { useModal } from "../../components/Modal/UseModal.tsx";
import { TareasFormModal } from "../Tareas/TareasFormModal.tsx";
import "./Calendario.css";
import CalendarioComponet from "../../components/Calendar/Calendario.tsx";

export const Calendario = () => {
  const { openModal } = useModal(); // Hook personalizado para manejar el modal
  const [activeView, setActiveView] = useState<"calendario" | "diario">(
    "diario" // Cambiar el valor predeterminado a "diario"
  );

  return (
    <div className="calendario-container">
      <div className="header">
        <h1>Calendario</h1>
        <div className="view-toggle">
          <button
            className={`toggle-button ${
              activeView === "calendario" ? "active" : ""
            }`}
            onClick={() => setActiveView("calendario")}
          >
            Calendario
          </button>
          <button
            className={`toggle-button ${
              activeView === "diario" ? "active" : ""
            }`}
            onClick={() => setActiveView("diario")}
          >
            Diario
          </button>
        </div>
      </div>

      <div className="content">
        {activeView === "calendario" && (
          <div>
            <CalendarioComponet />
          </div>
        )}
        {activeView === "diario" && <Diario />}
      </div>

      <TareasFormModal />
    </div>
  );
};

export default Calendario;
