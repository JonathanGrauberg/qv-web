"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { CartModal } from "@/components/cart-modal"; // 👈 IMPORTANTE

const navItems = [
  { label: "Inicio", href: "#" },
  { label: "Productos", href: "#productos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // 👈 NUEVO

  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <style>{`
        @supports (backdrop-filter: blur(10px)) {
          .glass {
            background: rgba(221, 207, 181, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
        }

        @supports not (backdrop-filter: blur(10px)) {
          .glass {
            background: rgba(245, 240, 235, 0.95);
          }
        }

        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #2d5f4f, #4a9d6f);
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 70%;
        }
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <nav className="mx-auto max-w-7xl">

          {/* PILL GLASS */}
          <div className="glass flex items-center justify-between rounded-full px-6 py-3 shadow-xl">

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Image
                src="/images/icono-navbar.png"
                alt="Quedé Verde"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

            {/* DESKTOP NAV */}
            <ul className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="nav-link rounded-full px-4 py-2 text-sm font-medium text-verde-oscuro hover:text-verde-claro"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* ACTIONS */}
            <div className="flex items-center gap-2">

              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex h-10 w-10 rounded-full text-verde-oscuro hover:bg-verde-claro/20"
              >
                <User className="h-5 w-5" />
              </Button>

              {/* 🛒 CARRITO */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 rounded-full text-verde-oscuro hover:bg-verde-claro/20"
                onClick={() => setIsCartOpen(true)} // 👈 ABRE MODAL
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-verde-oscuro text-xs text-beige">
                    {cartCount}
                  </span>
                )}
              </Button>

              {/* MOBILE BUTTON */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-10 w-10 rounded-full text-verde-oscuro hover:bg-verde-claro/20"
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
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass mt-2 rounded-2xl p-4 shadow-xl md:hidden"
              >
                <ul className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-xl px-4 py-3 text-center font-medium text-verde-oscuro hover:bg-verde-claro/20"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

        </nav>
      </header>

      {/* 🧠 MODAL DEL CARRITO */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}