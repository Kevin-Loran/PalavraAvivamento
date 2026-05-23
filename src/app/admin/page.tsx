import type { Metadata } from "next";
import { AdminEventsClient } from "./AdminEventsClient";

export const metadata: Metadata = {
  title: "Admin — Eventos",
  description: "Painel administrativo da Igreja Palavra e Avivamento.",
};

export default function AdminPage() {
  return <AdminEventsClient />;
}
