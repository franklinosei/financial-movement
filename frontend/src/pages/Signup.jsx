import AuthForm from "../components/AuthForm";

const Signup = () => {
  const handleSignup = (credentials) => {
    console.log("Signing up with:", credentials);
    // Add your signup logic here
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <AuthForm type="signup" handleSubmit={handleSignup} />
    </div>
  );
};

export default Signup;
