import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { BiEnvelope } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";

const NavLinks = ({ handleNav }) => {
  return (
    <ul className="nav-links">
      <li onClick={handleNav}>
        <Link
          to="//www.linkedin.com/in/siddharth-bankar-561a50236/"
          target="_blank"
          className="nav-link"
        >
          <FaLinkedin />
        </Link>
      </li>
      <li onClick={handleNav}>
        <a
          href="mailto:siddharthbankar1204@gmail.com"
          target="_blank"
          className="nav-link"
          rel="noreferrer"
        >
          <BiEnvelope />
        </a>
      </li>
      <li onClick={handleNav}>
        <Link
          to="//github.com/siddharthbankar12"
          target="_blank"
          className="nav-link"
        >
          <BsGithub />
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
