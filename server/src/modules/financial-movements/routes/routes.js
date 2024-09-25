import express from "express";
import { MovementController } from "../controller/movements.controller.js";
import isAuthenticated from "../../../middleware/jwt.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, MovementController.getAllMovements);
router.post("/", isAuthenticated, MovementController.addMovement);
router.patch(
  "/:movementId",
  isAuthenticated,
  MovementController.updateMovement
);
router.delete(
  "/:movementId",
  isAuthenticated,
  MovementController.deleteMovement
);
router.get("/capital", isAuthenticated, MovementController.getCapital);

export default router;
