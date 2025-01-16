import { useState, useEffect } from "react";

const useCurrentDateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Actualizar cada segundo

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  return {
    day: dayNames[dateTime.getDay()],
    time: dateTime.toLocaleTimeString(),
    currentDate: dateTime.getDate(),
    fullDate: dateTime,
  };
};

export default useCurrentDateTime;
