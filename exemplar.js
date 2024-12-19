const express = require("express");
const mysql = require("mysql2");
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving static files
app.use(express.static("public"));

// Serving a static HTML
app.get("/index", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password$123",
  database: "task_manager",
});

// Create task
dbSchema = `CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
connection.query(dbSchema, (err) => {
  if (err) throw err;
  console.log("Tasks table ready");
});

// Form validation middleware
const validateTask = (req, res, next) => {
  const { title } = req.body;
  if (!title || title.length < 3) {
    return res.status(400).json({ error: "Title must be at least 3 characters" });
  }
  next();
};

// Remove the duplicate route and combine with validation
app.post("/tasks", validateTask, (req, res) => {
  const { title, description } = req.body;
  const query = "INSERT INTO tasks (title, description) VALUES (?, ?)";

  connection.query(query, [title, description], (err, results) => {
    if (err) throw err;
    res.status(201).json({ id: results.insertId });
  });
});

// Read tasks
app.get("/tasks", (req, res) => {
  connection.query("SELECT * FROM tasks", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Starting the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
