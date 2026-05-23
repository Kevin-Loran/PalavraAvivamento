import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Calendar, Clock, MapPin } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import type { Evento } from "@/lib/supabase";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL    ?? "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder"
);

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Confira a agenda de cultos, retiros, congressos e outros eventos da Igreja Palavra e Avivamento.",
};

const categoryColors: Record<string, string> = {
  Mocidade:        "bg-brand-100 text-brand-700",
  Família:         "bg-neutral-200 text-neutral-700",
  "Culto Especial":"bg-brand-900 text-white",
  Crianças:        "bg-neutral-200 text-neutral-700",
  Treinamento:     "bg-brand-100 text-brand-700",
  Retiro:          "bg-brand-100 text-brand-700",
  Evento:          "bg-neutral-200 text-neutral-700",
};

function formatDate(iso: string): string {
  if (!iso) return "";
  const [year, month, day] = iso.split("-");
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];
  return `${parseInt(day)} de ${months[parseInt(month) - 1]}, ${year}`;
}

// Always fetch at request time — never statically pre-render with stale data.
export const dynamic = "force-dynamic";

export default async function EventosPage() {
  let eventos: Evento[] = [];
  try {
    const { data } = await supabase
      .from("eventos")
      .select("*")
      .order("data", { ascending: true });
    eventos = data ?? [];
  } catch {
    eventos = [];
  }

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Page Header */}
        <section
          className="pt-32 pb-16 bg-brand-900"
          aria-label="Cabeçalho da página de eventos"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center gap-2 text-brand-300 text-sm mb-3">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Agenda</span>
            </div>
            <h1 className="font-heading font-bold text-white text-4xl sm:text-5xl mb-4">
              Próximos eventos
            </h1>
            <p className="text-brand-200 text-lg max-w-2xl">
              Fique por dentro de tudo que está acontecendo na nossa comunidade.
            </p>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-16 bg-neutral-100" aria-label="Lista de eventos">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {eventos.length === 0 ? (
              <div className="text-center py-20">
                <Calendar
                  className="w-10 h-10 text-neutral-300 mx-auto mb-4"
                  aria-hidden="true"
                />
                <p className="text-neutral-500 text-lg font-heading font-semibold mb-2">
                  Nenhum evento programado
                </p>
                <p className="text-neutral-400 text-sm">
                  Em breve novos eventos serão publicados aqui.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventos.map((evento) => (
                  <article
                    key={evento.id}
                    className="bg-white rounded-2xl border border-neutral-300 overflow-hidden hover:shadow-lg hover:border-brand-200 transition-all duration-300 flex flex-col"
                  >
                    <div className="h-1 bg-brand-900" aria-hidden="true" />
                    <div className="p-6 flex flex-col flex-1">
                      <span
                        className={`inline-block self-start px-3 py-1 rounded-full text-xs font-medium mb-4 ${categoryColors[evento.categoria] ?? "bg-neutral-200 text-neutral-700"}`}
                      >
                        {evento.categoria}
                      </span>
                      <h2 className="font-heading font-semibold text-brand-900 text-lg mb-2">
                        {evento.titulo}
                      </h2>
                      {evento.descricao && (
                        <p className="text-neutral-600 text-sm leading-relaxed mb-4 flex-1">
                          {evento.descricao}
                        </p>
                      )}
                      <div className="space-y-1.5 text-sm text-neutral-500 mt-auto">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>{formatDate(evento.data)}</span>
                        </div>
                        {evento.horario && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                            <span>{evento.horario}</span>
                          </div>
                        )}
                        {evento.local && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                            <span>{evento.local}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
