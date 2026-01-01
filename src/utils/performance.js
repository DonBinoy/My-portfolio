// Performance utilities for 3D components and optimizations

// Lazy load component wrapper
export const lazyLoad = (importFunc, fallback = null) => {
    return React.lazy(importFunc);
};

// Three.js cleanup helper
export const disposeThreeObject = (object) => {
    if (!object) return;

    // Dispose geometry
    if (object.geometry) {
        object.geometry.dispose();
    }

    // Dispose material(s)
    if (object.material) {
        if (Array.isArray(object.material)) {
            object.material.forEach((material) => disposeMaterial(material));
        } else {
            disposeMaterial(object.material);
        }
    }

    // Dispose children recursively
    if (object.children) {
        object.children.forEach((child) => disposeThreeObject(child));
    }
};

const disposeMaterial = (material) => {
    if (!material) return;

    // Dispose textures
    Object.keys(material).forEach((key) => {
        if (material[key] && material[key].isTexture) {
            material[key].dispose();
        }
    });

    material.dispose();
};

// Debounce function
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function
export const throttle = (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

// Frame rate monitor (development only)
export const createFPSMonitor = () => {
    let lastTime = performance.now();
    let frames = 0;
    let fps = 60;

    const update = () => {
        const currentTime = performance.now();
        frames++;

        if (currentTime >= lastTime + 1000) {
            fps = Math.round((frames * 1000) / (currentTime - lastTime));
            frames = 0;
            lastTime = currentTime;

            if (process.env.NODE_ENV === 'development') {
                console.log(`FPS: ${fps}`);
            }
        }

        requestAnimationFrame(update);
    };

    update();
    return { getFPS: () => fps };
};

// Image lazy loading helper
export const lazyLoadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
};

// Check WebGL support
export const hasWebGLSupport = () => {
    try {
        const canvas = document.createElement('canvas');
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
    } catch (e) {
        return false;
    }
};

// Prefers reduced motion check
export const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
