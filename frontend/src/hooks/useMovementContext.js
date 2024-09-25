import { useContext } from "react";
import { MovementContext } from "../context/MovementContext";

// Define a custom hook to access the context
const useMovementContext = () => {
  const context = useContext(MovementContext);

  if (!context) {
    throw new Error(
      "useMovementContext must be used within an MovementProvider"
    );
  }

  return context;
};

export { useMovementContext };
