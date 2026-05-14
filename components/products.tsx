"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { products, Product } from "@/data/products";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { SaleBadge } from "@/components/sale-badge";

const categories = ["Mates", "Bombillas", "Materas", "Vasos", "Termos", "Yerberas"];

export function Products() {
  const [activeCategory, setActiveCategory] = useState("Mates");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  const { addToCart } = useCart();

  // 📱 Responsive real
  useEffect(() => {
    const update = () => {
      setItemsPerView(window.innerWidth < 640 ? 1 : 4);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const filtered = products.filter(p => p.category === activeCategory);
  const visible = filtered.slice(currentIndex, currentIndex + itemsPerView);

  const canSlide = filtered.length > itemsPerView;

  // 🔁 Slider infinito
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= filtered.length - itemsPerView ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(filtered.length - itemsPerView, 0) : prev - 1
    );
  };

  // 💸 Precio con descuento
  const getFinalPrice = (product: Product) => {
    if (!product.discount) return product.price;
    return product.price - (product.price * product.discount) / 100;
  };

return (
  <section id="productos" className="py-20">
    <div className="mx-auto max-w-7xl px-4">

      {/* Category Tabs */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`cursor-pointer rounded-full px-6 py-2 text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-verde-claro text-beige"
                : "border border-border bg-transparent text-foreground hover:bg-verde-claro/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* ⚠️ DISCLAIMER */}
      <p className="mx-auto mb-10 max-w-2xl text-center text-xs sm:text-sm text-muted-foreground">
        Las fotos del catálogo son ilustrativas. Al ser productos artesanales, cada mate es único y puede presentar variaciones en forma, color y detalles.
      </p>

      {/* 🧠 Cantidad de productos */}
      <p className="mb-8 text-center text-sm text-muted-foreground">
        Mostrando {filtered.length} productos
      </p>

      {/* GRID / SCROLL */}
      <div
        className="
          flex w-full gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide
          sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0
        "
        style={{
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth"
        }}
      >
        {filtered.map((product) => (
          <div
            key={product.id}
            className={`
              min-w-[85%] snap-center shrink-0
              sm:min-w-0
              group relative w-full overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all 
              ${product.featured ? "ring-2 ring-verde-claro" : ""} 
              ${product.outOfStock ? "opacity-60" : "hover:border-verde-claro"}
            `}
          >

            {/* BADGES */}
            {product.featured && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-verde-claro px-3 py-1 text-xs font-medium text-beige">
                Destacado
              </span>
              
            )}

            {product.discount && (
              <span className="absolute right-4 top-4 z-10 rounded-full bg-yellow-500 px-3 py-1 text-xs font-medium text-white">
                -{product.discount}%
              </span>
            )}

            {(product.sale || product.discount) && !product.outOfStock && (
              <SaleBadge />
            )}

            {/* AGOTADO */}
            {product.outOfStock && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50">
                <span className="text-lg font-bold text-white">AGOTADO</span>
              </div>
            )}

            {/* IMAGE */}
            <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                fill
                draggable={false}
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* INFO */}
            <h3 className="mb-2 font-display text-xl text-foreground">
              {product.name}
            </h3>

            {/* OPTIONS */}
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

            {/* PRICE */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                {product.discount ? (
                  <>
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.price.toLocaleString("es-AR")}
                    </span>
                    <span className="font-display text-xl text-red-500">
                      ${getFinalPrice(product).toLocaleString("es-AR")}
                    </span>
                  </>
                ) : (
                  <span className="font-display text-xl text-foreground">
                    ${product.price.toLocaleString("es-AR")}
                  </span>
                )}
              </div>

              {!product.outOfStock && (
                <AddToCartButton product={product} />
              )}
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground italic">
                Producto artesanal • Puede variar
              </p>

          </div>
        ))}
      </div>

    </div>
  </section>
)}