"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { lideres } from "@/data/lideranca";

const FADE = 220;

export function Lideranca() {
  // target = índice que o usuário quer ver (muda imediatamente ao clicar)
  // shown  = índice que está sendo exibido (muda só após o fade-out)
  const [target, setTarget] = useState(0);
  const [shown, setShown] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (target === shown) return;

    setVisible(false);

    const t = setTimeout(() => {
      setShown(target);
      setVisible(true);
    }, FADE);

    return () => clearTimeout(t);
  }, [target]); // eslint-disable-line react-hooks/exhaustive-deps

  const total = lideres.length;
  const lider = lideres[shown];
  const indexLabel = String(shown + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  const contentStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0px)" : "translateX(12px)",
    transition: `opacity ${FADE}ms ease-out, transform ${FADE}ms ease-out`,
  };

  const imageStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(10px)",
    transition: `opacity ${FADE}ms ease-out, transform ${FADE}ms ease-out`,
  };

  return (
    <section
      id="lideranca"
      className="relative min-h-screen bg-brand-900 overflow-hidden flex flex-col justify-center"
      aria-labelledby="lideranca-heading"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 60%, rgba(30,58,95,0.55) 0%, transparent 70%)",
        }}
      />

      {/* Grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 py-24">
        {/* Eyebrow */}
        <p className="text-brand-400 text-xs font-medium uppercase tracking-widest mb-12 lg:mb-16">
          Nossa Liderança
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 items-end min-h-[600px]">

          {/* ── LEFT: Texto ── */}
          <div className="flex flex-col justify-center lg:pb-16 order-2 lg:order-1">

            {/* Bloco animado — sem key, apenas style inline muda */}
            <div style={contentStyle}>
              <span
                aria-hidden="true"
                className="block font-heading font-black leading-none select-none -mb-6 -ml-1 text-white"
                style={{ fontSize: "clamp(6rem, 12vw, 10rem)", opacity: 0.05 }}
              >
                {indexLabel}
              </span>

              <h2
                id="lideranca-heading"
                className="font-heading font-extrabold text-white leading-tight mb-3"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                {lider.nome}
              </h2>

              <div className="mb-5">
                <span className="inline-block px-3 py-1 rounded-full border border-brand-600 text-brand-300 text-xs font-medium uppercase tracking-wider">
                  {lider.cargo}
                </span>
              </div>

              <div aria-hidden="true" className="w-10 h-px bg-brand-600 mb-5" />

              <p className="text-brand-200 text-base leading-relaxed max-w-sm">
                {lider.descricao}
              </p>
            </div>

            {/* Navegação — sempre clicável, atualiza target diretamente */}
            <div className="flex items-center gap-5 mt-10">
              <button
                onClick={() => setTarget((i) => (i === 0 ? total - 1 : i - 1))}
                aria-label="Líder anterior"
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>

              <button
                onClick={() => setTarget((i) => (i === total - 1 ? 0 : i + 1))}
                aria-label="Próximo líder"
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Dots — usa target para resposta imediata ao toque */}
              <div
                className="flex items-center gap-2"
                role="tablist"
                aria-label="Selecionar líder"
              >
                {lideres.map((l, i) => (
                  <button
                    key={l.id}
                    role="tab"
                    aria-selected={i === target}
                    aria-label={`Ver ${l.nome}`}
                    onClick={() => setTarget(i)}
                    className="rounded-full cursor-pointer"
                    style={{
                      width: i === target ? "1.5rem" : "0.5rem",
                      height: "0.5rem",
                      backgroundColor:
                        i === target
                          ? "rgba(255,255,255,1)"
                          : "rgba(255,255,255,0.25)",
                      transition: "width 300ms ease, background-color 300ms ease",
                    }}
                  />
                ))}
              </div>

              <span className="text-brand-500 text-xs font-medium ml-auto hidden sm:block">
                {indexLabel} / {totalLabel}
              </span>
            </div>
          </div>

          {/* ── RIGHT: Imagem ── */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end items-end h-[380px] sm:h-[480px] lg:h-[680px]">
            {/* Glow atrás da figura */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl"
              style={{ backgroundColor: "rgba(59,110,165,0.2)" }}
            />

            {/* Container da imagem — sem key, apenas style inline */}
            <div
              className="relative h-full w-full max-w-xs lg:max-w-full"
              style={imageStyle}
            >
              <Image
                src={lider.imagem}
                alt={`${lider.nome} — ${lider.cargo}`}
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 768px) 320px, (max-width: 1024px) 400px, 560px"
                priority={shown === 0}
              />

              {/* Fade nos pés */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{
                  height: "7rem",
                  background:
                    "linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.4) 60%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
