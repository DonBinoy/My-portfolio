import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('developer');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionColor, setTransitionColor] = useState('#0A0A0A');

    // Prevent multiple rapid toggles
    const isLocked = useRef(false);

    const toggleTheme = async () => {
        if (isLocked.current || isTransitioning) {
            console.log("⚠️ Theme toggle ignored — locked or already transitioning");
            return;
        }

        try {
            isLocked.current = true;
            console.log("🏁 Starting theme transition");

            const nextTheme = theme === 'developer' ? 'designer' : 'developer';
            const nextColor = nextTheme === 'designer' ? '#F9F8F4' : '#0A0A0A';

            // 1. Set color and start entrance
            setTransitionColor(nextColor);
            setIsTransitioning(true);

            // Helper to wait
            const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

            // 2. Wait for entrance to cover screen
            await wait(800); // Entrance animation duration

            // 3. Change Theme
            console.log("🎨 Applying new theme");
            setTheme(nextTheme);

            // 4. Short pause to let theme settle
            await wait(100);

            // 5. End Transition (allow exit animation to start)
            console.log("🛑 Signal Exit");
            setIsTransitioning(false);

            // 6. Unlock after exit animation should be done
            await wait(600); // Exit animation duration
            console.log("✅ Transition sequence finished");
        } catch (error) {
            console.error("❌ Error during theme transition:", error);
            // Force reset in case of error
            setIsTransitioning(false);
        } finally {
            isLocked.current = false;
        }
    };

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        // Optional: also add class for easier targeting
        document.body.className = `theme-${theme}`;
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
                isTransitioning,
                transitionColor,
                isDark: theme === 'developer'
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};