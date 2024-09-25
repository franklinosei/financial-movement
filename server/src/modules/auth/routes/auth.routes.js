import isAuthenticated from "../../../middleware/jwt.middleware.js";
import AuthController from "../controllers/auth.controller.js";
import express from "express";

const router = express.Router();

// POST /auth/signup  - Creates a new user in the database
router.post("/signup", AuthController.signUpUser);

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", AuthController.login);

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, AuthController.verifyToken);

export default router;
