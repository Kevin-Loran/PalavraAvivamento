"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Plus, Pencil, Trash2, X, Loader2,
  AlertCircle, LogOut, Users, Upload, ImageOff,
} from "lucide-react";
import { supabase, type Grupo } from "@/lib/supabase";

const EMPTY_FORM = {
  nome: "",
  slug: "",
  descricao: "",
  conteudo: "",
  instagram: "",
  imagem: "",
};

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const inputCls =
  "w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm text-brand-900 bg-white focus:outline-none focus:border-brand-500 transition-colors duration-200";

const labelCls =
  "block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5";

export function AdminGruposClient() {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.replace("/login");
  }

  const loadGrupos = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("grupos")
      .select("*")
      .order("nome", { ascending: true });
    if (data) setGrupos(data);
    if (error) setError(error.message);
    setLoading(false);
  }, []);

  useEffect(() => { loadGrupos(); }, [loadGrupos]);

  function openCreate() {
    setForm(EMPTY_FORM);
    setEditId(null);
    setError(null);
    setShowForm(true);
  }

  function openEdit(grupo: Grupo) {
    setForm({
      nome: grupo.nome,
      slug: grupo.slug,
      descricao: grupo.descricao ?? "",
      conteudo: grupo.conteudo ?? "",
      instagram: grupo.instagram ?? "",
      imagem: grupo.imagem ?? "",
    });
    setEditId(grupo.id);
    setError(null);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditId(null);
    setForm(EMPTY_FORM);
    setError(null);
  }

  function setField(key: keyof typeof EMPTY_FORM, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleNomeChange(value: string) {
    setForm((prev) => ({
      ...prev,
      nome: value,
      slug: editId ? prev.slug : toSlug(value),
    }));
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    setError(null);

    const ext = file.name.split(".").pop() ?? "jpg";
    const filename = `${Date.now()}-${toSlug(form.nome || "grupo")}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("grupos")
      .upload(filename, file, { upsert: true, contentType: file.type });

    if (uploadError) {
      setError(`Erro no upload: ${uploadError.message}`);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("grupos").getPublicUrl(filename);
    setField("imagem", data.publicUrl);
    setUploading(false);
  }

  async function handleSave() {
    if (!form.nome.trim()) {
      setError("O nome do grupo é obrigatório.");
      return;
    }
    if (!form.slug.trim()) {
      setError("O slug é obrigatório.");
      return;
    }
    setSaving(true);
    setError(null);

    const payload = {
      nome: form.nome.trim(),
      slug: form.slug.trim(),
      descricao: form.descricao.trim(),
      conteudo: form.conteudo.trim(),
      instagram: form.instagram.trim(),
      imagem: form.imagem.trim(),
    };

    if (editId) {
      const { error } = await supabase
        .from("grupos")
        .update(payload)
        .eq("id", editId);
      if (error) { setError(error.message); setSaving(false); return; }
    } else {
      const { error } = await supabase.from("grupos").insert(payload);
      if (error) { setError(error.message); setSaving(false); return; }
    }

    setSaving(false);
    closeForm();
    loadGrupos();
  }

  async function handleDelete(id: string, nome: string) {
    if (!window.confirm(`Remover o grupo "${nome}"? Esta ação não pode ser desfeita.`)) return;
    await supabase.from("grupos").delete().eq("id", id);
    loadGrupos();
  }

  return (
    <main className="min-h-screen bg-neutral-100">
      {/* Header */}
      <div className="bg-brand-900 text-white">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <p className="text-brand-400 text-xs font-medium uppercase tracking-wider mb-1">
                Admin
              </p>
              <h1 className="font-heading font-bold text-2xl">
                Gerenciar Grupos
              </h1>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {!showForm && (
                <button
                  onClick={openCreate}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-opacity duration-200"
                  style={{ background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" }}
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  Novo Grupo
                </button>
              )}
              <button
                onClick={handleLogout}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-brand-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
                aria-label="Sair"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Nav tabs */}
          <div className="flex gap-1">
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-200"
            >
              Eventos
            </Link>
            <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/15 text-white">
              Grupos
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8 space-y-6">
        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-neutral-300 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-semibold text-brand-900 text-lg">
                {editId ? "Editar grupo" : "Novo grupo"}
              </h2>
              <button
                onClick={closeForm}
                className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors duration-200"
                aria-label="Fechar formulário"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
                <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Nome */}
              <div>
                <label className={labelCls}>Nome *</label>
                <input
                  className={inputCls}
                  value={form.nome}
                  onChange={(e) => handleNomeChange(e.target.value)}
                  placeholder="Ex: Mocidade"
                />
              </div>

              {/* Slug */}
              <div>
                <label className={labelCls}>Slug *</label>
                <input
                  className={inputCls}
                  value={form.slug}
                  onChange={(e) => setField("slug", toSlug(e.target.value))}
                  placeholder="Ex: mocidade"
                />
                <p className="mt-1 text-xs text-neutral-400">
                  URL: /grupos/{form.slug || "…"}
                </p>
              </div>

              {/* Descrição */}
              <div className="sm:col-span-2">
                <label className={labelCls}>Descrição</label>
                <input
                  className={inputCls}
                  value={form.descricao}
                  onChange={(e) => setField("descricao", e.target.value)}
                  placeholder="Descrição curta exibida nos cards e na página"
                />
              </div>

              {/* Conteúdo */}
              <div className="sm:col-span-2">
                <label className={labelCls}>Conteúdo</label>
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={5}
                  value={form.conteudo}
                  onChange={(e) => setField("conteudo", e.target.value)}
                  placeholder="Texto institucional completo do grupo..."
                />
              </div>

              {/* Instagram */}
              <div className="sm:col-span-2">
                <label className={labelCls}>Instagram (URL)</label>
                <input
                  className={inputCls}
                  value={form.instagram}
                  onChange={(e) => setField("instagram", e.target.value)}
                  placeholder="https://www.instagram.com/seugrupo/"
                />
              </div>

              {/* Imagem */}
              <div className="sm:col-span-2">
                <label className={labelCls}>Imagem de capa</label>

                <div className="flex items-start gap-4">
                  {/* Preview */}
                  <div className="w-24 h-16 rounded-xl border border-neutral-200 overflow-hidden shrink-0 bg-neutral-100 flex items-center justify-center">
                    {form.imagem ? (
                      <img
                        src={form.imagem}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageOff className="w-5 h-5 text-neutral-300" aria-hidden="true" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    {/* Upload button */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-300 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors duration-200 disabled:opacity-60"
                    >
                      {uploading ? (
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      ) : (
                        <Upload className="w-4 h-4" aria-hidden="true" />
                      )}
                      {uploading ? "Enviando…" : "Escolher imagem"}
                    </button>

                    {/* Or paste URL */}
                    <input
                      className={`${inputCls} text-xs`}
                      value={form.imagem}
                      onChange={(e) => setField("imagem", e.target.value)}
                      placeholder="Ou cole a URL da imagem"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-100">
              <button
                onClick={closeForm}
                className="px-4 py-2.5 rounded-xl border border-neutral-300 text-sm text-neutral-600 hover:bg-neutral-100 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white disabled:opacity-60 hover:opacity-90 transition-opacity duration-200"
                style={{ background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" }}
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                {saving ? "Salvando…" : editId ? "Salvar alterações" : "Criar grupo"}
              </button>
            </div>
          </div>
        )}

        {/* List */}
        <div>
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">
            {loading
              ? "Carregando…"
              : `${grupos.length} grupo${grupos.length !== 1 ? "s" : ""} cadastrado${grupos.length !== 1 ? "s" : ""}`}
          </p>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 text-brand-400 animate-spin" aria-hidden="true" />
            </div>
          ) : grupos.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-neutral-300 p-12 text-center">
              <Users className="w-8 h-8 text-neutral-300 mx-auto mb-3" aria-hidden="true" />
              <p className="text-neutral-500 text-sm">Nenhum grupo cadastrado.</p>
              <p className="text-neutral-400 text-xs mt-1">
                Clique em &quot;Novo Grupo&quot; para começar.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {grupos.map((grupo) => (
                <div
                  key={grupo.id}
                  className="bg-white rounded-2xl border border-neutral-300 px-5 py-4 flex items-start justify-between gap-4 hover:border-brand-200 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    {/* Thumbnail */}
                    <div className="w-12 h-12 rounded-xl border border-neutral-200 overflow-hidden shrink-0 bg-neutral-100 flex items-center justify-center">
                      {grupo.imagem ? (
                        <img
                          src={grupo.imagem}
                          alt={grupo.nome}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageOff className="w-4 h-4 text-neutral-300" aria-hidden="true" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="font-heading font-semibold text-brand-900 text-sm">
                        {grupo.nome}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-neutral-400 font-mono">
                          /grupos/{grupo.slug}
                        </span>
                        {grupo.instagram && (
                          <span className="text-xs text-neutral-400">• Instagram</span>
                        )}
                      </div>
                      {grupo.descricao && (
                        <p className="text-xs text-neutral-500 mt-1 truncate max-w-md">
                          {grupo.descricao}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => openEdit(grupo)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-brand-700 hover:bg-brand-50 transition-colors duration-200"
                      aria-label={`Editar ${grupo.nome}`}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(grupo.id, grupo.nome)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                      aria-label={`Remover ${grupo.nome}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
