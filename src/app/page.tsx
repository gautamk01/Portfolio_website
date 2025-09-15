"use client";

import React, { useEffect, useState } from "react";
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
import useSmoothScroll from "../hooks/useSmoothScroll";

const Home: React.FC = () => {
  useSmoothScroll();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.classList.add("loading");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("loading");
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      runAnimations(() => {
        // Optional: callback after animations complete
      });
    }
  }, [loading]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
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
            <AboutMe />
          </div>
          <Achievements />
          <footer className="relative h-[50vh] w-full bg-black flex items-center justify-center">
            <h2 className="text-3xl text-white font-medium">
              Let's get in touch.
            </h2>
          </footer>
        </>
      )}
    </>
  );
};

export default Home;
