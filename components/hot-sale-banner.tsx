"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// INTERFACES
interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// CONFIGURACIÓN: Finaliza el 25 de Mayo a las 23:59:59 (Hora Argentina ART)
// Usamos el formato ISO con el offset de Argentina (-03:00)
const SALE_END_DATE = new Date("2025-05-25T23:59:59-03:00").getTime();

const CONFETTI_COLORS = [
  { color: "#4B9FD8", label: "celeste-argentina" },
  { color: "#FFFFFF", label: "blanco" },
  { color: "#FFD100", label: "amarillo-sol" },
];

// COMPONENTES AUXILIARES
function ArgentineConfetti() {
  const confetti = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % 3],
    delay: Math.random() * 0.5,
    duration: 3 + Math.random() * 1.5,
    xStart: Math.random() * 100,
    xEnd: (Math.random() - 0.5) * 200 - 50,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {confetti.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.xStart}%`,
            top: "-20px",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: item.color.color,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: 600,
            opacity: 0,
            rotate: 360,
            x: item.xEnd,
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            ease: "easeIn",
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState<CountdownTime | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = SALE_END_DATE - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="flex items-center gap-3">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div key={key} className="flex flex-col items-center">
          <div className="relative h-12 w-14 overflow-hidden rounded-lg bg-blue-700 flex items-center justify-center shadow-lg border border-blue-400">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={value}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="font-black text-xl text-white"
              >
                {String(value).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-900 mt-1">
            {key === "days" ? "días" : key === "hours" ? "hs" : key === "minutes" ? "min" : "seg"}
          </span>
        </div>
      ))}
    </div>
  );
}

// COMPONENTE PRINCIPAL
export function HotSaleBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mb-8 overflow-hidden bg-gradient-to-r from-blue-400 via-white to-blue-400 py-8 shadow-2xl border-b-4 border-yellow-400"
    >
      <ArgentineConfetti />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-around gap-6 lg:flex-row">
          
          {/* Logo Hot Sale con Brillo */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative overflow-hidden rounded-xl bg-yellow-400 px-8 py-3 border-4 border-blue-600 shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <span className="relative text-3xl font-black text-blue-800 italic drop-shadow-sm">
              HOT SALE
            </span>
          </motion.div>

          {/* Contador */}
          <Countdown />

          {/* Texto Patrio */}
          <div className="text-center lg:text-right">
            <motion.p
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl font-black text-blue-900 drop-shadow-sm uppercase italic"
            >
              ¡Viva la Patria!
            </motion.p>
            <p className="font-bold text-blue-700 text-sm">25 de Mayo • Ofertas Únicas</p>
          </div>

        </div>
      </div>

      {/* Decoración inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-yellow-400 to-blue-600" />
    </motion.div>
  );
}