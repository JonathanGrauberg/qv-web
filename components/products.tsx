"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { products, Product } from "@/data/products";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { SaleBadge } from "@/components/sale-badge";

const categories = ["MUNDIALERA", "Mates", "Bombillas", "Materas", "Vasos", "Termos", "Yerberas", "Accesorios"];

export function Products() {
  const [activeCategory, setActiveCategory] = useState("Mates");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  const { addToCart } = useCart();

  useEffect(() => {
    const update = () => {
      setItemsPerView(window.innerWidth < 640 ? 1 : 4);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const cat = (e as CustomEvent<string>).detail;
      setActiveCategory(cat);
      setCurrentIndex(0);
    };

    window.addEventListener("setProductCategory", handler);
    return () => window.removeEventListener("setProductCategory", handler);
  }, []);

  const filtered = products.filter(p => p.category === activeCategory);

  const getFinalPrice = (product: Product) => {
    if (!product.discount) return product.price;
    return product.price - (product.price * product.discount) / 100;
  };

  const goToCategory = (cat: string) => {
    window.dispatchEvent(new CustomEvent("setProductCategory", { detail: cat }));
    setTimeout(() => {
      document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <section id="productos" className="py-20">
      <div className="mx-auto max-w-7xl px-4">

        {/* 🎨 ESTILOS */}
        <style>{`
          .glass-patrio {
            background: linear-gradient(95deg, #74ACDF 0%, #FFFFFF 50%, #74ACDF 100%);
            backdrop-filter: blur(12px);
            border: 2px solid #FFD700;
            box-shadow: 0 4px 20px rgba(0, 56, 112, 0.3);
          }

          .text-patrio {
            color: #003870;
          }

          @keyframes pulse-highlight {
            0% { text-shadow: 0 0 0px #FFD700; transform: scale(1); }
            50% { text-shadow: 0 0 15px #FFD700; transform: scale(1.05); }
            100% { text-shadow: 0 0 0px #FFD700; transform: scale(1); }
          }

          .animate-titileo {
            animation: pulse-highlight 1.5s infinite;
          }

          .btn-mundial {
            background: linear-gradient(95deg, #74ACDF 0%, #FFFFFF 50%, #74ACDF 100%);
            border: 2px solid #FFD700;
            color: #003870;
            font-weight: 800;
            transition: all 0.3s ease;
            opacity: 0.85;
          }

          .btn-mundial:hover {
            transform: scale(1.05);
            box-shadow: 0 0 15px #FFD700;
            opacity: 1;
          }
        `}</style>

        {/* CATEGORY TABS */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map(cat => {
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all
                  ${
                    cat === "MUNDIALERA"
                      ? isActive
                        ? "btn-mundial scale-105"
                        : "btn-mundial opacity-60"
                      : isActive
                      ? "bg-verde-claro text-beige"
                      : "border border-border bg-transparent text-foreground hover:bg-verde-claro/20"
                  }
                `}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* INFO */}
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Mostrando {filtered.length} productos
        </p>

        {/* GRID */}
        <div className="flex w-full gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0">
          {filtered.map((product) => {
            const isMundialera = product.category === "MUNDIALERA";

            return (
              <div
                key={product.id}
                className={`
                  min-w-[85%] snap-center shrink-0 sm:min-w-0
                  group relative w-full overflow-hidden rounded-2xl p-4 transition-all

                  ${isMundialera ? "glass-patrio text-patrio" : "border border-border bg-card"}
                  ${product.featured ? "ring-2 ring-verde-claro" : ""}
                  ${product.outOfStock ? "opacity-60" : "hover:border-verde-claro"}
                `}
              >

                {/* BADGES */}
                {product.featured && !isMundialera && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-verde-claro px-3 py-1 text-xs text-beige">
                    Destacado
                  </span>
                )}

                {product.discount && !isMundialera && (
                  <span className="absolute right-4 top-4 z-10 rounded-full bg-yellow-500 px-3 py-1 text-xs text-white">
                    -{product.discount}%
                  </span>
                )}

                {(product.sale || product.discount) && !product.outOfStock && !isMundialera && (
                  <SaleBadge />
                )}

                {/* 🇦🇷 BADGE MUNDIAL */}
                {isMundialera && (
                  <div className="absolute left-4 top-4 z-20 bg-[#FFD700] text-[#003870] px-3 py-1 rounded-full text-xs font-bold animate-titileo">
                    🇦🇷 EDICIÓN LIMITADA
                  </div>
                )}

                {/* IMAGE */}
                <div className="relative mb-4 aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  {isMundialera && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>

                {/* NAME */}
                <h3 className={`mb-2 text-xl font-bold ${isMundialera ? "text-[#003870]" : "text-foreground"}`}>
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
                        <span className="text-xl text-red-500 font-bold">
                          ${getFinalPrice(product).toLocaleString("es-AR")}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold">
                        ${product.price.toLocaleString("es-AR")}
                      </span>
                    )}
                  </div>

                  {product.outOfStock && (
                    <div className={`
                      absolute inset-0 z-20 flex items-center justify-center rounded-2xl
                      ${isMundialera ? "bg-[#003870]/70" : "bg-black/50"}
                    `}>
                      <span className={`
                        text-lg font-bold px-4 py-2 rounded-lg
                        ${isMundialera 
                          ? "bg-[#FFD70] text-[#003870]" 
                          : "mt-[-40%] text-[20px] bg-[#ffffff17] text-muted-foreground italic"}
                      `}>
                        AGOTADO
                      </span>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}