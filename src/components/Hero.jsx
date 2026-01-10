import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import Hero3D from './Hero3D';
import './Hero.css';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
    const { theme } = useTheme();

    const content = {
        developer: {
            title: "Don Binoy",
            subtitle: "Frontend Developer & UX Engineer",
            description: "Crafting scalable, high-performance digital applications with modern web technologies."
        },
        designer: {
            title: "Don Binoy",
            subtitle: "Frontend Developer & UX Engineer",
            description: "Crafting scalable, high-performance digital applications with modern web technologies."
        }
    };

    const { title, subtitle, description } = content[theme];

    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const charVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100
            }
        }
    };

    return (
        <section id="home" className="hero">
            <Hero3D />

            <div className="hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="hero-greeting">Hello, I'm</p>
                </motion.div>

                <motion.div
                    // Removed key={theme} to prevent remounting/fading
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h1
                        className="hero-title"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {title.split('').map((char, index) => (
                            <motion.span key={index} variants={charVariants}>
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {subtitle}
                    </motion.p>

                    <motion.p
                        className="hero-description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {description}
                    </motion.p>
                </motion.div>

                <motion.div
                    className="hero-cta"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                >
                    <motion.a
                        href="#projects"
                        className="btn btn-primary"
                        whileHover={{ scale: 1.05, x: 5, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View My Work
                    </motion.a>
                    <motion.a
                        href="#contact"
                        className="btn btn-outline"
                        whileHover={{ scale: 1.05, x: -5, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get In Touch
                    </motion.a>
                </motion.div>

                <motion.div
                    className="scroll-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                    onClick={scrollToAbout}
                >
                    <FaArrowDown className="scroll-icon" />
                    <span>Scroll Down</span>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
