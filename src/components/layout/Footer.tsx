import Link from "next/link";
import Image from "next/image";
import { MapPin, Instagram } from "lucide-react";

const footerLinks = {
  navigation: [
    { label: "Início", href: "/" },
    { label: "Sobre nós", href: "#sobre" },
    { label: "Liderança", href: "#lideranca" },
    { label: "Eventos", href: "/eventos" },
    { label: "Localização", href: "#localizacao" },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/icppalavraeavivamento/", icon: Instagram },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-900 text-white" aria-label="Rodapé do site">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 object-contain brightness-0 invert"
                aria-hidden="true"
              />
              <span className="font-heading font-semibold text-lg">
                Palavra e Avivamento
              </span>
            </div>
            <p className="text-brand-200 text-sm leading-relaxed max-w-xs">
              Uma comunidade de fé, esperança e amor. Todos são bem-vindos.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 pt-2">
              {footerLinks.social.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-200 cursor-pointer"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-brand-300 mb-4">
              Navegação
            </h3>
            <ul className="space-y-2" role="list">
              {footerLinks.navigation.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-brand-200 text-sm hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-brand-300 mb-4">
              Contato
            </h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start gap-3">
                <MapPin
                  className="w-4 h-4 text-brand-400 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-brand-200 text-sm">
                  Rua Francisco de Magalhães, 83
                  <br />
                  Jardim Nove de Julho — São Paulo, SP
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Instagram
                  className="w-4 h-4 text-brand-400 shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="https://www.instagram.com/icppalavraeavivamento/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-200 text-sm hover:text-white transition-colors duration-200"
                >
                  @icppalavraeavivamento
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-400 text-xs">
            © {new Date().getFullYear()} Igreja Palavra e Avivamento. Todos os
            direitos reservados.
          </p>
          <p className="text-brand-400 text-xs">
            Criado por{" "}
            <a
              href="https://www.linkedin.com/in/kevinloran/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity duration-200 font-medium"
              style={{ color: "#f97316" }}
            >
              Kevin Loran
            </a>
            {" · "}
            <a
              href="https://wa.me/5511956820400"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:text-white transition-colors duration-200"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
