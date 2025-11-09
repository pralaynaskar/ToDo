import React from 'react';
import { motion } from 'framer-motion';

const CustomCheckbox = ({ checked, onChange, disabled = false }) => {
    return (
        <motion.label
            className="relative inline-flex items-center cursor-pointer"
            whileTap={{ scale: 0.95 }}
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="sr-only peer"
            />
            <motion.div
                className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all duration-200 ${checked
                        ? 'bg-indigo-600 border-indigo-600'
                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                animate={{
                    scale: checked ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.2 }}
            >
                <motion.svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: checked ? 1 : 0,
                        opacity: checked ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                    />
                </motion.svg>
            </motion.div>
        </motion.label>
    );
};

export default CustomCheckbox;
