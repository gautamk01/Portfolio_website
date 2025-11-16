"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./page.css";

// Expanded list of blog posts for a more complete page
const allBlogPosts = [
  {
    id: 1,
    title: "Demystifying React's Concurrent Mode",
    category: "Technical Deep Dive",
    date: "October 28, 2025",
    excerpt: "A deep-dive into the internals of React's Concurrent Mode, with practical examples and interactive demos to showcase its power.",
    link: "/blog/react-concurrent-mode",
  },
  {
    id: 2,
    title: "Building Performant Data Visualizations with D3 and React",
    category: "Frontend Engineering",
    date: "September 15, 2025",
    excerpt: "Exploring techniques for creating smooth, scalable, and interactive data visualizations by combining the strengths of D3.js and React.",
    link: "/blog/d3-react-performance",
  },
  {
    id: 3,
    title: "A Guide to Full-Stack Development with Next.js",
    category: "Web Development",
    date: "August 02, 2025",
    excerpt: "From server-side rendering to API routes, this guide covers everything you need to know to build and deploy a modern web app with Next.js.",
    link: "/blog/full-stack-nextjs",
  },
  {
    id: 4,
    title: "State Management in 2025: A Comparative Analysis",
    category: "Architecture",
    date: "July 21, 2025",
    excerpt: "An in-depth look at the most popular state management libraries in the React ecosystem, including Redux, Zustand, and Jotai.",
    link: "/blog/state-management-2025",
  },
  {
    id: 5,
    title: "The Art of API Design: Best Practices for RESTful Services",
    category: "Backend Development",
    date: "June 10, 2025",
    excerpt: "Learn how to design clean, intuitive, and scalable APIs that your users will love.",
    link: "/blog/api-design-best-practices",
  },
  {
    id: 6,
    title: "Mastering TypeScript for Large-Scale Applications",
    category: "Technical Deep Dive",
    date: "May 05, 2025",
    excerpt: "Advanced TypeScript patterns and techniques for building maintainable and type-safe enterprise applications.",
    link: "/blog/mastering-typescript",
  },
];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts = allBlogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <main className="blog-page">
      <header className="blog-page-header">
        <h1>The Code & Craft Blog</h1>
        <p>
          Welcome to my digital journal. Here, I share my thoughts and learnings on web development, design, and the ever-evolving tech landscape.
        </p>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search articles..."
            className="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="blog-page-grid">
        {currentPosts.map((post) => (
          <Link href={post.link} key={post.id} className="blog-page-card">
            <div className="card-content">
              <p className="card-category">{post.category}</p>
              <h3 className="card-title">{post.title}</h3>
              <p className="card-excerpt">{post.excerpt}</p>
              <div className="card-footer">
                <span className="card-date">{post.date}</span>
                <span className="read-more">Read More &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              {number}
            </button>
          ))}
        </nav>
      )}
    </main>
  );
};

export default BlogPage;
