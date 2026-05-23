import { createBrowserClient } from "@supabase/ssr";

// Browser client — use in all client components ("use client")
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL    ?? "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder"
);

export interface Evento {
  id: string;
  titulo: string;
  data: string;
  horario: string;
  local: string;
  descricao: string;
  categoria: string;
  created_at: string;
}
