import { useEffect, useState } from 'react';

const useDarkMode = () => {
    const [isDark, setIsDark] = useState(() => {
        // Check localStorage or system preference
        const saved = localStorage.getItem('dark-mode');
        if (saved !== null) {
            return saved === 'true';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('dark-mode', 'true');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('dark-mode', 'false');
        }
    }, [isDark]);

    return [isDark, setIsDark];
};

export default useDarkMode;
