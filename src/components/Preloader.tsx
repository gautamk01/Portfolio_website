"use client";

import { useEffect } from "react";

const Preloader = () => {
  useEffect(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.transition = "opacity 0.5s ease-out";
        setTimeout(() => {
          preloader.style.display = "none";
        }, 500);
      }, 2000);
    }
  }, []);

  return (
    <div id="preloader" className="preloader">
      <div className="preloader-content">
        <h1>Gautam</h1>
        <p>Portfolio</p>
      </div>
    </div>
  );
};

export default Preloader;
