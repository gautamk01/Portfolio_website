"use client";

import React, { useEffect, useState } from "react";
import "./NightScene.css";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  animationDuration: number;
}

interface NightSceneProps {
  theme: "light" | "dark";
}

const NightScene: React.FC<NightSceneProps> = ({ theme }) => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Only generate stars for the night scene (dark theme)
    if (theme === "dark") {
      const generateStars = () => {
        const newStars: Star[] = [];
        for (let i = 0; i < 300; i++) {
          newStars.push({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            animationDuration: Math.random() * 5 + 5, // Duration between 5s and 10s
          });
        }
        setStars(newStars);
      };
      generateStars();
    } else {
      setStars([]); // Clear stars for the day scene
    }
  }, [theme]);

  return (
    <div
      className={`night-scene-wrapper ${theme === "light" ? "day-scene" : ""}`}
    >
      {theme === "dark" &&
        stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.animationDuration}s`,
            }}
          />
        ))}

      {theme === "light" && (
        <div className="clouds">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
          <div className="cloud cloud-4"></div>
        </div>
      )}

      {theme === "dark" ? <div className="moon"></div> : <div className="sun"></div>}
      <div className="mountain-bg">
        <div className="mountain mountain-1"></div>
        <div className="mountain mountain-2"></div>
        <div className="mountain mountain-3"></div>
      </div>
      <div className="tree-bg">
        {/* Farthest Layer */}
        <div className="tree l3 t1"></div>
        <div className="tree l3 t2"></div>
        <div className="tree l3 t3"></div>
        {/* Middle Layer */}
        <div className="tree l2 t4"></div>
        <div className="tree l2 t5"></div>
        <div className="tree l2 t6"></div>
        {/* Closest Layer */}
        <div className="tree l1 t7"></div>
        <div className="tree l1 t8"></div>
        <div className="tree l1 t9"></div>
      </div>
    </div>
  );
};

export default NightScene;