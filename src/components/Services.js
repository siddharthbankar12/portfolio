import React from "react";
import "../styles/Services.css";
import { FaLaptopCode, FaTools, FaPaintBrush } from "react-icons/fa";
import { motion } from "framer-motion";

const Services = () => {
  const fade = {
    opacity: 1,
    transition: {
      duration: 1.4,
    },
  };

  return (
    <>
      <div className="services" id="services">
        <div className="container">
          <motion.div
            whileInView={fade}
            viewport={{ once: true }}
            initial={{ opacity: 0 }}
            className="heading"
          >
            <p className="heading-sub-text">What I can do</p>
            <p className="heading-text">
              <strong>Services</strong>
            </p>
          </motion.div>
          <motion.div
            className="services-box"
            whileInView={fade}
            initial={{ opacity: 0 }}
          >
            <div className="services-card">
              <FaLaptopCode className="services-icon" />
              <p className="services-title">Web Application Development</p>
              <p className="services-desc">
                I develop fast, secure, and scalable web applications tailored
                to your needs using modern technologies like React and MongoDB.
              </p>
            </div>

            <div className="services-card">
              <FaTools className="services-icon" />
              <p className="services-title">Software Maintenance</p>
              <p className="services-desc">
                I provide long-term support, updates, debugging, and performance
                enhancements to ensure your applications run smoothly and
                securely.
              </p>
            </div>

            <div className="services-card">
              <FaPaintBrush className="services-icon" />
              <p className="services-title">Web Design & Improvement</p>
              <p className="services-desc">
                I create user-friendly and visually appealing designs to improve
                your website or app's usability and look.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Services;
