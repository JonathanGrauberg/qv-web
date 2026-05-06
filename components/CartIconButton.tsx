"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { useCart, Product } from "@/hooks/useCart";

type Props = {
  product: Product;
};

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

export function CartIconButton({ product }: Props) {
  const { addToCart, removeFromCart, cart } = useCart();

  const [state, setState] = useState<
    "idle" | "adding" | "added" | "removing" | "removed"
  >("idle");

  const isInCart = cart.some((item) => item.id === product.id);

  const handleAdd = useCallback(() => {
    if (state !== "idle") return;

    addToCart(product);
    setState("adding");

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
    <motion.button
      onClick={isInCart && state === "idle" ? handleRemove : handleAdd}
      disabled={isAnimating}
      whileTap={!isAnimating ? { scale: 0.88 } : undefined}
      className={`
        relative overflow-hidden rounded-lg
        w-9 h-9 sm:w-10 sm:h-10
        flex items-center justify-center
        text-beige cursor-pointer
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
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* RIPPLE ADD */}
      <AnimatePresence>
        {state === "adding" && (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(245,240,232,0.4) 0%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* RIPPLE REMOVE */}
      <AnimatePresence>
        {state === "removing" && (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ scale: 0, opacity: 0.3 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(239,68,68,0.25) 0%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* CONTENT */}
      <div className="relative z-20 flex items-center justify-center w-full h-full">
        <AnimatePresence mode="wait">
          {!isInCart && state === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <CartIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </motion.div>
          )}

          {state === "adding" && (
            <motion.div
              key="adding"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.3 }}
            >
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: 40, rotate: 360, scale: 0.4 }}
                transition={{ duration: 0.5 }}
              >
                <CartIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
              </motion.div>
            </motion.div>
          )}

          {(state === "added" || (isInCart && state === "idle")) && (
            <motion.div
              key="added"
              initial={{ scale: 0.4 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative"
            >
              {state === "added" && (
                <motion.div
                  className="absolute inset-0 -m-2 rounded-full border border-beige/40"
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
              <Check className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </motion.div>
          )}

          {state === "removing" && (
            <motion.div key="removing">
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: -40, rotate: -360, scale: 0.4 }}
                transition={{ duration: 0.5 }}
              >
                <CartIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
              </motion.div>
            </motion.div>
          )}

          {state === "removed" && (
            <motion.div
              key="removed"
              initial={{ scale: 0.4 }}
              animate={{ scale: 1 }}
            >
              <Minus className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* GLOW */}
      <AnimatePresence>
        {isInCart && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.25, 0],
              boxShadow: [
                "0 0 0px rgba(74,157,111,0)",
                "0 0 12px rgba(74,157,111,0.5)",
                "0 0 0px rgba(74,157,111,0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}