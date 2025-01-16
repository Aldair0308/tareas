import React, { useState, useEffect } from "react";
import { renderMaster } from "./RenderMaster.tsx";

interface BtnMasterProps {
  label: string;
  url: string;
  containerId: string;
  intervalTime?: number; // valor por defecto 3000 ms
}

/**
 * Componente que renderiza un botón para iniciar/detener refresco periódico
 */
function BtnMaster({
  label,
  url,
  containerId,
  intervalTime = 3000,
}: BtnMasterProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Si está refrescando, llamamos a renderMaster de inmediato y programamos el setInterval
    if (isRefreshing) {
      // Llamada inicial
      renderMaster(url, containerId);

      // Intervalo periódico
      const intervalId = setInterval(() => {
        renderMaster(url, containerId);
      }, intervalTime);

      // Al desmontar o cuando isRefreshing cambie a false, limpiamos el intervalo
      return () => clearInterval(intervalId);
    }
    // Si isRefreshing es false, no hay interval activo
  }, [isRefreshing, url, containerId, intervalTime]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Cambiamos el estado para iniciar o detener el refresco
    setIsRefreshing((prev) => !prev);
  };

  return (
    <button
      id="btn-master"
      style={{
        backgroundColor: isRefreshing ? "tomato" : "lightgreen",
      }}
      onClick={handleClick}
    >
      {isRefreshing ? "Parar refresco" : label}
    </button>
  );
}

export default BtnMaster;
