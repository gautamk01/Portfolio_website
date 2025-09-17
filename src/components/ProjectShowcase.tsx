"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectShowcase.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "Silent Arc",
    img: "/img-1.webp",
    desc: "A sleek and modern web application for silent auction events, providing a seamless bidding experience.",
    liveUrl: "#",
    gitUrl: "#",
  },
  {
    name: "Bloom24",
    img: "/img-2.webp",
    desc: "An e-commerce platform for a floral shop, featuring a vibrant design and easy-to-use interface.",
    liveUrl: "#",
    gitUrl: "#",
  },
  {
    name: "Glass Fade",
    img: "/img-3.webp",
    desc: "A portfolio website for a glass artist, showcasing their work with a unique, fading glass effect.",
    liveUrl: "#",
    gitUrl: "#",
  },
  {
    name: "Stilllroom",
    img: "/img-7.webp",
    desc: "A minimalist blogging platform designed for writers who value focus and a clean reading experience.",
    liveUrl: "#",
    gitUrl: "#",
  },
  {
    name: "Aura",
    img: "/img-4.webp",
    desc: "A conceptual project exploring generative art and interactive visuals, built with modern web technologies.",
    liveUrl: "#",
    gitUrl: "#",
  },
];

const ProjectShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const projectsWrapper = projectsWrapperRef.current;
    const cards = gsap.utils.toArray<HTMLDivElement>(".project-card");

    if (!section || !projectsWrapper || cards.length === 0) return;

    // The total distance to scroll is the full scrollable width minus one viewport width.
    const scrollDistance = projectsWrapper.scrollWidth - window.innerWidth;

    // Set initial state for all cards
    gsap.set(cards, { scale: 0.9, opacity: 0.7 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        invalidateOnRefresh: true,
        onUpdate: () => {
          const viewportCenter = window.innerWidth / 2;
          cards.forEach((card) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(viewportCenter - cardCenter);

            // Animate based on proximity to the center
            const maxDistance = viewportCenter * 0.8;
            const progress = Math.max(0, 1 - distance / maxDistance);

            const scale = gsap.utils.mapRange(0, 1, 0.9, 1)(progress);
            const opacity = gsap.utils.mapRange(0, 1, 0.7, 1)(progress);

            gsap.to(card, {
              scale,
              opacity,
              duration: 0.5,
              ease: "power3.out",
            });
          });
        },
      },
    });

    tl.to(projectsWrapper, {
      x: () => -scrollDistance,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="projects-section">
      <div className="projects-header-container">
        <h2 className="projects-title">Selected Works</h2>
        <p className="projects-subtitle">
          A collection of projects I'm proud of.
        </p>
      </div>
      <div className="projects-horizontal-container">
        <div ref={projectsWrapperRef} className="projects-wrapper">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image-container">
                <Image
                  src={project.img}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 80vw, 60vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="project-content">
                <h3>{project.name}</h3>
                <p>{project.desc}</p>
                <div className="project-links">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live
                  </a>
                  <a
                    href={project.gitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
