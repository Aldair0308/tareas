import React, { useState, useEffect, CSSProperties } from "react";

interface ModalAnimationProps {
  /** Controla si el bottom sheet está abierto. */
  isOpen: boolean;
  /** Función para cerrar el bottom sheet. */
  closeModal: () => void;
  /** Contenido dentro del bottom sheet. */
  children: React.ReactNode;
  /** Estilos adicionales para el contenedor del sheet (ej. backgroundColor). */
  style?: CSSProperties;
  /** Duración de la animación (ms). Por defecto 300. */
  animationDuration?: number;
  /** Altura del sheet (ej. "70%", "500px"). Por defecto "70%". */
  sheetHeight?: string;
}

/**
 * Componente que muestra un "bottom sheet" estilo Facebook, con:
 * - Animación de subida/bajada.
 * - Cierre al hacer clic fuera del modal o tocando la barrita superior.
 */
export function ModalAnimation({
  isOpen,
  closeModal,
  children,
  style,
  animationDuration = 500,
  sheetHeight = "70%",
}: ModalAnimationProps) {
  const [mounted, setMounted] = useState(false);
  const [translateY, setTranslateY] = useState(100);
  const [isAnimating, setIsAnimating] = useState(false);

  // Refs (comentados para deshabilitar arrastre)
  // const startYRef = useRef<number | null>(null);
  // const currentYRef = useRef<number>(0);
  // const touchStartTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setTranslateY(100);
      setIsAnimating(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTranslateY(0);
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(true);
      setTranslateY(100);

      const timer = setTimeout(() => {
        setMounted(false);
      }, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, animationDuration]);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, animationDuration]);

  /** Manejador: toque inicial (comentado para deshabilitar arrastre) */
  // const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
  //   if (!mounted) return;
  //   const touch = e.touches[0];
  //   startYRef.current = touch.clientY;
  //   currentYRef.current = 0;
  //   touchStartTimeRef.current = Date.now();
  // };

  /** Manejador: arrastre mientras se mueve el dedo (comentado) */
  // const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
  //   if (startYRef.current === null) return;
  //   const touch = e.touches[0];
  //   const deltaY = touch.clientY - startYRef.current;
  //   const newTranslate = (deltaY / window.innerHeight) * 100;

  //   setTranslateY((prev) => {
  //     const ALLOW_UP = -5;
  //     if (newTranslate < ALLOW_UP) return ALLOW_UP;
  //     if (newTranslate > 100) return 100;
  //     return newTranslate;
  //   });
  // };

  /** Manejador: al soltar el dedo (comentado para deshabilitar arrastre) */
  // const handleTouchEnd = () => {
  //   if (startYRef.current === null) return;
  //   const draggedDistance = currentYRef.current;
  //   const elapsed = Date.now() - touchStartTimeRef.current;
  //   const velocity = draggedDistance / elapsed;

  //   const MIN_DRAG = 100;
  //   const VELOCITY = 1.0;

  //   if (draggedDistance > MIN_DRAG || velocity > VELOCITY) {
  //     closeModal();
  //   } else {
  //     setIsAnimating(true);
  //     setTranslateY(0);
  //   }

  //   startYRef.current = null;
  //   currentYRef.current = 0;
  //   touchStartTimeRef.current = 0;
  // };

  if (!mounted) return null;

  const backdropOpacity = 0.5 * (1 - translateY / 100);

  const sheetStyle: React.CSSProperties = {
    transform: `translateY(${translateY}%)`,
    transition: isAnimating ? `transform ${animationDuration}ms ease` : "none",
    ...style,
  };

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "visible",
      }}
    >
      {/* Fondo oscuro */}
      <div
        onClick={closeModal}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: `rgba(0,0,0,${backdropOpacity})`,
          transition: isAnimating
            ? `background-color ${animationDuration}ms ease`
            : "none",
        }}
      />

      {/* El bottom sheet */}
      <div
        style={{
          position: "absolute",
          bottom: "-200px",
          width: "100%",
          height: `calc(${sheetHeight} + 200px)`,
          backgroundColor: "#fff",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          boxShadow: "0 -2px 8px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          ...sheetStyle,
        }}
        // Deshabilitamos los eventos de arrastre
        // onTouchStart={handleTouchStart}
        // onTouchMove={handleTouchMove}
        // onTouchEnd={handleTouchEnd}
      >
        {/* Barrita para indicar arrastre */}
        <div
          onClick={closeModal} // Se cierra solo al hacer clic en la barrita
          style={{
            width: "38%",
            height: 8,
            backgroundColor: "#ccc",
            borderRadius: 9999,
            margin: "8px auto",
            cursor: "pointer",
          }}
        />
        {children}
      </div>
    </div>
  );
}
