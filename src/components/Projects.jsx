import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Project3DCard from './Project3DCard';

import project1Img from '../assets/secondskin.jpg';
import project2Img from '../assets/4dotss.jpg';
import project3Img from '../assets/spicekollar1.jpg';
import project4Img from '../assets/daveai.jpg';




import './Projects.css';

export const projects = [
    {
        id: 1,
        title: 'SecondSkinStyle',
        category: 'web',
        description: 'A premium B2B platform delivering custom apparel and branding solutions with a focus on enterprise-grade performance.',
        tags: ['React', 'Next.js', 'Framer'],
        image: project1Img,
        link: 'https://business.secondskinstyle.com/',
    },
    {
        id: 2,
        title: '4dots',
        category: 'web',
        description: 'An advanced online printing hub enabling seamless print order management and customization.',
        tags: ['React', 'Next.js', 'Redux'],
        image: project2Img,
        link: 'https://4dots.in',
    },
    {
        id: 3,
        title: 'SpiceKollar',
        category: 'web',
        description: 'A dedicated B2B spice marketplace connecting global traders with transparent logistics and secure payments.',
        tags: ['React', 'Vite', 'Firebase'],
        image: project3Img,
        link: 'https://spicekollar.netlify.app/',
    },
    {
        id: 4,
        title: 'Dave AI',
        category: 'design',
        description: 'Intelligent AI virtual assistant powered by Gemini for conversational support and automated task handling.',
        tags: ['React', 'Gemini', 'Motion'],
        image: project4Img,
        link: 'https://daveai.netlify.app/',
    },
    {
        id: 5,
        title: 'Social Media Graphics',
        category: 'design',
        description: 'Eye-catching social media posts and promotional graphics for various brands',
        tags: ['Photoshop', 'Social Media', 'Graphics'],
        image: 'https://picsum.photos/seed/p5/800/600'
    },
    {
        id: 6,
        title: 'Marketing Posters',
        category: 'design',
        description: 'Creative poster designs for marketing campaigns and events',
        tags: ['Photoshop', 'Illustrator', 'Print Design'],
        image: 'https://picsum.photos/seed/p6/800/600',
        github: '#'
    },
    {
        id: 7,
        title: 'Digital Illustration',
        category: 'design',
        description: 'Custom character and landscape illustrations for digital media and gaming.',
        tags: ['Concept Art', 'Procreate', 'Illustration'],
        image: 'https://picsum.photos/seed/p7/800/600'
    },
    {
        id: 8,
        title: 'E-commerce Redesign',
        category: 'web',
        description: 'Full-scale UX overhaul for a major fashion retailer, focusing on mobile-first conversion.',
        tags: ['Next.js', 'PostgreSQL', 'UX Design'],
        image: 'https://picsum.photos/seed/p8/800/600'
    },
    {
        id: 9,
        title: 'App Dashboard UI',
        category: 'design',
        description: 'Sleek, data-rich management interface for a fintech startup SaaS platform.',
        tags: ['Figma', 'UI Design', 'Fintech'],
        image: 'https://picsum.photos/seed/p9/800/600'
    },
    {
        id: 10,
        title: 'AI Photo Editor',
        category: 'web',
        description: 'Advanced browser-based photo editing tool with AI-powered background removal and filter generation.',
        tags: ['TensorFlow.js', 'React', 'Cloudinary'],
        image: 'https://picsum.photos/seed/p10/800/600'
    },
    {
        id: 11,
        title: 'Modern Coffee Shop',
        category: 'design',
        description: 'Sleek branding and menu design for a specialty coffee roaster focusing on sustainability.',
        tags: ['InDesign', 'Branding', 'Print'],
        image: 'https://picsum.photos/seed/p11/800/600'
    }
];

import { useTheme } from '../context/ThemeContext';
import { AnimatePresence } from 'framer-motion';

const Projects = () => {
    const sectionRef = useRef(null);
    const scrollRef = useRef(null);
    const { theme } = useTheme();

    // Filter projects based on theme - DISABLED for unified content
    const filteredProjects = projects;
    /* 
    const filteredProjects = projects.filter(project => {
        if (theme === 'developer') return project.category === 'web';
        if (theme === 'designer') return project.category === 'design';
        return true;
    });
    */

    // Dynamic horizontal scroll logic
    const [scrollRange, setScrollRange] = useState(0);

    // Measure the actual width of the scrollable content
    React.useLayoutEffect(() => {
        const updateScrollRange = () => {
            if (scrollRef.current) {
                const scrollWidth = scrollRef.current.scrollWidth;
                const clientWidth = window.innerWidth;
                const range = Math.max(0, scrollWidth - clientWidth + 100);
                setScrollRange(range);
            }
        };

        // Multiple measurements to catch dynamic layout changes
        const timer1 = setTimeout(updateScrollRange, 100);
        const timer2 = setTimeout(updateScrollRange, 1000);
        window.addEventListener('resize', updateScrollRange);

        return () => {
            window.removeEventListener('resize', updateScrollRange);
            clearTimeout(timer1);
            clearTimeout(timer2);
        }
    }, [filteredProjects, theme]);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Start from 0 to prevent the 'stuck' initial offset glitch
    const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${scrollRange}px`]);

    return (
        <section id="projects" className="section projects" ref={sectionRef}>
            <div className="projects-sticky-wrapper">
                <div className="container" id="projects-header">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="section-header"
                    >
                        <h2 className="gradient-text">
                            {theme === 'developer' ? 'Featured Code' : 'Design Gallery'}
                        </h2>
                        <p className="section-subtitle">
                            {theme === 'developer'
                                ? 'Building scalable digital solutions'
                                : 'Crafting visual identities and experiences'}
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className="projects-horizontal-container"
                    style={{ x }}
                    ref={scrollRef}
                >
                    <div className="projects-grid">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="project-wrapper"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.05 }}
                            >
                                <div className="project-card glass-card">
                                    <div className="project-3d-visual">
                                        <Project3DCard image={project.image} title={project.title} />
                                    </div>

                                    <div className="project-content">
                                        <h3 className="project-title">{project.title}</h3>
                                        <p className="project-description">{project.description}</p>
                                        <div className="project-footer">
                                            <div className="project-tags">
                                                {project.tags.map((tag, i) => (
                                                    <span key={i} className="tag">{tag}</span>
                                                ))}
                                            </div>
                                            <div className="project-actions">
                                                {theme === 'developer' && (
                                                    <Link
                                                        to={`/project/${project.id}`}
                                                        className="btn btn-outline btn-sm details-btn"
                                                    >
                                                        View Details →
                                                    </Link>
                                                )}
                                                {project.link && (
                                                    <motion.a
                                                        href={project.link}
                                                        className="btn btn-primary btn-sm"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        {theme === 'developer' ? 'Live Demo' : 'View Project'} <FaExternalLinkAlt />
                                                    </motion.a>
                                                )}
                                                {project.github && theme === 'developer' && (
                                                    <motion.a
                                                        href={project.github}
                                                        className="btn btn-outline btn-sm"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Code <FaGithub />
                                                    </motion.a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
