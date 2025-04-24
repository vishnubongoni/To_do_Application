const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const todosPath = path.join(__dirname, 'data', 'todos.json');

// Read todos
app.get('/api/todos', (req, res) => {
  const todos = JSON.parse(fs.readFileSync(todosPath));
  res.json(todos);
});

// Add new todo
app.post('/api/todos', (req, res) => {
  const todos = JSON.parse(fs.readFileSync(todosPath));
  const newTodo = { id: Date.now(), task: req.body.task };
  todos.push(newTodo);
  fs.writeFileSync(todosPath, JSON.stringify(todos));
  res.status(201).json(newTodo);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

