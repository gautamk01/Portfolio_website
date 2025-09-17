"use client";

import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import AboutMe from "../components/AboutMe";
import Achievements from "../components/Achievements";
import ProjectShowcase from "../components/ProjectShowcase";
import Journey from "../components/Journey";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./page.css";
import Hero from "../components/Hero";
import LikeButton from "../components/LikeButton";

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  // Effect for the initial loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // A short delay before content fades in

    return () => clearTimeout(timer);
  }, []);

  // Setup Lenis smooth scrolling & GSAP ticker
  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lock/unlock scroll when menu is toggled
  useEffect(() => {
    if (isMenuOpen) {
      lenisRef.current?.stop();
      document.body.classList.add("scroll-locked");
    } else {
      lenisRef.current?.start();
      document.body.classList.remove("scroll-locked");
    }
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={`page-container ${isLoading ? "is-loading" : "is-loaded"}`}>
      <Navbar isOpen={isMenuOpen} onToggle={handleMenuToggle} />
      <main>
        <Hero />
        <AboutMe />
        <Journey />
        <ProjectShowcase />
        <Achievements />
        <section className="contact-new" id="contact">
          <div className="contact-new__layout">
            <header className="contact-new__header">
              <h2 className="contact-new__title">
                Let’s build something{" "}
                <span className="text-gradient">amazing.</span>
              </h2>
              <p className="contact-new__subtitle">
                Feel free to reach out through any of the platforms below.
              </p>
            </header>

            <div className="contact-new__socials">
              <a href="mailto:studentgkm@gmail.com" aria-label="Email">
                <MdEmail />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
            
            <p className="contact-new__footer-text">
              Or just send me a direct message at{" "}
              <a href="mailto:studentgkm@gmail.com">studentgkm@gmail.com</a>
            </p>
          </div>
        </section>
        <footer className="simple-footer">
          <div className="footer-content">
            <LikeButton />
            <p>© 2025 Gautam Krishna M ALL RIGHT RESERVED</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;