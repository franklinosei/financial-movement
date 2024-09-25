import { createError } from "../../../libs/utils/errors/errors.js";
import { Movement } from "../models/Movements.Model.js";

export class MovementService {
  static async getAllMovements(userId) {
    return await Movement.find({ userId });
  }

  static async addMovement(data) {
    const movement = new Movement(data);
    return await movement.save();
  }

  static async updateMovement(id, data) {
    const foundMovement = await Movement.findById(id);
    if (!foundMovement) {
      throw createError(404, "Movement not found");
    }

    return await Movement.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteMovement(id) {
    return await Movement.findByIdAndDelete(id);
  }

  static async calculateCapital(userId) {
    const movements = await Movement.find({ userId });
    return movements.reduce((total, movement) => {
      return movement.type === "income"
        ? total + movement.amount
        : total - movement.amount;
    }, 0);
  }
}
