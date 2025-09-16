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
import "./page.css";
import Hero from "../components/Hero";

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
        <ProjectShowcase />
        <AboutMe />
        <Journey />
        <Achievements />
        <section className="contact-new" id="contact">
          <div className="contact-new__layout">
            <header className="contact-new__header">
              <h2 className="contact-new__title">
                Let’s build something{" "}
                <span className="text-gradient">amazing.</span>
              </h2>
              <p className="contact-new__subtitle">
                Got an idea, a question, or just want to say hi?
                <br />
                Drop a message – I usually reply within a few hours.
              </p>
            </header>

            <form
              className="contact-new__form"
              id="contactForm"
              autoComplete="on"
            >
              <div className="form-row">
                <input type="text" name="name" placeholder="Name" required />
                <input type="email" name="email" placeholder="Email" required />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <textarea
                name="message"
                placeholder="Tell me about your project…"
                rows={4}
                required
              ></textarea>

              <button type="submit" className="submit-btn">
                <span className="btn-text">Send Message</span>
                <span className="btn-icon">→</span>
              </button>
              <span className="form-status" aria-live="polite"></span>
            </form>
          </div>

          <div className="contact-new__footer">
            <a href="mailto:gautamkrishna@example.com">
              gautamkrishna@example.com
            </a>
            <div className="spacer"></div>
            <a href="#">LinkedIn</a>
            <a href="#">GitHub</a>
            <a href="#">Twitter</a>
          </div>
        </section>
        <footer className="simple-footer">
          <div className="footer-content">
            <p>© 2025 Gautam Krishna M ALL RIGHT RESERVED</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
