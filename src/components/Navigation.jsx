import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navigation.css';

const MagneticNavItem = ({ children, isActive, onClick }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.4);
        y.set((e.clientY - centerY) * 0.4);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.li
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
        >
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    onClick();
                }}
                className={isActive ? 'active' : ''}
            >
                {children}
                {isActive && (
                    <motion.div
                        className="active-indicator"
                        layoutId="nav-active"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                )}
            </a>
        </motion.li>
    );
};

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = ['home', 'about', 'skills', 'projects', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 150 && rect.bottom >= 150;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsMobileMenuOpen(false);
        }
    };

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' }
    ];

    return (
        <motion.nav
            className={`navigation ${isScrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.div className="scroll-progress-bar" style={{ scaleX }} />

            <div className="nav-container">
                <motion.div
                    className="nav-logo"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection('home')}
                >
                    <span className="gradient-text">DB</span>
                </motion.div>

                {/* Desktop Menu */}
                <ul className="nav-menu desktop-menu">
                    {navItems.map((item) => (
                        <MagneticNavItem
                            key={item.id}
                            isActive={activeSection === item.id}
                            onClick={() => scrollToSection(item.id)}
                        >
                            {item.label}
                        </MagneticNavItem>
                    ))}
                </ul>

                {/* Mobile Menu Toggle */}
                <button
                    className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </button>

                {/* Mobile Menu */}
                <motion.div
                    className="mobile-menu-overlay"
                    initial={{ opacity: 0, visibility: 'hidden' }}
                    animate={{
                        opacity: isMobileMenuOpen ? 1 : 0,
                        visibility: isMobileMenuOpen ? 'visible' : 'hidden'
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                <motion.div
                    className="mobile-menu"
                    initial={{ x: '100%' }}
                    animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                >
                    <div className="mobile-menu-content">
                        <ul>
                            {navItems.map((item, index) => (
                                <motion.li
                                    key={item.id}
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={isMobileMenuOpen ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
                                    transition={{ delay: index * 0.1 + 0.2 }}
                                >
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(item.id);
                                        }}
                                        className={activeSection === item.id ? 'active' : ''}
                                    >
                                        <span className="nav-number">0{index + 1}</span>
                                        <span className="nav-label">{item.label}</span>
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
};

export default Navigation;
