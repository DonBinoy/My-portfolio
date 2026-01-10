import React, { useState, useRef } from 'react';
import { motion, useInView, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaWhatsapp, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import Contact3D from './Contact3D';
import './Contact.css';

const MagneticLink = ({ children, href, color }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.5);
        y.set((e.clientY - centerY) * 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                x: springX,
                y: springY,
                '--social-color': color
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {children}
        </motion.a>
    );
};

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });

            setTimeout(() => setSubmitStatus(''), 5000);
        }, 2000);
    };

    const socialLinks = [
        {
            name: 'Instagram',
            icon: FaInstagram,
            url: 'https://instagram.com',
            color: '#E4405F'
        },
        {
            name: 'LinkedIn',
            icon: FaLinkedin,
            url: 'https://linkedin.com',
            color: '#0A66C2'
        },
        {
            name: 'WhatsApp',
            icon: FaWhatsapp,
            url: 'https://wa.me/919061833214',
            color: '#25D366'
        }
    ];

    return (
        <section id="contact" className="section contact" ref={ref}>
            <Contact3D />

            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="section-header"
                >
                    <h2 className="gradient-text">Let's Talk</h2>
                    <p className="section-subtitle">Have a project in mind? I'd love to help.</p>
                </motion.div>

                <div className="contact-grid">
                    <motion.div
                        className="contact-info-panel"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="contact-info-content">
                            <h3>Contact Details</h3>
                            <p>
                                Ready to start your next premium project? Reach out and let's make something legendary.
                            </p>

                            <div className="contact-methods">
                                <motion.div className="contact-method-card glass-card" whileHover={{ x: 10 }}>
                                    <span className="method-label">Direct Line</span>
                                    <a href="tel:+919061833214" className="method-link">+91 9061833214</a>
                                </motion.div>
                                <motion.div className="contact-method-card glass-card" whileHover={{ x: 10 }}>
                                    <span className="method-label">Send Email</span>
                                    <a href="mailto:contact@donbinoy.com" className="method-link">contact@donbinoy.com</a>
                                </motion.div>
                            </div>

                            <div className="social-magnetic-container">
                                {socialLinks.map((social, index) => (
                                    <MagneticLink key={index} href={social.url} color={social.color}>
                                        <social.icon />
                                    </MagneticLink>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="contact-form-container"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {submitStatus === 'success' ? (
                            <motion.div
                                className="success-state glass-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <FaCheckCircle className="success-icon" />
                                <h3>Message Received!</h3>
                                <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                                <button className="btn btn-outline" onClick={() => setSubmitStatus('')}>Send Another</button>
                            </motion.div>
                        ) : (
                            <form className="contact-form glass-card" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Don Binoy"
                                        />
                                        <div className="input-focus-line"></div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="don@example.com"
                                        />
                                        <div className="input-focus-line"></div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        placeholder="Briefly describe your project or inquiry..."
                                    />
                                    <div className="input-focus-line"></div>
                                </div>

                                <motion.button
                                    type="submit"
                                    className="btn btn-primary submit-btn"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isSubmitting ? (
                                        <div className="loader-dots">
                                            <span></span><span></span><span></span>
                                        </div>
                                    ) : (
                                        <>
                                            Send Telegram <FaPaperPlane />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
