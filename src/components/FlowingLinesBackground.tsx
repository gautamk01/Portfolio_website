"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeProvider";

const FlowingLinesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: CodeParticle[] = [];
    let animationFrameId: number;
    
    const codeTokens = ['{ }', '</>', '&&', '||', '=>', 'const', 'let', 'import', 'return', '01', '[]', '()', '!=', '===', 'npm'];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    class CodeParticle {
      x!: number;
      y!: number;
      text!: string;
      speed!: number;
      opacity!: number;
      size!: number;
      fadeSpeed!: number;
      direction!: number; // -1 or 1 for subtle drift

      constructor() {
        this.init(true);
      }

      init(randomY = false) {
        this.x = Math.random() * width;
        this.y = randomY ? Math.random() * height : height + 20;
        this.text = codeTokens[Math.floor(Math.random() * codeTokens.length)];
        this.speed = Math.random() * 0.5 + 0.2;
        this.opacity = 0;
        this.size = Math.random() * 10 + 12; // 12px to 22px
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        this.direction = Math.random() > 0.5 ? 0.2 : -0.2;
      }

      update() {
        this.y -= this.speed;
        this.x += this.direction * 0.5;

        // Fade in then out logic
        if (this.y > height - 100) {
            this.opacity = Math.min(this.opacity + this.fadeSpeed, 0.5);
        } else if (this.y < 100) {
            this.opacity = Math.max(this.opacity - this.fadeSpeed, 0);
        } else {
            this.opacity = Math.min(this.opacity + 0.001, 0.5); // Max opacity 0.5
        }

        if (this.y < -50) {
          this.init();
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const isDark = theme === 'dark' || document.body.classList.contains('dark');
        
        // Calculate distance from center to fade out central particles
        const centerX = width / 2;
        const distanceFromCenter = Math.abs(this.x - centerX);
        
        // Create a "clear zone" in the middle 40% of the screen
        let edgeFactor = (distanceFromCenter - width * 0.2) / (width * 0.3);
        edgeFactor = Math.max(0, Math.min(1, edgeFactor)); // Clamp between 0 and 1

        const finalOpacity = this.opacity * edgeFactor;

        if (finalOpacity <= 0) return; // Don't draw invisible particles

        const color = isDark ? `rgba(200, 200, 255, ${finalOpacity})` : `rgba(50, 50, 100, ${finalOpacity})`;
        
        ctx.font = `${this.size}px monospace`;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
      }
    }
    
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(width / 60) * 3; // Increased density for sides
      for (let i = 0; i < particleCount; i++) {
        particles.push(new CodeParticle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      
      if (width < 768) {
        // Mobile: Clear canvas and idle
        ctx.clearRect(0, 0, width, height);
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0, // Behind content
        pointerEvents: "none",
        background: "transparent",
      }}
    />
  );
};

export default FlowingLinesBackground;