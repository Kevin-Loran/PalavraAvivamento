import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Sobre } from "@/components/sections/Sobre";
import { Lideranca } from "@/components/sections/Lideranca";
import { Eventos } from "@/components/sections/Eventos";
import { Localizacao } from "@/components/sections/Localizacao";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Sobre />
        <Lideranca />
        <Eventos />
        <Localizacao />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
