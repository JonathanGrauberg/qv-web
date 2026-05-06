"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
  };

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-3xl bg-verde-claro"
        >
          <div className="grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
            {/* Left - Content */}
            <div className="flex items-center gap-6">
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full bg-beige p-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/QV%20completo%20con%20fondo-baPeTtZ3lrrJVwk8ITpfcAnxZGrBJP.png"
                  alt="Quedé Verde"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div>
                <p className="mb-2 text-sm text-beige/80">
                  Combatí el calor con un buen mate frío. Probá nuestras nuevas
                  variedades de mates de verano. Perfectos para el tereré!
                </p>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              <h3 className="mb-4 font-display text-2xl text-beige">
                SUSCRIBITE
              </h3>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresá tu email..."
                  className="flex-1 rounded-xl border border-beige/30 bg-verde-oscuro/30 px-4 py-3 text-beige placeholder:text-beige/50 focus:border-beige focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-beige text-verde-oscuro transition-colors hover:bg-beige-claro"
                >
                  <ArrowRight className="h-5 w-5" />
                  <span className="sr-only">Suscribirse</span>
                </button>
              </form>
              <p className="mt-3 text-xs text-beige/60">
                Unite al club! Suscribite a nuestro newsletter para ofertas
                exclusivas y novedades.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
