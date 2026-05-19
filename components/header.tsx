"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { CartModal } from "@/components/cart-modal";
import { ConfettiArgentina } from "./confetti-argentina";

const navItems = [
  { label: "Inicio", href: "inicio" },
  { label: "Productos", href: "productos", highlight: true },
  { label: "Nosotros", href: "nosotros" },
  { label: "Contacto", href: "contacto" },
];

// 🇦🇷 FECHA HOT SALE
const TARGET_DATE = "2026-05-25T23:59:59-03:00";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ d: "00", h: "00", m: "00", s: "00" });

  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // 🔥 SCROLL PRO (sin # y siempre funciona)
  const scrollToSection = (id: string) => {
    if (id === "inicio") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", window.location.pathname);
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -110;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });

    window.history.replaceState(null, "", window.location.pathname);
  };

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      const difference = +new Date(TARGET_DATE) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          d: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
          h: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
          m: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
          s: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
        });
      }
    };

    const timer = setInterval(calculateTime, 1000);
    calculateTime();
    return () => clearInterval(timer);
  }, []);

  

  return (
    <>
      <style>{`
        .glass-patrio {
          background: linear-gradient(95deg, #74ACDF 0%, #FFFFFF 50%, #74ACDF 100%);
          backdrop-filter: blur(12px);
          border: 2px solid #FFD700;
          box-shadow: 0 4px 20px rgba(0, 56, 112, 0.3);
        }

        @keyframes pulse-highlight {
          0% { text-shadow: 0 0 0px #FFD700; transform: scale(1); }
          50% { text-shadow: 0 0 15px #FFD700; transform: scale(1.1); color: #003870; }
          100% { text-shadow: 0 0 0px #FFD700; transform: scale(1); }
        }

        .animate-titileo {
          animation: pulse-highlight 1.5s infinite;
          display: inline-block;
          font-weight: 900 !important;
        }

        .hot-sale-container {
          background: #FFD700;
          color: #003870;
          padding: 4px 12px;
          border-radius: 12px;
          font-weight: 900;
          font-style: italic;
          display: flex;
          align-items: center;
          gap: 4px;
          border: 1px solid #003870;
        }
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-50 px-2 py-4">
        <ConfettiArgentina />
        <nav className="mx-auto max-w-7xl">

          <div className="glass-patrio flex items-center justify-between rounded-full px-3 md:px-6 py-2 shadow-2xl">

            {/* LOGO + HOT SALE */}
            <div className="flex items-center gap-2 md:gap-4">
              <button onClick={() => scrollToSection("inicio")}>
                <Image
                  src="/images/icono-navbar.png"
                  alt="Quedé Verde"
                  width={90}
                  height={30}
                  className="h-7 md:h-9 w-auto"
                />
              </button>

              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="hot-sale-container shadow-lg"
              >
                <Flame className="w-4 h-4 fill-current" />
                <span className="text-sm md:text-xl tracking-tighter">
                  HOT SALE
                </span>
              </motion.div>
            </div>

            {/* NAV DESKTOP */}
            <ul className="hidden lg:flex items-center gap-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`cursor-pointer text-sm font-bold text-blue-900 px-3 py-1 rounded-full 
relative transition-all duration-200 
after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 
after:bg-blue-900 after:transition-all after:duration-300 after:-translate-x-1/2
hover:after:w-3/4 hover:scale-105 active:scale-95 ${
  item.highlight ? "animate-titileo" : ""
}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* DERECHA */}
            <div className="flex items-center gap-2 md:gap-4">

              {mounted && (
                <div className="hidden sm:flex flex-col items-end leading-tight border-r border-blue-300 pr-3">
                  <span className="text-[9px] font-black text-blue-800 uppercase">
                    Faltan
                  </span>
                  <div className="text-blue-900 font-mono font-black text-sm flex gap-1">
                    <span>{timeLeft.d}d</span>
                    <span>{timeLeft.h}h</span>
                    <span>{timeLeft.m}m</span>
                    <span className="text-yellow-600">{timeLeft.s}s</span>
                  </div>
                </div>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 rounded-full bg-white/20 text-blue-900 hover:bg-yellow-400"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-800 text-[10px] font-bold text-white border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10 rounded-full text-blue-900"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>

          {/* MOBILE MENU */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-patrio mt-3 rounded-3xl p-6 shadow-2xl lg:hidden text-center"
              >
                <div className="mb-4">
                  <p className="text-xs font-black text-blue-800 uppercase">
                    La oferta termina en:
                  </p>
                  <p className="text-2xl font-mono font-black text-blue-900">
                    {timeLeft.d}:{timeLeft.h}:{timeLeft.m}:{timeLeft.s}
                  </p>
                </div>

                <ul className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <button
                        onClick={() => {
                          scrollToSection(item.href);
                          setIsOpen(false);
                        }}
                        className={`text-xl font-bold text-blue-900 block py-2 ${
                          item.highlight ? "animate-titileo" : ""
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}