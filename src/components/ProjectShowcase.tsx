"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectShowcase.css";
import ProjectDetailModal from "./ProjectDetailModal";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "AI.Meet",
    img: "/project1/Logo.png",
    desc: "AI Meet is a modern video conferencing application designed for interacting with AI agents. It allows users to create customized AI agents, conduct real-time video meetings with them, and receive automated, AI-generated summaries of the conversations.",
    liveUrl: "#",
    gitUrl: "#",
    gallery: [
      {
        img: "/project1/Logo.png",
        caption: "AI.Meet Logo",
      },
      {
        img: "/project1/p1.png",
        caption: "Main Dashboard showing meeting agents",
      },
      {
        img: "/p2.png",
        caption: "Agent Creation Screen",
      },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "tRPC",
      "Better Auth",
      "Stream Video SDK",
      "Inngest",
      "OpenAI",
      "Tailwind CSS",
    ],
  },
  {
    name: "Bloom24",
    img: "/p1.png",
    desc: "An e-commerce platform for a floral shop, featuring a vibrant design and easy-to-use interface.",
    liveUrl: "#",
    gitUrl: "#",
  },
  {
    name: "Glass Fade",
    img: "/p2.png",
    desc: "A portfolio website for a glass artist, showcasing their work with a unique, fading glass effect.",
    liveUrl: "#",
    gitUrl: "#",
  },
  {
    name: "Stilllroom",
    img: "/p2.png",
    desc: "A minimalist blogging platform designed for writers who value focus and a clean reading experience.",
    liveUrl: "#",
    gitUrl: "#",
  },
  {
    name: "Aura",
    img: "/p1.png",
    desc: "A conceptual project exploring generative art and interactive visuals, built with modern web technologies.",
    liveUrl: "#",
    gitUrl: "#",
  },
];

const ProjectShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsWrapperRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const projectsWrapper = projectsWrapperRef.current;
    const cards = gsap.utils.toArray<HTMLDivElement>(".project-card");
    const hint = hintRef.current;
    const progressBar = progressBarRef.current;

    if (
      !section ||
      !projectsWrapper ||
      cards.length === 0 ||
      !hint ||
      !progressBar
    )
      return;

    const scrollDistance = projectsWrapper.scrollWidth - window.innerWidth;

    gsap.set(cards, { scale: 0.9, opacity: 0.7 });
    gsap.to(hint, { autoAlpha: 1, duration: 1, delay: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.to(progressBar, {
            width: `${self.progress * 100}%`,
            ease: "none",
          });

          if (self.progress > 0.01 && self.direction > 0) {
            gsap.to(hint, { autoAlpha: 0, duration: 0.3 });
          } else if (self.progress < 0.01 && self.direction < 0) {
            gsap.to(hint, { autoAlpha: 1, duration: 0.3 });
          }

          const viewportCenter = window.innerWidth / 2;
          cards.forEach((card) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(viewportCenter - cardCenter);
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

    tl.to(projectsWrapper, { x: () => -scrollDistance, ease: "none" });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
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
                    className="project-image"
                  />
                </div>
                <div className="project-content">
                  <h3>{project.name}</h3>
                  <p>{project.desc}</p>
                  <div className="project-links">
                    <button
                      className="details-btn"
                      onClick={() => setSelectedProject(project)}
                    >
                      View Details
                    </button>
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
        <div ref={hintRef} className="scroll-hint">
          <span>Scroll to Explore</span>
          <div className="mouse-icon">
            <div className="mouse-wheel"></div>
          </div>
        </div>
        <div className="projects-progress-bar">
          <div
            ref={progressBarRef}
            className="projects-progress-bar-inner"
          ></div>
        </div>
      </section>
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default ProjectShowcase;
