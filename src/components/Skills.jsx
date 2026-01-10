import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaReact, FaHtml5, FaCss3Alt, FaJava, FaFigma } from 'react-icons/fa';
import { SiAdobephotoshop, SiAdobeillustrator, SiJavascript, SiTailwindcss, SiGit } from 'react-icons/si';
import Skills3D from './Skills3D';
import './Skills.css';

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const skillCategories = [
        {
            title: 'Design Tools',
            skills: [
                { name: 'Photoshop', icon: SiAdobephotoshop, color: '#31A8FF' },
                { name: 'Illustrator', icon: SiAdobeillustrator, color: '#FF9A00' },
                { name: 'Figma', icon: FaFigma, color: '#F24E1E' }
            ]
        },
        {
            title: 'Frontend Development',
            skills: [
                { name: 'React', icon: FaReact, color: '#61DAFB' },
                { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
                { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
                { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
                { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' }
            ]
        },
        {
            title: 'Other Technologies',
            skills: [
                { name: 'Java', icon: FaJava, color: '#007396' },
                { name: 'Git', icon: SiGit, color: '#F05032' }
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const allSkills = skillCategories.flatMap(cat => cat.skills);

    return (
        <section id="skills" className="section skills" ref={ref}>
            <div className="skills-bg-visual">
                <Skills3D skills={allSkills} />
            </div>

            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="section-header"
                >
                    <h2 className="gradient-text">Mastery & Tools</h2>
                    <p className="section-subtitle">A professional stack for modern digital solutions</p>
                </motion.div>

                <div className="skills-grid">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={categoryIndex}
                            className="skill-category"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                        >
                            <h3 className="category-title">{category.title}</h3>
                            <motion.div
                                className="skills-list"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skillIndex}
                                        className="skill-card glass-card"
                                        variants={itemVariants}
                                        whileHover={{
                                            y: -10,
                                            scale: 1.05,
                                            boxShadow: `0 20px 40px ${skill.color}20`
                                        }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                    >
                                        <div className="skill-icon-wrapper" style={{ '--icon-color': skill.color }}>
                                            <skill.icon
                                                className="skill-icon"
                                            />
                                            <div className="icon-glow"></div>
                                        </div>
                                        <span className="skill-name">{skill.name}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
