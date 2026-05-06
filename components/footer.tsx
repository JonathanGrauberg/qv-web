"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";

const footerLinks = {
  productos: [
    { label: "Mates", href: "#" },
    { label: "Bombillas", href: "#" },
    { label: "Yerberas", href: "#" },
    { label: "Accesorios", href: "#" },
  ],
  empresa: [
    { label: "Nosotros", href: "#nosotros" },
    { label: "Sucursales", href: "#sucursales" },
    { label: "Contacto", href: "#contacto" },
    { label: "Trabaja con nosotros", href: "#" },
  ],
  legal: [
    { label: "Términos y condiciones", href: "#" },
    { label: "Política de privacidad", href: "#" },
    { label: "Devoluciones", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/quedeverde.pna", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/QV%20completo%20beige-yYkNMnDrq3Q7vFlQHhFep7dedCXIqR.png"
                alt="Quedé Verde"
                width={180}
                height={60}
                className="h-16 w-auto"
              />
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Quedé Verde es el showroom de mates que vino a traerte
              tradición, calidad y buenos recuerdos.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-verde-claro hover:bg-verde-claro hover:text-beige"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-display text-lg text-foreground">
              Productos
            </h4>
            <ul className="space-y-2">
              {footerLinks.productos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-lg text-foreground">
              Empresa
            </h4>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-lg text-foreground">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Quedé Verde. Todos los derechos
              reservados.
            </p>
            <p className="text-sm text-muted-foreground">
              Hecho con pasión en Argentina
            </p>
          </div>
        </div>

        {/* Large Background Text */}
        <div className="mt-8 overflow-hidden">
          <p className="text-center font-display text-[18rem] leading-none text-muted/30 md:text-[12rem] mt-[-10]">
            CONTACTO
          </p>
        </div>
      </div>
    </footer>
  );
}
