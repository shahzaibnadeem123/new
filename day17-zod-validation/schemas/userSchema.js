
const { z } = require("zod");

const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .string()
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),

  age: z
    .number()
    .int("Age must be an integer")
    .min(18, "User must be at least 18")
    .max(100, "Age must not exceed 100"),
});

module.exports = userSchema;
