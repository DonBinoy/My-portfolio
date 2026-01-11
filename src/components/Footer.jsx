import React from 'react';
import { FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer" id="footer">
            <div className="container footer-container">
                <div className="footer-top">
                    <div className="footer-cta">
                        <h3 className="cta-text">Let's create something <br /> extraordinary together.</h3>
                        <a href="mailto:donbinoy25@gmail.com" className="footer-email">
                            donbinoy25@gmail.com
                        </a>
                    </div>

                    <div className="footer-socials">
                        <div className="social-group">
                            <span className="social-label">Socials</span>
                            <div className="social-links">
                                <a href="https://www.instagram.com/don_binoy_/" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
                                <a href="https://www.linkedin.com/in/don-binoy-4050b2224" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
                                <a href="https://github.com/DonBinoy" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-brand">
                    <h1 className="giant-brand-text">DB</h1>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copyright">
                        © {currentYear} Don Binoy. All rights reserved.
                    </div>
                    <div className="footer-credits">
                        Designed & Built with <FaHeart className="heart-icon" /> in India
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
