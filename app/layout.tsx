import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CartProvider } from "@/hooks/useCart";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Quedé Verde | Showroom de Mates",
  description:
    "Descubrí la mejor selección de mates artesanales. Calidad premium, diseños únicos y tradición argentina.",
  keywords: ["mate", "yerba mate", "argentina", "artesanal", "showroom"],
};

export const viewport: Viewport = {
  themeColor: "#1a3329",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark bg-background">
      <body
        className={`${bebasNeue.variable} ${inter.variable} font-sans antialiased`}
      >
        <CartProvider>
          {children}
        </CartProvider>

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
