const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const mongoose = require('mongoose');

// In-memory fallback storage if MongoDB Atlas is connecting/offline during initial lab setup
let inMemoryTasks = [
  { id: '1', title: 'Complete Practical 1 (Vite & Components)', description: 'Scaffold React app with reusable Header, About, Skills, Footer', completed: true, priority: 'high', createdAt: new Date() },
  { id: '2', title: 'Complete Practical 2 (Routing & useState)', description: 'Implement React Router v6 & controlled contact form state', completed: true, priority: 'high', createdAt: new Date() },
  { id: '3', title: 'Complete Practical 3 (REST API Fetch)', description: 'Fetch GitHub repos with loading spinner & error handling', completed: true, priority: 'medium', createdAt: new Date() },
  { id: '4', title: 'Complete Practical 4-5 (Express & MongoDB)', description: 'Build Express REST API server with Mongoose validation', completed: false, priority: 'high', createdAt: new Date() },
  { id: '5', title: 'Complete Practical 6-7 (Full Stack & Auth)', description: 'Wire React frontend to Express backend with JWT Auth', completed: false, priority: 'high', createdAt: new Date() }
];

const isDbConnected = () => mongoose.connection.readyState === 1;

// GET /api/tasks - Retrieve all tasks
router.get('/', async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const filter = req.user ? { $or: [{ user: req.user.id }, { user: null }] } : {};
      const tasks = await Task.find(filter).sort({ createdAt: -1 });
      return res.status(200).json(tasks);
    }
    return res.status(200).json(inMemoryTasks);
  } catch (err) {
    next(err);
  }
});

// GET /api/tasks/:id - Retrieve single task by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isDbConnected()) {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ error: `Task not found with ID ${id}` });
      }
      return res.status(200).json(task);
    }

    const found = inMemoryTasks.find(t => t.id === id);
    if (!found) {
      return res.status(404).json({ error: `Task not found with ID ${id}` });
    }
    return res.status(200).json(found);
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks - Create new task
router.post('/', async (req, res, next) => {
  try {
    const { title, description, priority, completed } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Task title is required.' });
    }

    if (isDbConnected()) {
      const newTask = await Task.create({
        title,
        description,
        priority: priority || 'medium',
        completed: Boolean(completed),
        user: req.user ? req.user.id : null
      });
      return res.status(201).json(newTask);
    }

    // In-memory creation
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description || '',
      completed: Boolean(completed),
      priority: priority || 'medium',
      createdAt: new Date()
    };
    inMemoryTasks.unshift(newTask);
    return res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

// PUT /api/tasks/:id - Update existing task
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, completed, priority } = req.body;

    if (isDbConnected()) {
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title, description, completed, priority },
        { new: true, runValidators: true }
      );
      if (!updatedTask) {
        return res.status(404).json({ error: `Task not found with ID ${id}` });
      }
      return res.status(200).json(updatedTask);
    }

    // In-memory update
    const index = inMemoryTasks.findIndex(t => t.id === id);
    if (index === -1) {
      return res.status(404).json({ error: `Task not found with ID ${id}` });
    }

    inMemoryTasks[index] = {
      ...inMemoryTasks[index],
      title: title !== undefined ? title : inMemoryTasks[index].title,
      description: description !== undefined ? description : inMemoryTasks[index].description,
      completed: completed !== undefined ? completed : inMemoryTasks[index].completed,
      priority: priority !== undefined ? priority : inMemoryTasks[index].priority
    };

    return res.status(200).json(inMemoryTasks[index]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const deletedTask = await Task.findByIdAndDelete(id);
      if (!deletedTask) {
        return res.status(404).json({ error: `Task not found with ID ${id}` });
      }
      return res.status(200).json({ message: 'Task deleted successfully', id });
    }

    const index = inMemoryTasks.findIndex(t => t.id === id);
    if (index === -1) {
      return res.status(404).json({ error: `Task not found with ID ${id}` });
    }

    inMemoryTasks.splice(index, 1);
    return res.status(200).json({ message: 'Task deleted successfully', id });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
