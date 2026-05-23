import { Flame, Instagram, Shield, Sparkles, Star } from "lucide-react";

const values = [
  {
    title: "Palavra",
    description:
      "Fundamentados na Bíblia como a palavra viva e eficaz de Deus para toda a humanidade.",
  },
  {
    title: "Avivamento",
    description:
      "Buscamos a presença do Espírito Santo em cada culto, transformando vidas e comunidades.",
  },
];

const groups = [
  {
    icon: Flame,
    title: "Mocidade",
    description:
      "Grupo voltado para os jovens da igreja. Encontros de comunhão, estudos bíblicos e crescimento na fé.",
    instagram: "https://www.instagram.com/mocidaderesgatedivino/",
  },
  {
    icon: Shield,
    title: "Grupo de Varões",
    description:
      "Homens da igreja unidos em oração e propósito. Encontros focados em liderança e crescimento espiritual.",
  },
  {
    icon: Sparkles,
    title: "Grupo de Varoas",
    description:
      "Mulheres da igreja em comunhão e fortalecimento espiritual. Um espaço de graça, cuidado e fé.",
  },
  {
    icon: Star,
    title: "Ombreiros",
    description:
      "Equipe dedicada ao suporte e manutenção da igreja. Auxiliam os pastores e garantem que tudo funcione com excelência.",
  },
];

export function Sobre() {
  return (
    <section
      id="sobre"
      className="py-24 lg:py-32 bg-neutral-100"
      aria-labelledby="sobre-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Row 1 — Quem somos + pilares */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-brand-700 font-medium text-sm uppercase tracking-wider mb-3">
              Quem somos
            </p>
            <h2
              id="sobre-heading"
              className="font-heading font-bold text-brand-900 text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6"
            >
              Mais de 5 anos
              <br />
              servindo com amor
            </h2>
            <p className="text-neutral-700 text-lg leading-relaxed mb-6">
              A Igreja Palavra e Avivamento nasceu do coração apaixonado de
              pessoas que acreditam que Deus ainda transforma vidas. Desde nossa
              fundação, somos uma comunidade que preza pela palavra de Deus, pelo
              poder do Espírito Santo e pelo amor genuíno ao próximo.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Com uma visão clara de evangelizar, discipular e enviar, caminhamos
              juntos em direção ao propósito eterno. Aqui, você encontrará um
              lugar de pertencimento, cuidado e crescimento espiritual.
            </p>
          </div>

          {/* Pilares — Palavra + Avivamento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map(({ title, description }) => (
              <div
                key={title}
                className="p-6 rounded-2xl bg-white border border-neutral-300 hover:border-brand-200 hover:shadow-md transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-900 flex items-center justify-center mb-4">
                  <span
                    className="text-white font-heading font-bold text-xs"
                    aria-hidden="true"
                  >
                    {title[0]}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-brand-900 text-base mb-2">
                  {title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — Nossos Grupos */}
        <div className="mt-20 lg:mt-24">
          <div className="mb-10">
            <p className="text-brand-700 font-medium text-sm uppercase tracking-wider mb-3">
              Ministérios
            </p>
            <h2 className="font-heading font-bold text-brand-900 text-2xl sm:text-3xl">
              Nossos Grupos
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {groups.map(({ icon: Icon, title, description, ...rest }) => {
              const instagram = (rest as { instagram?: string }).instagram;
              return (
                <div
                  key={title}
                  className="p-6 rounded-2xl bg-white border border-neutral-300 hover:shadow-md transition-all duration-200 flex flex-col"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(249,115,22,0.09)" }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "#f97316" }}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-heading font-semibold text-brand-900 text-base mb-2">
                    {title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed flex-1">
                    {description}
                  </p>

                  {instagram && (
                    <div className="mt-4 pt-4 border-t border-neutral-100">
                      <a
                        href={instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-800 transition-colors duration-200 group"
                      >
                        <Instagram
                          className="w-3.5 h-3.5 shrink-0"
                          aria-hidden="true"
                        />
                        Acompanhar no Instagram
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
