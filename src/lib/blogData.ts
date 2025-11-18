export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  coverImage: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "demystifying-react-concurrent-mode",
    title: "Demystifying React's Concurrent Mode",
    category: "Technical Deep Dive",
    date: "October 28, 2025",
    excerpt:
      "A deep-dive into the internals of React's Concurrent Mode, with practical examples and interactive demos to showcase its power.",
    coverImage: "/p1.png", // Using existing image
    content: `
      <p>React's Concurrent Mode is a set of new features that help React apps stay responsive and adjust to the user's device capabilities and network speed.</p>
      
      <h3>What is Concurrent Mode?</h3>
      <p>In standard React (Sync Mode), rendering is a blocking operation. Once it starts, it cannot be interrupted. Concurrent Mode changes this by allowing React to interrupt a long-running render to handle a high-priority event, like a user input.</p>

      <h3>Key Features</h3>
      <ul>
        <li><strong>Interruptible Rendering:</strong> React can pause work and come back to it later.</li>
        <li><strong>Concurrent Updates:</strong> React can work on multiple state updates simultaneously.</li>
        <li><strong>Suspense:</strong> A built-in way to handle loading states for data fetching and code splitting.</li>
      </ul>

      <h3>Why it Matters</h3>
      <p>By prioritizing user interactions, Concurrent Mode makes applications feel significantly smoother, especially on lower-end devices. It essentially allows React to "multitask".</p>
    `,
  },
  {
    slug: "building-performant-data-visualizations-d3-react",
    title: "Building Performant Data Visualizations with D3 and React",
    category: "Frontend Engineering",
    date: "September 15, 2025",
    excerpt:
      "Exploring techniques for creating smooth, scalable, and interactive data visualizations by combining the strengths of D3.js and React.",
    coverImage: "/p2.png", // Using existing image
    content: `
      <p>Data visualization is a powerful way to communicate complex information. Combining React's component model with D3's calculation capabilities leads to highly performant and maintainable charts.</p>

      <h3>The Strategy</h3>
      <p>The most common and effective approach is to let <strong>D3 handle the math</strong> and let <strong>React handle the DOM</strong>.</p>

      <h3>Steps to Success</h3>
      <ol>
        <li>Use D3 scales and shape generators to calculate paths and coordinates.</li>
        <li>Pass these calculated values to React components (e.g., <code>&lt;path&gt;</code>, <code>&lt;circle&gt;</code>).</li>
        <li>Use React's state management to handle interactions like hovering and filtering.</li>
      </ol>

      <h3>Performance Tips</h3>
      <p>For large datasets, consider using HTML5 Canvas instead of SVG, or leverage libraries like <code>react-spring</code> for smooth animations.</p>
    `,
  },
  {
    slug: "guide-full-stack-development-nextjs",
    title: "A Guide to Full-Stack Development with Next.js",
    category: "Web Development",
    date: "August 02, 2025",
    excerpt:
      "From server-side rendering to API routes, this guide covers everything you need to know to build and deploy a modern web app with Next.js.",
    coverImage: "/hack.jpeg", // Using existing image
    content: `
      <p>Next.js has revolutionized the React ecosystem by providing a zero-config framework for building full-stack applications.</p>

      <h3>Core Concepts</h3>
      <ul>
        <li><strong>Pages & Routing:</strong> File-system based routing makes navigation intuitive.</li>
        <li><strong>Data Fetching:</strong> Choose between Static Generation (SSG), Server-Side Rendering (SSR), and Incremental Static Regeneration (ISR).</li>
        <li><strong>API Routes:</strong> Build backend endpoints directly within your Next.js app using the <code>/pages/api</code> directory.</li>
      </ul>

      <h3>Deployment</h3>
      <p>Deploying to Vercel is seamless, offering features like automatic HTTPS, global CDN, and preview deployments for every git push.</p>
    `,
  },
];
