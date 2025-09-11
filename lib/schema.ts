import { z } from "zod";

export const InputSchema = z.object({
  prompt: z
  .string()
  .trim()
  .min(20, "Please add more details about your idea")
  .max(5000, "Please keep your idea under 5000 characters")
})

export type InputSchemaType = z.infer<typeof InputSchema>;
