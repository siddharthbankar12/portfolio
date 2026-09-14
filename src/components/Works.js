import React, { useState } from "react";
import "../styles/Works.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExperienceData,
  ProjectsData,
  CertificationsData,
} from "../data/WorkData";
import ExperienceTimeline from "./ExperienceTimeline";
import ProjectCard from "./ProjectCard";
import CertificationList from "./CertificationList";

const Works = () => {
  const [activeTab, setActiveTab] = useState("experience");

  const fade = {
    opacity: 1,
    transition: {
      duration: 1.4,
    },
  };

  const tabData = [
    { id: "experience", label: "Experience", data: ExperienceData },
    { id: "projects", label: "Projects", data: ProjectsData },
    { id: "certification", label: "Certifications", data: CertificationsData },
  ];

  return (
    <div className="works" id="works">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={fade}
          viewport={{ once: true }}
          className="heading"
        >
          <p className="heading-sub-text">I build real value</p>
          <p className="heading-text">
            <strong>Works</strong>
          </p>
        </motion.div>

        <div className="tabs">
          {tabData.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="works-box"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "experience" && (
              <ExperienceTimeline data={ExperienceData} />
            )}
            {activeTab === "projects" && (
              <div className="projects-grid">
                {ProjectsData.map((project, index) => (
                  <ProjectCard project={project} key={index} />
                ))}
              </div>
            )}
            {activeTab === "certification" && (
              <CertificationList data={CertificationsData} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Works;
