import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const ROLES = [
    "DEVELOPER",
    "DESIGNER",
    "PROBLEM SOLVER",
    "UX ENGINEER",
    "CREATIVE",
    "ARCHITECT",
    "STRATEGIST",
    "INNOVATOR"
];

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        let rafId;
        let startTime = performance.now();
        const duration = 2500; // Minimum 2.5s for premium feel

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const targetProgress = Math.min((elapsed / duration) * 100, 100);

            setProgress(prev => {
                // Smoothly interpolate towards target
                const smoother = prev + (targetProgress - prev) * 0.1;
                if (smoother >= 99.9) {
                    if (!isExiting) {
                        setTimeout(() => setIsExiting(true), 400);
                    }
                    return 100;
                }
                return smoother;
            });

            rafId = requestAnimationFrame(update);
        };

        rafId = requestAnimationFrame(update);

        // Reel Timer
        const reelTimer = setInterval(() => {
            setCurrentRoleIndex(prev => (prev + 1) % ROLES.length);
        }, 120);

        return () => {
            cancelAnimationFrame(rafId);
            clearInterval(reelTimer);
        };
    }, [isExiting]);

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {!isExiting && (
                <motion.div
                    className="preloader-reel-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                >
                    {/* Split Reveal Backgrounds */}
                    <motion.div
                        className="reveal-shutter left"
                        exit={{ x: '-100%' }}
                        transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
                    />
                    <motion.div
                        className="reveal-shutter right"
                        exit={{ x: '100%' }}
                        transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
                    />

                    <div className="preloader-reel-content">
                        <div className="percentage-display">
                            {Math.floor(progress).toString().padStart(2, '0')}
                        </div>

                        <div className="reel-mask">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentRoleIndex}
                                    initial={{ y: '100%', opacity: 0 }}
                                    animate={{ y: '0%', opacity: 1 }}
                                    exit={{ y: '-100%', opacity: 0 }}
                                    transition={{ duration: 0.1, ease: "linear" }}
                                    className="reel-text"
                                >
                                    {progress < 100 ? ROLES[currentRoleIndex] : "DON BINOY"}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="loading-bar-minimal">
                            <motion.div
                                className="loading-bar-progress"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    <div className="noise-texture"></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
