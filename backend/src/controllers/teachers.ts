import { Request, Response } from "express";
import { Teacher } from "../../models/Teacher";
import { TeacherInputType, TeacherResponseType } from "../types/index";

export const createTeacher = async (
  req: Request<{}, {}, TeacherInputType>,
  res: Response
): Promise<void> => {
  const { name, subject, email, contactNumber } = req.body;

  if (!name || !subject || !email || !contactNumber) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  try {
    const teacher = await Teacher.create({
      name,
      subject,
      email,
      contactNumber,
    });

    const { createdAt, updatedAt, ...newTeacher } = teacher.toJSON();
    res.status(201).json(newTeacher as TeacherResponseType);
  } catch (err: any) {
    console.error("Error creating teacher:", err);
    res.status(400).json({ error: err.message });
  }
};

export const getTeachers = async (_req: Request, res: Response) => {
  try {
    const response = await Teacher.findAll({
      order: [["createdAt", "DESC"]],
    });

    const teachersList = response.map((teacher) => {
      const { createdAt, updatedAt, ...cleaned } = teacher.toJSON();
      return cleaned;
    });

    res.status(200).json({ data: teachersList });
  } catch (err: any) {
    console.error("Error fetching teachers:", err);
    res.status(500).json({ error: "Failed to fetch teachers" });
  }
};
