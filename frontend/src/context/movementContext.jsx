import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { service } from "../services/services";

const MovementContext = createContext({});

function MovementProvider({ children }) {
  // State variables to manage loading state, authentication status, and current user.
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  /**
   * handleError handles errors globally across the authentication methods.
   * It shows a toast message to the user and resets the loading state.
   *
   * @param {Error} error - The error object, typically from an API response.
   * @param {string} [defaultMessage] - The fallback message if no specific error message is found.
   */
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

  /**
   * storeToken saves the JWT token to local storage.
   *
   * @param {string} token - The authentication token to be saved.
   */
  const storeToken = (token) => localStorage.setItem("authToken", token);

  /**
   * authenticate checks if the user is authenticated by verifying the token stored in local storage.
   * If valid, the user’s information is loaded; otherwise, the user is considered logged out.
   */
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
    } catch {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  /**
   * handleResponse handles successful responses from API calls.
   * It displays a success toast and returns true if the response is valid.
   *
   * @param {Object} response - The API response object.
   * @param {string} [successMessage] - Optional custom success message for the toast notification.
   * @returns {boolean} - Returns true if the response was successful (status 200–299).
   */
  const handleResponse = async (response, successMessage) => {
    if (response.status >= 200 && response.status < 300) {
      toast.success(successMessage ?? response.data.message, {
        position: "top-right",
      });
      return true;
    }
    throw new Error(response?.data?.message);
  };

  /**
   * login logs the user in with their email and password by calling the authentication service.
   * On success, it stores the token and authenticates the user.
   *
   * @param {Object} credentials - The user’s login credentials (email and password).
   */
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

  /**
   * signUpUser registers a new user and logs them in.
   * If successful, the token is stored, and the user is authenticated.
   *
   * @param {Object} userData - The user’s sign-up data (e.g., email, password).
   */
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

  /**
   * logOutUser logs the user out by clearing their authentication token.
   * It also clears the user’s session and re-authenticates.
   */
  const logOutUser = () => {
    service.logout();
    authenticate();
  };

  // Automatically authenticate the user on the first render (e.g., after a page reload).
  useEffect(() => {
    authenticate();
  }, []);

  return (
    <MovementContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        currentUser,
        login,
        signUpUser,
        logOutUser,
      }}
    >
      {children}
    </MovementContext.Provider>
  );
}

export { MovementProvider, MovementContext };
