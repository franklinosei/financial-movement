import { Navigate } from "react-router-dom";
import { useMovementContext } from "../hooks/useMovementContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useMovementContext();

  return isLoggedIn ? children : <Navigate to={"/login"} replace />;
};
export default ProtectedRoute;
