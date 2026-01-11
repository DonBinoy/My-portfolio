import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaPaintBrush } from 'react-icons/fa';
import './components/PersonaSwitcher.css';

const FloatingPersonaSwitcher = () => {
    const { theme, toggleTheme } = useTheme();
    const [showTooltip, setShowTooltip] = React.useState(true);

    // Hide tooltip after first interaction
    const handleToggle = () => {
        setShowTooltip(false);
        toggleTheme();
    };

    return (
        <motion.button
            className={`persona-switcher ${theme}`}
            onClick={handleToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
        >
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        className="personality-tooltip"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                    >
                        I have a split personality! 🤪 Click to switch.
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="switcher-icon">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={theme}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {theme === 'developer' ? <FaCode /> : <FaPaintBrush />}
                    </motion.div>
                </AnimatePresence>
            </div>
            <span className="switcher-label">
                {theme === 'developer' ? 'Developer Mode' : 'Designer Mode'}
            </span>
        </motion.button>
    );
};

import Preloader from './components/Preloader';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProjectDetails from './pages/ProjectDetails';
import AboutDetails from './pages/AboutDetails';
import ScrollToTop from './components/ScrollToTop';

const AppContent = () => {
    useSmoothScroll();
    const { theme } = useTheme();

    return (
        <div className="App">
            <CustomCursor />
            <Navigation />
            <FloatingPersonaSwitcher />
            <main>
                <Routes>
                    <Route path="/" element={
                        <>
                            <Hero />
                            <Projects />
                            <About />
                            <Skills />
                            <Contact />
                        </>
                    } />
                    <Route
                        path="/project/:id"
                        element={theme === 'developer' ? <ProjectDetails /> : <Navigate to="/" replace />}
                    />
                    <Route
                        path="/about-details"
                        element={<AboutDetails />}
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

function App() {
    const [isLoading, setIsLoading] = React.useState(true);

    return (
        <ThemeProvider>
            <Router>
                <ScrollToTop />
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
                    ) : (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <AppContent />
                        </motion.div>
                    )}
                </AnimatePresence>
            </Router>
        </ThemeProvider>
    );
}

export default App;
