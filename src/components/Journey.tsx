"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import "./Journey.css";

gsap.registerPlugin(ScrollTrigger);

const journeyData = [
  {
    year: "2024",
    events: [
      {
        title: "M.Tech in Big Data Analytics",
        institution: "Vellore Institute of Technology",
        description:
          "Deepening my expertise in large-scale data processing, machine learning, and advanced analytics to tackle complex data-driven challenges.",
        imageSrc: "/img-8.webp",
      },
    ],
  },
  {
    year: "2023",
    events: [
      {
        title: "O/E/N Innovation Award",
        institution: "OEN India Ltd.",
        description:
          "Recognized for developing an innovative tech solution, winning a significant cash prize and accolades for creativity and impact.",
        imageSrc: "/img-7.webp",
      },
    ],
  },
  {
    year: "2022",
    events: [
      {
        title: "Lead, Web-SIG @ ACM VIT",
        institution: "Association for Computing Machinery",
        description:
          "Led a community of over 200 student developers, overseeing web development projects, workshops, and mentorship programs.",
        imageSrc: "/img-6.webp",
      },
    ],
  },
  {
    year: "2020",
    events: [
      {
        title: "B.Tech in Computer Science & Engineering",
        institution: "Vellore Institute of Technology",
        description:
          "Built a strong foundation in core computer science principles, software development, and system design, graduating with honors.",
        imageSrc: "/img-10.webp",
      },
    ],
  },
];

const Journey = () => {
  const [activeImage, setActiveImage] = useState(
    journeyData[0].events[0].imageSrc
  );
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eventItems = gsap.utils.toArray<HTMLElement>(".timeline-event-item");
    const section = sectionRef.current;
    const progressLine = progressLineRef.current;

    if (!section || !progressLine) return;

    const ctx = gsap.context(() => {
      // Animate the glowing progress line
      gsap.to(progressLine, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Animate each event item fading in
      eventItems.forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 50,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 60%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        });

        // Update the sticky image based on which event is in view
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              const newImage = item.dataset.image;
              if (newImage && newImage !== activeImage) {
                gsap.to(imageRef.current, {
                  opacity: 0,
                  duration: 0.3,
                  onComplete: () => {
                    setActiveImage(newImage);
                    gsap.to(imageRef.current, { opacity: 1, duration: 0.3 });
                  },
                });
              }
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeImage]);

  return (
    <section className="journey-section-new" ref={sectionRef}>
      <div className="journey-container">
        <div className="journey-header">
          <h2 className="journey-title-new">
            <span className="text-gradient">Timeline</span>
          </h2>
          <p className="journey-subtitle-new">A quick recap of proud moments</p>
        </div>

        <div className="journey-layout">
          <div className="journey-timeline-col">
            <div className="timeline-progress-line" ref={progressLineRef}></div>
            {journeyData.map((data, index) => (
              <div key={index} className="timeline-year-group">
                <div className="timeline-year-marker">
                  <div className="timeline-dot-new"></div>
                  <h3 className="timeline-year">{data.year}</h3>
                </div>
                <div className="timeline-events-col">
                  {data.events.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className="timeline-event-item"
                      data-image={event.imageSrc}
                    >
                      <p className="timeline-event-institution">
                        {event.institution}
                      </p>
                      <h4 className="timeline-event-title">{event.title}</h4>
                      <p className="timeline-event-description">
                        {event.description}
                      </p>
                      <div className="timeline-event-image-mobile">
                        <Image
                          src={event.imageSrc}
                          alt={event.title}
                          width={800}
                          height={600}
                          className="timeline-event-img"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="journey-image-col">
            <div className="sticky-image-wrapper">
              <div className="browser-frame">
                <div className="browser-header">
                  <div className="browser-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <Image
                  ref={imageRef}
                  src={activeImage}
                  alt="Timeline visual"
                  width={800}
                  height={600}
                  className="browser-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;