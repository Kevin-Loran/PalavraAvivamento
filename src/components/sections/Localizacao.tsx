import { MapPin, Clock, Instagram, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const schedules = [
  { day: "Terça-feira", times: ["19h30 às 21h30 — Culto de Doutrina"] },
  { day: "Sexta-feira", times: ["19h30 às 21h30 — Culto"] },
  { day: "Domingo", times: ["18h30 às 21h30 — Culto"] },
];

export function Localizacao() {
  return (
    <section
      id="localizacao"
      className="py-24 lg:py-32 bg-brand-900"
      aria-labelledby="localizacao-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <div>
            <p className="text-brand-300 font-medium text-sm uppercase tracking-wider mb-3">
              Venha nos visitar
            </p>
            <h2
              id="localizacao-heading"
              className="font-heading font-bold text-white text-3xl sm:text-4xl mb-6"
            >
              Como chegar
            </h2>

            {/* Address */}
            <div className="flex items-start gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-brand-300" aria-hidden="true" />
              </div>
              <div>
                <p className="text-white font-medium">Endereço</p>
                <p className="text-brand-200 text-sm mt-1 leading-relaxed">
                  Rua Francisco de Magalhães, 83
                  <br />
                  Jardim Nove de Julho — São Paulo, SP
                  <br />
                  CEP: 03952-030
                </p>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-start gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Instagram className="w-5 h-5 text-brand-300" aria-hidden="true" />
              </div>
              <div>
                <p className="text-white font-medium">Instagram</p>
                <a
                  href="https://www.instagram.com/icppalavraeavivamento/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-200 text-sm mt-1 hover:text-white transition-colors duration-200"
                >
                  @icppalavraeavivamento
                </a>
              </div>
            </div>

            {/* Schedules */}
            <div className="flex items-start gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-brand-300" aria-hidden="true" />
              </div>
              <div>
                <p className="text-white font-medium mb-2">Horários dos cultos</p>
                <div className="space-y-3">
                  {schedules.map(({ day, times }) => (
                    <div key={day}>
                      <p className="text-brand-300 text-xs font-medium uppercase tracking-wide">
                        {day}
                      </p>
                      {times.map((t) => (
                        <p key={t} className="text-brand-200 text-sm">
                          {t}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button
              className="bg-white text-brand-900 hover:bg-brand-100"
              asChild
            >
              <a
                href="https://www.google.com/maps?q=Rua+Francisco+de+Magalhães,+83,+Jardim+Nove+de+Julho,+São+Paulo,+SP,+03952-030"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="w-4 h-4" aria-hidden="true" />
                Como chegar no Google Maps
              </a>
            </Button>
          </div>

          {/* Google Maps embed */}
          <div
            className="rounded-2xl overflow-hidden border border-white/10"
            aria-label="Mapa de localização da igreja"
          >
            <iframe
              src="https://maps.google.com/maps?q=Rua+Francisco+de+Magalhães,+83,+Jardim+Nove+de+Julho,+São+Paulo,+SP,+03952-030&output=embed&z=16"
              width="100%"
              height="450"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Igreja Palavra e Avivamento"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
