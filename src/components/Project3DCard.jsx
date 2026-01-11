import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Project3DCard = ({ image, title }) => {
    const ref = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeout = useRef(null);

    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Increased damping for smoother, more stable animations
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 30 });

    // Transform mouse position to rotation values
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Dynamic sheen effect
    const sheenX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
    const sheenY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

    // Detect scrolling to disable 3D effects during scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(true);

            // Reset card to neutral position during scroll
            x.set(0);
            y.set(0);

            // Clear existing timeout
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }

            // Re-enable after scroll stops
            scrollTimeout.current = setTimeout(() => {
                setIsScrolling(false);
            }, 150);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, [x, y]);

    const handleMouseMove = (e) => {
        if (!ref.current || isScrolling) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Use clientX/Y for absolute positioning which is safer in sticky containers
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate normalized position (-0.5 to 0.5)
        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={!isScrolling ? {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            } : {
                // Flat transform during scroll - no 3D
                transform: "none"
            }}
            className="project-tilt-card"
        >
            <motion.div
                style={!isScrolling ? {
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                    width: "100%",
                    height: "100%"
                } : {
                    // No Z-transform during scroll
                    width: "100%",
                    height: "100%"
                }}
                className="project-tilt-content"
            >
                {/* Image Container */}
                <div className="project-image-container">
                    <img
                        src={image}
                        alt={title}
                        className="project-image"
                        draggable="false"
                        loading="lazy"
                        decoding="async"
                    />
                    {/* Overlay Gradient */}
                    <div className="project-overlay" />

                    {/* Sheen Effect - only show when not scrolling */}
                    {!isScrolling && (
                        <motion.div
                            className="project-sheen"
                            style={{
                                background: `radial-gradient(circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.15) 0%, transparent 60%)`
                            }}
                        />
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Project3DCard;
