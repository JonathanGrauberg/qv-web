"use client";

import { useCart } from "@/hooks/useCart";
import QRCode from "react-qr-code";

export function Checkout() {
  const { cart, getTotal } = useCart();

  const phone = "5493436959359";

  function generateMessage() {
    let message = "Hola! Quiero quedar verde:\n\n";

    cart.forEach((item) => {
      message += `🧉 ${item.name} x${item.quantity} - $${item.price}\n`;
    });

    message += `\n-------------------\n`;
    message += `Total: $${getTotal()}\n`;
    message += `\n¿Está disponible?`;

    return encodeURIComponent(message);
  }

  const link = `https://wa.me/${phone}?text=${generateMessage()}`;

  if (cart.length === 0) {
    return <p className="text-center mt-10">Tu carrito está vacío</p>;
  }

  return (
    <div className="mt-10 flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold">Finalizar pedido</h2>

      {/* QR */}
      <div className="bg-white p-4 rounded-xl">
        <QRCode value={link} />
      </div>

      {/* Botón */}
      <a
        href={link}
        target="_blank"
        className="bg-green-600 text-white px-6 py-3 rounded-full"
      >
        Comprar por WhatsApp
      </a>
    </div>
  );
}