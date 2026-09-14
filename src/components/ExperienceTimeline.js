import React from "react";
import { FiFolder } from "react-icons/fi";
import "../styles/Works.css";

const ExperienceTimeline = ({ data }) => {
  return (
    <div className="timeline-wrapper">
      <div className="timeline-line" />
      {data.map((item, index) => (
        <div className="timeline-item" key={index}>
          <div className="timeline-dot" />
          <div className="timeline-card">
            <div className="timeline-header">
              <FiFolder className="work-folder" />
              <span className="timeline-period">{item.period}</span>
            </div>
            <div className="timeline-body">
              <h3 className="timeline-title">{item.role}</h3>
              <h4 className="timeline-company">{item.company}</h4>
              <p className="timeline-desc">{item.desc}</p>
            </div>
            <div className="timeline-tech">
              {item.tech.map((e, i) => (
                <small key={i}>{e}</small>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceTimeline;
