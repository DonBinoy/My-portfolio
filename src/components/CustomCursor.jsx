import React, { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);

    useEffect(() => {
        // Check if device supports hover (desktop)
        const hasHover = window.matchMedia('(hover: hover)').matches;
        if (!hasHover) return;

        // Add custom cursor class to html
        document.documentElement.classList.add('custom-cursor');

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        // Mouse move handler
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        // Smooth follow animation
        const animateCursor = () => {
            // Damping effect
            const speed = 0.15;
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            }

            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            }

            requestAnimationFrame(animateCursor);
        };

        // Hover detection
        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.classList.contains('cursor-hover') ||
                target.closest('a') ||
                target.closest('button')
            ) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e) => {
            const target = e.target;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.classList.contains('cursor-hover') ||
                target.closest('a') ||
                target.closest('button')
            ) {
                setIsHovering(false);
            }
        };

        // Click detection
        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        // Event listeners
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        // Start animation
        animateCursor();

        // Cleanup
        return () => {
            document.documentElement.classList.remove('custom-cursor');
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className={`custom-cursor-ring ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
            />
            <div
                ref={cursorDotRef}
                className="custom-cursor-dot"
            />
        </>
    );
};

export default CustomCursor;
