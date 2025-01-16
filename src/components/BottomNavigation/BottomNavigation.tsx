import React, { createContext, useContext, useState, ReactNode } from "react";
import { useModal } from "../Modal/UseModal.tsx";
import { Tareas } from "./../../pages/Tareas/Tareas.tsx";
import { Calendario } from "../../pages/Calendario/Calendario.tsx";
import Hoy from "../../pages/Hoy/Hoy.tsx";
// import { Calendario } from "../pages/Calendario/Calendario.tsx";
// import { Descubrir } from "../pages/Descubrir/Descubrir.tsx";
// import { Perfil } from "../pages/Perfil/Perfil.tsx";

// Definimos el tipo para el contexto de la página
interface PageContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

// Creamos el contexto con un valor inicial
const PageContext = createContext<PageContextType>({
  currentPage: "Hoy",
  setCurrentPage: () => {},
});

// Hook personalizado para acceder al contexto de la página
export const usePageContext = (): PageContextType => useContext(PageContext);

// Proveedor del contexto de la página
export const PageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState<string>("Hoy");

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
};

// Componente para renderizar la pantalla correspondiente
const ScreenRenderer: React.FC = () => {
  const { currentPage } = usePageContext();

  switch (currentPage) {
    case "Hoy":
      return <Hoy />;
    case "Calendario":
      return <Calendario />;
    case "Descubrir":
      return <Tareas />;
    // case "Perfil":
    //   return <Perfil />;
    // default:
    //   return <Tareas />;
  }
};

// Componente de navegación inferior
const BottomNavigation: React.FC = () => {
  const { openModal } = useModal();
  const { currentPage, setCurrentPage } = usePageContext();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 0",
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        maxHeight: 55,
      }}
    >
      {/* Botón: Hoy */}
      <div
        onClick={() => setCurrentPage("Hoy")}
        style={{
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            color: currentPage === "Hoy" ? "#2f3ebf" : "#000000",
          }}
        >
          ⏱️
        </div>
        <span
          style={{
            fontSize: "12px",
            color: currentPage === "Hoy" ? "#2f3ebf" : "#a0a0a0",
            fontWeight: currentPage === "Hoy" ? "bold" : "normal",
          }}
        >
          Hoy
        </span>
      </div>

      {/* Botón: Calendario */}
      <div
        onClick={() => setCurrentPage("Calendario")}
        style={{
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            color: currentPage === "Calendario" ? "#2f3ebf" : "#000000",
          }}
        >
          📅
        </div>
        <span
          style={{
            fontSize: "12px",
            color: currentPage === "Calendario" ? "#2f3ebf" : "#a0a0a0",
            fontWeight: currentPage === "Calendario" ? "bold" : "normal",
          }}
        >
          Calendario
        </span>
      </div>

      {/* Botón: Agregar */}
      <div
        onClick={() => openModal("tareasFormModal")}
        style={{
          borderRadius: "50%",
          textAlign: "center",
          cursor: "pointer",
          marginBottom: 50,
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2f3ebf",
            color: "#ffffff",
            borderRadius: "50%",
            fontSize: "24px",
            padding: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          +
        </div>
        <span style={{ fontSize: "12px", color: "#a0a0a0" }}>Agregar</span>
      </div>

      {/* Botón: Descubrir */}
      <div
        onClick={() => setCurrentPage("Descubrir")}
        style={{
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            color: currentPage === "Descubrir" ? "#2f3ebf" : "#000000",
          }}
        >
          🖥️
        </div>
        <span
          style={{
            fontSize: "12px",
            color: currentPage === "Descubrir" ? "#2f3ebf" : "#a0a0a0",
            fontWeight: currentPage === "Descubrir" ? "bold" : "normal",
          }}
        >
          Administrar
        </span>
      </div>

      {/* Botón: Perfil */}
      <div
        onClick={() => setCurrentPage("Perfil")}
        style={{
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            color: currentPage === "Perfil" ? "#2f3ebf" : "#000000",
          }}
        >
          👤
        </div>
        <span
          style={{
            fontSize: "12px",
            color: currentPage === "Perfil" ? "#2f3ebf" : "#a0a0a0",
            fontWeight: currentPage === "Perfil" ? "bold" : "normal",
          }}
        >
          Perfil
        </span>
      </div>
    </div>
  );
};

// Exportamos el componente envuelto con el proveedor y renderizador
const BottomNavigationWithProviders: React.FC = () => (
  <PageProvider>
    <ScreenRenderer />
    <BottomNavigation />
  </PageProvider>
);

export default BottomNavigationWithProviders;
