// Updated RenderTareas to connect with TareasModal and TareasUpdateModal
import React, { useEffect, useState } from "react";
import { useModal } from "./../../components/Modal/UseModal.tsx";
import { TareasModal } from "./TareasModal.tsx";
import { TareasUpdateModal } from "./TareasUpdateModal.tsx";

export function RenderTareas() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const { isModalOpen, openModal, closeModal } = useModal();
  const modalIdView = "tareasModal"; // For viewing task details
  const modalIdEdit = "tareasUpdateModal"; // For editing task

  const formatDate = (dateString: string) => {
    const fecha = new Date(dateString);
    const opciones = { weekday: "long", day: "numeric", month: "long" };
    return fecha.toLocaleDateString("es-ES", opciones);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://192.168.100.169:3000/api/tasks");
        if (!response.ok) throw new Error("Error fetching tasks");
        const data = await response.json();
        let dataFilted = data.filter((task) => task.status !== "archived");
        setTasks(dataFilted);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
    const intervalId = setInterval(fetchTasks, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCardClick = (task) => {
    setSelectedTask(task);
    openModal(modalIdView);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#f9c74f"; // Yellow
      case "in-progress":
        return "#90be6d"; // Green
      case "completed":
        return "#43aa8b"; // Dark Green
      default:
        return "#ccc"; // Default gray
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {tasks.map((task) => (
        <div
          key={task.id || task._id}
          style={{
            border: `2px solid ${getStatusColor(task.status)}`,
            backgroundColor: `${getStatusColor(task.status)}20`,
            borderRadius: "8px",
            padding: "1rem",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onClick={() => handleCardClick(task)}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <span className="tarea-icon">{task.icon || "📌"}</span>

          <h1 style={{ color: getStatusColor(task.status) }}>{task.title}</h1>
          <p style={{ marginBottom: "0.5rem", color: "#333" }}>
            {task.description}
          </p>
          <p
            style={{
              marginTop: "auto",
              fontWeight: "bold",
              color: getStatusColor(task.status),
            }}
          >
            Estado:{" "}
            {task.status === "pending"
              ? "Pendiente"
              : task.status === "in-progress"
              ? "En Progreso"
              : "Completada"}
          </p>

          <small>{`${task.dueHours[0]} - ${formatDate(
            task.dueDates[0]
          )}`}</small>
        </div>
      ))}

      {selectedTask && (
        <TareasModal
          isOpen={isModalOpen(modalIdView)}
          closeModal={() => {
            closeModal(modalIdView);
            setSelectedTask(null);
          }}
          task={selectedTask}
          openEditModal={() => openModal(modalIdEdit)}
        />
      )}

      {selectedTask && (
        <TareasUpdateModal
          isOpen={isModalOpen(modalIdEdit)}
          closeModal={() => {
            closeModal(modalIdEdit);
            setSelectedTask(null);
          }}
          task={selectedTask}
        />
      )}
    </div>
  );
}
