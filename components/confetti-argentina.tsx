"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#74abdf38", "#ffffff37", "#ffd9003e", "#0038703a", "#74abdf3f", "#ffffff3e"];

type Particle = {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  speedX: number;
  speedY: number;
  opacity: number;
  shape: "rect" | "circle" | "ribbon";
  swing: number;
  swingSpeed: number;
  swingAmp: number;
};

function createParticle(canvasWidth: number): Particle {
  const shape = (["rect", "rect", "circle", "ribbon"] as const)[
    Math.floor(Math.random() * 4)
  ];
  return {
    x: Math.random() * canvasWidth,
    y: -20 - Math.random() * 200,
    w: shape === "ribbon" ? 3 + Math.random() * 3 : 6 + Math.random() * 10,
    h: shape === "ribbon" ? 14 + Math.random() * 16 : 6 + Math.random() * 10,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.12,
    speedX: (Math.random() - 0.5) * 1.2,
    speedY: 1.5 + Math.random() * 2.5,
    opacity: 0.7 + Math.random() * 0.3,
    shape,
    swing: Math.random() * Math.PI * 2,
    swingSpeed: 0.02 + Math.random() * 0.03,
    swingAmp: 0.8 + Math.random() * 1.5,
  };
}

export function ConfettiArgentina() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 120;
    particles.current = Array.from({ length: COUNT }, () =>
      createParticle(canvas.width)
    );

    // stagger initial positions so they don't all start at top at once
    particles.current.forEach((p, i) => {
      if (i < COUNT * 0.6) {
        p.y = Math.random() * canvas.height;
      }
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles.current) {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "ribbon") {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          // shine effect on ribbon
          ctx.globalAlpha = p.opacity * 0.4;
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(-p.w / 2 + 1, -p.h / 2, 1, p.h);
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }

        ctx.restore();

        // update
        p.swing += p.swingSpeed;
        p.x += p.speedX + Math.sin(p.swing) * p.swingAmp;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 30) {
          const fresh = createParticle(canvas.width);
          Object.assign(p, fresh);
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-40 pointer-events-none"
      aria-hidden="true"
    />
  );
}
