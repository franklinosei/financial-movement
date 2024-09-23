import { z } from "zod";

const createUserSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(1, { message: "Email is required." }),
  password: z
    .string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      "Password must have at least 6 characters and contain at least one number, one lowercase letter, and one uppercase letter"
    ),
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
});

const updateUserSchema = createUserSchema.partial().omit({
  password: true,
});

export { createUserSchema, updateUserSchema };
