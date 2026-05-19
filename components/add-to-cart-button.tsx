"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, Minus } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/hooks/useCart";

type Props = {
  product: Product;
};

export function AddToCartButton({ product }: Props) {
  const { addToCart, removeFromCart, cart } = useCart();

  const [state, setState] = useState<
    "idle" | "adding" | "added" | "removing" | "removed"
  >("idle");

  const confettiRef = useRef<HTMLDivElement>(null);

  const isInCart = cart.some((item: any) => item.id === product.id);

  // 🎉 CONFETTI
  const triggerConfetti = () => {
    const el = confettiRef.current;
    if (!el) return;

    const colors = ["#74ACDF", "#FFFFFF", "#FFD700"];

    for (let i = 0; i < 12; i++) {
      const piece = document.createElement("span");

      piece.style.position = "absolute";
      piece.style.width = "6px";
      piece.style.height = "6px";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.left = "50%";
      piece.style.top = "50%";
      piece.style.borderRadius = "2px";
      piece.style.pointerEvents = "none";

      const angle = Math.random() * 2 * Math.PI;
      const distance = 40 + Math.random() * 40;

      piece.animate(
        [
          { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
          {
            transform: `translate(${Math.cos(angle) * distance}px, ${
              Math.sin(angle) * distance
            }px) scale(0.5)`,
            opacity: 0,
          },
        ],
        {
          duration: 700,
          easing: "ease-out",
        }
      );

      el.appendChild(piece);

      setTimeout(() => {
        piece.remove();
      }, 700);
    }
  };

  const handleAdd = useCallback(() => {
    if (state !== "idle") return;

    addToCart(product);
    setState("adding");

    triggerConfetti(); // 💥 agregado sin romper nada

    setTimeout(() => setState("added"), 700);
    setTimeout(() => setState("idle"), 2200);
  }, [addToCart, product, state]);

  const handleRemove = useCallback(() => {
    if (state !== "idle") return;

    removeFromCart(product.id);
    setState("removing");

    setTimeout(() => setState("removed"), 600);
    setTimeout(() => setState("idle"), 1800);
  }, [removeFromCart, product.id, state]);

  const isAnimating = state !== "idle";

  return (
    <div className="w-full max-w-[140px] sm:max-w-[160px] mx-auto relative">

      {/* 🎉 CONTENEDOR CONFETTI */}
      <div
        ref={confettiRef}
        className="pointer-events-none absolute inset-0 z-30"
      />

      <motion.button
        onClick={isInCart && state === "idle" ? handleRemove : handleAdd}
        disabled={isAnimating}
        whileTap={!isAnimating ? { scale: 0.93 } : undefined}
        className={`
          relative w-full overflow-hidden rounded-full 
          h-9 sm:h-10 md:h-11
          text-beige
          transition-colors duration-300
          focus:outline-none focus-visible:ring-2 focus-visible:ring-verde-claro focus-visible:ring-offset-2

          ${
            isInCart
              ? "bg-verde-claro hover:bg-verde-oscuro"
              : "bg-verde-oscuro hover:bg-verde-claro"
          }
        `}
      >
        {/* SHIMMER */}
        <AnimatePresence>
          {(state === "adding" || state === "removing") && (
            <motion.div
              className="absolute inset-0 z-10"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
              }}
            />
          )}
        </AnimatePresence>

        {/* CONTENT */}
        <div className="relative z-20 flex items-center justify-center h-full text-xs sm:text-sm">
          <AnimatePresence mode="wait">
            
            {!isInCart && state === "idle" && (
              <motion.div
                key="idle-add"
                className="flex items-center justify-center gap-1.5"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="font-semibold">Agregar</span>
              </motion.div>
            )}

            {state === "adding" && (
              <motion.div key="adding" className="flex items-center justify-center">
                <motion.div
                  initial={{ x: 0, rotate: 0, scale: 1 }}
                  animate={{ x: 70, rotate: 360, scale: 0.6 }}
                  transition={{ duration: 0.65, ease: "easeIn" }}
                >
                  <ShoppingCart className="h-5 w-5" />
                </motion.div>
              </motion.div>
            )}

            {(state === "added" || (isInCart && state === "idle")) && (
              <motion.div
                key="added"
                className="flex items-center justify-center gap-1.5"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Check className="h-4 w-4 stroke-[3px]" />
                <span className="font-semibold">
                  {state === "idle" ? "En carrito" : "Agregado"}
                </span>
              </motion.div>
            )}

            {state === "removing" && (
              <motion.div key="removing" className="flex items-center justify-center">
                <motion.div
                  initial={{ x: 0, rotate: 0, scale: 1 }}
                  animate={{ x: -70, rotate: -360, scale: 0.6 }}
                  transition={{ duration: 0.55, ease: "easeIn" }}
                >
                  <ShoppingCart className="h-5 w-5" />
                </motion.div>
              </motion.div>
            )}

            {state === "removed" && (
              <motion.div
                key="removed"
                className="flex items-center justify-center gap-1.5"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
              >
                <Minus className="h-4 w-4 stroke-[3px]" />
                <span className="font-semibold">Quitado</span>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.button>
    </div>
  );
}