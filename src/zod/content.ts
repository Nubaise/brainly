import { z } from "zod";

const contentSchema = z.object({
  title: z.string().min(1),
  link: z.string().url().optional(),
});


export { contentSchema };


const deleteContentSchema = z.object({
  id: z.string().min(1),
});

export { deleteContentSchema };
