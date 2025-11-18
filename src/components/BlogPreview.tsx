"use client";

import React from "react";
import Link from "next/link";
import "./BlogPreview.css";
import { useTheme } from "../contexts/ThemeProvider";
import { blogPosts } from "../lib/blogData";

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
            <Link href="/blog" className="view-more-link">
                View More Blogs
            </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;