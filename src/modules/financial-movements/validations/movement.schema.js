import { z } from "zod";

const movementSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.number().min(0),
  description: z.string().optional(),
  date: z.date().default(new Date()),
});

const updateMovementSchema = movementSchema.partial();

export { movementSchema, updateMovementSchema };
