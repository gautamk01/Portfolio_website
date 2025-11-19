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
    slug: "gemini-3-0-pro-daily-driver",
    title: "The Shift: Why Gemini 3.0 Pro Just Became My New Daily Driver",
    category: "AI & Software Engineering",
    date: "November 19, 2025",
    excerpt:
      "For a long time, the hierarchy of coding models felt set in stone. But after my latest round of testing, Gemini 3.0 Pro has dismantled that hierarchy. Here is why it's my new daily driver.",
    coverImage: "/blogpic/Gemini3.png",
    content: `
      <p>For a long time, the hierarchy of coding models felt set in stone. We had Claude Sonnet for reliability, GPT-4/5 for general reasoning, and everything else trailing behind. But after my latest round of testing, that hierarchy has been dismantled.</p>
      <p>I have officially switched to <strong>Gemini 3.0 Pro</strong> as my daily driver. It isn't just about better logic; it’s about how it handles the messy, complex reality of actual software engineering.</p>
      <p>Here is why this model feels like a generational leap for developers.</p>

      <h3>The "Saturation" Problem</h3>
      <p>You know an AI model is powerful when it breaks your testing methodology. In my previous standard tests ("KingBench"), Gemini 3.0 didn't just pass; it scored a perfect 100%. It essentially "saturated" the benchmark, rendering those questions useless for differentiating top-tier models.</p>
      <p>To find its breaking point, I had to build entirely new, harder benchmarks—specifically targeting areas where LLMs notoriously struggle: <strong>Game Development (Godot/GDScript)</strong> and <strong>Svelte</strong>.</p>

      <h3>Mastery Over "Niche" Languages</h3>
      <p>Most models are great at Python or React because the training data is endless. But ask an LLM to write a complex script for the Godot game engine, and you usually get hallucinations.</p>
      <p>Gemini 3.0 Pro is different.<br/>In my testing, it demonstrated a deep understanding of <strong>GDScript</strong>. When tasked with modifying a basic FPS game—adding step counters, health bars affected by jumping logic—it didn't just guess. It nailed the syntax and the game logic perfectly.</p>
      <p>It showed similar dominance in <strong>Svelte</strong>. While other models struggle with the specific boilerplate and reactivity of Svelte, Gemini 3.0 produced code that was not just functional, but highly accurate to the framework's best practices.</p>

      <h3>The "Agentic" Difference</h3>
      <p>The real test of a coding model isn't answering a leetcode question; it's building an app from scratch. I tested Gemini 3.0 inside <strong>Kilo Code</strong> (my current editor of choice) to see if it could handle multi-file agentic tasks.</p>

      <h4>The "Open Code" Breakthrough</h4>
      <p>There is a specific test I run called the "Open Code" question. Until now, no single standalone model had passed it. The only success I'd seen came from "CodeBuff," which is a complex harness combining multiple models and agents (and costing a lot of money).</p>
      <p>Gemini 3.0 Pro passed it solo.<br/>It successfully implemented complex SVG commands, adhered to strict UI aesthetics, and allowed for user-input prompts to generate graphics. For a single model to outperform a complex agentic swarm is a massive development.</p>

      <h4>Real-World App Construction</h4>
      <p>I threw several app ideas at it:</p>
      <ul>
        <li><strong>A Tauri App:</strong> It flawlessly handled image cropping, listing, and annotation.</li>
        <li><strong>A Movie Tracker:</strong> One-shot generation that was immediately usable.</li>
        <li><strong>A Go TUI Calculator:</strong> Perfect navigation and calculation logic.</li>
      </ul>
      <p>While it did stumble on a Nuxt app (a test that Sonnet and GPT-5 also fail), its recovery rate on other tasks is impressive. It sometimes hallucinates in very long contexts, but unlike older models, it listens to corrections and fixes itself quickly.</p>

      <h3>Efficiency is the New Performance</h3>
      <p>Perhaps the most practical reason for switching is the economy of it. High-reasoning tasks usually burn through API credits rapidly.</p>
      <p>During my "high reasoning effort" testing, Gemini 3.0 Pro ran the entire suite of complex benchmarks for a fraction of the cost of its competitors. We are talking about a model that is roughly <strong>50% more capable</strong> in my daily life usage than Claude Sonnet, yet significantly cheaper to run.</p>

      <h3>The Verdict</h3>
      <p>We have finally crossed a threshold. For the first time, we have a model that feels like it truly understands the intent behind the code, specifically in difficult languages like GDScript, while being efficient enough to use for every single pull request.</p>
      <p>If you are relying on older models or expensive agentic wrappers, it might be time to look at the raw power of Gemini 3.0 Pro. It’s not just winning on the charts; it’s winning in the IDE.</p>
    `,
  },
]