import React, { useState } from "react";
import "../styles/Works.css";
import { motion } from "framer-motion";
import {
  ExperienceData,
  ProjectsData,
  CertificationsData,
} from "../data/WorkData";
import WorkCard from "./WorkCard";

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

        <motion.div
          className="works-box"
          initial={{ opacity: 0 }}
          whileInView={fade}
        >
          {tabData.map(
            (tab) =>
              activeTab === tab.id && (
                <React.Fragment key={tab.id}>
                  {tab.data.map((w, index) => (
                    <WorkCard w={w} tabId={tab.id} key={index} />
                  ))}
                </React.Fragment>
              )
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Works;
