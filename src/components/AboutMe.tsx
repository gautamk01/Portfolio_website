import React from "react";

const AboutMe = () => {
  return (
    <section className="portfolio-about portfolio-anime-text-container">
      <h2 className="portfolio-profile-title">A Little About Me</h2>
      <div className="portfolio-copy-container">
        <div className="portfolio-content-wrapper">
          <div className="portfolio-anime-text">
            <p>
              I'm a creative technologist bridging the gap between innovative
              technology and user-centric design. Pursuing my M.Tech in Big Data
              Analytics from VIT, I thrive on crafting intuitive digital
              experiences and leveraging data to build impactful solutions with
              a focus on sustainability.
            </p>
          </div>
          <div className="portfolio-image-container">
            <img src="/img-10.webp" alt="Abstract flowing art" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
