import React, { useState } from 'react';
import CustomCheckbox from './CustomCheckbox';
import { motion } from 'framer-motion';
import { format, isPast, isToday } from 'date-fns';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        title: todo.title,
        description: todo.description,
        priority: todo.priority,
        due_date: todo.due_date ? format(new Date(todo.due_date), "yyyy-MM-dd'T'HH:mm") : ''
    });

    const priorityColors = {
        low: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200',
        medium: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200',
        high: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200'
    };

    const handleUpdate = () => {
        onUpdate(todo.id, { ...editData, completed: todo.completed });
        setIsEditing(false);
    };

    const toggleComplete = () => {
        onUpdate(todo.id, { ...todo, completed: !todo.completed });
    };

    const isOverdue = todo.due_date && isPast(new Date(todo.due_date)) && !todo.completed;
    const isDueToday = todo.due_date && isToday(new Date(todo.due_date));

    // Convert MySQL TINYINT to boolean
    const isCompleted = Boolean(todo.completed);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            whileHover={{ scale: 1.02 }}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-3 border-l-4 transition-colors ${isCompleted
                ? 'opacity-60 border-gray-400 dark:border-gray-600'
                : isOverdue
                    ? 'border-red-500'
                    : isDueToday
                        ? 'border-yellow-500'
                        : 'border-indigo-500'
                }`}
        >
            {isEditing ? (
                <div className="space-y-3">
                    <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <textarea
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
                        rows="2"
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <select
                            value={editData.priority}
                            onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                            className="px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <input
                            type="datetime-local"
                            value={editData.due_date}
                            onChange={(e) => setEditData({ ...editData, due_date: e.target.value })}
                            className="px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleUpdate}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                        >
                            Save
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 dark:text-white rounded-lg"
                        >
                            Cancel
                        </motion.button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                            {/* Custom Styled Checkbox */}
                            <label className="relative inline-flex items-center cursor-pointer mt-1">
                                <CustomCheckbox
                                    checked={isCompleted}
                                    onChange={toggleComplete}
                                />
                                <div className="w-6 h-6 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all duration-200 flex items-center justify-center">
                                    {/* Checkmark SVG */}
                                    <svg
                                        className={`w-4 h-4 text-white transition-opacity duration-200 ${isCompleted ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                            </label>

                            <div className="flex-1">
                                <h3 className={`text-lg font-semibold transition-all ${isCompleted
                                    ? 'line-through text-gray-500 dark:text-gray-400'
                                    : 'text-gray-800 dark:text-white'
                                    }`}>
                                    {todo.title}
                                </h3>
                                {todo.description && (
                                    <p className={`text-sm mt-1 transition-all ${isCompleted
                                        ? 'line-through text-gray-400 dark:text-gray-500'
                                        : 'text-gray-600 dark:text-gray-300'
                                        }`}>
                                        {todo.description}
                                    </p>
                                )}
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${priorityColors[todo.priority]}`}>
                                        {todo.priority}
                                    </span>
                                    {todo.due_date && (
                                        <span className={`text-xs px-2 py-1 rounded ${isOverdue
                                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                            : isDueToday
                                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                            }`}>
                                            📅 {format(new Date(todo.due_date), 'MMM d, h:mm a')}
                                            {isOverdue && ' (Overdue)'}
                                            {isDueToday && ' (Today)'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsEditing(true)}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 text-xl"
                                title="Edit task"
                            >
                                ✏️
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onDelete(todo.id)}
                                className="text-red-600 dark:text-red-400 hover:text-red-800 text-xl"
                                title="Delete task"
                            >
                                🗑️
                            </motion.button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default TodoItem;
