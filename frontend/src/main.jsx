import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MovementProvider } from "./context/movementContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MovementProvider>
      <App />
    </MovementProvider>
  </StrictMode>
);
