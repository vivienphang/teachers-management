import { z } from "zod";

export const classSchema = z.object({
  level: z.string().min(2, "Input a valid class level"),
  name: z.string().min(8, "Input a valid class name"), // e.g. Class 3A as "class" is a given
  teacherEmail: z.string().email("Invalid teacher email"),
});

export type ClassInputType = z.infer<typeof classSchema>;
