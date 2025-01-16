import React, { useEffect, useState } from "react";
import { useModal } from "../../components/Modal/UseModal.tsx";
import { TareasModal } from "./../Tareas/TareasModal.tsx";
import { TareasUpdateModal } from "./../Tareas/TareasUpdateModal.tsx";
import DateTimeDisplay from "../../components/DateDisplay/DateTimeDisplay.tsx";
import { TareasFormModal } from "../Tareas/TareasFormModal.tsx";

export const Hoy: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const { isModalOpen, openModal, closeModal } = useModal();
  const modalIdView = "tareasModal";
  const modalIdEdit = "tareasUpdateModal";

  const formatDate = (dateString: string) => {
    const fecha = new Date(dateString);
    const opciones: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    return fecha.toLocaleDateString("es-ES", opciones);
  };

  const getTodayTasks = (tasks) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to the start of the day

    return tasks.filter((task) => {
      const taskDate = new Date(task.dueDates[0]);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime();
    });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://api-tareas-production.up.railway.app/api/tasks"
        );
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

  const todayTasks = getTodayTasks(tasks);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        padding: "1rem",
        marginBottom: "110px",
      }}
    >
      <TareasFormModal />
      {/* Contenedor fijo para la fecha y el título */}
      <div style={{ flex: "0 0 auto", padding: "6px", marginTop: "-18px" }}>
        <DateTimeDisplay />
      </div>
      {todayTasks.length > 0 ? (
        todayTasks.map((task) => (
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
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                widht: "100%",
                height: "auto",
              }}
            >
              <h1 style={{ margin: -5, fontSize: 70 }}>{task.icon || "📌"}</h1>
              <h1
                style={{
                  color: getStatusColor(task.status),
                  marginLeft: 25,
                  textAlign: "center",
                }}
              >
                {task.title}
              </h1>
            </div>
            <h1
              style={{
                color: getStatusColor(task.status),
                margin: -6,
                marginLeft: 25,
              }}
            >
              {`${task.dueHours[0]}`}
            </h1>

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
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#555", fontSize: "18px" }}>
          No hay tareas para hoy.
        </p>
      )}

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
};

export default Hoy;
