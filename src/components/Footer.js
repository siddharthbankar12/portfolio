import React from "react";
import { FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          Copyright © 2025 Siddharth Bankar. All rights reserved.
        </p>
        <div className="footer-links">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/siddharth-bankar-561a50236/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <FaLinkedin className="footer-icon" />
          </a>

          {/* Email (Gmail) */}
          <a
            href="mailto:siddharthbankar1204@gmail.com"
            className="footer-link"
          >
            <FaEnvelope className="footer-icon" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/siddharthbankar12"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <FaGithub className="footer-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
