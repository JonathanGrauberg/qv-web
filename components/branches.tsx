"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";

const branches = [
  {
    id: 1,
    city: "Buenos Aires",
    address: "Av. Corrientes 1234",
    neighborhood: "Palermo",
    image: "/images/branch-1.jpg",
  },
  {
    id: 2,
    city: "Córdoba",
    address: "Av. Colón 567",
    neighborhood: "Nueva Córdoba",
    image: "/images/branch-2.jpg",
  },
  {
    id: 3,
    city: "Rosario",
    address: "Bv. Oroño 890",
    neighborhood: "Centro",
    image: "/images/branch-3.jpg",
  },
  {
    id: 4,
    city: "Mendoza",
    address: "Av. San Martín 456",
    neighborhood: "Ciudad",
    image: "/images/branch-4.jpg",
  },
];

export function Branches() {
  return (
    <section id="sucursales" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Title Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center lg:col-span-3"
          >
            <h2 className="font-display text-5xl leading-tight tracking-tight md:text-6xl">
              <span className="text-muted-foreground">Nuestras</span>
              <br />
              <span className="text-foreground">Sucursales</span>
            </h2>
          </motion.div>

          {/* Branches Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-9">
            {branches.map((branch, index) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-verde-claro"
              >
                <div className="flex items-center gap-4 p-4">
                  {/* Branch Image */}
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={branch.image}
                      alt={branch.city}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Branch Info */}
                  <div className="flex-1">
                    <h3 className="mb-1 font-display text-xl text-foreground">
                      {branch.city}
                    </h3>
                    <div className="flex items-start gap-1 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 h-3 w-3 flex-shrink-0" />
                      <span>
                        {branch.address}
                        <br />
                        {branch.neighborhood}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* More Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <button className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <span>Ver más</span>
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
