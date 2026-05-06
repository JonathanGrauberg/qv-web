"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import emailjs from "@emailjs/browser";


/* =========================
   TYPEWRITER
========================= */
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    setDisplayed("");
    let i = 0;

    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 35);

    return () => clearInterval(interval);
  }, [text, started]);

  return <span>{displayed}</span>;
}

/* =========================
   FLOATING ORBS
========================= */
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(4)].map((_, i) => {
        const size = 80 + i * 40;
        const x = 20 + i * 18;
        const y = 15 + i * 15;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              top: `${y}%`,
              background: `rgba(245, 240, 232, ${0.04 - i * 0.008})`,
            }}
            animate={{
              x: [0, 15, -10, 8, 0],
              y: [0, -12, 8, -6, 0],
              scale: [1, 1.08, 0.95, 1.04, 1],
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

/* =========================
   ICON MORPH (BOTÓN DERECHO)
========================= */
function IconMorph({ isSubmitted }: { isSubmitted: boolean }) {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <AnimatePresence>
        {isSubmitted &&
          [0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-beige/40"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 2.5 + i * 0.5, opacity: 0 }}
              transition={{ duration: 0.9, delay: i * 0.12 }}
            />
          ))}
      </AnimatePresence>

      <motion.div
        className="relative z-10 w-14 h-14 flex items-center justify-center rounded-full"
        animate={{
          rotate: isSubmitted ? [0, -10, 10, 0] : 0,
          scale: isSubmitted ? [1, 1.1, 1] : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="arrow"
              className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-beige"
              initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.3, rotate: 90, opacity: 0 }}
            >
              <ArrowRight className="h-6 w-6 text-beige" />
            </motion.div>
          ) : (
            <motion.div
              key="check"
              className="w-14 h-14 flex items-center justify-center rounded-full bg-beige"
              initial={{ scale: 0.3, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.3, rotate: 180, opacity: 0 }}
            >
              <Check className="h-6 w-6 text-verde-oscuro stroke-[3px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* =========================
   MAIN COMPONENT
========================= */
export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    type: "cliente",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [titleKey, setTitleKey] = useState(0);
  const timeoutRef = useRef<number | null>(null);

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

 emailjs
  .send(
    "service_zw5sudt",
    "template_864uopk", // ✅ correcto ahora
    {
      name: formState.name,
      email: formState.email,
      type: formState.type,
      message: formState.message,
    },
    "gBgx7V1bFvZfAmAXP"
  )
  .then(() => {
    setIsSubmitted(true);
    setTitleKey((k) => k + 1);

    setTimeout(() => {
      setIsSubmitted(false);
      setTitleKey((k) => k + 1);
    }, 3000);

    setFormState({
      name: "",
      email: "",
      message: "",
      type: "cliente",
    });
  })
  .catch((error) => {
    console.error("Error completo:", error);
  });
};

  return (
    <section id="contacto" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-2">

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-stone-800 bg-stone-900 p-8"
          >
            <h2 className="mb-6 text-3xl font-bold text-beige">
              CONTACTO
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <select
                value={formState.type}
                onChange={(e) =>
                  setFormState({ ...formState, type: e.target.value })
                }
                className="w-full rounded-xl bg-stone-800 px-4 py-3 text-beige"
              >
                <option value="cliente">Cliente</option>
                <option value="proveedor">Proveedor</option>
              </select>

              <input
                type="text"
                placeholder="Nombre"
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                className="w-full rounded-xl bg-stone-800 px-4 py-3 text-beige"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="w-full rounded-xl bg-stone-800 px-4 py-3 text-beige"
                required
              />

              <textarea
                placeholder="Mensaje"
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                className="w-full rounded-xl bg-stone-800 px-4 py-3 text-beige"
                rows={4}
                required
              />

              <button className="w-full rounded-xl bg-verde-claro py-3 text-beige font-semibold hover:bg-verde-oscuro">
                Enviar
              </button>
            </form>
          </motion.div>

          {/* RIGHT PANEL */}
          <motion.div className="relative flex flex-col justify-center rounded-3xl bg-verde-claro p-8 overflow-hidden">
            <FloatingOrbs />

            <div className="relative z-10">
              <div className="mb-6">
                <IconMorph isSubmitted={isSubmitted} />
              </div>

              <h3
                key={titleKey}
                className="mb-4 text-4xl font-bold text-beige"
              >
                <TypewriterText
                  text={isSubmitted ? "Mensaje Enviado!" : "Gracias!"}
                />
              </h3>

              <p className="text-beige/80">
                <TypewriterText
                  text={
                    isSubmitted
                      ? "Se abrirá tu correo para enviarlo."
                      : "Te respondemos lo antes posible."
                  }
                />
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}