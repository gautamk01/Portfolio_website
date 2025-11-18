"use client";

import React, { useState } from "react";
import Link from "next/link";
import { blogPosts } from "@/lib/blogData";
import { ArrowLeft } from "lucide-react";
import "./page.css";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts = blogPosts.filter((post) =>
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
      <Link href="/" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--fg-muted)', marginBottom: '2rem', textDecoration: 'none', fontSize: '0.95rem' }}>
        <ArrowLeft size={20} />
        Back to Home
      </Link>
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
          <Link href={`/blog/${post.slug}`} key={post.slug} className="blog-page-card">
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
