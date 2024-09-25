import axios from "axios";

class Service {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        console.log(error);
        throw error;
      }
    );
  }

  login({ email, password }) {
    return this.api.post("/auth/login", { email, password });
  }

  signUp(signUpData) {
    return this.api.post("/auth/signup", signUpData);
  }

  verify() {
    return this.api.get("/auth/verify");
  }

  // New movement-related methods
  getAllMovements() {
    return this.api.get("/financial-movements");
  }

  addMovement(movementData) {
    return this.api.post("/financial-movements", movementData);
  }

  getCapital() {
    return this.api.get("/financial-movements/capital");
  }

  // TODO: Add remaining routes
}

export const service = new Service();
