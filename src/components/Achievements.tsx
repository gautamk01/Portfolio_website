"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import "./Achievements.css";
import NightScene from "./NightScene";

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    imgSrc: "/img-5.webp",
    title: "Technical Skills",
    description:
      "Full-stack development with React, Node.js, Python, and modern web technologies. Expert in AI/ML integration and scalable system design.",
  },
  {
    imgSrc: "/img-6.webp",
    title: "Leadership",
    description:
      "ACM Web-SIG Lead at VIT Vellore, guiding 200+ developers and driving innovation through collaborative projects and technical excellence.",
  },
  {
    imgSrc: "/img-7.webp",
    title: "Innovation",
    description:
      "Award-winning solutions including Aurora SaaS platform and advanced RAG music recommendation systems using cutting-edge AI technologies.",
  },
  {
    imgSrc: "/img-8.webp",
    title: "Education",
    description:
      "M.Tech in Big Data Analytics at VIT Vellore, specializing in machine learning, data science, and advanced algorithm design.",
  },
  {
    imgSrc: "/img-9.webp",
    title: "Achievements",
    description:
      "Digital Changemaker Award winner and O/E/N Innovation Award recipient, recognized for outstanding contributions to technology and innovation.",
  },
];

const Achievements = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      // Animate background and title color on scroll
      gsap.to(wrapper, {
        backgroundColor: "#0c0c1d", // Deep night sky blue
        scrollTrigger: {
          trigger: wrapper,
          start: "top 80%",
          end: "top top",
          scrub: 1,
        },
      });
      gsap.to(".achievements-title", {
        color: "#f1f1f1", // Light text color
        scrollTrigger: {
          trigger: wrapper,
          start: "top 80%",
          end: "top top",
          scrub: 1,
        },
      });
      // Fade in the night scene
      gsap.to(".night-scene-wrapper", {
        opacity: 1,
        scrollTrigger: {
          trigger: wrapper,
          start: "top 60%",
          end: "top 20%",
          scrub: 1,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const stickySection = sectionRef.current;
    const stickyHeader = headerRef.current;
    const cards = cardsRef.current;

    if (!stickySection || !stickyHeader || cards.length === 0) return;

    const transform = [
      [
        [10, 50, -10, 10],
        [20, -10, -45, 20],
      ],
      [
        [0, 47.5, -10, 15],
        [-25, 15, -45, 30],
      ],
      [
        [0, 52.5, -10, 5],
        [15, -5, -40, 60],
      ],
      [
        [0, 50, 30, -80],
        [20, -10, 60, 5],
      ],
      [
        [0, 55, -15, 30],
        [25, -15, 60, 95],
      ],
    ];

    const cardAnimationCtx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: `+=${window.innerHeight * 5}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const maxTranslate = stickyHeader.offsetWidth - window.innerWidth;
          const translateX = -progress * maxTranslate;
          gsap.set(stickyHeader, { x: translateX });

          cards.forEach((card, index) => {
            const delay = index * 0.1125;
            const cardProgress = Math.max(
              0,
              Math.min((progress - delay) * 2, 1)
            );

            if (cardProgress > 0.75 && cardProgress <= 1) {
              card.classList.add("is-active");
            } else {
              card.classList.remove("is-active");
            }

            if (cardProgress > 0) {
              const [ypos, rotation] = transform[index];
              const cardx = gsap.utils.interpolate(25, -650, cardProgress);

              const yprogress = cardProgress * 3;
              const yIndex = Math.min(Math.floor(yprogress), ypos.length - 2);
              const yinterpolation = yprogress - yIndex;
              const cardY = gsap.utils.interpolate(
                ypos[yIndex],
                ypos[yIndex + 1],
                yinterpolation
              );

              const cardRotation = gsap.utils.interpolate(
                rotation[yIndex],
                rotation[yIndex + 1],
                yinterpolation
              );

              gsap.set(card, {
                xPercent: cardx,
                yPercent: cardY,
                rotation: cardRotation,
                opacity: 1,
              });
            } else {
              gsap.set(card, { opacity: 0 });
            }
          });
        },
      });
    }, sectionRef);

    return () => {
      cardAnimationCtx.revert();
    };
  }, []);

  return (
    <div className="achievements-section-wrapper" ref={wrapperRef}>
      <NightScene />
      <h2 className="achievements-title">Key Highlights</h2>
      <section ref={sectionRef} className="sticky-cards-section">
        <div ref={headerRef} className="sticky-header">
          <h1>Gautam Krishna M, GK</h1>
        </div>

        {cardData.map((card, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="sticky-card"
          >
            <div className="card-img">
              <Image
                src={card.imgSrc}
                alt={card.title}
                fill
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </div>
            <div className="card-content">
              <div className="card-title">
                <h2>{card.title}</h2>
              </div>
              <div className="card-description">
                <p>{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Achievements;