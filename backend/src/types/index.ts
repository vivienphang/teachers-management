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
