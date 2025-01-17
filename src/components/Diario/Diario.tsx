import React, { useEffect, useState } from "react";
import "./Diario.css";
import { GetTareas } from "../../pages/Tareas/GetTareas.ts";

interface Tarea {
  _id: string;
  title: string;
  description: string;
  status: string;
  days: string[];
  dueDates: string[];
  dueHours: string[];
  icon: string;
}

const Diario: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [diasConTareas, setDiasConTareas] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetTareas();
        setTareas(data);

        // Extraer días únicos de las tareas y ordenarlos por fecha
        const diasUnicos = [
          ...new Set(
            data.flatMap((tarea: Tarea) =>
              tarea.dueDates.map((fecha) => new Date(fecha).toDateString())
            )
          ),
        ].sort((a, b) => new Date(a).getTime() - new Date(b).getTime()); // Ordenar fechas

        setDiasConTareas(diasUnicos);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (dateString: string) => {
    const fecha = new Date(dateString);
    const opciones = { weekday: "long", day: "numeric", month: "long" };
    return fecha.toLocaleDateString("es-ES", opciones);
  };

  const archiveTasks = async (tasksToArchive: Tarea[]) => {
    try {
      const requests = tasksToArchive.map((task) =>
        fetch(
          `https://api-tareas-production.up.railway.app/api/tasks/${task._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "archived" }),
          }
        )
      );
      await Promise.all(requests);
      alert("Tareas archivadas exitosamente");
      // Refetch tareas después de archivar
      const updatedTareas = await GetTareas();
      setTareas(updatedTareas);
    } catch (error) {
      console.error("Error al archivar tareas:", error);
    }
  };

  return (
    <div className="diario-container">
      {diasConTareas.map((dia) => {
        const tareasDelDia = tareas.filter((tarea) =>
          tarea.dueDates.some((fecha) => new Date(fecha).toDateString() === dia)
        );

        const fecha = new Date(dia);
        const nombreDia = fecha.toLocaleDateString("es-ES", {
          weekday: "long",
        });
        const numeroDia = fecha.getDate();
        const mes = fecha.toLocaleDateString("es-ES", { month: "long" });

        const allCompleted = tareasDelDia.every(
          (tarea) => tarea.status === "completed"
        );

        return (
          <div key={dia} className="dia-section">
            <div className="dia-header">
              <h2>{`${
                nombreDia.charAt(0).toUpperCase() + nombreDia.slice(1)
              } ${numeroDia} de ${mes}`}</h2>
              <p>{`${
                tareasDelDia.filter((t) => t.status === "completed").length
              }/${tareasDelDia.length} LISTO`}</p>
            </div>
            <div className="tareas-grid">
              {tareasDelDia.map((tarea) => (
                <div
                  key={tarea._id}
                  className={`tarea-card ${
                    tarea.status === "completed"
                      ? "tarea-completed"
                      : tarea.status === "in-progress"
                      ? "tarea-progress"
                      : ""
                  }`}
                >
                  <span className="tarea-icon">{tarea.icon || "📌"}</span>
                  <p>{tarea.title}</p>
                  <small>{`${tarea.dueHours[0]} - ${formatDate(
                    tarea.dueDates[0]
                  )}`}</small>
                </div>
              ))}
            </div>
            {allCompleted && tareasDelDia.length > 0 && (
              <button
                className="archive-button"
                onClick={() => archiveTasks(tareasDelDia)}
              >
                Archivar Tareas
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Diario;
