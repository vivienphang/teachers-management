import { Request, Response } from "express";
import { Class } from "../../models/Class";
import { Teacher } from "../../models/Teacher";
import {
  ApiResponseErrorType,
  ClassInputType,
  ClassListItem,
  ClassListResponseType,
  ClassResponseType,
} from "../types/api.types";
import { classSchema } from "../schemas/class.schema";

export const createClass = async (
  req: Request<{}, {}, ClassInputType>,
  res: Response<ClassResponseType | ApiResponseErrorType>
): Promise<void> => {
  const parseResult = classSchema.safeParse(req.body);

  if (!parseResult.success) {
    const fieldErrors = parseResult.error.flatten().fieldErrors;
    res.status(400).json({ error: "Validation failed", details: fieldErrors });
    return;
  }

  const { level, name, teacherEmail } = parseResult.data;

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
    res.status(500).json({
      error:
        "Failed to create a class due to server error. Please try again later.",
    });
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
    res.status(500).json({
      error:
        "Failed to fetch classes due to server error. Please try again later.",
    });
  }
};
