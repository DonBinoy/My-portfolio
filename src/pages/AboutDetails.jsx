import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaArrowLeft, FaSuitcase, FaGraduationCap, FaTools,
    FaCode, FaPaintBrush, FaDownload, FaEnvelope,
    FaLinkedin, FaGithub, FaAward, FaGlobe, FaTwitter
} from 'react-icons/fa';
import './AboutDetails.css';

const AboutDetails = () => {
    const personalInfo = {
        name: "Don Binoy",
        title: "Creative Developer & UI/UX Designer",
        email: "hello@donbinoy.com",
        summary: "I build high-performance web applications and immersive digital experiences. Expert in bridging the gap between sophisticated design and robust engineering, specializing in React, Next.js, and modern CSS architectures."
    };

    const experiences = [
        {
            title: "Senior Full-stack Developer",
            company: "Tech Mahindra",
            period: "2022 - Present",
            achievements: ["Led enterprise-level dashboard dev", "Architected micro-frontend systems", "Mentored 5+ junior developers"]
        },
        {
            title: "UI/UX Designer",
            company: "Design Hub",
            period: "2020 - 2022",
            achievements: ["Built award-winning UI systems", "Reduced design-to-code time by 50%"]
        }
    ];

    const expertise = [
        { name: "Frontend", level: "95%", icon: <FaCode />, skills: ["React", "Next.js", "Three.js"] },
        { name: "Design", level: "90%", icon: <FaPaintBrush />, skills: ["Figma", "Motion", "UI/UX"] },
        { name: "Backend", level: "85%", icon: <FaTools />, skills: ["Node.js", "Python", "Prisma"] }
    ];

    return (
        <motion.div
            className="about-details-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="bento-container">
                <nav className="bento-nav">
                    <Link to="/#about" className="back-link">
                        <FaArrowLeft /> Back
                    </Link>
                    <button className="download-cta">
                        <FaDownload /> Resume
                    </button>
                </nav>

                <div className="bento-grid">
                    {/* 1. Hero / Bio Tile */}
                    <motion.div
                        className="bento-tile bento-hero glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="tile-content">
                            <h1 className="gradient-text">{personalInfo.name}</h1>
                            <p className="hero-title">{personalInfo.title}</p>
                            <p className="hero-summary">{personalInfo.summary}</p>
                            <div className="social-links">
                                <a href="#"><FaLinkedin /></a>
                                <a href="#"><FaGithub /></a>
                                <a href="#"><FaEnvelope /></a>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. Expertise Tile */}
                    <motion.div
                        className="bento-tile bento-skills glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="tile-title"><FaTools /> Expertise</h3>
                        <div className="skills-grid-bento">
                            {expertise.map((item, i) => (
                                <div key={i} className="skill-item-bento">
                                    <div className="skill-header">
                                        <span>{item.icon} {item.name}</span>
                                        <span className="level">{item.level}</span>
                                    </div>
                                    <div className="skill-bar"><motion.div initial={{ width: 0 }} whileInView={{ width: item.level }} className="bar-fill"></motion.div></div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 3. Experience Tile */}
                    <motion.div
                        className="bento-tile bento-exp glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="tile-title"><FaSuitcase /> Experience</h3>
                        <div className="exp-timeline-bento">
                            {experiences.map((exp, i) => (
                                <div key={i} className="exp-item-bento">
                                    <span className="exp-period-bento">{exp.period}</span>
                                    <h4>{exp.title}</h4>
                                    <p>{exp.company}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 4. Education Tile */}
                    <motion.div
                        className="bento-tile bento-edu glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="tile-title"><FaGraduationCap /> Education</h3>
                        <div className="edu-content-bento">
                            <h4>B.Tech in CS</h4>
                            <p>KTU University</p>
                            <span className="edu-year">2014 - 2018</span>
                        </div>
                    </motion.div>

                    {/* 5. Achievements Tile */}
                    <motion.div
                        className="bento-tile bento-awards glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h3 className="tile-title"><FaAward /> Spotlight</h3>
                        <ul className="awards-list-bento">
                            <li>Modern Web Award '23</li>
                            <li>Open Source Contrib</li>
                            <li>Google Cloud Cert</li>
                        </ul>
                    </motion.div>

                    {/* 6. Languages Tile */}
                    <motion.div
                        className="bento-tile bento-lang glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h3 className="tile-title"><FaGlobe /> Languages</h3>
                        <div className="lang-grid-bento">
                            <span>English</span>
                            <span>Malayalam</span>
                            <span>Hindi</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default AboutDetails;

