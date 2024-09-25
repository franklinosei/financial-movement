import { MovementService } from "../services/movement.service.js";
import {
  movementSchema,
  updateMovementSchema,
} from "../validations/movement.schema.js";

export class MovementController {
  static async getAllMovements(req, res) {
    const userId = req.payload._id;
    const movements = await MovementService.getAllMovements(userId);

    res.status(200).json({ success: true, movements });
  }

  static async addMovement(req, res) {
    const validatedData = movementSchema.parse(req.body);
    validatedData.userId = req.payload._id;
    const movement = await MovementService.addMovement(validatedData);

    res.status(201).json({ success: true, movement });
  }

  static async updateMovement(req, res) {
    const validatedData = updateMovementSchema.parse(req.body);
    const updatedMovement = await MovementService.updateMovement(
      req.params.movementId,
      validatedData
    );

    res.status(201).json({ success: true, movement: updatedMovement });
  }

  static async deleteMovement(req, res) {
    await MovementService.deleteMovement(req.params.movementId);

    res.status(200).json({ success: true, message: "Movement deleted" });
  }

  static async getCapital(req, res) {
    const userId = req.payload._id;
    const capital = await MovementService.calculateCapital(userId);

    res.status(200).json({ success: true, capital });
  }
}
