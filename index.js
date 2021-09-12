const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");
// middleware
app.use(cors());
app.use(express.json());
// ROUTES
// crate a todo
app.post("/todos", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",[description]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});
// get all todos
app.get('/todos', async(req, res) => {
    try {
        const todoList = await pool.query("SELECT * FROM todo ORDER BY todo_id DESC");
        res.json(todoList.rows);
    } catch (error) {
        console.log(error.message);
    }
});
// get a todo

// delete a todo
// server started
app.listen(5000, () => {
    console.log('server started');
});