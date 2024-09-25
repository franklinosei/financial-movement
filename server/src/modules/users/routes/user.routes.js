import express from "express";
import UserController from "../controllers/user.controller.js";
import isAuthenticated from "../../../middleware/jwt.middleware.js";

const router = express.Router();

router.get("/profile", isAuthenticated, UserController.getUserProfile);

router.patch("/profile", isAuthenticated, UserController.updateProfile);

export default router;
