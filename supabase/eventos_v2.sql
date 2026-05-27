-- =============================================================
-- Eventos v2 — adiciona grupo_slug e imagem
-- Execute no Supabase SQL Editor
-- =============================================================

-- 1. Novas colunas na tabela eventos
ALTER TABLE eventos
  ADD COLUMN IF NOT EXISTS grupo_slug text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS imagem     text DEFAULT '';

-- 2. Bucket de imagens para eventos
INSERT INTO storage.buckets (id, name, public)
VALUES ('eventos', 'eventos', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Policies do bucket eventos
CREATE POLICY "eventos_storage_select_public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'eventos');

CREATE POLICY "eventos_storage_insert_auth"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'eventos' AND auth.role() = 'authenticated');

CREATE POLICY "eventos_storage_update_auth"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'eventos' AND auth.role() = 'authenticated');

CREATE POLICY "eventos_storage_delete_auth"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'eventos' AND auth.role() = 'authenticated');
