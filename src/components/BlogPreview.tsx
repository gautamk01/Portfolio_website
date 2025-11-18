"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./BlogPreview.css";
import { useTheme } from "../contexts/ThemeProvider";
import { blogPosts } from "../lib/blogData";

gsap.registerPlugin(ScrollTrigger);

const BlogPreview = () => {
  const { theme } = useTheme();
  const wrapperRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".blog-eyebrow",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        }
      )
        .fromTo(
          ".blog-title",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.15"
        )
        .fromTo(
          ".blog-intro",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.15"
        )
        .fromTo(
          ".blog-card",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.1"
        )
        .fromTo(
          ".view-more-container",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.2"
        );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const handleViewMore = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Page transition animation (Staggered Slices)
    gsap.to(".transition-slice", {
      scaleY: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power4.inOut",
      onComplete: () => {
        router.push("/blog");
      }
    });
  };

  return (
    <section 
      className="blog-preview-wrapper"
      ref={wrapperRef}
    >
      {/* Staggered Transition Overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 9999,
          display: 'flex',
          pointerEvents: 'none'
        }}
      >
        {[...Array(5)].map((_, i) => (
            <div 
                key={i}
                className="transition-slice"
                style={{
                    flex: 1,
                    height: '100%',
                    backgroundColor: 'var(--fg)',
                    transform: 'scaleY(0)',
                    transformOrigin: 'bottom',
                }}
            />
        ))}
      </div>

      <div 
        className="blog-content"
      >
        <div className="blog-header">
          <p className="blog-eyebrow">
            Insights & Articles
          </p>
          <h2 className="blog-title">
            From My Digital Desk
          </h2>
          <p className="blog-intro">
            A collection of my thoughts on web development, design, and the tech
            industry.
          </p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <Link 
              href={`/blog/${post.slug}`}
              className="blog-card"
              key={post.slug}
            >
              <header className="blog-card-header">
                <p className="category">
                  {post.category}
                </p>
                <h3>
                  {post.title}
                </h3>
              </header>
              <p className="blog-card-excerpt">
                {post.excerpt}
              </p>
              <footer className="blog-card-footer">
                <span className="read-more-link">
                  Read More &rarr;
                </span>
                <span className="article-date">
                  {post.date}
                </span>
              </footer>
            </Link>
          ))}
        </div>
        <div className="view-more-container">
            <button 
              className="view-more-link"
              onClick={handleViewMore}
              style={{ border: 'none', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}
            >
                View More Blogs
            </button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;