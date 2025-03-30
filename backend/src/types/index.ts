export type TeacherInputType = {
  name: string;
  subject: string;
  email: string;
  contactNumber: string;
};

export type TeacherResponseType = TeacherInputType & { id: string };

export type TeachersListResponseType = {
  data: TeacherResponseType[];
};

export type ClassInputType = {
  level: string;
  name: string;
  teacherEmail: string;
};

export type ClassResponseType = {
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

export type ClassListResponseType = {
  data: ClassListItem[];
};
