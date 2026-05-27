-- =============================================================
-- Grupos — tabela + storage + policies
-- Execute no Supabase SQL Editor
-- =============================================================

-- 1. Tabela
create table if not exists grupos (
  id          uuid        default gen_random_uuid() primary key,
  nome        text        not null,
  slug        text        unique not null,
  descricao   text        default '',
  conteudo    text        default '',
  imagem      text        default '',
  instagram   text        default '',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- 2. Trigger para updated_at automático
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists grupos_updated_at on grupos;
create trigger grupos_updated_at
  before update on grupos
  for each row execute function set_updated_at();

-- 3. Row Level Security
alter table grupos enable row level security;

-- Leitura pública (todos podem ver)
create policy "grupos_select_public"
  on grupos for select
  using (true);

-- Escrita apenas para usuários autenticados (admin)
create policy "grupos_insert_auth"
  on grupos for insert
  with check (auth.role() = 'authenticated');

create policy "grupos_update_auth"
  on grupos for update
  using (auth.role() = 'authenticated');

create policy "grupos_delete_auth"
  on grupos for delete
  using (auth.role() = 'authenticated');

-- =============================================================
-- 4. Supabase Storage — bucket "grupos"
-- Execute no SQL Editor OU via dashboard Storage > New Bucket
-- =============================================================

insert into storage.buckets (id, name, public)
values ('grupos', 'grupos', true)
on conflict (id) do nothing;

-- Policy: leitura pública das imagens
create policy "grupos_storage_select_public"
  on storage.objects for select
  using (bucket_id = 'grupos');

-- Policy: upload apenas para admins autenticados
create policy "grupos_storage_insert_auth"
  on storage.objects for insert
  with check (bucket_id = 'grupos' and auth.role() = 'authenticated');

create policy "grupos_storage_update_auth"
  on storage.objects for update
  using (bucket_id = 'grupos' and auth.role() = 'authenticated');

create policy "grupos_storage_delete_auth"
  on storage.objects for delete
  using (bucket_id = 'grupos' and auth.role() = 'authenticated');

-- =============================================================
-- 5. Dados iniciais (opcional — popula os grupos do site)
-- =============================================================

insert into grupos (nome, slug, descricao, instagram) values
  (
    'Mocidade',
    'mocidade',
    'Grupo voltado para os jovens da igreja. Encontros de comunhão, estudos bíblicos e crescimento na fé.',
    'https://www.instagram.com/mocidaderesgatedivino/'
  ),
  (
    'Grupo de Varões',
    'varones',
    'Homens da igreja unidos em oração e propósito. Encontros focados em liderança e crescimento espiritual.',
    ''
  ),
  (
    'Grupo de Varoas',
    'varoas',
    'Mulheres da igreja em comunhão e fortalecimento espiritual. Um espaço de graça, cuidado e fé.',
    ''
  ),
  (
    'Ombreiros',
    'ombreiros',
    'Equipe dedicada ao suporte e manutenção da igreja. Auxiliam os pastores e garantem que tudo funcione com excelência.',
    ''
  )
on conflict (slug) do nothing;
