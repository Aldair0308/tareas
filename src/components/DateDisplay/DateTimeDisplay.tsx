import React from "react";
import useCurrentDateTime from "./useCurrentDateTime.ts";

const DateTimeDisplay: React.FC = () => {
  const { time, fullDate } = useCurrentDateTime();

  const getWeekDays = () => {
    const week: { day: string; date: number; isToday: boolean }[] = [];
    const currentDay = fullDate.getDay();
    const currentDate = fullDate.getDate();

    for (let i = -3; i <= 3; i++) {
      const date = new Date(fullDate);
      date.setDate(currentDate + i);
      week.push({
        day: date
          .toLocaleDateString("es-ES", { weekday: "short" })
          .toUpperCase(),
        date: date.getDate(),
        isToday: i === 0,
      });
    }
    return week;
  };

  const weekDays = getWeekDays();

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      {/* Hora actual */}
      <h1>{time}</h1>

      {/* Contenedor de la semana */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          padding: "20px",
          backgroundColor: "#f5f8fa",
          borderRadius: "8px",
        }}
      >
        {weekDays.map((day, index) => (
          <div
            key={index}
            style={{
              textAlign: "center",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: day.isToday ? "#ffffff" : "transparent",
              boxShadow: day.isToday ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
              fontWeight: day.isToday ? "bold" : "normal",
            }}
          >
            <div style={{ fontSize: "12px", color: "#a0a0a0" }}>{day.day}</div>
            <div style={{ fontSize: "16px" }}>{day.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateTimeDisplay;
