import React from "react";
import { FiFolder, FiGithub } from "react-icons/fi";
import { FaLink } from "react-icons/fa6";

const WorkCard = ({ w, tabId }) => {
  return (
    <div>
      {tabId === "experience" ? (
        <div className="works-card">
          <div className="works-container">
            <div className="top-work">
              <FiFolder className="work-folder" />
              <h4>{w.period}</h4>
            </div>
            <div className="mid-work">
              <p className="work-title">{w.role}</p>
              <p className="work-company">{w.company}</p>
              <p className="work-desc">{w.desc}</p>
            </div>
            <div className="bottom-work">
              {w.tech.map((e, index) => (
                <small key={index}>{e}</small>
              ))}
            </div>
          </div>
        </div>
      ) : tabId === "projects" ? (
        <div className="works-card">
          <div className="works-container">
            <div className="top-work">
              <FiFolder className="work-folder" />
              <div className="right">
                {w.gitlink && (
                  <a
                    className="work-git"
                    href={w.gitlink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiGithub />
                  </a>
                )}
                {w.app && (
                  <a
                    className="work-link"
                    href={w.app}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLink />
                  </a>
                )}
              </div>
            </div>
            <div className="mid-work">
              <p className="work-title">{w.title}</p>
              <p className="work-desc">{w.desc}</p>
            </div>
            <div className="bottom-work">
              {w.tech.map((e, index) => (
                <small key={index}>{e}</small>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="works-card">
          <div className="works-container">
            <div className="top-work">
              <FiFolder className="work-folder" />
              <div className="right">
                <a
                  className="work-link"
                  href={w.app}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLink />
                </a>
              </div>
            </div>
            <div className="mid-work">
              <p className="work-title">{w.name}</p>
              <p className="work-desc">{w.company}</p>
            </div>
            <div className="bottom-work">
              {w.tech.map((e, index) => (
                <small key={index}>{e}</small>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkCard;
