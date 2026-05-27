import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

// Browser client — use in all client components ("use client")
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL    ?? "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder"
);

// Server client — use in Server Components (no cookies needed for public reads)
export function createServerSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL    ?? "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder"
  );
}

export interface Evento {
  id: string;
  titulo: string;
  data: string;
  horario: string;
  local: string;
  descricao: string;
  categoria: string;
  grupo_slug: string | null;
  imagem: string;
  created_at: string;
}

export interface Grupo {
  id: string;
  nome: string;
  slug: string;
  descricao: string;
  conteudo: string;
  imagem: string;
  instagram: string;
  created_at: string;
  updated_at: string;
}
