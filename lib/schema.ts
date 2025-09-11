import { z } from "zod";

export const inputSchema = z
  .string()
  .trim()
  .min(20, "Please add more details about your idea")
  .max(5000, "Please keep your idea under 5000 characters");

export type InputSchemaType = z.infer<typeof inputSchema>;
