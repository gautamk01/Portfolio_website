"use client";

import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

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
  return (
    <section className="sticky-card-section w-full h-screen overflow-hidden">
      <div className="sticky-header">
        <h1>Gautam Krishna M, GK</h1>
      </div>

      {cardData.map((card, index) => (
        <div key={index} className="card">
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
  );
};

export default Achievements;
