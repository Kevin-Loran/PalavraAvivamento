import type { Metadata } from "next";
import {
  Users,
  Calendar,
  TrendingUp,
  Bell,
  LayoutDashboard,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard de gestão da Igreja Palavra e Avivamento.",
};

const stats = [
  { label: "Membros ativos", value: "—", icon: Users },
  { label: "Eventos este mês", value: "—", icon: Calendar },
  { label: "Visitantes", value: "—", icon: TrendingUp },
  { label: "Notificações", value: "—", icon: Bell },
];

export default function DashboardPage() {
  return (
    <main
      className="min-h-screen bg-neutral-100 p-6 lg:p-10"
      id="main-content"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div
            className="w-10 h-10 rounded-xl bg-brand-900 flex items-center justify-center"
            aria-hidden="true"
          >
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-brand-900 text-2xl">
              Dashboard
            </h1>
            <p className="text-neutral-500 text-sm">
              Igreja Palavra e Avivamento
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-neutral-300 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-neutral-500 text-sm">{label}</p>
                <div
                  className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Icon className="w-4 h-4 text-brand-700" />
                </div>
              </div>
              <p className="font-heading font-bold text-brand-900 text-3xl">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Main content area placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-300 p-6">
            <h2 className="font-heading font-semibold text-brand-900 mb-4">
              Próximos eventos
            </h2>
            <div className="flex items-center justify-center h-40 text-neutral-400 text-sm border border-dashed border-neutral-300 rounded-xl">
              Conteúdo dinâmico será carregado aqui
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-300 p-6">
            <h2 className="font-heading font-semibold text-brand-900 mb-4">
              Atividade recente
            </h2>
            <div className="flex items-center justify-center h-40 text-neutral-400 text-sm border border-dashed border-neutral-300 rounded-xl">
              Feed de atividade
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-400">
          Dashboard em desenvolvimento — dados reais serão integrados em breve
        </p>
      </div>
    </main>
  );
}
