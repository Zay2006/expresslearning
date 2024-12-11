// /routes/task.js

import { Model, DataTypes } from "sequelize"; // data types are the way that things are stored
import sequelize from "../config/db.js";

class Tasks extends Model {} // models are the way that things that store data in sql

Tasks.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Tasks",
  }
);

export default Tasks;
