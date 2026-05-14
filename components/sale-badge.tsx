"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function SaleBadge() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -40px 0px",
  });

  const particles = [
    { x: -22, y: -18, color: "#fbbf24", circle: true, size: 5, delay: 0.0 },
    { x: 22, y: -22, color: "#ef4444", circle: false, size: 4, delay: 0.05 },
    { x: -16, y: 12, color: "#34d399", circle: true, size: 4, delay: 0.1 },
    { x: 28, y: 6, color: "#f97316", circle: false, size: 3, delay: 0.08 },
    { x: 2, y: -28, color: "#fbbf24", circle: true, size: 3, delay: 0.12 },
    { x: -32, y: -4, color: "#ef4444", circle: false, size: 4, delay: 0.03 },
    { x: 14, y: 18, color: "#34d399", circle: true, size: 3, delay: 0.07 },
    { x: -10, y: -20, color: "#f97316", circle: false, size: 3, delay: 0.15 },
  ];

  return (
    <div ref={ref} className="absolute left-4 top-4 z-10">
      {/* ✨ Partículas */}
      {isInView &&
        particles.map((p, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute"
            style={{
              width: p.size,
              height: p.circle ? p.size : p.size * 2.5,
              backgroundColor: p.color,
              borderRadius: p.circle ? "50%" : 2,
              left: "50%",
              bottom: "50%",
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
            animate={{
              x: p.x,
              y: p.y + 35,
              opacity: 0,
              scale: 0.4,
              rotate: 300,
            }}
            transition={{
              duration: 0.75,
              delay: p.delay,
              ease: "easeOut",
            }}
          />
        ))}

      {/* 🔥 Badge */}
      <motion.span
        className="block whitespace-nowrap rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-md"
        initial={{ scale: 0, opacity: 0, y: 8 }}
        animate={isInView ? { scale: 1, opacity: 1, y: 0 } : {}}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 18,
          delay: 0.08,
        }}
      >
        🔥 SALE
      </motion.span>
    </div>
  );
}