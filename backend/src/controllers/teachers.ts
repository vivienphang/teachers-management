import { Request, Response } from "express";
import { Teacher } from "../../models/Teacher";
import {
  TeacherInputType,
  TeacherResponseType,
  TeachersListResponseType,
} from "../types/index";

export const createTeacher = async (
  req: Request<{}, {}, TeacherInputType>,
  res: Response<TeacherResponseType | { error: string }>
): Promise<void> => {
  const { name, subject, email, contactNumber } = req.body;

  if (!name || !subject || !email || !contactNumber) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  try {
    const response = await Teacher.create({
      name,
      subject,
      email,
      contactNumber,
    });

    const { createdAt, updatedAt, ...newTeacher } = response.toJSON();
    res.status(201).json(newTeacher);
  } catch (err: any) {
    console.error("Error creating teacher:", err);
    res.status(400).json({ error: err.message });
  }
};

export const getTeachers = async (
  _req: Request,
  res: Response<TeachersListResponseType | { error: string }>
) => {
  try {
    const response = await Teacher.findAll({
      order: [["createdAt", "DESC"]],
    });

    const teachersList: TeacherResponseType[] = response.map((teacher) => {
      const { createdAt, updatedAt, ...cleaned } = teacher.toJSON();
      return cleaned;
    });

    res.status(200).json({ data: teachersList });
  } catch (err: any) {
    console.error("Error fetching teachers:", err);
    res.status(500).json({ error: "Failed to fetch teachers" });
  }
};
