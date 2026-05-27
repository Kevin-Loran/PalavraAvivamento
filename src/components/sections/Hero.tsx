"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// Static positions — no Math.random, avoids hydration mismatch
const EMBERS: {
  id: number;
  left: string;
  delay: string;
  dur: string;
  size: number;
  alt: boolean;
}[] = [
  { id: 1,  left: "12%", delay: "0s",   dur: "4.8s", size: 2, alt: false },
  { id: 2,  left: "25%", delay: "1.3s", dur: "6.2s", size: 3, alt: true  },
  { id: 3,  left: "38%", delay: "0.6s", dur: "5.1s", size: 2, alt: false },
  { id: 4,  left: "51%", delay: "2.4s", dur: "4.5s", size: 2, alt: true  },
  { id: 5,  left: "63%", delay: "0.9s", dur: "5.7s", size: 3, alt: false },
  { id: 6,  left: "74%", delay: "1.8s", dur: "6.4s", size: 2, alt: true  },
  { id: 7,  left: "85%", delay: "3.2s", dur: "5.3s", size: 2, alt: false },
  { id: 8,  left: "8%",  delay: "1.6s", dur: "7.0s", size: 3, alt: true  },
  { id: 9,  left: "47%", delay: "2.9s", dur: "4.9s", size: 2, alt: false },
  { id: 10, left: "91%", delay: "0.4s", dur: "5.6s", size: 2, alt: true  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [fireActive, setFireActive] = useState(true);

  // Pause fire animations when hero is scrolled out of view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setFireActive(entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const play = fireActive ? "running" : "paused";

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-900"
      aria-label="Seção principal"
    >
      {/* Subtle background radials */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3b6ea5 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #1e3a5f 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      {/* Atmospheric bottom-to-top warm gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(20,8,0,0.65) 0%, rgba(10,4,0,0.22) 28%, transparent 55%)",
        }}
      />

      {/* ── Fire Effect ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden"
        style={{ height: "45%" }}
      >
        {/* Glow 1 — wide coal base */}
        <div
          style={{
            position: "absolute",
            bottom: "-30px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "110%",
            height: "220px",
            background:
              "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(180,83,9,0.38) 0%, transparent 70%)",
            filter: "blur(24px)",
            animation: "ember-glow 5.5s ease-in-out infinite",
            animationPlayState: play,
          }}
        />

        {/* Glow 2 — focused center flame */}
        <div
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: "280px",
            background:
              "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(234,88,12,0.28) 0%, transparent 65%)",
            filter: "blur(20px)",
            animation: "ember-glow-b 4.2s ease-in-out infinite 0.8s",
            animationPlayState: play,
          }}
        />

        {/* Glow 3 — warm left */}
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            left: "20%",
            width: "35%",
            height: "200px",
            background:
              "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(217,119,6,0.22) 0%, transparent 70%)",
            filter: "blur(30px)",
            animation: "ember-glow 6.8s ease-in-out infinite 1.5s",
            animationPlayState: play,
          }}
        />

        {/* Glow 4 — warm right */}
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            right: "15%",
            width: "30%",
            height: "180px",
            background:
              "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(180,83,9,0.20) 0%, transparent 70%)",
            filter: "blur(28px)",
            animation: "ember-glow-b 7.1s ease-in-out infinite 2.2s",
            animationPlayState: play,
          }}
        />

        {/* Fade mask — blends fire zone into the dark background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "55%",
            background: "linear-gradient(to bottom, #0f172a 0%, transparent 100%)",
          }}
        />

        {/* Ember particles */}
        {EMBERS.map(({ id, left, delay, dur, size, alt }) => (
          <div
            key={id}
            style={{
              position: "absolute",
              bottom: "12px",
              left,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              backgroundColor:
                size === 3
                  ? "rgba(252,211,77,0.9)"
                  : "rgba(253,186,116,0.85)",
              boxShadow: `0 0 ${size * 3}px ${size}px rgba(251,191,36,0.3)`,
              animation: `${alt ? "ember-rise-b" : "ember-rise"} ${dur} ease-out infinite ${delay}`,
              animationPlayState: play,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
        {/* Logo — emerge behind headline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            top: "36px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "clamp(200px, 38vw, 380px)",
            height: "clamp(200px, 38vw, 380px)",
            zIndex: -1,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              animation: "logo-emerge 4.5s ease-out 0.3s both",
            }}
          >
            <Image
              src="/logo.png"
              alt=""
              fill
              className="object-contain"
              style={{
                filter:
                  "brightness(0) invert(1) drop-shadow(0 0 32px rgba(251,191,36,0.10))",
              }}
            />
          </div>
        </div>

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-600 text-brand-200 text-xs font-medium tracking-wide uppercase mb-8">
          <span
            className="w-1.5 h-1.5 rounded-full bg-brand-400"
            aria-hidden="true"
          />
          Bem-vindo à nossa família
        </div>

        {/* Headline */}
        <h1
          className="font-heading font-black text-white tracking-tight leading-none mb-6"
          style={{ fontSize: "clamp(2.5rem, 9vw, 8rem)" }}
        >
          Palavra e
          <br />
          {/* Outer span carries the glow filter; inner carries the gradient text.
              Mixing filter + background-clip:text on the same element breaks clipping in Chrome. */}
          <span
            style={{
              display: "inline-block",
              filter: "drop-shadow(0 0 24px rgba(249,115,22,0.32))",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #f97316 0%, #f59e0b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Avivamento
            </span>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-brand-200 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Venha fazer parte de uma família que cresce na palavra, no amor e no
          avivamento do Espírito Santo. Todos são bem-vindos.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="text-white hover:opacity-90 transition-opacity duration-200 w-full sm:w-auto"
            style={{ background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" }}
            asChild
          >
            <Link href="#sobre">
              Conheça a igreja
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 w-full sm:w-auto"
            asChild
          >
            <Link href="/eventos">Ver próximos eventos</Link>
          </Button>
        </div>

        {/* Schedule cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { day: "Terça-feira", time: "19h30", label: "Culto de Doutrina" },
            { day: "Sexta-feira", time: "19h30", label: "Culto" },
            { day: "Domingo",     time: "18h30", label: "Culto" },
          ].map(({ day, time, label }) => (
            <div
              key={day}
              className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-center"
            >
              <p className="text-brand-300 font-heading font-semibold text-sm">
                {day}
              </p>
              <p className="text-white font-bold text-lg">{time}</p>
              <p className="text-brand-400 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brand-400 animate-bounce z-10">
        <ChevronDown className="w-5 h-5" aria-hidden="true" />
      </div>
    </section>
  );
}
