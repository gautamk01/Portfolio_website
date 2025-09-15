"use client";

import React, { useEffect, useState, useRef } from "react";
import Counter from "../components/Counter";
import ImageGrid from "../components/ImageGrid";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SiteInfo from "../components/SiteInfo";
import HeroFooter from "../components/HeroFooter";
import { runAnimations } from "./animations";
import Preloader from "../components/Preloader";
import AboutMe from "../components/AboutMe";
import Achievements from "../components/Achievements";
import ProjectShowcase from "../components/ProjectShowcase";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./page.css";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [animationsComplete, setAnimationsComplete] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

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

    // Start with scrolling stopped
    lenis.stop();

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Handle loading state and animations
  useEffect(() => {
    if (loading) {
      document.body.classList.add("loading");
    } else {
      document.body.classList.remove("loading");
      runAnimations(() => {
        document.body.classList.add("loaded");
        setAnimationsComplete(true);
        lenisRef.current?.start(); // Enable scrolling after animations
      });
    }
  }, [loading]);

  // Preloader timer
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader />
      {!loading && (
        <>
          <Navbar />
          <div className="container">
            <section className="hero">
              <div className="hero-bg"></div>
              <Counter />
              <ImageGrid />
              <Sidebar />
              <Header />
              <SiteInfo />
              <HeroFooter />
            </section>
          </div>
          {animationsComplete && (
            <>
              <AboutMe />
              <Achievements />
              <ProjectShowcase />
              <section className="contact-new">
                <div className="contact-new__bg"></div>

                <div className="contact-new__layout">
                  <header className="contact-new__header">
                    <h2 className="contact-new__title">
                      Let’s build&nbsp;something
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
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                      />
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
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
