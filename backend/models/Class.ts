import { DataTypes, Model } from "sequelize";
import sequelize from "../src/db";

export class Class extends Model {
  public id!: string;
  public name!: string;
  public level!: string;
  public teacherId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Class.init(
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
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "classes",
    modelName: "Class",
    timestamps: true,
  }
);
