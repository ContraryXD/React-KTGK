"use client";
import { useState, useEffect } from "react";
import "./Preloader.css";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div id="preloder" className={fadeOut ? "fade-out" : ""}>
      <div className="loader"></div>
    </div>
  );
}
