import React from "react";
import { FaLink } from "react-icons/fa6";
import "../styles/Works.css";

const CertificationList = ({ data }) => {
  return (
    <div className="cert-list-wrapper">
      {data.map((item, index) => (
        <div className="cert-list-item" key={index}>
          <div className="cert-list-index">{index + 1}</div>
          <div className="cert-list-content">
            <h3 className="cert-list-name">{item.name}</h3>
            <p className="cert-list-company">{item.company}</p>
            <div className="cert-list-tech">
              {item.tech.map((e, i) => (
                <small key={i}>{e}</small>
              ))}
            </div>
          </div>
          <a
            className="cert-list-link"
            href={item.app}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLink />
          </a>
        </div>
      ))}
    </div>
  );
};

export default CertificationList;
