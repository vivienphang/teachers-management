import { Request, Response } from "express";
import { Teacher } from "../../models/Teacher";
import {
  ApiResponseErrorType,
  TeacherInputType,
  TeacherResponseType,
  TeachersListResponseType,
} from "../types/api.types";
import { teacherSchema } from "../schemas/teacher.schema";

export const createTeacher = async (
  req: Request<{}, {}, TeacherInputType>,
  res: Response<TeacherResponseType | ApiResponseErrorType>
): Promise<void> => {
  const parseResponse = teacherSchema.safeParse(req.body);

  if (!parseResponse.success) {
    const fieldErrors = parseResponse.error.flatten().fieldErrors;
    res.status(400).json({
      error: "Validation failed",
      details: fieldErrors,
    });
    return;
  }
  const { name, subject, email, contactNumber } = parseResponse.data;

  try {
    const response = await Teacher.create({
      name,
      subject,
      email,
      contactNumber,
    });

    const { createdAt, updatedAt, ...newTeacher } = response.toJSON();
    res.status(201).json(newTeacher as TeacherResponseType);
  } catch (err: any) {
    console.error("Error creating teacher:", err);
    res.status(500).json({
      error:
        "Failed to create a teacher due to server error. Please try again later.",
    });
  }
};

export const getTeachers = async (
  _req: Request,
  res: Response<TeachersListResponseType | ApiResponseErrorType>
) => {
  try {
    const response = await Teacher.findAll({
      order: [["createdAt", "DESC"]],
    });

    const teachersList: TeacherResponseType[] = response.map((teacher) => {
      const { createdAt, updatedAt, id, ...cleaned } = teacher.toJSON();
      return cleaned;
    });

    res.status(200).json({ data: teachersList });
  } catch (err: any) {
    console.error("Error fetching teachers:", err);
    res.status(500).json({
      error:
        "Failed to fetch teachers list due to server error. Please try again later.",
    });
  }
};
