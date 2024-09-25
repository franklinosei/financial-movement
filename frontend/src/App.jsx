import MovementsTable from "./components/MovementsTable";
import MovementFormModal from "./components/MovementFormModal";
import CapitalDisplay from "./components/CapitalDisplay";
import useMovements from "./hooks/useMovements";

function App() {
  const { movements, capital, addMovement } = useMovements();

  return (
    <div className="p-4 bg-zinc-100 w-[100vw] h-[100vh]">
      <h1 className="text-2xl font-bold text-black">Financial Movement Manager</h1>
      <CapitalDisplay capital={capital} />
      <MovementFormModal addMovement={addMovement} />
      <MovementsTable movements={movements} />
    </div>
  );
}

export default App;
