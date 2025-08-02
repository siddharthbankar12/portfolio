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
                  , a dedicated and passionate Full Stack Developer with a
                  Master’s degree in Computer Applications and a Bachelor’s in
                  Computer Science.
                </p>
                <br />
                <p>
                  I’m deeply committed to building meaningful web experiences
                  that blend creativity with functionality. I take pride in
                  writing clean, maintainable code and turning ideas into
                  intuitive digital products.
                </p>
                <br />
                <p>
                  I'm always eager to learn, grow, and take on challenges that
                  push my boundaries. My goal is to contribute to impactful
                  projects and collaborate with teams that value innovation,
                  quality, and continuous improvement.
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
