// config/databaseConnection.js

//this is how you connect to the datbase

import { Sequelize } from "sequelize";
import "dotenv/config";

// add sequlize connection

// Sequelize

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    // database, username, password
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
); // authentication to ensure connection
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

console.log("Database Config:", {
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
});

export default sequelize;
