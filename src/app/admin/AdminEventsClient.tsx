"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus, Pencil, Trash2, X, Loader2,
  Calendar, Clock, MapPin, AlertCircle, LogOut,
} from "lucide-react";
import { supabase, type Evento } from "@/lib/supabase";

const CATEGORIAS = [
  "Evento",
  "Mocidade",
  "Família",
  "Culto Especial",
  "Crianças",
  "Treinamento",
  "Retiro",
];

const EMPTY_FORM = {
  titulo: "",
  data: "",
  horario: "",
  local: "Sede Central",
  descricao: "",
  categoria: "Evento",
};

function formatDate(iso: string): string {
  if (!iso) return "";
  const [year, month, day] = iso.split("-");
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];
  return `${parseInt(day)} de ${months[parseInt(month) - 1]}, ${year}`;
}

const inputCls =
  "w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm text-brand-900 bg-white focus:outline-none focus:border-brand-500 transition-colors duration-200";

const labelCls =
  "block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5";

export function AdminEventsClient() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.replace("/login");
  }

  const loadEventos = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("eventos")
      .select("*")
      .order("data", { ascending: true });
    if (data) setEventos(data);
    if (error) setError(error.message);
    setLoading(false);
  }, []);

  useEffect(() => { loadEventos(); }, [loadEventos]);

  function openCreate() {
    setForm(EMPTY_FORM);
    setEditId(null);
    setError(null);
    setShowForm(true);
  }

  function openEdit(evento: Evento) {
    setForm({
      titulo: evento.titulo,
      data: evento.data,
      horario: evento.horario,
      local: evento.local,
      descricao: evento.descricao,
      categoria: evento.categoria,
    });
    setEditId(evento.id);
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

  async function handleSave() {
    if (!form.titulo.trim() || !form.data) {
      setError("Título e data são obrigatórios.");
      return;
    }
    setSaving(true);
    setError(null);

    if (editId) {
      const { error } = await supabase
        .from("eventos")
        .update(form)
        .eq("id", editId);
      if (error) { setError(error.message); setSaving(false); return; }
    } else {
      const { error } = await supabase.from("eventos").insert(form);
      if (error) { setError(error.message); setSaving(false); return; }
    }

    setSaving(false);
    closeForm();
    loadEventos();
  }

  async function handleDelete(id: string, titulo: string) {
    if (!window.confirm(`Remover "${titulo}"?`)) return;
    await supabase.from("eventos").delete().eq("id", id);
    loadEventos();
  }

  return (
    <main className="min-h-screen bg-neutral-100">
      {/* Header */}
      <div className="bg-brand-900 text-white">
        <div className="mx-auto max-w-4xl px-6 py-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-brand-400 text-xs font-medium uppercase tracking-wider mb-1">
              Admin
            </p>
            <h1 className="font-heading font-bold text-2xl">
              Próximos Eventos
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
                Novo Evento
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
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8 space-y-6">
        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-neutral-300 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-semibold text-brand-900 text-lg">
                {editId ? "Editar evento" : "Novo evento"}
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
              <div className="sm:col-span-2">
                <label className={labelCls}>Título *</label>
                <input
                  className={inputCls}
                  value={form.titulo}
                  onChange={(e) => setField("titulo", e.target.value)}
                  placeholder="Ex: Retiro da Mocidade"
                />
              </div>
              <div>
                <label className={labelCls}>Data *</label>
                <input
                  type="date"
                  className={inputCls}
                  value={form.data}
                  onChange={(e) => setField("data", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Horário</label>
                <input
                  className={inputCls}
                  value={form.horario}
                  onChange={(e) => setField("horario", e.target.value)}
                  placeholder="Ex: 19h ou 19h às 21h"
                />
              </div>
              <div>
                <label className={labelCls}>Local</label>
                <input
                  className={inputCls}
                  value={form.local}
                  onChange={(e) => setField("local", e.target.value)}
                  placeholder="Ex: Sede Central"
                />
              </div>
              <div>
                <label className={labelCls}>Categoria</label>
                <select
                  className={inputCls}
                  value={form.categoria}
                  onChange={(e) => setField("categoria", e.target.value)}
                >
                  {CATEGORIAS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Descrição</label>
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={3}
                  value={form.descricao}
                  onChange={(e) => setField("descricao", e.target.value)}
                  placeholder="Descrição breve do evento..."
                />
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
                {saving ? "Salvando…" : editId ? "Salvar alterações" : "Criar evento"}
              </button>
            </div>
          </div>
        )}

        {/* List */}
        <div>
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">
            {loading
              ? "Carregando…"
              : `${eventos.length} evento${eventos.length !== 1 ? "s" : ""} cadastrado${eventos.length !== 1 ? "s" : ""}`}
          </p>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 text-brand-400 animate-spin" aria-hidden="true" />
            </div>
          ) : eventos.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-neutral-300 p-12 text-center">
              <Calendar className="w-8 h-8 text-neutral-300 mx-auto mb-3" aria-hidden="true" />
              <p className="text-neutral-500 text-sm">Nenhum evento cadastrado.</p>
              <p className="text-neutral-400 text-xs mt-1">
                Clique em &quot;Novo Evento&quot; para começar.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {eventos.map((evento) => (
                <div
                  key={evento.id}
                  className="bg-white rounded-2xl border border-neutral-300 px-5 py-4 flex items-start justify-between gap-4 hover:border-brand-200 transition-colors duration-200"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-heading font-semibold text-brand-900 text-sm">
                      {evento.titulo}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 shrink-0" aria-hidden="true" />
                        {formatDate(evento.data)}
                      </span>
                      {evento.horario && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 shrink-0" aria-hidden="true" />
                          {evento.horario}
                        </span>
                      )}
                      {evento.local && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
                          {evento.local}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => openEdit(evento)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-brand-700 hover:bg-brand-50 transition-colors duration-200"
                      aria-label={`Editar ${evento.titulo}`}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(evento.id, evento.titulo)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                      aria-label={`Remover ${evento.titulo}`}
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
