const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authenticateToken = require('../middleware/auth');

// All routes are protected
router.get('/', authenticateToken, todoController.getTodos);
router.post('/', authenticateToken, todoController.createTodo);
router.put('/:id', authenticateToken, todoController.updateTodo);
router.delete('/:id', authenticateToken, todoController.deleteTodo);

module.exports = router;
