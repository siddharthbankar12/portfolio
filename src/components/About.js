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
                  , a passionate Software Engineer specializing in modern web
                  development, mobile application development, and scalable
                  software solutions. I hold an MCA and a B.Sc. in Computer
                  Science, with a strong foundation in full-stack engineering.
                </p>
                <br />
                <p>
                  I build clean, efficient, and user-centric digital
                  products—whether it's a responsive website, a high-performance
                  mobile app, or a robust backend system. I enjoy solving
                  real-world problems through technology and turning ideas into
                  smooth, functional experiences.
                </p>
                <br />
                <p>
                  I’m constantly learning and pushing my boundaries to stay
                  aligned with the latest industry trends. My goal is to
                  contribute to impactful projects and collaborate with teams
                  that value innovation, quality engineering, and continuous
                  growth.
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
