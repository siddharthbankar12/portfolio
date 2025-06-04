import React from "react";
import "../styles/About.css";
import { motion } from "framer-motion";
import ProfileImg from "../images/profile_me.jpg";

const About = () => {
  const horizontal = {
    x: 0,
    opacity: 1,
    transition: { type: "spring", duration: 2, bounce: 0.3 },
  };

  return (
    <>
      <div className="about" id="about">
        <div className="container">
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={horizontal}
            viewport={{ once: true }}
            className="heading"
          >
            <p className="heading-sub-text">Who I am</p>
            <p className="heading-text">
              <strong>About Me</strong>
            </p>
          </motion.div>
          <div className="split-about">
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              whileInView={horizontal}
              className="about-content text-justify"
            >
              <section>
                <p>
                  <big>
                    <strong>Hello! I’m Siddharth Dadaram Bankar</strong>
                  </big>
                  , a passionate MERN Stack developer with a Master’s degree in
                  Computer Applications. I specialize in creating responsive and
                  interactive web applications using technologies like HTML,
                  CSS, JavaScript, React, MongoDB, Express and Node.
                </p>
                <br />
                <p>
                  I’m passionate about solving problems and creating web
                  solutions that are not only functional but also visually
                  appealing. My focus is on learning, improving, and
                  contributing to projects that make a difference.
                </p>
                <br />
                <p>
                  I’m excited to grow my career in web development and work with
                  teams that value innovation and quality.
                </p>
              </section>
            </motion.div>
            <motion.div
              initial={{ x: "50", opacity: 0 }}
              whileInView={horizontal}
              className="about-img"
            >
              <img src={ProfileImg} alt="Profile" />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
