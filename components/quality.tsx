"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Quality() {
  return (
    <section id="nosotros" className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src="/images/cebandomate.png"
                alt="Calidad Premium"
                fill
                className="object-cover"
              />              
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="mb-6 font-display text-5xl leading-tight md:text-7xl">
              <span className="text-foreground">QUEDÉ </span>              
              <span className="text-verde-claro">VERDE</span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              Quedé Verde nació en un momento bastante especial de nuestras vidas. Con la llegada de Tomi, buscamos una forma de generar ingresos sin dejar de estar presentes en casa, y ahí fue cuando apareció esta idea.

                No somos una gran empresa ni queremos parecerlo. <br/>Somos una familia que, como cualquier otra, se junta con amigos, se ríe, charla de todo un poco… y siempre, pero siempre, hay un mate de por medio.

                Porque el mate no es solo una bebida. Es el que está cuando arrancás el día medio dormido, el que te acompaña laburando solo, o el que se vuelve uno más cuando estás con gente. Es el que rompe el hielo con un “che, ¿querés un mate?”, el que escucha cuando estás contento o cuando venís medio cruzado.

                Tiene su propio idioma también… si está “lavado”, si alguien dice “gracias” y sabés que ya no quiere más, o ese clásico “uh, qué sopa esto”
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              En nuestro caso, tomamos mate todos los días. Invierno, verano, da lo mismo. Es parte de nuestra rutina, de nuestra forma de compartir.
              Por eso arrancamos con Quedé Verde: para acercarte cosas que usamos nosotros, que nos gustan y que forman parte de ese ritual tan nuestro.
              <br/>TAN ARGENTINO!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
