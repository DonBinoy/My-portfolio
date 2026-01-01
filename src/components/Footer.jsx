import React from 'react';
import { FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-gradient"></div>
            <div className="container">
                <div className="footer-content">
                    <p className="footer-text">
                        Designed & Built with <FaHeart className="heart-icon" /> by Don Binoy
                    </p>
                    <p className="footer-copyright">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
