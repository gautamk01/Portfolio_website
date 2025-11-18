"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Code2, Coffee, Cpu, Trophy } from "lucide-react";
import "./AboutMe.css";
import Skills from "./Skills";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: <Code2 size={24} />, label: "Projects", value: "10+" },
  { icon: <Cpu size={24} />, label: "Experience", value: "2+ Years" },
  { icon: <Trophy size={24} />, label: "Awards", value: "2x Top 5" },
  { icon: <Coffee size={24} />, label: "Coffee", value: "Infinite" },
];

const AboutMe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Split text
      new SplitType(".about-text", { types: ["lines", "words"] });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".about-image-wrapper",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          ".about-title",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ".about-text .line",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .fromTo(
          ".stat-card",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text-col">
            <h2 className="about-title">
              About <span className="text-highlight">Me</span>
            </h2>
            <div className="about-bio">
              <p ref={textRef} className="about-text">
                I am a Full-Stack Developer and M.Tech scholar specializing in Big
                Data Analytics. With a strong foundation in{" "}
                <span className="text-highlight">AI/ML integration</span>,{" "}
                <span className="text-highlight">scalable system architecture</span>
                , and modern web technologies (Next.js, React, TypeScript), I
                bridge the gap between complex data science and intuitive user
                experiences. From architecting freelance solutions to researching
                LLM quantization, I am driven by a passion for building efficient,
                impactful software.
              </p>
            </div>
            <div className="about-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-info">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="about-image-col">
            <div className="about-image-wrapper">
              <Image
                src="/me.jpeg"
                alt="Gautam Krishna"
                fill
                className="about-image"
                priority
              />
              <div className="image-accent-border"></div>
            </div>
          </div>
        </div>
        
        <div className="about-skills-wrapper">
           <Skills />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
