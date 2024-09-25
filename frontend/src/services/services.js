import axios from "axios";

class Service {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });

    // Add an interceptor to include the authorization token in requests
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`,
          };
        }
        return config;
      },
      (error) => {
        console.log(error);
        throw error;
      }
    );
  }

  /**
   * Logs in a user with the provided email and password.
   * @param {Object} credentials - The user's credentials.
   * @param {string} credentials.email - The user's email address.
   * @param {string} credentials.password - The user's password.
   * @returns {Promise} A promise that resolves to the API response.
   */
  login({ email, password }) {
    return this.api.post("/auth/login", { email, password });
  }

  /**
   * Registers a new user with the provided sign-up data.
   * @param {Object} signUpData - The new user's information.
   * @returns {Promise} A promise that resolves to the API response.
   */
  signUp(signUpData) {
    return this.api.post("/auth/signup", signUpData);
  }

  /**
   * Verifies the currently logged-in user's authentication token.
   * @returns {Promise} A promise that resolves to the API response.
   */
  verify() {
    return this.api.get("/auth/verify");
  }

  //TODO:   add remaining methods here
}

export const service = new Service();
