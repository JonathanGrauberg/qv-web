"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const initialProducts = [
  {
    id: 1,
    name: "EDICION MUNDIALERA!",
    description:
      "Edición limitada mundialera 🇦🇷 El combo perfecto para vivir cada partido con el mejor mate.",
    image: "/images/edicion-mundial.png",
    thumb: "/images/mate-2.jpg",
  },
  {
    id: 2,
    name: "Torpedo Alpaca Cincelada",
    price: "$34.000",
    description:
      "Es un ícono de la orfebrería Argentina, destacando por su forma robusta, interior de calabaza natural y forro de cuero vacuno premium.",
    image: "/images/Mate-hero.png",
    thumb: "/images/mate-1.jpg",
    
  },
  {
    id: 3,
    name: "Termo Económico",
    price: "$27.000",
    description:
      "Acero inoxidable de alta resistencia con doble capa térmica.",
    image: "/images/termo-hero.png",
    thumb: "/images/mate-3.jpg",
  },
];

// 🔥 helper para rotar tipo “mazo”
const rotate = (arr: typeof initialProducts, step = 1) => {
  return [...arr.slice(step), ...arr.slice(0, step)];
};

export function Hero() {
  const [products, setProducts] = useState(initialProducts);

  const activeProduct = products[0];

  const handleNext = () => setProducts((prev) => rotate(prev, 1));
  const handlePrev = () => setProducts((prev) => rotate(prev, 2));

  const handleSelect = (index: number) => {
    setProducts((prev) => rotate(prev, index));
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-12">
      
      {/* Background */}
      <div className="absolute inset-0 opacity-2">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "url('/images/fondo-logo-claro.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "800px",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0))",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0))",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Donde cada mate cuenta una historia
            </p>

            <h1 className="mb-6 font-display text-5xl leading-tight tracking-tight md:text-7xl lg:text-8xl">
              <span className="text-foreground">{"¿Cuál es "}</span>
              <span className="mt-[-10] text-verde-claro">la tuya?</span>
            </h1>

            {/* CONTENIDO */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8 rounded-2xl bg-card/50 p-6 backdrop-blur-sm"
              >
                <h2 className="mb-2 font-display text-2xl text-foreground">
                  {activeProduct.name}
                </h2>

                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {activeProduct.description}
                </p>

                <div className="mb-4 flex items-center justify-center gap-2 lg:justify-start">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-beige text-beige" />
                    ))}
                  </div>

                  <span className="text-sm text-muted-foreground">
                    Mejor valorado
                  </span>

                  <span className="font-display text-2xl text-foreground">
                    {activeProduct.price}
                  </span>
                </div>

                
              </motion.div>
            </AnimatePresence>

            {/* MINIATURAS */}
            <div className="flex items-center justify-center gap-4 lg:justify-start">
              {products.map((product, index) => (
                <motion.button
                  key={product.id}
                  onClick={() => handleSelect(index)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className={`relative h-16 w-16 overflow-hidden rounded-xl border-2 transition-all hover:scale-110 ${
                    index === 0
                      ? "border-verde-claro opacity-100 shadow-[0_0_15px_rgba(134,239,172,0.3)]"
                      : "border-transparent opacity-40 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto aspect-square max-w-md lg:max-w-none">

              {/* CAPAS INTERACTIVAS */}
              <motion.div
                onClick={handlePrev}
                className="absolute inset-0 rotate-6 rounded-3xl bg-verde-claro/20 cursor-pointer"
                whileHover={{ scale: 0.95 }}
              />

              <motion.div
                onClick={handleNext}
                className="absolute inset-0 -rotate-3 rounded-3xl bg-beige/10 cursor-pointer"
                whileHover={{ scale: 0.97 }}
              />

              {/* IMAGEN PRINCIPAL */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-verde-claro to-verde-oscuro p-8 z-10"
                >
                  <Image
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    width={500}
                    height={500}
                    className="relative z-10 mx-auto drop-shadow-2xl rounded-xl"
                    priority
                  />

                  <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 origin-center">
                    <span className="font-display text-4xl tracking-widest text-beige/30 md:text-6xl">
                      MATE MATE MATE
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}