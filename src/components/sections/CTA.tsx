import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section
      id="contato"
      className="py-24 lg:py-32 bg-white"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        {/* Icon */}
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 mb-6"
          aria-hidden="true"
        >
          <Heart className="w-7 h-7 text-brand-700" />
        </div>

        {/* Heading */}
        <h2
          id="cta-heading"
          className="font-heading font-bold text-brand-900 text-3xl sm:text-4xl lg:text-5xl mb-4"
        >
          Você tem um lugar aqui
        </h2>

        {/* Subheading */}
        <p className="text-neutral-600 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          Não importa onde você está na sua jornada espiritual. Nossa porta está
          aberta e nosso coração está pronto para receber você e sua família.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="#localizacao">
              Venha nos visitar
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://www.instagram.com/icppalavraeavivamento/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Seguir no Instagram
            </a>
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { value: "+50", label: "Famílias atendidas" },
            { value: "+5 anos", label: "De história" },
            { value: "3 dias", label: "De culto por semana" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-heading font-bold text-brand-900 text-3xl">
                {value}
              </p>
              <p className="text-neutral-500 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
