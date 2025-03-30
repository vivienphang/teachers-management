import { Teacher } from "./Teacher";
import { Class } from "./Class";

Teacher.hasOne(Class, { foreignKey: "teacherId" });
Class.belongsTo(Teacher, { foreignKey: "teacherId" });

export { Teacher, Class };
