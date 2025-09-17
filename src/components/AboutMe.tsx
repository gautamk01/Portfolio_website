"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import "./AboutMe.css";
import Skills from "./Skills";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    if (!section || !image || !text) return;

    const split = new SplitType(text, { types: "words" });
    const words = split.words;

    gsap.set(words, { opacity: 0, y: 20 });
    gsap.set(image, { clipPath: "inset(100% 0 0 0)", opacity: 0 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 40%",
        toggleActions: "play none none reverse",
      },
    });

    timeline
      .to(image, {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      })
      .to(
        words,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.03,
          ease: "power2.out",
        },
        "-=1"
      );

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="portfolio-about portfolio-anime-text-container"
    >
      <h2 className="portfolio-profile-title">A Little About Me</h2>
      <div className="portfolio-copy-container">
        <div className="portfolio-content-wrapper">
          <div className="portfolio-anime-text">
            <p ref={textRef}>
              I'm a creative technologist bridging the gap between innovative
              technology and user-centric design. Pursuing my M.Tech in Big Data
              Analytics from VIT, I thrive on crafting intuitive digital
              experiences and leveraging data to build impactful solutions with
              a focus on sustainability.
            </p>
          </div>
          <div ref={imageRef} className="portfolio-image-container">
            <Image
              src="/img-9.webp"
              alt="Abstract digital art"
              width={800}
              height={480}
              priority
            />
          </div>
        </div>
        <Skills />
      </div>
    </section>
  );
};

export default AboutMe;