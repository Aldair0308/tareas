import React from "react";

import "./App.css";
import { ModalProvider } from "./components/Modal/UseModal.tsx";
import BottomNavigationWithProviders from "./components/BottomNavigation/BottomNavigation.tsx";

function App() {
  return (
    <div className="App">
      {/* Proveedor de modales y navegación */}
      <ModalProvider>
        <BottomNavigationWithProviders />
      </ModalProvider>
    </div>
  );
}

export default App;
