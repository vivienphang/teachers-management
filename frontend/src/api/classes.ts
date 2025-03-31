import { ClassInput, ClassListResponse, ClassResponse } from "../types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/api/classes";

// Create a new class
export const createClass = async (data: ClassInput): Promise<ClassResponse> => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.error || "Failed to create class");
    }

    return result as ClassResponse;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create new class";
    console.error("❌ Error creating class:", err);
    throw new Error(message);
  }
};

// Fetch class list
export const getClassList = async (): Promise<ClassListResponse> => {
  try {
    const res = await fetch(BASE_URL);
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.error || "Failed to fetch classes");
    }

    return result as ClassListResponse;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error fetching class list";
    console.error("❌ Error fetching classes:", err);
    throw new Error(message);
  }
};
