"use client";

import React from "react";

interface MarqueeProps {
  variant?: "dark" | "light";
  speed?: "slow" | "normal" | "fast";
  angle?: number;
}

export const Marquee = ({
  variant = "dark",
  speed = "normal",
  angle = -6,
}: MarqueeProps) => {
  const bgColor = variant === "dark" ? "bg-verde-claro" : "bg-beige";

  const duration = {
    slow: 40,
    normal: 25,
    fast: 15,
  }[speed];

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          animation: marquee ${duration}s linear infinite;
        }
      `}</style>

      <div className="relative py-40 overflow-visible z-20 pointer-events-none">
  
  <div
    className="absolute left-1/2 top-1/2 w-[180%]"
    style={{
      transform: `translate(-50%, -50%) rotate(-6deg)`,
    }}
  >
    <div className="bg-verde-claro py-8">
      
      <div className="flex animate-marquee whitespace-nowrap">
        
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="mx-10 flex items-center flex-shrink-0"
          >
            <img
              src={
                i % 2 === 0
                  ? "/images/logo-pill-qv-claro.png"
                  : "/images/logo-pill-qv-oscuro.png"
              }
              alt="Quedé Verde"
              className="h-16 object-contain"
            />
          </div>
        ))}

        {[...Array(20)].map((_, i) => (
          <div
            key={`dup-${i}`}
            className="mx-10 flex items-center flex-shrink-0"
          >
            <img
              src={
                i % 2 === 0
                  ? "/images/logo-pill-qv-claro.png"
                  : "/images/logo-pill-qv-oscuro.png"
              }
              alt="Quedé Verde"
              className="h-16 object-contain"
            />
          </div>
        ))}

      </div>

    </div>
  </div>
</div>
    </>
  );
};