import { useEffect } from "react";
import { useMovementContext } from "../hooks/useMovementContext";

const MovementsTable = () => {
  const { movements, fetchMovements } = useMovementContext();

  useEffect(() => {
    fetchMovements();
  }, []);

  return (
    <div className="mt-4 w-full text-black">
      <h2 className="text-lg font-bold">Financial Movements</h2>
      <table className="min-w-full table-auto bg-white border border-gray-200 shadow-md rounded">
        <thead className="bg-gray-300">
          <tr>
            <th className="px-4 py-2 border">Type</th>
            <th className="px-4 py-2 border">Amount</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Description</th>
          </tr>
        </thead>
        <tbody>
          {movements.length > 0 ? (
            movements.map((movement, index) => (
              <tr key={index} className="text-center border-t">
                <td className="px-4 py-2 border">
                  {movement.type === "income" ? (
                    <span className="text-green-500">Income</span>
                  ) : (
                    <span className="text-red-500">Expense</span>
                  )}
                </td>
                <td className="px-4 py-2 border">{movement.amount}</td>
                <td className="px-4 py-2 border">
                  {new Date(movement.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">
                  {movement.description || "No description"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 text-center">
                No movements found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MovementsTable;
