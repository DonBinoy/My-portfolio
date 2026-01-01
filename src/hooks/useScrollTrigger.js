import { useEffect, useState, useRef } from 'react';

export const useScrollTrigger = (options = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '0px',
        triggerOnce = true,
    } = options;

    const [isInView, setIsInView] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Intersection Observer for visibility
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsInView(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        // Scroll progress calculation
        const handleScroll = () => {
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementHeight = rect.height;

            // Calculate progress (0 to 1)
            const start = rect.top - windowHeight;
            const end = rect.bottom;
            const total = windowHeight + elementHeight;
            const current = windowHeight - rect.top;

            const progress = Math.max(0, Math.min(1, current / total));
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial calculation

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold, rootMargin, triggerOnce]);

    return { ref, isInView, scrollProgress };
};

// Parallax hook
export const useParallax = (speed = 0.5) => {
    const [offset, setOffset] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const rate = scrolled * speed;

            setOffset(rate);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return { ref, offset };
};

// Stagger animation helper
export const getStaggerDelay = (index, baseDelay = 0.1) => {
    return index * baseDelay;
};
