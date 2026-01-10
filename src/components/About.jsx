import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';
import profileImg from '../assets/ab1(1).png';
import './About.css';

const StatCounter = ({ value, label, isInView }) => {
    const [count, setCount] = useState(0);
    const target = parseInt(value);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = target;
            const duration = 2000;
            let startTimestamp = null;

            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                setCount(Math.floor(progress * end));
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };

            window.requestAnimationFrame(step);
        }
    }, [isInView, target]);

    return (
        <motion.div
            className="stat-card glass-card"
            whileHover={{ y: -10, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <h3 className="stat-value gradient-text">
                {count}{value.includes('+') ? '+' : ''}
            </h3>
            <p className="stat-label">{label}</p>
        </motion.div>
    );
};

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // 3D Tilt Effect logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const stats = [
        { label: 'Files Shipped', value: '150+' },
        { label: 'Happy Clients', value: '25+' },
        { label: 'Years Experience', value: '4+' }
    ];

    return (
        <section id="about" className="section about" ref={ref}>
            <div className="about-bg-elements">
                <div className="mesh-gradient"></div>
            </div>

            <div className="container">
                <div className="about-grid">
                    <div className="about-content-wrapper">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="section-header-minimal"
                        >
                            <span className="section-label">About Me</span>
                            <h2 className="section-title-large">
                                Crafting digital <br />
                                <span className="highlight-text">experiences</span> that matter.
                            </h2>
                        </motion.div>

                        <motion.div
                            className="about-description"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <p className="lead-text">
                                I'm Don Binoy, a creative developer obsessed with the intersection of design and engineering.
                            </p>
                            <p className="body-text">
                                With a background in both graphic design and full-stack development, I build applications that not only function perfectly but feel intuitive and polished. I believe the best software is invisible—it just works.
                            </p>
                        </motion.div>

                        <div className="about-stats-minimal">
                            {stats.map((stat, index) => (
                                <StatCounter
                                    key={index}
                                    value={stat.value}
                                    label={stat.label}
                                    isInView={isInView}
                                />
                            ))}
                        </div>
                    </div>

                    <motion.div
                        className="about-visual-wrapper"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <motion.div
                            className="about-image-card"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d",
                            }}
                        >
                            <div className="image-inner" style={{ transform: "translateZ(20px)" }}>
                                <img src={profileImg} alt="Don Binoy" className="profile-image" />
                                <div className="image-overlay"></div>
                            </div>
                            <div className="card-border"></div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
