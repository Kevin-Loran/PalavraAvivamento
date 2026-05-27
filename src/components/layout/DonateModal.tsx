"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";
import { X, Copy, Check, Heart } from "lucide-react";
import { buildPixPayload } from "@/lib/pixPayload";

const PIX_KEY       = "29456979000199";
const MERCHANT_NAME = "Palavra e Avivamento";
const MERCHANT_CITY = "Sao Paulo";

const pixPayload = buildPixPayload(PIX_KEY, MERCHANT_NAME, MERCHANT_CITY);

interface Props {
  open: boolean;
  onClose: () => void;
}

export function DonateModal({ open, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Block scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function copyKey() {
    navigator.clipboard.writeText(PIX_KEY).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="donate-title"
            className="fixed inset-0 z-[301] flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
              style={{ backgroundColor: "#0F172A" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Orange accent bar */}
              <div
                className="h-1 w-full"
                style={{
                  background: "linear-gradient(90deg, #f97316 0%, #ea580c 100%)",
                }}
              />

              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(249,115,22,0.15)" }}
                  >
                    <Heart className="w-4 h-4" style={{ color: "#f97316" }} />
                  </div>
                  <div>
                    <p
                      id="donate-title"
                      className="font-heading font-semibold text-white text-sm leading-tight"
                    >
                      Doação via Pix
                    </p>
                    <p className="text-neutral-400 text-xs">
                      Igreja Palavra e Avivamento
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Fechar"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:text-white hover:bg-white/10 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* QR Code */}
              <div className="px-6 pb-2">
                <div className="rounded-xl p-5 flex items-center justify-center bg-white">
                  <QRCode
                    value={pixPayload}
                    size={192}
                    bgColor="#ffffff"
                    fgColor="#0F172A"
                    level="M"
                  />
                </div>
              </div>

              {/* Instructions */}
              <div className="px-6 pt-4 pb-2 text-center">
                <p className="text-white text-sm font-medium mb-1">
                  Aponte a câmera para o QR Code
                </p>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Abra o app do seu banco, selecione Pix e escaneie o código acima.
                </p>
              </div>

              {/* Divider */}
              <div className="mx-6 my-4 h-px bg-white/10" />

              {/* Copy key */}
              <div className="px-6 pb-6">
                <p className="text-neutral-400 text-xs mb-2">
                  Ou copie a chave Pix (CNPJ):
                </p>
                <div className="flex items-center gap-2">
                  <div
                    className="flex-1 rounded-lg px-3 py-2.5 font-mono text-xs text-neutral-300 truncate"
                    style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  >
                    {PIX_KEY}
                  </div>
                  <button
                    onClick={copyKey}
                    className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{
                      background: copied
                        ? "rgba(34,197,94,0.15)"
                        : "rgba(249,115,22,0.15)",
                    }}
                    aria-label="Copiar chave Pix"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" style={{ color: "#f97316" }} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
