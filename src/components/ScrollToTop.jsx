import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop, scrollToElement } from '../hooks/useSmoothScroll';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Target the specific header if it's the projects section
            const targetId = hash === '#projects' ? 'projects-header' : hash.replace('#', '');

            let attempts = 0;
            const maxAttempts = 20;

            const tryScroll = () => {
                const element = document.getElementById(targetId);
                if (element) {
                    // Use a small delay to ensure layout is settled
                    setTimeout(() => {
                        scrollToElement(element, { offset: -100 }); // Offset for navigation
                    }, 100);
                    return;
                }

                attempts++;
                if (attempts < maxAttempts) {
                    setTimeout(tryScroll, 100);
                }
            };

            tryScroll();
        } else {
            window.scrollTo(0, 0);
            if (scrollToTop) {
                scrollToTop();
            }
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
