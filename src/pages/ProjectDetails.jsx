import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../components/Projects';
import { FaArrowLeft, FaExternalLinkAlt, FaGithub, FaLayerGroup, FaCodeBranch, FaMagic } from 'react-icons/fa';
import './ProjectDetails.css';

const ProjectDetails = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === parseInt(id));

    if (!project) {
        return (
            <div className="error-page">
                <h2>Project Not Found</h2>
                <Link to="/" className="btn btn-primary">Back Home</Link>
            </div>
        );
    }

    return (
        <motion.div
            className="project-details-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <div className="details-container">
                <Link to="/#projects" className="back-link">
                    <FaArrowLeft /> Back to Portfolio
                </Link>

                <header className="details-header">
                    <motion.h1
                        className="gradient-text project-details-title"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {project.title}
                    </motion.h1>
                    <div className="details-meta">
                        <span className="details-category"><FaLayerGroup /> {project.category}</span>
                        <div className="details-tags">
                            {project.tags.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </header>

                <div className="details-grid">
                    <div className="details-visual">
                        <div className="main-image-wrapper glass-card">
                            <img src={project.image} alt={project.title} />
                        </div>
                    </div>

                    <div className="details-content">
                        <section className="details-section">
                            <h3><FaMagic /> Overview</h3>
                            <p className="description-large">{project.description}</p>
                            <p>
                                This project was built with a focus on high performance, clean architecture,
                                and immersive user experience. As part of a larger digital ecosystem,
                                it demonstrates the potential of modern web technologies to solve complex problems.
                            </p>
                        </section>

                        <section className="details-section">
                            <h3><FaCodeBranch /> Key Features</h3>
                            <ul className="features-list">
                                <li>Responsive & Adaptive design for all screen sizes.</li>
                                <li>Performance optimized assets and rendering.</li>
                                <li>Integrated with modern backend/AI services where applicable.</li>
                                <li>Focus on accessibility and semantic HTML structures.</li>
                            </ul>
                        </section>

                        <div className="details-actions">
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    View Live Site <FaExternalLinkAlt />
                                </a>
                            )}
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                                    Source Code <FaGithub />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectDetails;
