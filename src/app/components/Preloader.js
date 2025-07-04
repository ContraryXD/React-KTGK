"use client";
import { useState, useEffect } from "react";
import "./Preloader.css";

const Preloader = () => {
   const [loading, setLoading] = useState(true);
   const [fadeOut, setFadeOut] = useState(false);

   useEffect(() => {
      const timer = setTimeout(() => {
         setFadeOut(true);
         setTimeout(() => {
            setLoading(false);
         }, 500);
      }, 1000);

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
