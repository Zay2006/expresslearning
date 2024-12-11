//app.js

//This is the main entry point of the application

//ES6 imports
import express from "express";
import "dotenv/config";
import taskRoutes from "./models/task.js";
import "./models/testData.js";

//variables
const app = express(); //initialize express
const port = "3000";
const url = "localhost";

//app.use
app.use(express.json());
app.use("/task", taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://${url}:${port}`);
  console.log(); //blank log
});
