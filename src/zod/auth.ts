import { z } from "zod";

// Signup schema
export const signupSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

// Signin schema
export const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
});