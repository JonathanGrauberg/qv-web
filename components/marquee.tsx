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

        /* Evita que el scroll horizontal se rompa globalmente */
        .marquee-container {
          overflow-x: clip; /* Mejor que hidden para scroll de página */
          overflow-y: visible;
          width: 100%;
          position: relative;
        }
      `}</style>

      {/* 
         Cambiamos overflow-visible por overflow-hidden (o clip) 
         Esto es lo que corta las puntas del 180% que sobran 
      */}
      <div className="marquee-container py-24 md:py-40 z-20 pointer-events-none">
        
        <div
          className="relative left-1/2 w-[200%] md:w-[150%]"
          style={{
            transform: `translateX(-50%) rotate(${angle}deg)`,
          }}
        >
          <div className="bg-verde-claro py-4 md:py-8 shadow-2xl">
            
            <div className="flex animate-marquee whitespace-nowrap">
              
              {/* Primer set de logos */}
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="mx-6 md:mx-10 flex items-center flex-shrink-0"
                >
                  <img
                    src={
                      i % 2 === 0
                        ? "/images/logo-pill-qv-claro.png"
                        : "/images/logo-pill-qv-oscuro.png"
                    }
                    alt="Quedé Verde"
                    className="h-10 md:h-16 object-contain"
                  />
                </div>
              ))}

              {/* Duplicado para el loop infinito perfecto */}
              {[...Array(15)].map((_, i) => (
                <div
                  key={`dup-${i}`}
                  className="mx-6 md:mx-10 flex items-center flex-shrink-0"
                >
                  <img
                    src={
                      i % 2 === 0
                        ? "/images/logo-pill-qv-claro.png"
                        : "/images/logo-pill-qv-oscuro.png"
                    }
                    alt="Quedé Verde"
                    className="h-10 md:h-16 object-contain"
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