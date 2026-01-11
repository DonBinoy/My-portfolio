import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // Initialize from localStorage or default to 'developer'
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('portfolio-theme');
        return savedTheme || 'developer';
    });

    // Prevent multiple rapid toggles
    const isLocked = useRef(false);

    const toggleTheme = () => {
        if (isLocked.current) return;

        // Brief lock to prevent double clicks, but no long transition
        isLocked.current = true;

        setTheme(prevTheme => {
            const next = prevTheme === 'developer' ? 'designer' : 'developer';
            localStorage.setItem('portfolio-theme', next);
            return next;
        });

        // Release lock almost immediately
        setTimeout(() => {
            isLocked.current = false;
        }, 100);
    };

    useEffect(() => {
        // Sync theme to body attribute and class
        document.body.setAttribute('data-theme', theme);

        // Safer class management: only toggle the theme-specific classes
        document.body.classList.remove('theme-developer', 'theme-designer');
        document.body.classList.add(`theme-${theme}`);
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
                isDark: theme === 'developer'
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
