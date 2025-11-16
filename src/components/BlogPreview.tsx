"use client";

import React from "react";
import Link from "next/link";
import "./BlogPreview.css";
import { useTheme } from "../contexts/ThemeProvider";

const blogPosts = [
  {
    title: "Demystifying React's Concurrent Mode",
    category: "Technical Deep Dive",
    date: "October 28, 2025",
    excerpt:
      "A deep-dive into the internals of React's Concurrent Mode, with practical examples and interactive demos to showcase its power.",
    link: "#",
  },
  {
    title: "Building Performant Data Visualizations with D3 and React",
    category: "Frontend Engineering",
    date: "September 15, 2025",
    excerpt:
      "Exploring techniques for creating smooth, scalable, and interactive data visualizations by combining the strengths of D3.js and React.",
    link: "#",
  },
  {
    title: "A Guide to Full-Stack Development with Next.js",
    category: "Web Development",
    date: "August 02, 2025",
    excerpt:
      "From server-side rendering to API routes, this guide covers everything you need to know to build and deploy a modern web app with Next.js.",
    link: "#",
  },
];

const BlogPreview = () => {
  const { theme } = useTheme();

  return (
    <section 
      className="blog-preview-wrapper"
    >
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
            <a 
              href={post.link} 
              className="blog-card"
              key={post.title}
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
            </a>
          ))}
        </div>
        <div className="view-more-container">
            <Link href="/blog" className="view-more-link">
                View More Blogs
            </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;