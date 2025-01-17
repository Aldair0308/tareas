import React, { useState } from "react";
import { emojiList } from "../../services/icons.ts";

interface FormCreateTaskProps {
  closeModal: () => void;
}

export function FormCreateTask({ closeModal }: FormCreateTaskProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    days: [],
    dueDates: [],
    dueHours: [],
    icon: "✨", // Icono predeterminado como string
    photos: [],
    voiceNotes: [],
    tags: [],
    responsible: "67853e348f7b7215ff180f95",
    frequency: {
      type: "custom",
      days: [],
      times: [],
    },
  });

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (name: string, value: string) => {
    if (formData[name as keyof typeof formData].includes(value)) {
      setFormData({
        ...formData,
        [name]: formData[name as keyof typeof formData].filter(
          (item: string) => item !== value
        ),
      });
    } else {
      setFormData({
        ...formData,
        [name]: [...formData[name as keyof typeof formData], value],
      });
    }
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Crear una nueva fecha basada en la entrada del usuario sin modificar la zona horaria
    const selectedDate = new Date(value + "T00:00:00"); // Agregar hora fija para evitar ajustes de zona horaria

    setFormData({
      ...formData,
      dueDates: [...formData.dueDates, selectedDate.toISOString()],
    });
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      dueHours: [...formData.dueHours, value],
    });
  };

  const handleIconSelect = (icon: string) => {
    setFormData({ ...formData, icon });
    setIsIconPickerOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del formulario enviados:", formData);
    try {
      const response = await fetch(
        "https://api-tareas-production.up.railway.app/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Detalles del error en la respuesta:", errorDetails);
        throw new Error(`Error al crear la tarea: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Tarea creada exitosamente:", responseData);
      closeModal();
    } catch (error) {
      console.error("Error atrapado:", error);
      alert(
        "Ocurrió un error al crear la tarea. Revisa la consola para más detalles."
      );
    }
  };

  return (
    <div
      style={{
        padding: "10px 0px 120px 0px",
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
        🌟 Crea tu tarea perfecta 🌟
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
          {formData.icon}
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
        }}
      >
        <div>
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
            Nombre:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            style={{
              width: "80%",
              padding: "1rem",
              border: "2px solid #dee2e6",
              borderRadius: "12px",
              fontSize: "16px",
              backgroundColor: "#ffffff",
            }}
          />
        </div>

        <div>
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
            value={formData.description}
            onChange={handleInputChange}
            style={{
              width: "80%",
              padding: "1rem",
              border: "2px solid #dee2e6",
              borderRadius: "12px",
              fontSize: "16px",
              minHeight: "120px",
              backgroundColor: "#ffffff",
            }}
          />
        </div>

        <div>
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
              width: "80%",
              marginLeft: "1rem",
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
                  checked={formData.days.includes(day)}
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

        <div>
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
              width: "80%",
              padding: "1rem",
              border: "2px solid #dee2e6",
              borderRadius: "12px",
              fontSize: "16px",
              backgroundColor: "#ffffff",
            }}
          />
          <div style={{ marginTop: "0.5rem" }}>
            {formData.dueDates.map((date, index) => (
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

        <div>
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
            onChange={handleHourChange}
            style={{
              width: "80%",
              padding: "1rem",
              border: "2px solid #dee2e6",
              borderRadius: "12px",
              fontSize: "16px",
              backgroundColor: "#ffffff",
            }}
          />
          <div style={{ marginTop: "0.5rem" }}>
            {formData.dueHours.map((hour, index) => (
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

        <div style={{ display: "flex", gap: "1rem" }}>
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
            Crear Tarea
          </button>
          <button
            type="button"
            onClick={closeModal}
            style={{
              flex: 1,
              padding: "1rem",
              backgroundColor: "#6c757d",
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
  );
}
