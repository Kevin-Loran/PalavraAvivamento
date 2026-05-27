"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const INTRO_SIZE = 76;
const NAV_LOGO_SIZE = 36;
const NAV_PADDING_LEFT = 24; // px-6 = 1.5rem = 24px

const EASE_PREMIUM = [0.76, 0, 0.24, 1] as const;
const EASE_APPEAR  = [0.16, 1, 0.30, 1] as const;

export function SiteIntro() {
  const [show, setShow]       = useState(false);
  const [exiting, setExiting] = useState(false);
  const [target, setTarget]   = useState({ x: 0, y: 0 });

  // Persists across React Strict Mode double-invoke so timers survive cleanup
  const started = useRef(false);

  useEffect(() => {
    const alreadySeen = !!sessionStorage.getItem("intro_seen");

    if (!alreadySeen) {
      // First-ever visit this session
      sessionStorage.setItem("intro_seen", "1");
      started.current = true;
      document.body.style.overflow = "hidden";

      setShow(true);
      setTarget({
        x: NAV_PADDING_LEFT + NAV_LOGO_SIZE / 2 - window.innerWidth  / 2,
        y: 32                                    - window.innerHeight / 2,
      });
    } else if (!started.current) {
      // Already seen (or second+ visit this session) — skip
      return;
    }

    // Re-arm timers on every effect call that reaches here.
    // In Strict Mode: first run sets them, cleanup cancels them, second run re-arms them.
    // In production: runs once, works as expected.
    const tExit = setTimeout(() => setExiting(true), 1700);
    const tDone = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 3000);

    return () => {
      clearTimeout(tExit);
      clearTimeout(tDone);
      document.body.style.overflow = "";
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!show) return null;

  const logoScale = NAV_LOGO_SIZE / INTRO_SIZE;

  return (
    <>
      {/* Overlay — curtain that slides up */}
      <motion.div
        className="fixed inset-0 z-[200]"
        style={{ backgroundColor: "#0F172A", willChange: "transform" }}
        animate={exiting ? { y: "-100%" } : { y: "0%" }}
        transition={
          exiting
            ? { duration: 1.15, ease: EASE_PREMIUM }
            : { duration: 0 }
        }
      />

      {/* Logo — animates independently to navbar position */}
      <motion.div
        className="fixed pointer-events-none z-[201]"
        style={{
          left:       "50%",
          top:        "50%",
          width:      INTRO_SIZE,
          height:     INTRO_SIZE,
          marginLeft: -(INTRO_SIZE / 2),
          marginTop:  -(INTRO_SIZE / 2),
          willChange: "transform, opacity",
        }}
        initial={{ opacity: 0, scale: 0.82 }}
        animate={
          exiting
            ? { opacity: 0, scale: logoScale, x: target.x, y: target.y }
            : { opacity: 1, scale: 1, x: 0, y: 0 }
        }
        transition={
          exiting
            ? {
                duration: 1.0,
                ease:     EASE_PREMIUM,
                opacity:  { duration: 0.55, delay: 0.42, ease: "easeIn" },
              }
            : {
                duration: 1.0,
                ease:     EASE_APPEAR,
              }
        }
      >
        <Image
          src="/logo.png"
          alt="Igreja Palavra e Avivamento"
          width={INTRO_SIZE}
          height={INTRO_SIZE}
          className="w-full h-full object-contain"
          priority
        />
      </motion.div>
    </>
  );
}
