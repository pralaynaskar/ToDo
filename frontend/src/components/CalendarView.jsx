import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isSameDay } from 'date-fns';

const CalendarView = ({ todos, onDateSelect }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onDateSelect(date);
    };

    // Get todos for selected date
    const todosForDate = todos.filter(todo => {
        if (!todo.due_date) return false;
        return isSameDay(new Date(todo.due_date), selectedDate);
    });

    // Add dots to calendar tiles for dates with todos
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const hasTodos = todos.some(todo =>
                todo.due_date && isSameDay(new Date(todo.due_date), date)
            );
            if (hasTodos) {
                return <div className="flex justify-center mt-1">
                    <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></div>
                </div>;
            }
        }
        return null;
    };

    const priorityColors = {
        low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calendar */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
            >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Calendar View
                </h2>
                <div className="calendar-wrapper">
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        tileContent={tileContent}
                        className="border-0 rounded-lg dark:bg-gray-700"
                    />
                </div>
            </motion.div>

            {/* Tasks for selected date */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
            >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Tasks for {format(selectedDate, 'MMMM d, yyyy')}
                </h2>

                <AnimatePresence>
                    {todosForDate.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-12 text-gray-500 dark:text-gray-400"
                        >
                            <p>No tasks scheduled for this day 📅</p>
                        </motion.div>
                    ) : (
                        <div className="space-y-3">
                            {todosForDate.map((todo) => (
                                <motion.div
                                    key={todo.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`p-4 rounded-lg border-l-4 ${todo.completed
                                            ? 'bg-gray-100 dark:bg-gray-700 border-gray-400'
                                            : 'bg-white dark:bg-gray-900 border-indigo-500'
                                        }`}
                                >
                                    <h3 className={`font-semibold ${todo.completed
                                            ? 'line-through text-gray-500 dark:text-gray-400'
                                            : 'text-gray-800 dark:text-white'
                                        }`}>
                                        {todo.title}
                                    </h3>
                                    {todo.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                            {todo.description}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[todo.priority]}`}>
                                            {todo.priority}
                                        </span>
                                        {todo.due_date && (
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                🕐 {format(new Date(todo.due_date), 'h:mm a')}
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default CalendarView;
