import React from "react";
import { ModalAnimation } from "./../../components/Modal/ModalAnimation.tsx";
import { useModal } from "../../components/Modal/UseModal.tsx";

export function TareasModal({ isOpen, task, openEditModal }) {
  const modalId = "tareasModal"; // Unique ID for this modal
  const { closeModal, openModal } = useModal();

  if (!task) {
    return null; // Si no hay tarea seleccionada, no renderiza nada
  }

  return (
    <ModalAnimation
      isOpen={isOpen}
      closeModal={() => closeModal(modalId)}
      sheetHeight="90%"
      animationDuration={600}
    >
      <div
        style={{
          padding: "1.5rem",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Detalles de la Tarea
        </h2>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Título:</strong> <p>{task.title || "Sin título"}</p>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Descripción:</strong>{" "}
          <p>{task.description || "Sin descripción"}</p>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Estado:</strong> <p>{task.status || "Sin estado"}</p>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Días:</strong>{" "}
          <p>{task.days?.join(", ") || "No asignados"}</p>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Fechas:</strong>
          {task.dueDates?.length > 0 ? (
            task.dueDates.map((date, idx) => (
              <p key={idx}>{new Date(date).toLocaleDateString()}</p>
            ))
          ) : (
            <p>No asignadas</p>
          )}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Horas:</strong>
          {task.dueHours?.length > 0 ? (
            task.dueHours.map((hour, idx) => <p key={idx}>{hour}</p>)
          ) : (
            <p>No asignadas</p>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              flex: "1",
              marginRight: "0.5rem",
            }}
            onClick={() => {
              closeModal(modalId);
              openModal("tareasUpdateModal");
            }}
          >
            Editar Tarea
          </button>
          <button
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              flex: "1",
              marginLeft: "0.5rem",
            }}
            onClick={() => closeModal(modalId)}
          >
            Cerrar
          </button>
        </div>
      </div>
    </ModalAnimation>
  );
}
