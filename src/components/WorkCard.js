import React from "react";
import { FiFolder, FiGithub } from "react-icons/fi";
import { IoOpenOutline } from "react-icons/io5";

const WorkCard = ({ w, tabId }) => {
  return (
    <div>
      {tabId === "experience" ? (
        <div className="works-card">
          <div className="works-container">
            <div className="top-work">
              <FiFolder className="work-folder" />
            </div>
            <div className="mid-work">
              <p className="work-title">
                {w.role} <br /> {w.company}
              </p>
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
                    <IoOpenOutline />
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
                  <IoOpenOutline />
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
