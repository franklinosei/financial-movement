import { useState } from "react";

const AuthForm = ({ type, handleSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (type === "signup") {
      handleSubmit({ firstName, lastName, email, password });
    } else {
      handleSubmit({ email, password });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        {type === "login" ? "Login" : "Sign Up"}
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {type === "signup" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your first name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your last name"
                required
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 px-4 rounded"
        >
          {type === "login" ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
