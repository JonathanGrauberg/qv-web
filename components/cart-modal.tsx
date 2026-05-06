"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

// ⚠️ CAMBIÁ ESTE NÚMERO
const PHONE = "5493436959359";

export function CartModal({ isOpen, onClose }: Props) {
  const { cart, removeFromCart, clearCart, getTotal } = useCart();
  const [showQR, setShowQR] = useState(false);

  function generateMessage() {
    let msg = "Hola! Quiero comprar 🧉\n\n";

    cart.forEach((item) => {
      msg += `• ${item.name} x${item.quantity} — $${(item.price * item.quantity).toLocaleString("es-AR")}\n`;
    });

    msg += `\n-------------------\n`;
    msg += `Total: $${getTotal().toLocaleString("es-AR")}\n\n`;
    msg += `¿Está disponible?`;

    return encodeURIComponent(msg);
  }

  const whatsappLink = `https://wa.me/${PHONE}?text=${generateMessage()}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-card shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >

            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-verde-claro" />
                <h2 className="text-xl font-display">Tu carrito</h2>
              </div>

              <button onClick={onClose}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                  <ShoppingCart className="h-10 w-10 opacity-30" />
                  <p>Tu carrito está vacío</p>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {cart.map((item) => (
                    <li
                      key={`${item.id}-${item.name}`}
                      className="flex items-center gap-4 rounded-xl border border-border p-3"
                    >
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          x{item.quantity} — $
                          {(item.price * item.quantity).toLocaleString("es-AR")}
                        </p>
                      </div>

                      <button onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-border px-6 py-4 flex flex-col gap-4">

                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-xl font-display">
                    ${getTotal().toLocaleString("es-AR")}
                  </span>
                </div>

                {/* QR */}
                {showQR && (
                  <div className="flex justify-center bg-white p-4 rounded-xl">
                    <QRCode value={whatsappLink} size={160} />
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowQR(!showQR)}
                  >
                    {showQR ? "Ocultar QR" : "Ver QR"}
                  </Button>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    className="flex-1 text-center rounded-full bg-verde-claro text-beige py-2 hover:bg-verde-oscuro"
                  >
                    Pedir por WhatsApp
                  </a>
                </div>

                <button
                  onClick={clearCart}
                  className="text-xs text-muted-foreground hover:text-red-500"
                >
                  Vaciar carrito
                </button>

              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}