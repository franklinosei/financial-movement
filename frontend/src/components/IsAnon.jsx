import { Navigate } from "react-router-dom";
import { useMovementContext } from "../hooks/useMovementContext";

const IsAnon = ({ children }) => {
  const { isLoggedIn } = useMovementContext();

  return !isLoggedIn ? children : <Navigate to={"/"} replace />;
};
export default IsAnon;
