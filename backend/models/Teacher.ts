import { Model, DataTypes } from "sequelize";
import sequelize from "../src/db";

export class Teacher extends Model {
  public id!: string;
  public name!: string;
  public subject!: string;
  public email!: string;
  public contactNumber!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Teacher.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Teacher",
    tableName: "teachers",
    timestamps: true,
  }
);
