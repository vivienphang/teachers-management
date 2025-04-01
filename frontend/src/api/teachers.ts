import { TeacherInput, TeacherResponse } from "../types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/api/teachers";

// GET all teachers
export const fetchAllTeachers = async (): Promise<{
  data: TeacherResponse[];
}> => {
  try {
    const response = await fetch(BASE_URL);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.error || "Failed to fetch teachers");
    }

    return result;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error in fetching all teachers.";
    console.error("Fetch or JSON parse error:", err);
    throw new Error(message);
  }
};

// POST a new teacher
export const createTeacher = async (
  data: TeacherInput
): Promise<TeacherResponse> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw result;
  }

  return result as TeacherResponse;
};
