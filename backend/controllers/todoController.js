const db = require('../config/db');

// Helper function to convert MySQL boolean to JavaScript boolean
const convertTodos = (todos) => {
    return todos.map(todo => ({
        ...todo,
        completed: Boolean(todo.completed),
        reminder: Boolean(todo.reminder)
    }));
};

// Get all todos for user
exports.getTodos = (req, res) => {
    const userId = req.user.id;

    db.query(
        'SELECT * FROM todos WHERE user_id = ? ORDER BY due_date ASC, created_at DESC',
        [userId],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            // Convert TINYINT to boolean
            res.json(convertTodos(results));
        }
    );
};

// Create new todo
exports.createTodo = (req, res) => {
    const { title, description, priority, due_date } = req.body;
    const userId = req.user.id;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    db.query(
        'INSERT INTO todos (user_id, title, description, priority, due_date) VALUES (?, ?, ?, ?, ?)',
        [userId, title, description, priority || 'medium', due_date || null],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                id: result.insertId,
                title,
                description,
                priority: priority || 'medium',
                due_date: due_date || null,
                completed: false
            });
        }
    );
};

// Update todo
exports.updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, description, completed, priority, due_date } = req.body;
    const userId = req.user.id;

    // Convert boolean to TINYINT for MySQL
    const completedValue = completed ? 1 : 0;

    db.query(
        'UPDATE todos SET title = ?, description = ?, completed = ?, priority = ?, due_date = ? WHERE id = ? AND user_id = ?',
        [title, description, completedValue, priority, due_date, id, userId],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Todo not found' });
            }
            res.json({
                message: 'Todo updated successfully',
                completed: Boolean(completed)
            });
        }
    );
};

// Delete todo
exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    db.query(
        'DELETE FROM todos WHERE id = ? AND user_id = ?',
        [id, userId],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Todo not found' });
            }
            res.json({ message: 'Todo deleted successfully' });
        }
    );
};
