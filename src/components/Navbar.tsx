"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import "./Navbar.css";

interface NavbarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, onToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const menuPreviewImgRef = useRef<HTMLDivElement>(null);

  // Effect for handling the click to toggle menu state
  useEffect(() => {
    const menuToggle = document.querySelector(".menu-toggle");
    if (!menuToggle) return;

    menuToggle.addEventListener("click", onToggle);

    return () => {
      menuToggle.removeEventListener("click", onToggle);
    };
  }, [onToggle]);

  // Effect for managing container class for 3D effect
  useEffect(() => {
    const menuToggle = document.querySelector(".menu-toggle");
    const container = document.querySelector(".container");

    if (isOpen) {
      menuToggle?.classList.add("open");
      container?.classList.add("menu-open");
    } else {
      menuToggle?.classList.remove("open");
      container?.classList.remove("menu-open");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Animate the divider line on component mount
    gsap.to(".divider", {
      scaleX: 1,
      duration: 1.5,
      ease: "power2.out",
      delay: 1, // Delay to sync with other page load animations
    });
  }, []);

  const handleMouseOver = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isOpen) return;
    const imgsrc = e.currentTarget.getAttribute("data-img");
    if (!imgsrc || !menuPreviewImgRef.current) return;

    const previewImages = menuPreviewImgRef.current.querySelectorAll("img");
    if (
      previewImages.length > 0 &&
      previewImages[previewImages.length - 1].src.endsWith(imgsrc)
    )
      return;

    const newPreviewImg = document.createElement("img");
    newPreviewImg.src = imgsrc;
    newPreviewImg.style.opacity = "0";
    newPreviewImg.style.transform = "scale(1.25) rotate(10deg)";

    menuPreviewImgRef.current.appendChild(newPreviewImg);

    gsap.to(newPreviewImg, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 0.75,
      ease: "power2.out",
    });
  };

  return (
    <>
      <nav className={`main-nav ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-left">
          <div className="logo-name">
            <Link href="/">GK</Link>
          </div>
        </div>

        <div className="nav-center">
          <div className="nav-links">
            <Link href="/resume">Resume</Link>
            <Link href="/#projects">Projects</Link>
            <Link href="/#about">About</Link>
            <Link href="/#contact">Contact</Link>
          </div>
        </div>

        <div className="nav-right">
          <div className="menu-toggle">
            <div className="burger-menu">
              <span className="burger-line line1"></span>
              <span className="burger-line line2"></span>
              <span className="burger-line line3"></span>
            </div>
          </div>
        </div>

        <div className="divider"></div>
      </nav>

      <div className={`menu-overlay ${isOpen ? "open" : ""}`}>
        <div className="menu-content">
          <div className="menu-items">
            <div className="col-lg">
              <div className="menu-preview-img" ref={menuPreviewImgRef}>
                <Image
                  src="/resume.webp"
                  alt="resume"
                  width={800}
                  height={480}
                />
              </div>
            </div>
            <div className="col-sm">
              <div className="menu-links">
                <div className="link">
                  <a
                    href="/resume"
                    data-img="/resume.webp"
                    onMouseOver={handleMouseOver}
                    onClick={onToggle}
                  >
                    Resume
                  </a>
                </div>
                <div className="link">
                  <a
                    href="/#projects"
                    data-img="/contact.webp"
                    onMouseOver={handleMouseOver}
                    onClick={onToggle}
                  >
                    Projects
                  </a>
                </div>
                <div className="link">
                  <a
                    href="/#about"
                    data-img="/about_me.webp"
                    onMouseOver={handleMouseOver}
                    onClick={onToggle}
                  >
                    About
                  </a>
                </div>
                <div className="link">
                  <a
                    href="/#contact"
                    data-img="/contact.webp"
                    onMouseOver={handleMouseOver}
                    onClick={onToggle}
                  >
                    Contact
                  </a>
                </div>
              </div>

              <div className="menu-socials">
                <div className="social">
                  <a href="#">Gmail</a>
                </div>
                <div className="social">
                  <a href="#">Github</a>
                </div>
                <div className="social">
                  <a href="#">LinkedIn</a>
                </div>
                <div className="social">
                  <a href="#">Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;