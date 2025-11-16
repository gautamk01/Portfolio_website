"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Eye, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeProvider";
import "./resume.css";
import gsap from "gsap";

const resumeUrl = "/gautam_resume.pdf";

const experience = [
  {
    role: "Frontend Engineer",
    company: "Freelance / Remote",
    period: "2023 — Present",
    summary:
      "Designing and developing performant marketing sites, SaaS dashboards, and portfolio experiences with React, Next.js, and motion-first storytelling.",
    highlights: ["Shipped 12+ client projects", "Reduced CLS by 35%", "Led design systems"],
  },
  {
    role: "Product Design Intern",
    company: "Creative Studio",
    period: "2022 — 2023",
    summary:
      "Prototyped immersive brand experiences, collaborated with engineers on implementation details, and translated moodboards into component libraries.",
    highlights: ["Figma to code handoff", "Motion prototyping", "Accessibility audits"],
  },
];

const education = [
  {
    school: "Vellore Institute of Technology",
    degree: "B.Tech — Computer Science",
    period: "2021 — 2025",
    details: "Specializing in human-centered computing, product engineering, and interactive media.",
  },
];

const skillGroups = [
  {
    title: "Core",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js"],
  },
  {
    title: "Design & Motion",
    items: ["Figma", "Framer", "GSAP", "Spline", "Lottie"],
  },
  {
    title: "Tooling",
    items: ["Tailwind", "Styled Components", "Vercel", "Git", "Notion"],
  },
];

const highlights = [
  { label: "Projects shipped", value: "30+" },
  { label: "Avg. Lighthouse", value: "98" },
  { label: "Happy collaborators", value: "15" },
  { label: "Talks & workshops", value: "08" },
];

const ResumePage = () => {
  const { theme, toggleTheme } = useTheme();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power3.out" } });

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
        <button type="button" className="toolbar-btn theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? (
            <>
              <Moon size={16} /> Dark Mode
            </>
          ) : (
            <>
              <Sun size={16} /> Light Mode
            </>
          )}
        </button>
      </div>

      <div className="resume-hero">
        <p className="resume-eyebrow">Curriculum Vitae</p>
        <h1 className="resume-title">
          Precision-crafted experiences
          <span> with an engineer’s heart.</span>
        </h1>
        <p className="resume-subtitle">
          I combine design systems, motion, and modern web architecture to
          launch memorable interfaces. Download the full PDF or explore the live
          preview below.
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

      <div className="resume-metrics">
        {highlights.map((highlight) => (
          <div className="resume-metric" key={highlight.label}>
            <span>{highlight.label}</span>
            <strong>{highlight.value}</strong>
          </div>
        ))}
      </div>

      <div className="resume-grid">
        <section className="resume-card">
          <header className="resume-card__header">
            <p className="tag">Experience</p>
            <h2>Highlights & Impact</h2>
          </header>
          <div className="timeline">
            {experience.map((item) => (
              <article className="timeline-item" key={item.role}>
                <div className="timeline-meta">
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                  <span>{item.period}</span>
                </div>
                <p className="timeline-summary">{item.summary}</p>
                <ul className="timeline-highlights">
                  {item.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-card">
          <header className="resume-card__header">
            <p className="tag">Education</p>
            <h2>Foundations</h2>
          </header>
          {education.map((item) => (
            <div className="education" key={item.school}>
              <h3>{item.school}</h3>
              <p>{item.degree}</p>
              <span>{item.period}</span>
              <p className="education-details">{item.details}</p>
            </div>
          ))}

          <div className="skill-groups">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.title}>
                <h4>{group.title}</h4>
                <div className="skill-chips">
                  {group.items.map((skill) => (
                    <span className="skill-chip" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section id="resume-preview" className="resume-preview-card">
        <div className="resume-card__header">
          <p className="tag">Preview</p>
          <h2>See the PDF in context</h2>
          <p className="preview-support-text">
            The embedded preview works best on modern browsers. If it doesn’t
            load, use the download link below.
          </p>
          <a href={resumeUrl} download className="resume-btn secondary">
            <Download size={16} /> Download copy
          </a>
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