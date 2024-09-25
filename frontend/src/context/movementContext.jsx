import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { service } from "../services/services";

const MovementContext = createContext({});

function MovementProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [movements, setMovements] = useState([]);
  const [capital, setCapital] = useState([]);

  const handleError = (
    error,
    defaultMessage = "Couldn't process your request, please try again!"
  ) => {
    const { response } = error;
    toast.error(response?.data?.message ?? defaultMessage, {
      position: "top-right",
    });
    setIsLoading(false);
  };

  const storeToken = (token) => localStorage.setItem("authToken", token);

  const authenticate = async () => {
    const cachedToken = localStorage.getItem("authToken");
    if (!cachedToken) {
      setIsLoggedIn(false);
      setCurrentUser(null);
      return;
    }

    try {
      const { data, status } = await service.verify();
      if (status === 200) {
        setCurrentUser(data);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  const handleResponse = async (response, successMessage) => {
    if (response.status >= 200 && response.status < 300) {
      toast.success(successMessage ?? response.data.message, {
        position: "top-right",
      });
      return true;
    }
    throw new Error(response?.data?.message);
  };

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await service.login(credentials);
      if (handleResponse(response, "Login successful")) {
        storeToken(response.data.authToken);
        await authenticate();
      }
    } catch (error) {
      handleError(error, "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const signUpUser = async (userData) => {
    setIsLoading(true);
    try {
      const response = await service.signUp(userData);
      if (handleResponse(response, "Sign up successful")) {
        storeToken(response.data.authToken);
        setCurrentUser(response.data.user);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Movement-related methods
  const fetchMovements = async () => {
    setIsLoading(true);
    try {
      const response = await service.getAllMovements();
      if (handleResponse(response, "Movements fetched successfully")) {
        setMovements(response.data.movements);
      }
    } catch (error) {
      handleError(error, "Failed to fetch movements.");
    } finally {
      setIsLoading(false);
    }
  };

  const addMovement = async (movementData) => {
    setIsLoading(true);
    try {
      const response = await service.addMovement(movementData);
      if (handleResponse(response, "Movement added successfully")) {
        setMovements((prev) => [...prev, response.data]);
      }
    } catch (error) {
      handleError(error, "Failed to add movement.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCapital = async () => {
    setIsLoading(true);
    try {
      const response = await service.getCapital();
      if (handleResponse(response, "Capital fetched successfully")) {
        setCapital(response.data.capital);
      }
    } catch (error) {
      handleError(error, "Failed to fetch capital.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <MovementContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        currentUser,
        movements,
        capital,
        login,
        signUpUser,
        logOutUser,
        fetchMovements,
        addMovement,
        fetchCapital,
      }}
    >
      {children}
    </MovementContext.Provider>
  );
}

export { MovementProvider, MovementContext };
