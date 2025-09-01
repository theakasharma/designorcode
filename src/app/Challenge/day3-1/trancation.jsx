"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leva, useControls } from "leva";

export default function PageTransitionWithLeva() {
  const [currentPage, setCurrentPage] = useState("home");

  // Leva Controls
  const { theme, transitionDuration, scale, borderRadius, shadow } = useControls({
    theme: { options: ["light", "dark"], value: "light" },
    transitionDuration: { value: 0.6, min: 0.2, max: 2, step: 0.1 },
    scale: { value: 1, min: 0.8, max: 1.2, step: 0.05 },
    borderRadius: { value: 20, min: 0, max: 50, step: 1 },
    shadow: { value: 20, min: 0, max: 50, step: 1 },
  });

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme === "light" ? "#f5f5f5" : "#1a1a1a",
    color: theme === "light" ? "#1a1a1a" : "#f5f5f5",
    transition: "all 0.3s ease",
    fontFamily: "Inter, sans-serif",
  };

  const boxStyle = {
    background: theme === "light" ? "#ffffff" : "#2a2a2a",
    padding: "3rem",
    borderRadius: `${borderRadius}px`,
    boxShadow: `0px ${shadow}px ${shadow * 2}px rgba(0,0,0,0.2)`,
    width: "320px",
    textAlign: "center",
  };

  const pageVariants = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: scale },
    exit: { opacity: 0, y: -50, scale: 0.95 },
  };

  return (
    <>
      <div className="header">
        <a className="bear-link" href="https://peerlist.io/akashamra" target="_blank" rel="noreferrer noopener">
          <img src="https://avatars.githubusercontent.com/u/62895760?v=4" alt="Profile" className=" w-12 h-12" />
          <h4>AAKASH SHARMA</h4>
        </a>
      </div>
      <Leva collapsed />
      <div style={containerStyle}>
        <AnimatePresence mode="wait">
          {currentPage === "home" && (
            <motion.div
              key="home"
              style={boxStyle}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: transitionDuration, ease: "easeInOut" }}
            >
              <h1>🏠 Home</h1>
              <p>Welcome to the homepage!</p>
              <button
                onClick={() => setCurrentPage("about")}
                style={{
                  marginTop: "1rem",
                  padding: "0.8rem 1.5rem",
                  border: "none",
                  borderRadius: "12px",
                  background: theme === "light" ? "#1a1a1a" : "#f5f5f5",
                  color: theme === "light" ? "#f5f5f5" : "#1a1a1a",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Go to About →
              </button>
            </motion.div>
          )}

          {currentPage === "about" && (
            <motion.div
              key="about"
              style={boxStyle}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: transitionDuration, ease: "easeInOut" }}
            >
              <h1>ℹ️ About</h1>
              <p>This is the about page with a smooth transition.</p>
              <button
                onClick={() => setCurrentPage("home")}
                style={{
                  marginTop: "1rem",
                  padding: "0.8rem 1.5rem",
                  border: "none",
                  borderRadius: "12px",
                  background: theme === "light" ? "#1a1a1a" : "#f5f5f5",
                  color: theme === "light" ? "#f5f5f5" : "#1a1a1a",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                ← Back to Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
