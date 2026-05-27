import type { Metadata } from "next";
import { AdminGruposClient } from "../AdminGruposClient";

export const metadata: Metadata = {
  title: "Admin — Grupos",
  description: "Gerenciar grupos da Igreja Palavra e Avivamento.",
};

export default function AdminGruposPage() {
  return <AdminGruposClient />;
}
