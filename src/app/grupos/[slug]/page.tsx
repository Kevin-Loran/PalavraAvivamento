import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock, Instagram, MapPin } from "lucide-react";
import { createServerSupabase, type Grupo, type Evento } from "@/lib/supabase";

async function getGrupo(slug: string): Promise<Grupo | null> {
  try {
    const { data } = await createServerSupabase()
      .from("grupos")
      .select("*")
      .eq("slug", slug)
      .single();
    return data ?? null;
  } catch {
    return null;
  }
}

async function getEventosGrupo(slug: string): Promise<Evento[]> {
  try {
    const { data } = await createServerSupabase()
      .from("eventos")
      .select("*")
      .eq("grupo_slug", slug)
      .order("data", { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const [year, month, day] = iso.split("-");
  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez",
  ];
  return `${parseInt(day)} de ${months[parseInt(month) - 1]}, ${year}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const grupo = await getGrupo(slug);
  if (!grupo) return { title: "Grupo não encontrado" };
  return {
    title: `${grupo.nome} — Igreja Palavra e Avivamento`,
    description:
      grupo.descricao || `Conheça o grupo ${grupo.nome} da Igreja Palavra e Avivamento.`,
  };
}

export default async function GrupoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [grupo, eventosGrupo] = await Promise.all([
    getGrupo(slug),
    getEventosGrupo(slug),
  ]);

  // Fallback elegante — sem notFound(), sem quebra de UX
  if (!grupo) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)" }}
        >
          <span className="text-white text-2xl font-bold">?</span>
        </div>
        <h1 className="font-heading font-bold text-brand-900 text-2xl mb-3">
          Grupo não encontrado
        </h1>
        <p className="text-neutral-500 text-sm mb-8 max-w-xs">
          Este grupo ainda não foi cadastrado ou o endereço está incorreto.
        </p>
        <Link
          href="/#sobre"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-opacity duration-200"
          style={{ background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Ver todos os grupos
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-64 sm:h-80 lg:h-[28rem] overflow-hidden">
        {grupo.imagem ? (
          <img
            src={grupo.imagem}
            alt={grupo.nome}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(135deg, #0F172A 0%, #1E3A5F 60%, #132238 100%)",
            }}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-brand-900/65" />

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-4xl px-6 sm:px-10 pb-10 sm:pb-14">
            <Link
              href="/#sobre"
              className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors duration-200 mb-5 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
              Voltar para o site
            </Link>

            <p
              className="text-xs font-medium uppercase tracking-widest mb-2"
              style={{ color: "#f97316" }}
            >
              Ministério
            </p>
            <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
              {grupo.nome}
            </h1>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        {grupo.descricao && (
          <p
            className="text-neutral-700 text-lg leading-relaxed mb-10 border-l-2 pl-5"
            style={{ borderColor: "#f97316" }}
          >
            {grupo.descricao}
          </p>
        )}

        {grupo.conteudo && (
          <div className="text-neutral-600 leading-relaxed whitespace-pre-wrap mb-12">
            {grupo.conteudo}
          </div>
        )}

        {grupo.instagram && (
          <a
            href={grupo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            }}
          >
            <Instagram className="w-4 h-4" aria-hidden="true" />
            Acompanhar no Instagram
          </a>
        )}
      </div>

      {/* Eventos do grupo */}
      {eventosGrupo.length > 0 && (
        <div className="border-t border-neutral-200">
          <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
            <p className="text-xs font-medium uppercase tracking-widest mb-2"
              style={{ color: "#f97316" }}>
              Agenda
            </p>
            <h2 className="font-heading font-bold text-brand-900 text-2xl mb-10">
              Próximos Eventos
            </h2>

            <div className="space-y-4">
              {eventosGrupo.map((evento) => (
                <div
                  key={evento.id}
                  className="rounded-2xl border border-neutral-200 overflow-hidden bg-white flex flex-col sm:flex-row"
                >
                  {/* Imagem */}
                  {evento.imagem && (
                    <div className="sm:w-36 h-36 sm:h-auto shrink-0 overflow-hidden">
                      <img
                        src={evento.imagem}
                        alt={evento.titulo}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Conteúdo */}
                  <div className="p-5 flex flex-col justify-center gap-2 flex-1">
                    <p className="font-heading font-semibold text-brand-900 text-base leading-snug">
                      {evento.titulo}
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 shrink-0" />
                        {formatDate(evento.data)}
                      </span>
                      {evento.horario && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 shrink-0" />
                          {evento.horario}
                        </span>
                      )}
                      {evento.local && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {evento.local}
                        </span>
                      )}
                    </div>

                    {evento.descricao && (
                      <p className="text-neutral-500 text-sm leading-relaxed">
                        {evento.descricao}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
