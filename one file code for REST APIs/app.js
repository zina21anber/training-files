const express = require('express');
const app = express();
const PORT = 3022;

// تفعيل قراءة البيانات القادمة بصيغة JSON في الـ Request Body
app.use(express.json());

//mock data for trying 
let todos = [
    { id: 1, task: '  writing reports ', completed: false },
    { id: 2, task: ' uploading node.js files in github', completed: true }
];

//GET all list
app.get('/api/todos', (req, res) => {
    res.status(200).json(todos);
});

// GET only one value based on the id number 
app.get('/api/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);
    
    if (!todo) {
        return res.status(404).json({ message: 'task does not exist !' });
    }
    res.status(200).json(todo);
});

// POST adding new id and task
app.post('/api/todos', (req, res) => {
    const newTask = {
        id: todos.length + 1,
        task: req.body.task,
        completed: req.body.completed !== undefined ? req.body.completed : false
    };
    
    todos.push(newTask);
    res.status(201).json({ message: ' adding successfully ', data: newTask });
});

// PUT for editing data 
app.put('/api/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);
    
    if (!todo) {
        return res.status(404).json({ message: 'task does not exist !' });
    }
    
    todo.task = req.body.task !== undefined ? req.body.task : todo.task;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    
    res.status(200).json({ message: ' updated successfully ', data: todo });
});

// DELETE for delete any data by the id number
app.delete('/api/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === todoId);
    
    if (index === -1) {
        return res.status(404).json({ message: 'task does not exist !' });
    }
    
    const deletedTodo = todos.splice(index, 1);
    res.status(200).json({ message: ' deleted successfully ', data: deletedTodo[0] });
});

//server turned on
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});