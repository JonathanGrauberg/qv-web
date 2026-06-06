"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { products } from "@/data/products";
import { CartIconButton } from "./CartIconButton";

export function Popular() {

  
  const popularProducts = products
  .filter((p) => p.featured)
  .slice(0, 3); // solo 3 productos

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">

        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Populares
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {popularProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-6 border border-border rounded-xl bg-card">

                <div className="relative h-60 mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <h3 className="mb-2 text-foreground font-medium">
                  {product.name}
                </h3>

                <div className="flex justify-between items-center">
                  <span className="text-foreground font-semibold">
                    ${product.price.toLocaleString("es-AR")}
                  </span>

                  <CartIconButton product={product} />
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}