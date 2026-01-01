import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance = null;

export const useSmoothScroll = () => {
    useEffect(() => {
        // Initialize Lenis smooth scroll
        lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // Animation frame loop
        function raf(time) {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenisInstance.destroy();
            lenisInstance = null;
        };
    }, []);

    return lenisInstance;
};

// Utility to scroll to a specific element
export const scrollToElement = (target, options = {}) => {
    if (lenisInstance) {
        lenisInstance.scrollTo(target, {
            offset: 0,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            ...options,
        });
    }
};

// Utility to scroll to top
export const scrollToTop = () => {
    if (lenisInstance) {
        lenisInstance.scrollTo(0, { duration: 1.5 });
    }
};
