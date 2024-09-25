import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useMovementContext } from "../hooks/useMovementContext";

const Signup = () => {
  const { signUpUser, isLoading, isLoggedIn } = useMovementContext();
  const navigate = useNavigate();

  const handleSignup = async (userData) => {
    await signUpUser(userData);
    if (!isLoading && isLoggedIn) {
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <AuthForm type="signup" handleSubmit={handleSignup} />
      {isLoading && <p className="text-center mt-4">Signing up...</p>}
    </div>
  );
};

export default Signup;
