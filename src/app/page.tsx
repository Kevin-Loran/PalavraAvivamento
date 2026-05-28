import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Sobre } from "@/components/sections/Sobre";
import { Lideranca } from "@/components/sections/Lideranca";
import { Eventos } from "@/components/sections/Eventos";
import { Localizacao } from "@/components/sections/Localizacao";
import { CTA } from "@/components/sections/CTA";
import { createServerSupabase, type Grupo } from "@/lib/supabase";

export default async function HomePage() {
  const { data: grupos } = await createServerSupabase()
    .from("grupos")
    .select("id, nome, slug, descricao, instagram")
    .order("nome", { ascending: true });

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Sobre grupos={(grupos ?? []) as Grupo[]} />
        <Lideranca />
        <Eventos />
        <Localizacao />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
