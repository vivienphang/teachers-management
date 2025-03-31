export type TeacherInput = {
  name: string;
  subject: string;
  contactNumber: string;
  email: string;
};

export type TeacherResponse = TeacherInput & { id: string };
