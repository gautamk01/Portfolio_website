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

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  useEffect(() => {
    if (!loading) {
      runAnimations();
    }
  }, [loading]);

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
        </>
      )}
    </>
  );
};

export default Home;
