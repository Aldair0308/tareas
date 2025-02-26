import React from "react";
import { useModal } from "./../../components/Modal/UseModal.tsx";
import { ModalAnimation } from "./../../components/Modal/ModalAnimation.tsx";
import { FormCreateTask } from "./FormCreateTask.tsx";

export function TareasFormModal() {
  const { isModalOpen, closeModal } = useModal(); // Hook actualizado
  const modalId = "tareasFormModal"; // Identificador único para este modal

  return (
    <ModalAnimation
      isOpen={isModalOpen(modalId)} // Verifica si este modal está abierto
      closeModal={() => closeModal(modalId)} // Cierra este modal específico
      sheetHeight="95%" // Altura del modal
      animationDuration={600} // Duración de la animación
    >
      <div
        style={{
          padding: "1rem",
          height: "100%", // Asegura que ocupe toda la altura del modal
          overflowY: "auto", // Habilita el scroll vertical
          overflowX: "hidden", // Evita el scroll horizontal
          maxHeight: "calc(95vh - 2rem)", // Altura máxima considerando el padding
          marginBottom: "2rem", // Agrega espacio inferior
        }}
      >
        <FormCreateTask closeModal={() => closeModal(modalId)} />
      </div>
    </ModalAnimation>
  );
}
