import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import Project3DCard from './Project3DCard';
import project1Img from '../assets/Gemini_Generated_Image_1e16fa1e16fa1e16.png';
import project2Img from '../assets/Gemini_Generated_Image_4suzul4suzul4suz.png';
import project3Img from '../assets/Gemini_Generated_Image_ej4t10ej4t10ej4t.png';
import './Projects.css';

const Projects = () => {
    const sectionRef = useRef(null);
    const scrollRef = useRef(null);
    const [filter, setFilter] = useState('all');

    // Horizontal scroll logic
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

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
            image: '/projects/branding.jpg'
        },
        {
            id: 5,
            title: 'Social Media Graphics',
            category: 'design',
            description: 'Eye-catching social media posts and promotional graphics for various brands',
            tags: ['Photoshop', 'Social Media', 'Graphics'],
            image: '/projects/social.jpg'
        },
        {
            id: 6,
            title: 'Marketing Posters',
            category: 'design',
            description: 'Creative poster designs for marketing campaigns and events',
            tags: ['Photoshop', 'Illustrator', 'Print Design'],
            image: '/projects/posters.jpg'
        }
    ];

    const categories = [
        { id: 'all', label: 'All Projects' },
        { id: 'web', label: 'Web Development' },
        { id: 'design', label: 'Graphic Design' }
    ];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(project => project.category === filter);

    return (
        <section id="projects" className="section projects" ref={sectionRef}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <h2 className="gradient-text">Featured Work</h2>
                    <p className="section-subtitle">A collection of premium digital experiences</p>
                </motion.div>

                <motion.div
                    className="project-filters"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`filter-btn ${filter === category.id ? 'active' : ''}`}
                            onClick={() => setFilter(category.id)}
                        >
                            {category.label}
                        </button>
                    ))}
                </motion.div>

                <motion.div
                    className="projects-horizontal-container"
                    style={{ x }}
                >
                    <div className="projects-grid">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="project-wrapper"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                                                    Explore <FaExternalLinkAlt />
                                                </motion.a>
                                            )}
                                            {project.github && (
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
