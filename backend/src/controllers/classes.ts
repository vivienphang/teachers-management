import { Request, Response } from "express";
import { Class } from "../../models/Class";
import {
  ClassInputType,
  ClassListItem,
  ClassListResponseType,
  ClassResponseType,
} from "../types";
import { Teacher } from "../../models/Teacher";

export const createClass = async (
  req: Request<{}, {}, ClassInputType>,
  res: Response<ClassResponseType | { error: string }>
) => {
  const { level, name, teacherEmail } = req.body;

  // Basic validation
  if (!level || !name || !teacherEmail) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  try {
    // Check teachers table
    const teacher = await Teacher.findOne({
      where: {
        email: teacherEmail,
      },
    });
    if (!teacher) {
      res.status(404).json({ error: "Teacher not found" });
      return;
    }
    // Check classes table
    const existingTeacher = await Class.findOne({
      where: {
        teacherId: teacher?.id,
      },
    });
    if (existingTeacher) {
      res
        .status(400)
        .json({ error: "This teacher is already assigned to a class." });
      return;
    }
    // After checking is done, create a class and assign to unique teacher id
    const response = await Class.create({
      level,
      name,
      teacherId: teacher!.id,
    });

    const { createdAt, updatedAt, ...newClass } = response.toJSON();
    res.status(201).json(newClass as ClassResponseType);
  } catch (err: any) {
    console.error("Error creating teacher:", err);
    res.status(400).json({ error: err.message });
  }
};

export const getClassList = async (
  _req: Request,
  res: Response<ClassListResponseType | { error: string }>
) => {
  try {
    const response = await Class.findAll({
      include: [
        {
          model: Teacher,
          attributes: ["name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const formattedResponse: ClassListItem[] = response.map((classes) => {
      const classObj = classes.toJSON();
      return {
        level: classObj.level,
        name: classObj.name,
        formTeacher: {
          name: classObj.Teacher.name,
        },
      };
    });

    res.status(200).json({ data: formattedResponse });
  } catch (err: any) {
    console.error("Error fetching classes:", err);
    res.status(500).json({ error: "Failed to fetch classes." });
  }
};
