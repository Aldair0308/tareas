import React, { createContext, useContext, useState } from "react";

// Interfaz para manejar múltiples modales
interface ModalContextProps {
  modals: Record<string, boolean>;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  isModalOpen: (modalId: string) => boolean;
}

// Crear el contexto
const ModalContext = createContext<ModalContextProps>({
  modals: {},
  openModal: () => {},
  closeModal: () => {},
  isModalOpen: () => false,
});

// Proveedor del contexto
export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modals, setModals] = useState<Record<string, boolean>>({});

  const openModal = (modalId: string) => {
    setModals((prev) => ({ ...prev, [modalId]: true }));
  };

  const closeModal = (modalId: string) => {
    setModals((prev) => ({ ...prev, [modalId]: false }));
  };

  const isModalOpen = (modalId: string) => !!modals[modalId];

  return (
    <ModalContext.Provider
      value={{ modals, openModal, closeModal, isModalOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useModal = () => useContext(ModalContext);
