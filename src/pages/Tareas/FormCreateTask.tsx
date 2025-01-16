import React, { useState } from "react";

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
    "🧺",
    "👕",
  ]; // Lista de emojis para seleccionar

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
    setFormData({
      ...formData,
      dueDates: [...formData.dueDates, new Date(value).toISOString()],
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
      const response = await fetch("http://192.168.100.169:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Detalles del error en la respuesta:", errorDetails);
        throw new Error(`Error al crear la tarea: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Tarea creada exitosamente:", responseData);
      alert("Tarea creada exitosamente");
      closeModal();
    } catch (error) {
      console.error("Error atrapado:", error);
      alert(
        "Ocurrió un error al crear la tarea. Revisa la consola para más detalles."
      );
    }
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Crear tu tarea única...
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

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="title">Nombre:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
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
        <div style={{ marginBottom: "1rem" }}>
          <label>Días:</label>
          <div>
            {daysOfWeek.map((day) => (
              <label key={day} style={{ marginRight: "1rem" }}>
                <input
                  type="checkbox"
                  value={day}
                  checked={formData.days.includes(day)}
                  onChange={() => handleArrayChange("days", day)}
                />
                {day}
              </label>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
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
            {formData.dueDates.map((date, index) => (
              <span key={index} style={{ display: "block" }}>
                {new Date(date).toLocaleDateString()}
              </span>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Horas:</label>
          <input
            type="time"
            onChange={handleHourChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <div>
            {formData.dueHours.map((hour, index) => (
              <span key={index} style={{ display: "block" }}>
                {hour}
              </span>
            ))}
          </div>
        </div>
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Crear Tarea
        </button>
        <button
          type="button"
          onClick={closeModal}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "1rem",
          }}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
