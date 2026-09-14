import React from "react";
import { FiFolder, FiGithub } from "react-icons/fi";
import { FaLink } from "react-icons/fa6";
import "../styles/Works.css";

const ProjectCard = ({ project }) => {
  return (
    <div className="works-card">
      <div className="works-container">
        <div className="top-work">
          <FiFolder className="work-folder" />
          <div className="right">
            {project.gitlink && (
              <a
                className="work-git"
                href={project.gitlink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub />
              </a>
            )}
            {project.app && (
              <a
                className="work-link"
                href={project.app}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLink />
              </a>
            )}
          </div>
        </div>
        <div className="mid-work">
          <p className="work-title">{project.title}</p>
          <p className="work-desc">{project.desc}</p>
        </div>
        <div className="bottom-work">
          {project.tech.map((e, index) => (
            <small key={index}>{e}</small>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
