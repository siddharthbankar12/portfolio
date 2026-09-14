import React from "react";
import "../styles/Services.css";
import { motion } from "framer-motion";
import { ServicesData } from "../data/ServicesData";

const Services = () => {
  const fade = {
    opacity: 1,
    transition: {
      duration: 1.4,
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
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
            {ServicesData.map((service, index) => (
              <motion.div
                key={index}
                className="services-card"
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <service.icon className="services-icon" />
                <p className="services-title">{service.title}</p>
                <p className="services-desc">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Services;
