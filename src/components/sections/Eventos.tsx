"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Loader2 } from "lucide-react";
import { supabase, type Evento } from "@/lib/supabase";

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

export function Eventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("eventos")
      .select("*")
      .order("data", { ascending: true })
      .then(({ data }) => {
        setEventos(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="eventos"
      className="py-24 lg:py-32 bg-neutral-100"
      aria-labelledby="eventos-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-brand-700 font-medium text-sm uppercase tracking-wider mb-3">
            Agenda
          </p>
          <h2
            id="eventos-heading"
            className="font-heading font-bold text-brand-900 text-3xl sm:text-4xl"
          >
            Próximos eventos
          </h2>
        </div>

        {/* States */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2
              className="w-6 h-6 text-brand-400 animate-spin"
              aria-hidden="true"
            />
          </div>
        ) : eventos.length === 0 ? (
          <div className="text-center py-20">
            <Calendar
              className="w-8 h-8 text-neutral-300 mx-auto mb-3"
              aria-hidden="true"
            />
            <p className="text-neutral-500 text-sm font-heading font-semibold">
              Nenhum evento programado no momento.
            </p>
            <p className="text-neutral-400 text-xs mt-1">
              Em breve novidades serão publicadas aqui.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <h3 className="font-heading font-semibold text-brand-900 text-lg mb-2">
                    {evento.titulo}
                  </h3>
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
  );
}
