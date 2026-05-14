"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, X } from "lucide-react";

const productCategories = [
  "Mates", "Bombillas", "Materas", "Vasos", "Yerberas", "Termos", "Accesorios"
];

const empresaLinks = [
  { label: "Nosotros", section: "nosotros" },
  { label: "Contacto", section: "contacto" },
  { label: "Trabaja con nosotros", section: "contacto" },
];

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/quedeverde.pna", label: "Instagram" },
];

export function Footer() {
  const [openModal, setOpenModal] = useState<null | "terminos" | "politicas" | "devoluciones">(null);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [openModal]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToCategory = (cat: string) => {
    // 1. Disparar evento custom para que la sección productos cambie de categoría
    window.dispatchEvent(new CustomEvent("setProductCategory", { detail: cat }));
    // 2. Scroll a la sección productos
    setTimeout(() => {
      document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <>
      <footer className="border-t border-border bg-card pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-5">

            {/* LOGO */}
            <div className="lg:col-span-2">
              <Link href="/" className="mb-4 inline-block">
                <Image
                  src="/images/logo-pill-qv-claro.png"
                  alt="Quedé Verde"
                  width={180}
                  height={60}
                  className="h-16 w-auto"
                />
              </Link>
              <p className="mb-6 max-w-sm text-sm text-muted-foreground">
                Quedé Verde es el showroom de mates que vino a traerte
                tradición, calidad y buenos momentos.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-verde-claro hover:text-white transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
              </div>
            </div>

            {/* PRODUCTOS */}
            <div>
              <h4 className="mb-4 font-display text-lg">Productos</h4>
              <ul className="space-y-2">
                {productCategories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => goToCategory(cat)}
                      className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors cursor-pointer"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* EMPRESA */}
            <div>
              <h4 className="mb-4 font-display text-lg">Empresa</h4>
              <ul className="space-y-2">
                {empresaLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.section)}
                      className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h4 className="mb-4 font-display text-lg">Legal</h4>
              <ul className="space-y-2">
                {(["terminos", "politicas", "devoluciones"] as const).map((key) => (
                  <li key={key}>
                    <button
                      onClick={() => setOpenModal(key)}
                      className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors cursor-pointer"
                    >
                      {key === "terminos" && "Términos y condiciones"}
                      {key === "politicas" && "Política de privacidad"}
                      {key === "devoluciones" && "Devoluciones"}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="border-t border-border pt-6 text-sm text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
            <p>© {new Date().getFullYear()} Quedé Verde</p>
            <p>Hecho en Argentina 🇦🇷</p>
          </div>
        </div>
      </footer>

      {/* MODAL LEGAL */}
      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setOpenModal(null); }}
        >
          <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-white shadow-2xl overflow-hidden">

            {/* HEADER del modal */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
              <h2 className="text-base font-semibold text-gray-900">
                {openModal === "terminos" && "Términos y condiciones"}
                {openModal === "politicas" && "Política de privacidad"}
                {openModal === "devoluciones" && "Cambios y Devoluciones"}
              </h2>
              <button
                onClick={() => setOpenModal(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* BODY scrolleable */}
            <div className="overflow-y-auto px-6 py-6 text-sm text-gray-700 space-y-4 leading-relaxed">

              {openModal === "terminos" && (
                <>
                  <p>
                    Al utilizar este sitio, aceptás nuestras condiciones de uso. Los productos ofrecidos
                    están sujetos a disponibilidad y pueden variar sin previo aviso.
                  </p>
                  <p>
                    Quedé Verde se reserva el derecho de modificar precios, descripciones y disponibilidad
                    de productos en cualquier momento.
                  </p>
                </>
              )}

              {openModal === "politicas" && (
                <>
                  <p>
                    Tu información personal es utilizada únicamente para procesar pedidos y mejorar
                    tu experiencia. No compartimos datos con terceros.
                  </p>
                  <p>
                    Los datos recopilados (nombre, dirección, contacto) se almacenan de forma segura
                    y solo se usan para gestionar tu compra.
                  </p>
                </>
              )}

              {openModal === "devoluciones" && (
                <div className="space-y-5">
                  <p>
                    En Quedé Verde nos esforzamos por ofrecerte productos de la mejor calidad.
                    Sin embargo, entendemos que pueden surgir inconvenientes.
                  </p>

                  {[
                    {
                      title: "1. Control al Recibir el Producto",
                      text: "Es responsabilidad del cliente revisar el estado del producto al momento de recibirlo. Cualquier reclamo por daño externo debe realizarse en el momento de la entrega."
                    },
                    {
                      title: "2. Mates",
                      text: "Cambio solo por fallas de fábrica comprobables, sin uso previo del producto."
                    },
                    {
                      title: "3. Termos",
                      text: "No tienen devolución por razones de higiene."
                    },
                    {
                      title: "4. Accesorios eléctricos",
                      text: "Garantía únicamente por fallas de fabricación dentro de las 48hs de recibido el producto."
                    },
                    {
                      title: "5. Otros accesorios",
                      text: "Cambio solo por defectos de fabricación comprobables."
                    },
                  ].map(({ title, text }) => (
                    <div key={title} className="rounded-lg bg-gray-50 px-4 py-3">
                      <p className="font-semibold text-gray-900 mb-1">{title}</p>
                      <p>{text}</p>
                    </div>
                  ))}

                  <p className="text-xs text-gray-400 pt-2">
                    * Es necesario presentar comprobante de compra. Los costos de envío no están
                    cubiertos salvo en casos de falla de fábrica.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}