import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { todoAPI } from '../utils/api';
import TodoItem from '../components/TodoItem';
import CalendarView from '../components/CalendarView';
import ThemeToggle from '../components/ThemeToggle';
import { format } from 'date-fns';

const TodoDashboard = ({ onLogout }) => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({
        title: '',
        description: '',
        priority: 'medium',
        due_date: ''
    });
    const [filter, setFilter] = useState('all');
    const [view, setView] = useState('list'); // 'list' or 'calendar'
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await todoAPI.getTodos();
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!newTodo.title.trim()) return;

        try {
            const response = await todoAPI.createTodo(newTodo);
            setTodos([response.data, ...todos]);
            setNewTodo({ title: '', description: '', priority: 'medium', due_date: '' });
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const handleUpdateTodo = async (id, updatedData) => {
        try {
            await todoAPI.updateTodo(id, updatedData);
            setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updatedData } : todo));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await todoAPI.deleteTodo(id);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 transition-colors">
            <div className="max-w-6xl mx-auto py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6 transition-colors"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                                Welcome, {user?.username}! 👋
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">
                                {format(new Date(), 'EEEE, MMMM d, yyyy')}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onLogout}
                                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Logout
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Add Todo Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6 transition-colors"
                >
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Add New Task</h2>
                    <form onSubmit={handleAddTodo} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="Task title..."
                                value={newTodo.title}
                                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                                className="px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                required
                            />
                            <select
                                value={newTodo.priority}
                                onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
                                className="px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="low">Low Priority</option>
                                <option value="medium">Medium Priority</option>
                                <option value="high">High Priority</option>
                            </select>
                            <input
                                type="datetime-local"
                                value={newTodo.due_date}
                                onChange={(e) => setNewTodo({ ...newTodo, due_date: e.target.value })}
                                className="px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                        <textarea
                            placeholder="Description (optional)..."
                            value={newTodo.description}
                            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            rows="2"
                        />
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                        >
                            Add Task
                        </motion.button>
                    </form>
                </motion.div>

                {/* View Toggle and Filters */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-2 mb-6"
                >
                    {/* View Toggle */}
                    <div className="flex gap-2 mr-auto">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setView('list')}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${view === 'list'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            📋 List
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setView('calendar')}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${view === 'calendar'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            📅 Calendar
                        </motion.button>
                    </div>

                    {/* Filter Buttons */}
                    {view === 'list' && (
                        <>
                            {['all', 'active', 'completed'].map((filterType) => (
                                <motion.button
                                    key={filterType}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setFilter(filterType)}
                                    className={`px-6 py-2 rounded-lg font-semibold capitalize transition ${filter === filterType
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    {filterType}
                                </motion.button>
                            ))}
                        </>
                    )}
                </motion.div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    {view === 'calendar' ? (
                        <motion.div
                            key="calendar"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <CalendarView
                                todos={todos}
                                onDateSelect={(date) => console.log('Selected date:', date)}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                    Your Tasks ({filteredTodos.length})
                                </h2>
                            </div>

                            <AnimatePresence>
                                {filteredTodos.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-md"
                                    >
                                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                                            No tasks found. Add one to get started! 🚀
                                        </p>
                                    </motion.div>
                                ) : (
                                    filteredTodos.map((todo) => (
                                        <TodoItem
                                            key={todo.id}
                                            todo={todo}
                                            onUpdate={handleUpdateTodo}
                                            onDelete={handleDeleteTodo}
                                        />
                                    ))
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TodoDashboard;
