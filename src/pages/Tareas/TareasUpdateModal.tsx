import React, { useEffect, useState } from "react";
import { ModalAnimation } from "./../../components/Modal/ModalAnimation.tsx";
import { useModal } from "./../../components/Modal/UseModal.tsx";
import { emojiList } from "../../services/icons.ts";

export function TareasUpdateModal({ task }) {
  const { closeModal, isModalOpen } = useModal();
  const modalId = "tareasUpdateModal";
  const [formData, setFormData] = useState({ ...task });
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

  const daysOfWeek = [
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
  ];

  useEffect(() => {
    if (task) {
      setFormData({ ...task });
    }
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (name, value) => {
    if (formData[name]?.includes(value)) {
      setFormData({
        ...formData,
        [name]: formData[name].filter((item) => item !== value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: [...(formData[name] || []), value],
      });
    }
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      dueDates: [...formData.dueDates, new Date(value).toISOString()],
    });
  };

  const handleIconSelect = (icon) => {
    setFormData({ ...formData, icon });
    setIsIconPickerOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      days: formData.days || [],
      dueDates: formData.dueDates || [],
      dueHours: formData.dueHours || [],
      icon: formData.icon || "",
      photos: formData.photos || [],
      voiceNotes: formData.voiceNotes || [],
      tags: formData.tags || [],
      responsible: formData.responsible,
      frequency: {
        type: formData.frequency?.type || "custom",
        days: formData.frequency?.days || [],
        times: formData.frequency?.times || [],
      },
    };

    try {
      const response = await fetch(
        `https://api-tareas-production.up.railway.app/api/tasks/${task._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Detalles del error:", errorDetails);
        throw new Error(`Error actualizando la tarea: ${response.status}`);
      }

      const updatedTask = await response.json();
      console.log("Tarea actualizada exitosamente:", updatedTask);

      closeModal(modalId);
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      alert(
        "Ocurrió un error al actualizar la tarea. Revisa la consola para más detalles."
      );
    }
  };

  return (
    <ModalAnimation
      isOpen={isModalOpen(modalId)}
      closeModal={() => closeModal(modalId)}
      sheetHeight="93%"
      animationDuration={600}
    >
      <div
        style={{
          padding: "0px 0px 10px 0px",
          height: "90%", // Asegura que ocupe toda la altura del modal
          overflowY: "auto", // Habilita el scroll vertical
          overflowX: "hidden", // Evita el scroll horizontal
          maxHeight: "calc(95vh - 2rem)", // Altura máxima considerando el padding
          marginBottom: "2rem", // Agrega espacio inferior
        }}
      >
        <div
          style={{
            padding: "1rem 0 120px 0",
            fontFamily: "'Inter', sans-serif",
            backgroundColor: "#f8f9fa",
            borderRadius: "16px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            margin: "0",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
              fontSize: "24px",
              fontWeight: "600",
              color: "#343a40",
            }}
          >
            Editar Tarea
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                fontSize: "40px",
                border: "2px dashed #6c757d",
                borderRadius: "50%",
                padding: "0.5rem",
                display: "inline-block",
                cursor: "pointer",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => setIsIconPickerOpen(true)}
            >
              {formData.icon || "✨"}
            </div>
          </div>

          {isIconPickerOpen && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(40px, 1fr))",
                gap: "10px",
                maxHeight: "200px",
                overflowY: "scroll",
                padding: "1rem",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {emojiList.map((emoji) => (
                <div
                  key={emoji}
                  style={{
                    fontSize: "30px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleIconSelect(emoji)}
                >
                  {emoji}
                </div>
              ))}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              alignItems: "center",
            }}
          >
            <div style={{ width: "80%" }}>
              <label
                htmlFor="title"
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#495057",
                  marginBottom: "0.5rem",
                  display: "block",
                }}
              >
                Título:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ""}
                onChange={handleInputChange}
                style={{
                  width: "90%",
                  padding: "1rem",
                  border: "2px solid #dee2e6",
                  borderRadius: "12px",
                  fontSize: "16px",
                  backgroundColor: "#ffffff",
                }}
              />
            </div>

            <div style={{ width: "80%" }}>
              <label
                htmlFor="description"
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#495057",
                  marginBottom: "0.5rem",
                  display: "block",
                }}
              >
                Descripción:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                style={{
                  width: "90%",
                  padding: "1rem",
                  border: "2px solid #dee2e6",
                  borderRadius: "12px",
                  fontSize: "16px",
                  minHeight: "120px",
                  backgroundColor: "#ffffff",
                }}
              />
            </div>

            <div style={{ width: "80%" }}>
              <label
                htmlFor="status"
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#495057",
                  marginBottom: "0.5rem",
                  display: "block",
                }}
              >
                Estado:
              </label>
              <select
                name="status"
                value={formData.status || "pending"}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "1rem",
                  border: "2px solid #dee2e6",
                  borderRadius: "12px",
                  fontSize: "16px",
                  backgroundColor: "#ffffff",
                }}
              >
                <option value="pending">Pendiente</option>
                <option value="in-progress">En Progreso</option>
                <option value="completed">Completada</option>
                {/* <option value="archived">Archivada</option> */}
              </select>
            </div>

            <div style={{ width: "80%" }}>
              <label
                htmlFor="days"
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#495057",
                  marginBottom: "0.5rem",
                  display: "block",
                }}
              >
                Días:
              </label>
              <div
                style={{
                  border: "2px solid #dee2e6",
                  borderRadius: "12px",
                  padding: "1rem",
                  backgroundColor: "#ffffff",
                }}
              >
                {daysOfWeek.map((day) => (
                  <label
                    key={day}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      value={day}
                      checked={formData.days?.includes(day)}
                      onChange={() => handleArrayChange("days", day)}
                      style={{
                        width: "18px",
                        height: "18px",
                        border: "2px solid #6c757d",
                        cursor: "pointer",
                      }}
                    />
                    <span style={{ fontSize: "16px", color: "#495057" }}>
                      {day}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ width: "80%" }}>
              <label
                htmlFor="dueDates"
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#495057",
                  marginBottom: "0.5rem",
                  display: "block",
                }}
              >
                Fechas:
              </label>
              <input
                type="date"
                onChange={handleDateChange}
                style={{
                  width: "90%",
                  padding: "1rem",
                  border: "2px solid #dee2e6",
                  borderRadius: "12px",
                  fontSize: "16px",
                  backgroundColor: "#ffffff",
                }}
              />
              <div style={{ marginTop: "0.5rem" }}>
                {formData.dueDates?.map((date, index) => (
                  <span
                    key={index}
                    style={{
                      display: "block",
                      fontSize: "14px",
                      color: "#6c757d",
                    }}
                  >
                    {new Date(date).toLocaleDateString()}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ width: "80%" }}>
              <label
                htmlFor="dueHours"
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#495057",
                  marginBottom: "0.5rem",
                  display: "block",
                }}
              >
                Horas:
              </label>
              <input
                type="time"
                onChange={handleDateChange}
                style={{
                  width: "90%",
                  padding: "1rem",
                  border: "2px solid #dee2e6",
                  borderRadius: "12px",
                  fontSize: "16px",
                  backgroundColor: "#ffffff",
                }}
              />
              <div style={{ marginTop: "0.5rem" }}>
                {formData.dueHours?.map((hour, index) => (
                  <span
                    key={index}
                    style={{
                      display: "block",
                      fontSize: "14px",
                      color: "#6c757d",
                    }}
                  >
                    {hour}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", width: "80%" }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: "1rem",
                  backgroundColor: "#007bff",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "16px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => closeModal(modalId)}
                style={{
                  flex: 1,
                  padding: "1rem",
                  backgroundColor: "#dc3545",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "16px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalAnimation>
  );
}
