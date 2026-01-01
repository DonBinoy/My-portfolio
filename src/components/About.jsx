import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import profileImg from '../assets/Gemini_Generated_Image_hn0imphn0imphn0i.png';
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

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
        { label: 'Years Experience', value: '3+' },
        { label: 'Projects Completed', value: '15+' },
        { label: 'Happy Clients', value: '10+' }
    ];

    return (
        <section id="about" className="section about" ref={ref}>
            <div className="about-bg-elements">
                <div className="mesh-gradient"></div>
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
            </div>

            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="section-header"
                >
                    <h2 className="gradient-text">About Me</h2>
                    <p className="section-subtitle">A blend of design and code</p>
                </motion.div>

                <div className="about-grid">
                    <motion.div
                        className="about-image-container"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: "preserve-3d",
                        }}
                    >
                        <div className="image-wrapper" style={{ transform: "translateZ(50px)" }}>
                            <div className="image-placeholder-about">
                                <img src={profileImg} alt="Don Binoy" className="profile-image" />
                            </div>
                            <div className="image-overlay-glow"></div>
                        </div>
                    </motion.div>

                    <div className="about-info">
                        <motion.div
                            className="about-text-content"
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <h3>Creative Designer & Developer</h3>
                            <p className="reveal-text">
                                I'm a passionate <strong>Graphic Designer</strong> and <strong>Frontend Developer</strong> who loves
                                bringing ideas to life through beautiful design and clean code.
                            </p>
                            <p className="reveal-text">
                                My journey in design and development has equipped me with a unique perspective that bridges
                                the gap between aesthetics and functionality. I believe that great design should not only
                                look good but also provide an exceptional user experience.
                            </p>

                            <div className="about-stats-grid">
                                {stats.map((stat, index) => (
                                    <StatCounter
                                        key={index}
                                        value={stat.value}
                                        label={stat.label}
                                        isInView={isInView}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
