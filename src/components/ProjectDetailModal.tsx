"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import "./ProjectDetailModal.css";

type Project = {
  name: string;
  img: string;
  desc: string;
  liveUrl: string;
  gitUrl: string;
};

type Props = {
  project: Project;
  onClose: () => void;
};

const ProjectDetailModal = ({ project, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(backdropRef.current, { opacity: 1, duration: 0.3 });
    gsap.fromTo(
      modalRef.current,
      { y: 50, scale: 0.95, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
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
      >
        <button className="modal-close-btn" onClick={handleClose}>
          &times;
        </button>
        <h2>{project.name}</h2>
        <div className="modal-image-container">
          <Image
            src={project.img}
            alt={project.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
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
  );
};

export default ProjectDetailModal;
