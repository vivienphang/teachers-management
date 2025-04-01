import { ClassInput, ClassListResponse, ClassResponse } from "../types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/api/classes";

// Create a new class
export const createClass = async (data: ClassInput): Promise<ClassResponse> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw result;
  }

  return result as ClassResponse;
};

// Fetch class list
export const getClassList = async (): Promise<ClassListResponse> => {
  const res = await fetch(BASE_URL);
  const result = await res.json();

  if (!res.ok) {
    throw result;
  }

  return result as ClassListResponse;
};
