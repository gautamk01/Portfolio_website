"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import SplitType from "split-type";
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
      // Split text for animation
      const titleText = new SplitType(".main-title", { types: ["chars", "words"] });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Initial States
      gsap.set(".hero-visual", { scale: 0.8, opacity: 0 });
      gsap.set(".floating-card", { scale: 0, opacity: 0 });
      gsap.set(".availability-badge", { y: 20, opacity: 0 });
      gsap.set(".main-title .char", { y: 100, opacity: 0 });
      gsap.set(".subtitle", { y: 20, opacity: 0 });
      gsap.set(".tech-item", { y: 20, opacity: 0 });
      gsap.set(".cta-btn", { y: 20, opacity: 0 });

      tl.to(".hero-visual", {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
      })
        .to(
          ".availability-badge",
          { y: 0, opacity: 1, duration: 0.6 },
          "-=1.2"
        )
        .to(
          ".main-title .char",
          {
            y: 0,
            opacity: 1,
            stagger: 0.02,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=1"
        )
        .to(
          ".subtitle",
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .to(
          ".tech-item",
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.6,
          },
          "-=0.6"
        )
        .to(
          ".cta-btn",
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
          },
          "-=0.4"
        )
        .to(
          ".floating-card",
          {
            scale: 1,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=1"
        );
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
              src="/img-10.webp"
              alt="GK - Full Stack Developer"
              width={300}
              height={300}
              className="profile-image"
              priority
            />
          </div>
          <div className="floating-cards-wrapper">
            <div className="floating-card card-1">
              💻 Full Stack Development
            </div>
            <div className="floating-card card-2">🎯 Problem Solving</div>
            <div className="floating-card card-3">🚀 System Architecture</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
