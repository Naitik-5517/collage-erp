import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  dateOfBirth: z.string(),
  gender: z.enum(["male", "female", "other"]),
  departmentId: z.string().uuid(),
  programmeId: z.string().uuid(),
  admissionYear: z.number().int().min(2000).max(2100),
});

export const updateStudentSchema = createStudentSchema.partial();

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
