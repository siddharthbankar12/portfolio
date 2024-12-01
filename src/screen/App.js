import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "../styles/App.css";
import { motion } from "framer-motion";
import HomePage from "../pages/HomePage";
import Flag from "react-world-flags";

function App() {
  // States
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  const loadText = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return loading ? (
    <div className="loader">
      <div className="svg-wrapper">
        <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
          <rect className="shape" height="60" width="320" />
        </svg>
        <motion.p
          variants={loadText}
          initial="hidden"
          animate="visible"
          className="text"
        >
          Siddharth Bankar
          <Flag
            code="IN"
            style={{
              width: "20px",
              height: "20px",
              position: "absolute",
              top: "5px",
            }}
          />
        </motion.p>
      </div>
    </div>
  ) : (
    <div className="App">
      <Router>
        <HomePage />
      </Router>
    </div>
  );
}

export default App;
