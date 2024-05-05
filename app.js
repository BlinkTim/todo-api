const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let todos = [];

app.get('/todos', (req, res) => {
    res.status(200).json(todos);
});

app.post('/todos', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).send('Task is required');
    }
    const newTodo = { id: todos.length + 1, task, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const { task, completed } = req.body;
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).send('Todo not found');
    }
    todo.task = task !== undefined ? task : todo.task;
    todo.completed = completed !== undefined ? completed : todo.completed;
    res.status(200).json(todo);
});

app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) {
        return res.status(404).send('Todo not found');
    }
    todos.splice(todoIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
