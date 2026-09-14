import React, { useState, useEffect, useRef } from "react";
import "../styles/Skills.css";
import { motion } from "framer-motion";
import { SkillsData } from "../data/SkillsData";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Skills = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const sortedSkills = [...SkillsData].sort((a, b) => a.priority - b.priority);
  const visibleSkills = isMobile && !showAll ? sortedSkills.slice(0, 10) : sortedSkills;

  return (
    <div className="skills" id="skills" ref={sectionRef}>
      <div className="container">
        <motion.div
          initial={{ y: "-80px", opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="heading"
        >
          <p className="heading-sub-text">What I work with</p>
          <p className="heading-text">
            <strong>My Skills</strong>
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="skills-box"
        >
          {visibleSkills.map((el, index) => (
            <motion.div
              className="skill-card"
              key={index}
              variants={cardVariants}
            >
              <div className="skill-icon">{el.icon}</div>
              <small className="skill-desc">{el.name}</small>
            </motion.div>
          ))}
        </motion.div>
        {isMobile && sortedSkills.length > 10 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="view-more-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View More"}
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Skills;
