"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DonateModal } from "@/components/layout/DonateModal";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "#sobre" },
  { label: "Liderança", href: "#lideranca" },
  { label: "Eventos", href: "/eventos" },
  { label: "Localização", href: "#localizacao" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-300"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto max-w-7xl px-6 lg:px-8"
        aria-label="Navegação principal"
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Página inicial da Igreja Palavra e Avivamento"
          >
            <Image
              src="/logo.png"
              alt=""
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
              aria-hidden="true"
            />
            <span
              className={cn(
                "font-heading font-semibold text-base transition-colors duration-200",
                scrolled ? "text-brand-900" : "text-brand-900"
              )}
            >
              Palavra e Avivamento
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-neutral-700 hover:text-brand-900 hover:bg-brand-50 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setDonateOpen(true)}
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              }}
            >
              Dizimar
            </button>
            <Button size="sm" asChild>
              <Link href="#contato">Fale conosco</Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-md text-neutral-700 hover:text-brand-900 hover:bg-brand-50 transition-colors duration-200 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-neutral-300 bg-white/95 backdrop-blur-md">
            <ul className="py-2 space-y-0.5" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-sm font-medium text-neutral-700 hover:text-brand-900 hover:bg-brand-50 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="px-4 pt-2 pb-1">
                <button
                  onClick={() => { setIsOpen(false); setDonateOpen(true); }}
                  className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  }}
                >
                  Dizimar
                </button>
              </li>
              <li className="px-4 pt-1 pb-2">
                <Button size="sm" className="w-full" asChild>
                  <Link href="#contato" onClick={() => setIsOpen(false)}>
                    Fale conosco
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>

    <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
    </>
  );
}
