import AuthForm from "../components/AuthForm";

const Login = () => {
  const handleLogin = (credentials) => {
    console.log("Logging in with:", credentials);
    // Add your login logic here
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <AuthForm type="login" handleSubmit={handleLogin} />
    </div>
  );
};

export default Login;
