"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectShowcase.css";

const spotlightItems = [
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
  const [bgImage, setBgImage] = useState(spotlightItems[0].img);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(spotlightItems[0]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const titlesContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  const openModal = (project: (typeof spotlightItems)[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Effect to lock/unlock body scroll when modal is open/closed
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("scroll-locked");
    } else {
      document.body.classList.remove("scroll-locked");
    }
  }, [isModalOpen]);

  // Main animation setup effect - runs only once
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const config = { gap: 0.08, speed: 0.4 };

    function getBezierPosition(t: number) {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const w75 = vw * 0.75;
      const startX = w75 - 220;
      const cpX = startX + 500;
      const cpY = vh / 2;
      const startY = -200;
      const endY = vh + 200;
      const x = (1 - t) ** 2 * startX + 2 * (1 - t) * t * cpX + t ** 2 * startX;
      const y = (1 - t) ** 2 * startY + 2 * (1 - t) * t * cpY + t ** 2 * endY;
      return { x, y };
    }

    function getImgProgressState(index: number, overallProgress: number) {
      const startTime = index * config.gap;
      const endTime = startTime + config.speed;
      if (overallProgress < startTime) return -1;
      if (overallProgress > endTime) return 2;
      return (overallProgress - startTime) / config.speed;
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${window.innerHeight * 10}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const introText = section.querySelectorAll(".spotlight-intro-text");
        const bgImg = section.querySelector<HTMLDivElement>(".spotlight-bg-img");
        const bgImgInner = bgImg?.querySelector("img");
        const header = section.querySelector<HTMLDivElement>(".spotlight-header");
        const titlesContainer = section.querySelector<HTMLDivElement>(
          ".spotlight-titles-container"
        );

        if (progress <= 0.2) {
          const animProgress = progress / 0.2;
          gsap.set(introText[0], {
            x: -animProgress * window.innerWidth * 0.6,
            opacity: 1,
          });
          gsap.set(introText[1], {
            x: animProgress * window.innerWidth * 0.6,
            opacity: 1,
          });
          if (bgImg) gsap.set(bgImg, { scale: animProgress });
          if (bgImgInner)
            gsap.set(bgImgInner, { scale: 1.5 - animProgress * 0.5 });
          imageRefs.current.forEach((img) => gsap.set(img, { opacity: 0 }));
          if (header) gsap.set(header, { opacity: 0 });
          if (titlesContainer)
            gsap.set(titlesContainer, {
              "--before-opacity": "0",
              "--after-opacity": "0",
            });
        } else if (progress > 0.2 && progress <= 0.25) {
          gsap.set(introText, { opacity: 0 });
          if (bgImg) gsap.set(bgImg, { scale: 1 });
          if (bgImgInner) gsap.set(bgImgInner, { scale: 1 });
          imageRefs.current.forEach((img) => gsap.set(img, { opacity: 0 }));
          if (header) gsap.set(header, { opacity: 1 });
          if (titlesContainer)
            gsap.set(titlesContainer, {
              "--before-opacity": "1",
              "--after-opacity": "1",
            });
        } else if (progress > 0.25 && progress <= 0.95) {
          gsap.set(introText, { opacity: 0 });
          if (bgImg) gsap.set(bgImg, { scale: 1 });
          if (bgImgInner) gsap.set(bgImgInner, { scale: 1 });
          if (header) gsap.set(header, { opacity: 1 });
          if (titlesContainer)
            gsap.set(titlesContainer, {
              "--before-opacity": "1",
              "--after-opacity": "1",
            });

          const switchProgress = (progress - 0.25) / 0.7;
          const titlesEl = titlesContainerRef.current;
          if (titlesEl) {
            const startPos = window.innerHeight;
            const targetPos = -titlesEl.scrollHeight;
            const currentY = startPos - switchProgress * (startPos - targetPos);
            gsap.set(titlesEl, { y: currentY });
          }

          imageRefs.current.forEach((img, index) => {
            const imageProgress = getImgProgressState(index, switchProgress);
            if (imageProgress < 0 || imageProgress > 1) {
              gsap.set(img, { opacity: 0 });
            } else {
              const pos = getBezierPosition(imageProgress);
              gsap.set(img, { x: pos.x - 100, y: pos.y - 75, opacity: 1 });
            }
          });

          const viewportMiddle = window.innerHeight / 2;
          let closestIndex = 0;
          let closestDistance = Infinity;
          titleRefs.current.forEach((title, index) => {
            if (title) {
              const titleRect = title.getBoundingClientRect();
              const titleCenter = titleRect.top + titleRect.height / 2;
              const distance = Math.abs(titleCenter - viewportMiddle);
              if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
              }
            }
          });

          titleRefs.current.forEach((title, index) => {
            if (title) {
              gsap.to(title, {
                opacity: index === closestIndex ? 1 : 0.25,
                duration: 0.3,
              });
            }
          });
          setBgImage(spotlightItems[closestIndex].img);
        } else if (progress > 0.95) {
          if (header) gsap.set(header, { opacity: 0 });
          if (titlesContainer)
            gsap.set(titlesContainer, {
              "--before-opacity": "0",
              "--after-opacity": "0",
            });
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []); // Empty dependency array ensures this runs only once

  const handleTitleClick = (index: number) => {
    const title = titleRefs.current[index];
    if (title && title.style.opacity === "1") {
      openModal(spotlightItems[index]);
    }
  };

  return (
    <>
      <section className="spotlight" ref={sectionRef} id="projects">
        <div className="spotlight-intro-text-wrapper">
          <div className="spotlight-intro-text">
            <p>Project</p>
          </div>
          <div className="spotlight-intro-text">
            <p>Showcase</p>
          </div>
        </div>

        <div className="spotlight-bg-img">
          <Image src={bgImage} alt="" fill priority sizes="100vw" />
          <div className="spotlight-shade"></div>
        </div>

        <div className="spotlight-titles-container">
          <div className="spotlight-titles" ref={titlesContainerRef}>
            {spotlightItems.map((item, index) => (
              <h1
                key={index}
                ref={(el) => (titleRefs.current[index] = el)}
                onClick={() => handleTitleClick(index)}
              >
                {item.name}
              </h1>
            ))}
          </div>
        </div>

        <div className="spotlight-images">
          {spotlightItems.map((item, index) => (
            <div
              key={index}
              className="spotlight-img"
              ref={(el) => (imageRefs.current[index] = el)}
              style={{ opacity: 0 }}
            >
              <Image
                src={item.img}
                alt=""
                fill
                sizes="(max-width: 640px) 150px, 200px"
              />
            </div>
          ))}
        </div>

        <div className="spotlight-header">
          <p>Discover</p>
        </div>
      </section>

      <div
        id="spotlight-modal"
        className={`spotlight-modal ${isModalOpen ? "open" : ""}`}
        onClick={closeModal}
      >
        <div
          className="spotlight-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="spotlight-modal__close"
            aria-label="close"
            onClick={closeModal}
          >
            ✕
          </button>
          <Image
            className="spotlight-modal__img"
            src={selectedProject.img}
            alt={selectedProject.name}
            width={400}
            height={300}
          />
          <h2 className="spotlight-modal__title">{selectedProject.name}</h2>
          <p className="spotlight-modal__desc">{selectedProject.desc}</p>
          <div className="spotlight-modal__btns">
            <a
              className="spotlight-modal__btn live"
              href={selectedProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Live
            </a>
            <a
              className="spotlight-modal__btn git"
              href={selectedProject.gitUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectShowcase;