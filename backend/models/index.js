import { Teacher } from "./teacher";
import { Class } from "./class";

Teacher.hasOne(Class, { foreignKey: "teacherId" });
Class.belongsTo(Teacher, { foreignKey: "teacherId" });
