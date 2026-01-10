import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeTransition = () => {
    const { isTransitioning, transitionColor } = useTheme();

    return (
        <AnimatePresence>
            {isTransitioning && (
                <motion.div
                    key="theme-transition-overlay"
                    className="theme-transition-overlay"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 9999,
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <motion.div
                        initial={{
                            clipPath: "circle(0% at 50% 50%)",
                        }}
                        animate={{
                            clipPath: "circle(150% at 50% 50%)",
                            transition: {
                                duration: 0.8,
                                ease: [0.645, 0.045, 0.355, 1.000] // easeInOutCubic
                            }
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: transitionColor,
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ThemeTransition;