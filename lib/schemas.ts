import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = signInSchema
  .extend({
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;

export const instructionSchema = z.object({
  step_number: z.number().min(1),
  instruction: z.string().min(1, "Instruction is required"),
  image_url: z.string().optional(),
});

export const itemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  main_image: z.string().min(1, "Main image is required"),
  categories: z
    .array(z.string())
    .min(1, "At least one category is required")
    .max(2),
  tags: z.array(z.string()).max(10),
  ingredients: z
    .array(z.string())
    .min(2, "At least two ingredients are required")
    .max(20),
  instructions: z
    .array(instructionSchema)
    .min(2, "At least two instructions are required")
    .max(20),
});

export const ratingSchema = z.object({
  rating: z.number().min(1).max(5),
});

export type ItemSchema = z.infer<typeof itemSchema>;
export type InstructionSchema = z.infer<typeof instructionSchema>;
export type RatingSchema = z.infer<typeof ratingSchema>;

export const addItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  categories: z
    .array(z.string())
    .min(1, "At least one category is required")
    .max(2),
  tags: z.array(z.string()).max(10),
  ingredients: z
    .array(z.string())
    .min(2, "At least two ingredients are required")
    .max(20, "Maximum 20 ingredients allowed"),
  instructions: z
    .array(
      z.object({
        instruction: z.string().min(1, "Instruction is required"),
        image_url: z.string().optional(),
      })
    )
    .min(2, "At least two instructions are required")
    .max(20, "Maximum 20 instructions allowed"),
  main_image: z.string().min(1, "Main image is required"),
});

export type AddItemSchema = z.infer<typeof addItemSchema>;
