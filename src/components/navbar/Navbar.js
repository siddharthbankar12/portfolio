import React from "react";
import "../../styles/Navbar.css";
import { FaHome, FaLaptop, FaUsers } from "react-icons/fa";
import { BiBookContent, BiServer, BiEnvelope } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { Link } from "react-scroll";
import ProfileImg from "../../images/1.jpg";
import NavLinks from "./NavLinks";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import useVisitorTracker from "../../hooks/useVisitorTracker";

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
  const { visitorCount } = useVisitorTracker();

  const handleLinkClick = () => {
    handleNav(false);
  };

  // Add body class when navbar is open to prevent scroll
  React.useEffect(() => {
    if (nav) {
      document.body.classList.add("navbar-open");
    } else {
      document.body.classList.remove("navbar-open");
    }
  }, [nav]);

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
          <div className="navbar-footer">
            <div className="visitor-count">
              <FaUsers className="visitor-icon" />
              <span className="visitor-number">
                Total Visitors:{" "}
                {visitorCount !== null
                  ? visitorCount.toLocaleString()
                  : "Loading..."}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.nav>
    </AnimatePresence>
  );
};

export default Navbar;
