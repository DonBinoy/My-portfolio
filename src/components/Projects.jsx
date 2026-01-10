import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import Project3DCard from './Project3DCard';
import project1Img from '../assets/ab1(2).png';
import project2Img from '../assets/ab1(3).png';
import project3Img from '../assets/ab1(4).png';
import project4Img from '../assets/ab1(5).png';
import project5Img from '../assets/ab1(6).png';
import project6Img from '../assets/ab1(7).png';
import project7Img from '../assets/ab1(8).png';
import project8Img from '../assets/ab1(9).png';
import project9Img from '../assets/ab1(10).png';
import project10Img from '../assets/ab1(11).png';
import project11Img from '../assets/ab1(12).png';

import './Projects.css';

const projects = [
    {
        id: 1,
        title: 'Precision Pharma',
        category: 'web',
        description: 'Advanced healthcare analytics platform with real-time data visualization and machine learning integration.',
        tags: ['React', 'D3.js', 'Pharma'],
        image: project1Img,
        link: '#',
        github: '#'
    },
    {
        id: 2,
        title: 'Stride Tech',
        category: 'web',
        description: 'Biometric sports performance tracking dashboard for elite athletes and clinical researchers.',
        tags: ['React', 'Three.js', 'SportsTech'],
        image: project2Img,
        link: '#',
        github: '#'
    },
    {
        id: 3,
        title: 'DriveOps AI',
        category: 'web',
        description: 'Intelligent automotive testing and object tracking suite for autonomous vehicle development.',
        tags: ['React', 'WebGL', 'AI'],
        image: project3Img,
        link: '#',
        github: '#'
    },
    {
        id: 4,
        title: 'Brand Identity Design',
        category: 'design',
        description: 'Complete brand identity package including logo, color palette, and brand guidelines',
        tags: ['Illustrator', 'Branding', 'Design'],
        image: project4Img
    },
    {
        id: 5,
        title: 'Social Media Graphics',
        category: 'design',
        description: 'Eye-catching social media posts and promotional graphics for various brands',
        tags: ['Photoshop', 'Social Media', 'Graphics'],
        image: project5Img
    },
    {
        id: 6,
        title: 'Marketing Posters',
        category: 'design',
        description: 'Creative poster designs for marketing campaigns and events',
        tags: ['Photoshop', 'Illustrator', 'Print Design'],
        image: project6Img
    },
    {
        id: 7,
        title: 'Digital Illustration',
        category: 'design',
        description: 'Custom character and landscape illustrations for digital media and gaming.',
        tags: ['Concept Art', 'Procreate', 'Illustration'],
        image: project7Img
    },
    {
        id: 8,
        title: 'E-commerce Redesign',
        category: 'web',
        description: 'Full-scale UX overhaul for a major fashion retailer, focusing on mobile-first conversion.',
        tags: ['Next.js', 'PostgreSQL', 'UX Design'],
        image: project8Img
    },
    {
        id: 9,
        title: 'App Dashboard UI',
        category: 'design',
        description: 'Sleek, data-rich management interface for a fintech startup SaaS platform.',
        tags: ['Figma', 'UI Design', 'Fintech'],
        image: project9Img
    },
    {
        id: 10,
        title: 'AI Photo Editor',
        category: 'web',
        description: 'Advanced browser-based photo editing tool with AI-powered background removal and filter generation.',
        tags: ['TensorFlow.js', 'React', 'Cloudinary'],
        image: project10Img
    },
    {
        id: 11,
        title: 'Modern Coffee Shop',
        category: 'design',
        description: 'Sleek branding and menu design for a specialty coffee roaster focusing on sustainability.',
        tags: ['InDesign', 'Branding', 'Print'],
        image: project11Img
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
    React.useEffect(() => {
        const updateScrollRange = () => {
            if (scrollRef.current && sectionRef.current) {
                const scrollWidth = scrollRef.current.scrollWidth;
                const clientWidth = window.innerWidth;
                const range = scrollWidth - clientWidth + 50;
                setScrollRange(range > 0 ? range : 0);
            }
        };

        // Delay measure slightly to allow AnimatePresence to settle
        const timer = setTimeout(updateScrollRange, 100);
        window.addEventListener('resize', updateScrollRange);

        return () => {
            window.removeEventListener('resize', updateScrollRange);
            clearTimeout(timer);
        }
    }, [filteredProjects, theme]); // Re-calculate when projects change

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["100px", `-${scrollRange}px`]);

    return (
        <section id="projects" className="section projects" ref={sectionRef}>
            <div className="projects-sticky-wrapper">
                <div className="container">
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
                                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="project-card glass-card">
                                    <div className="project-3d-visual">
                                        <Project3DCard image={project.image} title={project.title} />
                                    </div>

                                    <div className="project-content">
                                        <h3 className="project-title">{project.title}</h3>
                                        <p className="project-description">{project.description}</p>
                                        <div className="project-tags">
                                            {project.tags.map((tag, i) => (
                                                <span key={i} className="tag">{tag}</span>
                                            ))}
                                        </div>
                                        <div className="project-actions">
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
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
