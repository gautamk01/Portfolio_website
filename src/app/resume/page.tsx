"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Eye, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeProvider";
import "./resume.css";
import gsap from "gsap";

const resumeUrl = "/gautam_resume.pdf";

const ResumePage = () => {
  const { theme, toggleTheme } = useTheme();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power3.out" },
      });

      tl.from(".resume-hero > *", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
      })
        .from(
          ".resume-metric",
          {
            opacity: 0,
            y: 20,
            stagger: 0.08,
          },
          "-=0.4"
        )
        .from(
          ".resume-card",
          {
            opacity: 0,
            y: 40,
            stagger: 0.15,
          },
          "-=0.3"
        )
        .from(
          ".resume-preview-card",
          {
            opacity: 0,
            y: 40,
          },
          "-=0.2"
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={`resume-page ${theme}`} ref={pageRef}>
      <div className="resume-toolbar">
        <Link href="/" className="toolbar-btn back-btn">
          <ArrowLeft size={16} /> Back
        </Link>
        <button
          type="button"
          className="toolbar-btn theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <span className="theme-icon">
              <Moon size={16} />
            </span>
          ) : (
            <span className="theme-icon">
              <Sun size={16} />
            </span>
          )}
        </button>
      </div>

      <div className="resume-hero">
        <p className="resume-eyebrow">Curriculum Vitae</p>
        <h1 className="resume-title">
          Full-Stack Developer & AI/ML Researcher
          <span> building intelligent, scalable systems.</span>
        </h1>
        <p className="resume-subtitle">
          I architect production-ready applications with React, Node.js, and
          modern AI/ML technologies. Currently pursuing M.Tech at VIT University
          while conducting research on LLM optimization and building real-world
          solutions that handle 1000+ concurrent users.
        </p>
        <div className="resume-actions">
          <a href="#resume-preview" className="resume-btn ghost">
            <Eye size={18} /> Preview Resume
          </a>
          <a
            href={resumeUrl}
            download
            className="resume-btn primary"
            rel="noreferrer"
          >
            <Download size={18} /> Download PDF
          </a>
        </div>
      </div>

      <section id="resume-preview" className="resume-preview-card">
        <div className="resume-card__header">
          <p className="tag">Preview</p>
        </div>
        <div className="preview-frame">
          <object
            data={resumeUrl}
            type="application/pdf"
            aria-label="Resume preview"
          >
            <div className="preview-fallback">
              <p>PDF preview is unavailable in your browser.</p>
              <a href={resumeUrl} download>
                Download the resume instead
              </a>
            </div>
          </object>
        </div>
      </section>
    </div>
  );
};

export default ResumePage;
