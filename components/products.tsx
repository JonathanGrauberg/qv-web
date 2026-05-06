"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { products } from "@/data/products";
import { AddToCartButton } from "@/components/add-to-cart-button";

const categories = ["Mates", "Bombillas", "Materas", "Vasos", "Termos"];

export function Products() {
  const [activeCategory, setActiveCategory] = useState("Mates");
  const [currentIndex, setCurrentIndex] = useState(0);

  const { addToCart } = useCart();

  const filtered = products.filter(p => p.category === activeCategory);
  const visible = filtered.slice(currentIndex, currentIndex + 4);

  // ✅ FIX slider
  const canSlide = filtered.length > 4;

  const nextSlide = () => {
    if (currentIndex < filtered.length - 4) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section id="productos" className="py-20">
      <div className="mx-auto max-w-7xl px-4">

        {/* Category Tabs */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentIndex(0);
              }}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-verde-claro text-beige"
                  : "border border-border bg-transparent text-foreground hover:bg-verde-claro/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Carousel */}
        <div className="relative">

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={!canSlide || currentIndex === 0}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-verde-claro p-2 text-beige shadow-lg transition-all hover:bg-verde-oscuro disabled:opacity-30 md:-left-6"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Anterior</span>
          </button>

          <button
            onClick={nextSlide}
            disabled={!canSlide || currentIndex >= filtered.length - 4}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-verde-claro p-2 text-beige shadow-lg transition-all hover:bg-verde-oscuro disabled:opacity-30 md:-right-6"
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Siguiente</span>
          </button>

          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {visible.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all hover:border-verde-claro ${
                    product.featured ? "ring-2 ring-verde-claro" : ""
                  }`}
                >
                  {product.featured && (
                    <span className="absolute left-4 top-4 z-10 rounded-full bg-verde-claro px-3 py-1 text-xs font-medium text-beige">
                      Destacado
                    </span>
                  )}

                  {/* Image */}
                  <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Info */}
                  <h3 className="mb-2 font-display text-xl text-foreground">
                    {product.name}
                  </h3>

                  <div className="mb-3 flex flex-wrap gap-1">
                    {product.options.map(option => (
                      <span
                        key={option}
                        className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {option}
                      </span>
                    ))}
                  </div>

                  {/* Price + Button */}
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl text-foreground">
                      ${product.price.toLocaleString("es-AR")}
                    </span>

                    <AddToCartButton product={product} />
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}