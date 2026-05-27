import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { SiteIntro } from "@/components/layout/SiteIntro";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Igreja Palavra e Avivamento",
    template: "%s | Igreja Palavra e Avivamento",
  },
  description:
    "Uma comunidade de fé, esperança e amor. Venha nos conhecer e fazer parte dessa família.",
  keywords: ["igreja", "evangelica", "culto", "palavra", "avivamento", "fe"],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Igreja Palavra e Avivamento",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <SiteIntro />
        {children}
      </body>
    </html>
  );
}
