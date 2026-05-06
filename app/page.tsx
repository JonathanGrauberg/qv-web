import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Products } from "@/components/products";
import { Quality } from "@/components/quality";
import { Marquee } from "@/components/marquee";
import { Popular } from "@/components/popular";
import { Branches } from "@/components/branches";
import { Contact } from "@/components/contact";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Products />
      <Quality />
      <Marquee />
      <Popular />
      <Marquee  />
      <Contact />
      <Footer />
    </main>
  );
}
