import mongoose from "mongoose";

const movementSchema = new mongoose.Schema({
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Movement = mongoose.model("Movement", movementSchema);
