import React from "react";
import "../../styles/Navbar.css";
import { FaHome, FaLaptop } from "react-icons/fa";
import { BiBookContent, BiServer, BiEnvelope } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { Link } from "react-scroll";
import ProfileImg from "../../images/profile_me.jpg";
import NavLinks from "./NavLinks";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const navVariants = {
  hidden: {
    opacity: 0,
    transition: {
      delay: 0.5,
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const Navbar = ({ nav, handleNav }) => {
  const handleLinkClick = () => {
    handleNav(false); 
  };

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ width: "0" }}
        animate={
          nav ? { width: "300px" } : { width: "0", transition: { delay: 1 } }
        }
        className={nav ? "navbar active" : "navbar"}
      >
        <motion.div
          initial="hidden"
          animate={nav ? "visible" : "hidden"}
          variants={navVariants}
          exit="hidden"
          className="navbar-container"
        >
          <div className="top-details">
            <div className="img__cover">
              <img src={ProfileImg} alt="Main" className="profile-pic-small" />
            </div>
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              onClick={handleLinkClick}
              to="home"
              className="profile-name"
            >
              Siddharth Dadaram Bankar
            </Link>
            <NavLinks handleNav={handleLinkClick} />
          </div>
          <ul className="mid-details">
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              to="home"
              className="mid-links"
              onClick={handleLinkClick}
            >
              <FaHome className="mid-icon" />
              <li className="mid-link">Home</li>
            </Link>
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              to="about"
              className="mid-links"
              onClick={handleLinkClick}
            >
              <FiUser className="mid-icon" />
              <li className="mid-link">About</li>
            </Link>
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              to="skills"
              className="mid-links"
              onClick={handleLinkClick}
            >
              <FaLaptop className="mid-icon" />
              <li className="mid-link">Skills</li>
            </Link>
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              to="services"
              className="mid-links"
              onClick={handleLinkClick}
            >
              <BiServer className="mid-icon" />
              <li className="mid-link">Services</li>
            </Link>
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              to="works"
              className="mid-links"
              onClick={handleLinkClick}
            >
              <BiBookContent className="mid-icon" />
              <li className="mid-link">Works</li>
            </Link>
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              to="contact"
              className="mid-links"
              onClick={handleLinkClick}
            >
              <BiEnvelope className="mid-icon" />
              <li className="mid-link">Contact</li>
            </Link>
          </ul>
        </motion.div>
      </motion.nav>
    </AnimatePresence>
  );
};

export default Navbar;
