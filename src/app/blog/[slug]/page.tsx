import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blogData";
import "./blog-post.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

const BlogPost = async ({ params }: { params: Promise<{ slug: string }> }) => {
    // Unwrap the params using async/await
    const { slug } = await params;
    
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="blog-post-container">
            <Link href="/blog" className="back-link">
                <ArrowLeft size={20} />
                Back to Blog
            </Link>

            <header className="post-header">
                <div className="post-meta">
                    <span className="post-category">{post.category}</span>
                    <span className="post-date">{post.date}</span>
                </div>
                <h1 className="post-title">{post.title}</h1>
            </header>

            <div className="post-image-wrapper">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="post-image"
                    priority
                />
            </div>

            <div 
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    );
};

export default BlogPost;
