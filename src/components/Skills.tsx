"use client";

import React from "react";
import "./Skills.css";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaAws,
} from "react-icons/fa";
import {
  TbBrandNextjs,
  TbBrandTypescript,
  TbBrandTailwind,
  TbBrandGraphql,
  TbBrandMongodb,
  TbCircleLetterG,
} from "react-icons/tb";

const skillsData = {
  frontend: [
    { name: "React", icon: <FaReact /> },
    { name: "Next.js", icon: <TbBrandNextjs /> },
    { name: "TypeScript", icon: <TbBrandTypescript /> },
    { name: "TailwindCSS", icon: <TbBrandTailwind /> },
    { name: "GSAP", icon: <TbCircleLetterG /> },
    { name: "HTML5", icon: <FaHtml5 /> },
    { name: "CSS3", icon: <FaCss3Alt /> },
  ],
  backend: [
    { name: "Node.js", icon: <FaNodeJs /> },
    { name: "Python", icon: <FaPython /> },
    { name: "GraphQL", icon: <TbBrandGraphql /> },
    { name: "MongoDB", icon: <TbBrandMongodb /> },
  ],
  devops: [
    { name: "AWS", icon: <FaAws /> },
    { name: "Docker", icon: <FaDocker /> },
    { name: "Git", icon: <FaGitAlt /> },
  ],
};

const Skills = () => {
  return (
    <div className="skills-component-wrapper">
      <div className="skills-container">
        <div className="skills-header">
          <h2 className="skills-title">
            My <span className="skills-title-highlight">Toolkit</span>
          </h2>
          <p className="skills-subtitle">
            I enjoy crafting aesthetic user experiences with a modern frontend
            architecture.
          </p>
        </div>

        <div className="skills-grid-container">
          <div className="skills-category">
            <h3 className="skills-category-title">FRONTEND DEVELOPMENT</h3>
            <div className="skills-grid">
              {skillsData.frontend.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-icon">{skill.icon}</div>
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="skills-category">
            <h3 className="skills-category-title">BACKEND DEVELOPMENT</h3>
            <div className="skills-grid">
              {skillsData.backend.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-icon">{skill.icon}</div>
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="skills-category">
            <h3 className="skills-category-title">DEVOPS & TOOLS</h3>
            <div className="skills-grid">
              {skillsData.devops.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-icon">{skill.icon}</div>
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;