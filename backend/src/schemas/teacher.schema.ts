import { z } from "zod";

export const teacherSchema = z.object({
  name: z.string().min(3, "Input a valid name"),
  subject: z.string().min(3, "Input a valid subject"),
  email: z.string().email("Invalid email address"),
  contactNumber: z.string().min(8, "Input a valid contact number"),
});

export type TeacherInputType = z.infer<typeof teacherSchema>;

export type TeacherResponseType = TeacherInputType & { id: string };

export type TeachersListResponseType = {
  data: TeacherResponseType[];
};
