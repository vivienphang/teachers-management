export type TeacherInput = {
  name: string;
  subject: string;
  contactNumber: string;
  email: string;
};

export type TeacherResponse = TeacherInput & { id: string };

export type ClassInput = {
  level: string;
  name: string;
  teacherEmail: string;
};

export type ClassResponse = {
  id: string;
  level: string;
  name: string;
  teacherId: string;
};

export type ClassListItem = {
  level: string;
  name: string;
  formTeacher: {
    name: string;
  };
};

export type ClassListResponse = {
  data: ClassListItem[];
};
