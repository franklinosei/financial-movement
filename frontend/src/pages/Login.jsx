import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useMovementContext } from "../hooks/useMovementContext";

const Login = () => {
  const { login, isLoading, isLoggedIn } = useMovementContext();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    await login({ email, password });

    if (!isLoading && isLoggedIn) {
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <AuthForm type="login" handleSubmit={handleLogin} />
      {isLoading && <p className="text-center mt-4">Logging in...</p>}
    </div>
  );
};

export default Login;
