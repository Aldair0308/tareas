import React, { useState } from "react";
import "./Calendario.css";

const CalendarioComponet = () => {
  const [currentYear] = useState(new Date().getFullYear());

  const months = [
    { name: "Enero", color: "#dceefa", image: "☃️" },
    { name: "Febrero", color: "#fde4eb", image: "❤️" },
    { name: "Marzo", color: "#eaf7dc", image: "🌸" },
    { name: "Abril", color: "#dceffa", image: "🌷" },
    { name: "Mayo", color: "#fef6dc", image: "🌼" },
    { name: "Junio", color: "#fff7d9", image: "☀️" },
    { name: "Julio", color: "#ffe4d1", image: "🏖️" },
    { name: "Agosto", color: "#fff9d9", image: "🌻" },
    { name: "Septiembre", color: "#f7eed9", image: "🍂" },
    { name: "Octubre", color: "#ffe7dc", image: "🎃" },
    { name: "Noviembre", color: "#fff4d1", image: "🦃" },
    { name: "Diciembre", color: "#e4f4fd", image: "🎄" },
  ];

  const getDaysInMonth = (month, year) => {
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // 0 (domingo) a 6 (sábado)
    const daysArray = Array.from({ length: days }, (_, i) => i + 1);

    // Rellenar espacios vacíos al inicio para alinear el primer día del mes
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
      daysArray.unshift(""); // Días vacíos
    }

    return daysArray;
  };

  return (
    <div className="calendar-container">
      {months.map((month, index) => (
        <div
          key={index}
          className="month-section"
          style={{ backgroundColor: month.color }}
        >
          <div className="month-header">
            <h2>
              {month.name} {currentYear} {month.image}
            </h2>
          </div>
          <div className="calendar-grid">
            {["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"].map((day, i) => (
              <div key={i} className="calendar-day-header">
                {day}
              </div>
            ))}
            {getDaysInMonth(index, currentYear).map((day, i) => (
              <div
                key={i}
                className={`calendar-day ${day === "" ? "empty" : ""}`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarioComponet;
