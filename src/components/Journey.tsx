"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import "./Journey.css";

gsap.registerPlugin(ScrollTrigger);

const journeyData = [
  {
    year: "2024 - Present",
    events: [
      {
        title: "Hack Battle Hackathon",
        institution: "VIT Gravitas",
        date: "Feb 2024",
        description:
          "Participated in Hack Battle, building innovative solutions with a focus on problem-solving and rapid prototyping.",
        imageSrc: "/hack.jpeg",
      },
      {
        title: "Top 5 Finisher – Caterpillar Code-a-thon",
        institution: "VIT Vellore",
        date: "Mar 2024",
        description:
          "Led UI/UX design in a 4-member team to build a voice-first worker assistance agent integrating ML and voice technology, securing a top 5 rank among 50+ teams.",
        imageSrc: "/cat.jpeg",
      },
      {
        title: "Joined M.Tech CSE Specialization in Big Data Analytics",
        institution: "Vellore Institute of Technology",
        date: "Aug 2024 - Present",
        description:
          "Deepening my expertise in large-scale data processing, machine learning, and advanced analytics to tackle complex data-driven challenges.",
        imageSrc: "/VIT.jpeg",
      },
      {
        title: "Graduated B.Tech in Computer Science & Engineering",
        institution: "Amrita Vishwa Vidyapeetham, Amritapuri",
        date: "May 2024",
        description:
          "Graduated with a CGPA of 8.53/10, building a strong foundation in algorithms, software development, databases, and system design.",
        imageSrc: "/img-12.jpeg",
      },
    ],
  },
  {
    year: "2023",
    events: [
      {
        title: "O/E/N Innovation Award",
        institution: "OEN India Ltd.",
        date: "Dec 2023",
        description:
          "Awarded the OEN Technology Innovation Award (First Runner-up) for advancing sustainable mobility with a fully off-grid solar-powered EV charging solution.",
        imageSrc: "/mit.jpeg",
      },
      {
        title: "Digital Change Maker (Semi-finalist)",
        institution: "Hackton 2023",
        date: "Oct 2023",
        description:
          "Selected as a semi-finalist for proposing impactful digital innovation solutions during Hackton.",
        imageSrc: "/change.jpeg",
      },
      {
        title: "Event Coordinator",
        institution: "Vidyut 2023 – National Level MultiFest",
        date: "May 2023",
        description:
          "Coordinated the event 'Pitch an Idea: Sustainability' and contributed as an Executive Member under the Technical Team.",
        imageSrc: "/vidyuth.jpeg",
      },
    ],
  },
  {
    year: "2022",
    events: [
      {
        title: "Web-SIG Lead & Mentor",
        institution: "ACM Student Chapter, Amritapuri",
        date: "Aug 2022 - Oct 2023",
        description:
          "Led workshops, mentored peers in web development, and guided projects as part of ACM Student Chapter.",
        imageSrc: "/img-14.jpeg",
      },
      {
        title: "Executive Member & Treasurer",
        institution: "AMESE Club, Amrita",
        date: "Jan 2022 - Dec 2022",
        description:
          "Served as Treasurer and Executive Committee Member, managing events and fostering technical growth among students.",
        imageSrc: "/ameese.jpeg",
      },
      {
        title: "Social Outreach Project",
        institution: "Amrita Vishwa Vidyapeetham",
        date: "Oct 2022 - Dec 2022",
        description:
          "Organized Fire & Safety Awareness programs and created evacuation maps using AutoCAD to enhance campus safety.",
        imageSrc: "/img-15.jpeg",
      },
    ],
  },
  {
    year: "2020",
    events: [
      {
        title: "Joined B.Tech in Computer Science & Engineering",
        institution: "Amrita Vishwa Vidyapeetham, Amritapuri",
        date: "Oct 2020",
        description:
          "Started undergraduate studies, focusing on core computer science principles, programming, and software development.",
        imageSrc: "/Btech.jpeg",
      },
    ],
  },
  {
    year: "2019",
    events: [
      {
        title: "Higher Secondary Education (Class 12)",
        institution: "M.E.S. Central School, Tirur",
        date: "May 2019",
        description:
          "Completed Class 12 with 85% marks, focusing on core science and mathematics subjects.",
        imageSrc: "/school_1.jpeg",
      },
    ],
  },
  {
    year: "2017",
    events: [
      {
        title: "Secondary Education (Class 10)",
        institution: "M.E.S. Central School, Tirur",
        date: "May 2017",
        description:
          "Achieved a CGPA of 9.3/10, excelling in academics and actively participating in extracurricular activities.",
        imageSrc: "/school_1.jpeg",
      },
    ],
  },
];

const Journey = () => {
  const [activeImage, setActiveImage] = useState(
    journeyData[0].events[0].imageSrc
  );
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const activeImageRef = useRef(activeImage);

  // Get all unique image sources
  const allImageSrcs = React.useMemo(() => {
    const srcs = new Set<string>();
    journeyData.forEach((data) => {
      data.events.forEach((event) => {
        srcs.add(event.imageSrc);
      });
    });
    return Array.from(srcs);
  }, []);

  useEffect(() => {
    activeImageRef.current = activeImage;
  }, [activeImage]);

  // Preload images after initial render
  useEffect(() => {
    const preloadImages = () => {
      allImageSrcs.forEach((src) => {
        if (src !== journeyData[0].events[0].imageSrc) {
          const img = new window.Image();
          img.src = src;
          img.onload = () => {
            setLoadedImages((prev) => new Set([...prev, src]));
          };
        }
      });
    };

    // Start preloading after a short delay to prioritize initial render
    const timeoutId = setTimeout(preloadImages, 100);
    return () => clearTimeout(timeoutId);
  }, [allImageSrcs]);

  useEffect(() => {
    const eventItems = gsap.utils.toArray<HTMLElement>(".timeline-event-item");
    const section = sectionRef.current;
    const progressLine = progressLineRef.current;

    if (!section || !progressLine) return;

    const ctx = gsap.context(() => {
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

        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              const newImage = item.dataset.image;
              if (newImage && newImage !== activeImageRef.current) {
                // Only animate if image is already loaded or is the first image
                const shouldAnimate =
                  loadedImages.has(newImage) ||
                  newImage === journeyData[0].events[0].imageSrc;

                if (shouldAnimate) {
                  setIsTransitioning(true);
                  gsap.to(imageRef.current, {
                    opacity: 0,
                    duration: 0.2,
                    onComplete: () => {
                      setActiveImage(newImage);
                    },
                  });
                } else {
                  // If not loaded, just switch without animation
                  setActiveImage(newImage);
                }
              }
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loadedImages]);

  const handleImageLoad = () => {
    if (imageRef.current && isTransitioning) {
      gsap.to(imageRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => setIsTransitioning(false),
      });
    } else if (imageRef.current) {
      // Initial load
      gsap.to(imageRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  };

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
                      <div className="timeline-event-meta">
                        <p className="timeline-event-institution">
                          {event.institution}
                        </p>
                        <p className="timeline-event-date">{event.date}</p>
                      </div>
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
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 800px"
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
                <div ref={imageRef} style={{ opacity: 0 }}>
                  <Image
                    src={activeImage}
                    alt="Timeline visual"
                    width={800}
                    height={600}
                    className="browser-image"
                    onLoad={handleImageLoad}
                    priority={activeImage === journeyData[0].events[0].imageSrc}
                    sizes="(max-width: 1024px) 0vw, 50vw"
                    quality={85}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
