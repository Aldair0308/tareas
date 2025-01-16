import React, { useEffect, useState } from "react";
import { ModalAnimation } from "./../../components/Modal/ModalAnimation.tsx";
import { useModal } from "./../../components/Modal/UseModal.tsx";

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

  const emojiList = [
    "✨",
    "🌟",
    "🔥",
    "💪",
    "🎉",
    "🎶",
    "🚀",
    "☀️",
    "🍕",
    "🎨",
    "📚",
    "🧘‍♂️",
    "🏃‍♂️",
    "⚽",
    "🎵",
    "📅",
    "🛠️",
    "🏋️‍♂️",
    "🥗",
    "☕",
    "🚴‍♂️",
    "💼",
    "🎮",
    "📷",
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
      <div style={{ padding: "1rem", backgroundColor: "#f9f9f9" }}>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Editar Tarea
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              fontSize: "40px",
              border: "2px solid #ccc",
              borderRadius: "8px",
              padding: "0.5rem",
              display: "inline-block",
              cursor: "pointer",
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
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
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
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div>
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title || ""}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div>
            <label htmlFor="description">Descripción:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                minHeight: "100px",
              }}
            />
          </div>
          <div>
            <label>Días:</label>
            <div>
              {daysOfWeek.map((day) => (
                <label key={day} style={{ marginRight: "1rem" }}>
                  <input
                    type="checkbox"
                    value={day}
                    checked={formData.days?.includes(day)}
                    onChange={() => handleArrayChange("days", day)}
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label>Estado:</label>
            <select
              name="status"
              value={formData.status || "pending"}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <option value="pending">Pendiente</option>
              <option value="in-progress">En Progreso</option>
              <option value="completed">Completada</option>
              <option value="archived">Archivada</option>
            </select>
          </div>
          <div>
            <label>Fechas:</label>
            <input
              type="date"
              onChange={handleDateChange}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <div>
              {formData.dueDates?.map((date, index) => (
                <span key={index} style={{ display: "block" }}>
                  {new Date(date).toLocaleDateString()}
                </span>
              ))}
            </div>
          </div>
          <button
            type="submit"
            style={{
              padding: "0.75rem",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </ModalAnimation>
  );
}
