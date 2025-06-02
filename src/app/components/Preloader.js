"use client";
import { useState, useEffect } from "react";
import "./Preloader.css";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Give time for fade animation to complete before removing component
      setTimeout(() => {
        setLoading(false);
      }, 500); // Match this with CSS transition duration
    }, 1000); // Show preloader for 1 second

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div id="preloder" className={fadeOut ? "fade-out" : ""}>
      <div className="loader"></div>
    </div>
  );
};

export default Preloader;
