import { useState } from "react";

const MovementFormModal = ({ addMovement }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return; // Add simple validation

    addMovement({ description, amount: parseFloat(amount), type });
    setDescription("");
    setAmount("");
    setType("income");
    setIsOpen(false); // Close modal after form submission
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Add Movement
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Add a Financial Movement</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Description"
                  className="p-2 border border-gray-300 rounded w-full"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  placeholder="Amount"
                  className="p-2 border border-gray-300 rounded w-full"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="p-2 border border-gray-300 rounded w-full"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 bg-gray-300 text-gray-800 py-2 px-4 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Add Movement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MovementFormModal;
