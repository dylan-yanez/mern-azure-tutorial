require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3001;
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

app.get("/videos", async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=AIzaSyDW5Hsh46Vm10dY-IvCDLBtpBZaPNi30Q4&part=snippet&type=video&q=${query}&maxResults=15`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/todos", async(req, res) => {
  try {
      const { description } = req.body;
      const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
      );

      res.json(newTodo.rows[0]);
  } catch (err) {
      console.error(err.message);
  }
});

// get all todo's

app.get("/todos", async(req, res) => {
  try {
      const allTodos = await pool.query("SELECT * FROM todo");
      res.json(allTodos.rows);
  } catch (err) {
      console.error(err.message);
  }
  
});

// get a todo

app.get("/todos/:id", async(req, res) => {
  try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

      res.json(todo.rows[0]);
  } catch (err) {
      console.error(err.message);
  }
  
});

// update a todo

app.put("/todos/:id", async(req, res) => {
  try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]);

      res.json("Todo was updated!");
  } catch (err) {
      console.error(err.message);
  }
});

// delete a todo

app.delete("/todos/:id", async(req, res) => {
  try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
      res.json("Todo was deleted!");
  } catch (err) {
      console.error(err.message);
  }
});

app.use(express.static("./client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on post ${port}`);
});
