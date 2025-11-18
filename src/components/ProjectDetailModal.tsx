"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Database, Server, Video, Workflow, ShieldCheck, Cpu } from "lucide-react";
import { SiNextdotjs, SiTypescript, SiPostgresql, SiTailwindcss, SiOpenai, SiTrpc } from "react-icons/si";
import "./ProjectDetailModal.css";

export type Project = {
  name: string;
  img: string;
  desc: string;
  liveUrl: string;
  gitUrl: string;
  gallery?: { img: string; caption: string }[];
  techStack?: string[];
};

type Props = {
  project: Project;
  onClose: () => void;
};

const getTechIcon = (tech: string) => {
  switch (tech) {
    case "Next.js":
      return <SiNextdotjs title="Next.js" />;
    case "TypeScript":
      return <SiTypescript title="TypeScript" />;
    case "PostgreSQL":
      return <SiPostgresql title="PostgreSQL" />;
    case "Drizzle ORM":
      return <Database title="Drizzle ORM" />;
    case "tRPC":
      return <SiTrpc title="tRPC" />;
    case "Better Auth":
      return <ShieldCheck title="Better Auth" />;
    case "Stream Video SDK":
      return <Video title="Stream Video SDK" />;
    case "Inngest":
      return <Workflow title="Inngest" />;
    case "OpenAI":
      return <SiOpenai title="OpenAI" />;
    case "Tailwind CSS":
      return <SiTailwindcss title="Tailwind CSS" />;
    default:
      return <Cpu title={tech} />;
  }
};

const ProjectDetailModal = ({ project, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    gsap.to(backdropRef.current, { opacity: 1, duration: 0.3 });
    gsap.fromTo(
      modalRef.current,
      { y: 50, scale: 0.95, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      y: 50,
      scale: 0.95,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      onComplete: onClose,
    });
  };

  const nextSlide = () => {
    if (project.gallery) {
      setCurrentSlide((prev) => (prev + 1) % project.gallery!.length);
    }
  };

  const prevSlide = () => {
    if (project.gallery) {
      setCurrentSlide((prev) => (prev - 1 + project.gallery!.length) % project.gallery!.length);
    }
  };

  return (
    <div
      ref={backdropRef}
      className="modal-backdrop"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        <button className="modal-close-btn" onClick={handleClose}>
          &times;
        </button>
        <h2>{project.name}</h2>
        
        <p className="project-main-desc">{project.desc}</p>
        
        {project.gallery && project.gallery.length > 0 ? (
          <div className="modal-gallery-slider">
            <div className="slider-image-container">
              <Image
                src={project.gallery[currentSlide].img}
                alt={`${project.name} slide ${currentSlide + 1}`}
                fill
                className="slider-image"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              
              {project.gallery.length > 1 && (
                <>
                  <button className="slider-btn prev" onClick={prevSlide}>
                    <ChevronLeft size={24} />
                  </button>
                  <button className="slider-btn next" onClick={nextSlide}>
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
            <p className="slider-caption">
              {project.gallery[currentSlide].caption}
            </p>
            <div className="slider-dots">
              {project.gallery.map((_, index) => (
                <span
                  key={index}
                  className={`slider-dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="modal-image-container">
             <Image
              src={project.img}
              alt={project.name}
              fill
              className="modal-main-image"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}
        
        {project.techStack && (
          <div className="tech-stack-container">
            <h3>Tech Stack</h3>
            <div className="tech-icons-grid">
              {project.techStack.map((tech, index) => (
                <div key={index} className="tech-icon-wrapper">
                  {getTechIcon(tech)}
                  <span className="tech-name">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        )}

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
  );
};

export default ProjectDetailModal;
