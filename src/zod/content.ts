import { z } from "zod";

// Content creation schema with all fields
const contentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  link: z.string().url("Must be a valid URL").optional(),
  type: z.enum(["twitter", "youtube", "linkedin", "other"]).optional(),
  tags: z.array(z.string()).optional(),
});

export { contentSchema };

// Delete content schema
const deleteContentSchema = z.object({
  id: z.string().min(1, "Content ID is required"),
});

export { deleteContentSchema };