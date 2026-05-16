import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "../styles/App.css";
import { motion } from "framer-motion";
import HomePage from "../pages/HomePage";
import Flag from "react-world-flags";

function App() {
  // States
  const [loading, setLoading] = useState(true);
  const [svgWidth, setSvgWidth] = useState(320);
  const [svgHeight, setSvgHeight] = useState(60);
  const [perimeter, setPerimeter] = useState(760);
  const [animateShape, setAnimateShape] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 4000);
  }, []);

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.offsetWidth;
      const padding = 40;
      const flagWidth = 24; // 20px flag + 4px margin
      const totalWidth = textWidth + padding + flagWidth;
      const newWidth = Math.max(320, totalWidth);
      setSvgWidth(newWidth);

      // Calculate height based on text content
      // On mobile, text wraps so we need more height
      const isMobile = window.innerWidth <= 500;
      const newHeight = isMobile ? 100 : 60;
      setSvgHeight(newHeight);

      // Calculate perimeter for animation: 2 * (width + height)
      const newPerimeter = 2 * (newWidth + newHeight);
      setPerimeter(newPerimeter);
    }
  }, [loading]);

  useEffect(() => {
    if (loading) {
      setAnimateShape(true);
    }
  }, [loading]);

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

  const shapeStyle = {
    fill: "transparent",
    stroke: "#149ddd",
    strokeWidth: animateShape ? 8 : 2,
    strokeDasharray: perimeter,
    strokeDashoffset: animateShape ? -perimeter : 0,
    transition: "stroke-dashoffset 4s ease, stroke-width 4s ease",
  };

  return loading ? (
    <div className="loader">
      <div className="svg-wrapper">
        <svg
          height={svgHeight}
          width={svgWidth}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            className="shape"
            height={svgHeight}
            width={svgWidth}
            style={shapeStyle}
          />
        </svg>
        <motion.p
          variants={loadText}
          initial="hidden"
          animate="visible"
          className="text"
        >
          <span ref={textRef} className="name-text">
            Mr. Siddharth Dadaram Bankar
          </span>
          <span className="flag-wrapper">
            <Flag
              code="IN"
              style={{
                width: "20px",
                height: "20px",
                verticalAlign: "middle",
                marginLeft: "8px",
              }}
            />
          </span>
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
