import React from "react";
import {
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
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

          {/* Instagram */}
          <a
            href="https://www.instagram.com/_s_i_ddharth__"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <FaInstagram className="footer-icon" />
          </a>
          {/* WhatsApp */}
          <a
            href="https://wa.me/+919011908472"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <FaWhatsapp className="footer-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
