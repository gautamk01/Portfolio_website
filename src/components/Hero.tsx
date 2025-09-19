"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import "./Hero.css";

const technologies = [
  "React",
  "Node.js",
  "Python",
  "TypeScript",
  "AWS",
  "Docker",
  "GraphQL",
  "MongoDB",
];

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
      });

      // Set initial states before animating
      gsap.set(".hero-visual, .floating-card, .hero-text > *", {
        autoAlpha: 0,
      });
      gsap.set(".hero-text > *", { y: 30 });
      gsap.set(".hero-visual", { scale: 0.9 });
      gsap.set(".floating-card", { scale: 0.8 });

      tl.to(".hero-visual", { autoAlpha: 1, scale: 1, duration: 1 })
        .to(
          ".floating-card",
          { autoAlpha: 1, scale: 1, stagger: 0.15, duration: 0.6 },
          "-=0.7"
        )
        .to(".hero-text > *", { autoAlpha: 1, y: 0, stagger: 0.1 }, "-=1");
    }, heroRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section className="hero-new" ref={heroRef}>
      <div className="hero-content">
        <div className="hero-text">
          <div className="availability-badge">
            🚀 Available for new opportunities
          </div>
          <h1 className="main-title">
            Full Stack Developer & Software Engineer
          </h1>
          <p className="subtitle">
            Crafting exceptional digital experiences with cutting-edge
            technology and innovative solutions.
          </p>
          <div className="tech-stack">
            <p>My Tech Stack:</p>
            <div className="tech-list">
              {technologies.map((tech) => (
                <span key={tech} className="tech-item">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="cta-buttons">
            <a href="#projects" className="cta-btn primary">
              View My Work
            </a>
            <a href="#contact" className="cta-btn secondary">
              Let's Connect
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="profile-image-container">
            <Image
              src="/cap3-square.webp"
              alt="GK - Full Stack Developer"
              width={300}
              height={300}
              className="profile-image"
              priority
            />
          </div>
          <div className="floating-cards-wrapper">
            <div className="floating-card card-1">💻 Full Stack Development</div>
            <div className="floating-card card-2">🎯 Problem Solving</div>
            <div className="floating-card card-3">🚀 System Architecture</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;