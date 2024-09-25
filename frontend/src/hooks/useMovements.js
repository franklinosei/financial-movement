import { useState } from "react";

const useMovements = () => {
  const [movements, setMovements] = useState([]);
  const [capital, setCapital] = useState(0);

  const addMovement = (movement) => {
    setMovements([...movements, movement]);
    setCapital(capital + movement.amount);
  };

  return { movements, capital, addMovement };
};

export default useMovements;
