const Todo = require('../models/todo');

// Skapa en ny TODO
exports.createTodo = async (req, res) => {
  const { title, completed } = req.body;
  try {
    const newTodo = new Todo({
      title,
      completed
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: 'Error creating todo', error });
  }
};

// Hämta alla TODOs
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error });
  }
};

// Hämta en specifik TODO
exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todo', error });
  }
};

// Uppdatera en TODO
exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: 'Error updating todo', error });
  }
};

// Ta bort en TODO
exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error });
  }
};
