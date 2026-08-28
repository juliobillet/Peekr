"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { mockNotifications, mockProfile } from "@/lib/mock-data";
import { DashboardCalendar } from "./DashboardCalendar";

type DashboardTab =
  | "overview"
  | "calendar"
  | "testimonials"
  | "blog"
  | "notifications";

const validTabs: DashboardTab[] = [
  "overview",
  "calendar",
  "testimonials",
  "blog",
  "notifications",
];

const menuItems: Array<{ id: DashboardTab; icon: string; label: string }> = [
  { id: "overview", icon: "⌂", label: "Visão geral" },
  { id: "calendar", icon: "▣", label: "Calendário" },
  { id: "testimonials", icon: "▢", label: "Depoimentos" },
  { id: "blog", icon: "✎", label: "Blog" },
  { id: "notifications", icon: "♧", label: "Notificações" },
];

const testimonials = [
  {
    name: "Marina Costa",
    rating: 5,
    text: "Athlon transformou uma ideia confusa em um loop de gameplay claro. Saí da conversa com prioridades e próximos passos.",
  },
  {
    name: "Lucas Andrade",
    rating: 5,
    text: "A revisão do GDD foi direta, cuidadosa e muito prática. O olhar para progressão fez toda a diferença no protótipo.",
  },
  {
    name: "Bianca Melo",
    rating: 4,
    text: "Ótima sessão de balanceamento. As sugestões vieram acompanhadas de exemplos que consegui aplicar no mesmo dia.",
  },
];

const posts = [
  {
    title: "Três perguntas antes de criar uma nova mecânica",
    excerpt:
      "Uma mecânica só merece entrar no projeto quando reforça a fantasia, cria decisões interessantes e conversa com o loop principal.",
    date: "18 ago 2026",
  },
  {
    title: "Protótipo não é produto — e isso é uma vantagem",
    excerpt:
      "O objetivo do protótipo é responder perguntas rapidamente. Aparência, volume de conteúdo e polimento podem esperar.",
    date: "08 ago 2026",
  },
];

export function DashboardProfile({ initialTab }: { initialTab?: string }) {
  const [activeTab, setActiveTab] = useState<DashboardTab>(
    validTabs.includes(initialTab as DashboardTab)
      ? (initialTab as DashboardTab)
      : "overview",
  );
  const [reactions, setReactions] = useState<Record<number, number>>({
    0: 18,
    1: 11,
  });

  return (
    <div className="rounded-[2rem] border border-[#dce5f5] bg-white p-3 shadow-[0_24px_70px_rgba(30,72,145,0.10)] sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-3xl font-extrabold tracking-tight text-[#0b4bff]">
          Peekr
        </span>
        <Button href="/athlon" variant="secondary" size="sm">
          Ver perfil público
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-[72px_minmax(0,1fr)] lg:grid-cols-[84px_minmax(0,1fr)]">
        <aside className="md:py-2" aria-label="Navegação do painel">
          <div className="flex gap-2 overflow-x-auto rounded-2xl bg-[#f8faff] p-2 md:sticky md:top-24 md:flex-col md:items-center md:bg-transparent md:p-0">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                title={item.label}
                aria-label={item.label}
                aria-pressed={activeTab === item.id}
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold transition md:h-16 md:w-16 ${
                  activeTab === item.id
                    ? "bg-[#eef3ff] text-[#0b4bff] shadow-sm"
                    : "text-[#617398] hover:bg-blue-50 hover:text-[#0b4bff]"
                }`}
              >
                {item.icon}
              </button>
            ))}
          </div>
        </aside>

        <main className="min-w-0">
          {activeTab === "overview" && (
            <OverviewTab onOpenCalendar={() => setActiveTab("calendar")} />
          )}
          {activeTab === "calendar" && (
            <Panel
              title="Calendário"
              description="Visualize os horários disponíveis e os agendamentos registrados."
            >
              <DashboardCalendar />
            </Panel>
          )}
          {activeTab === "testimonials" && (
            <Panel
              title="Depoimentos"
              description="Avaliações deixadas por contas que já agendaram um horário com você."
            >
              <div className="grid gap-4 lg:grid-cols-2">
                {testimonials.map((testimonial) => (
                  <article
                    key={testimonial.name}
                    className="rounded-2xl border border-[#e1e8f5] p-5"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar
                        name={testimonial.name}
                        className="h-11 w-11 text-sm"
                      />
                      <div>
                        <h3 className="font-extrabold text-[#091333]">
                          {testimonial.name}
                        </h3>
                        <p
                          className="text-sm text-brand-orange"
                          aria-label={`${testimonial.rating} de 5 estrelas`}
                        >
                          {"★".repeat(testimonial.rating)}
                          {"☆".repeat(5 - testimonial.rating)}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 leading-7 text-[#53688f]">
                      “{testimonial.text}”
                    </p>
                  </article>
                ))}
              </div>
            </Panel>
          )}
          {activeTab === "blog" && (
            <Panel
              title="Blog de Athlon"
              description="Textos curtos sobre game design, produção e desenvolvimento de projetos."
            >
              <div className="space-y-4">
                {posts.map((post, index) => (
                  <article
                    key={post.title}
                    className="overflow-hidden rounded-2xl border border-[#e1e8f5]"
                  >
                    <div className="h-2 bg-gradient-to-r from-[#0b4bff] to-brand-orange" />
                    <div className="p-5 sm:p-6">
                      <span className="text-sm font-semibold text-[#8794b1]">
                        {post.date}
                      </span>
                      <h3 className="mt-2 text-xl font-extrabold text-[#091333]">
                        {post.title}
                      </h3>
                      <p className="mt-3 leading-7 text-[#53688f]">
                        {post.excerpt}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2 border-t border-[#edf1f8] pt-4">
                        <button
                          type="button"
                          onClick={() =>
                            setReactions((current) => ({
                              ...current,
                              [index]: current[index] + 1,
                            }))
                          }
                          className="rounded-full bg-blue-50 px-3 py-2 text-sm font-bold text-[#0b4bff] hover:bg-blue-100"
                        >
                          👏 {reactions[index]}
                        </button>
                        <button
                          type="button"
                          className="rounded-full bg-orange-50 px-3 py-2 text-sm font-bold text-orange-700"
                        >
                          💡 Inspirador
                        </button>
                        <button
                          type="button"
                          className="rounded-full bg-[#f4f6fa] px-3 py-2 text-sm font-bold text-[#53688f]"
                        >
                          Compartilhar
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </Panel>
          )}
          {activeTab === "notifications" && (
            <Panel
              title="Notificações"
              description="Atualizações entre esta conta em visualização e a conta visitante."
            >
              <div className="divide-y divide-[#e8edf7] rounded-2xl border border-[#e1e8f5]">
                {mockNotifications.map((notification, index) => (
                  <div key={notification} className="flex gap-4 p-4 sm:p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xl text-[#0b4bff]">
                      {index === 0
                        ? "✓"
                        : index === 1
                          ? "📅"
                          : index === 2
                            ? "✉"
                            : "💬"}
                    </span>
                    <div>
                      <h3 className="font-extrabold text-[#091333]">
                        {notification}
                      </h3>
                      <p className="mt-1 text-sm text-[#7787a5]">
                        Atualização de demonstração desta relação.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          )}
        </main>
      </div>
    </div>
  );
}

function OverviewTab({ onOpenCalendar }: { onOpenCalendar: () => void }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,.9fr)]">
      <section className="rounded-3xl border border-[#dce5f5] p-5 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="relative shrink-0">
            <Avatar
              name={mockProfile.displayName}
              className="h-28 w-28 rounded-[1.8rem] text-4xl sm:h-36 sm:w-36"
            />
            <span
              className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full border-4 border-white bg-emerald-400"
              aria-label="Online"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-extrabold text-[#090f29] sm:text-4xl">
              {mockProfile.displayName}{" "}
              <span className="text-xl text-[#0b4bff]">✓</span>
            </h1>
            <p className="mt-2 text-lg text-[#53688f] sm:text-xl">
              {mockProfile.title}
            </p>
            <p className="mt-5 text-lg text-[#53688f]">
              <span className="text-brand-orange">★</span>{" "}
              {mockProfile.rating.toFixed(1).replace(".", ",")} (
              {mockProfile.reviewsCount} avaliações)
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {mockProfile.specialties.slice(0, 3).map((specialty) => (
            <Badge key={specialty} className="px-4 py-2 text-sm">
              {specialty}
            </Badge>
          ))}
        </div>
        <p className="mt-7 text-lg leading-8 text-[#40547c] sm:text-xl sm:leading-9">
          {mockProfile.bio}
        </p>

        <div className="mt-8 grid grid-cols-3 gap-3 border-t border-[#e4eaf5] pt-7">
          <Metric value={String(mockProfile.peeksCount)} label="Peeks" />
          <Metric value="98%" label="Avaliações 5 ★" />
          <Metric value="2 anos" label="na Peekr" />
        </div>
      </section>

      <section className="rounded-3xl border border-[#dce5f5] p-5 sm:p-7">
        <DashboardCalendar compact />
        <button
          type="button"
          onClick={onOpenCalendar}
          className="mt-5 w-full rounded-xl bg-[#0b4bff] px-4 py-3 font-bold text-white hover:bg-[#073bd1]"
        >
          Abrir calendário completo
        </button>
      </section>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-0">
      <strong className="block text-xl text-[#090f29] sm:text-2xl">
        {value}
      </strong>
      <span className="mt-1 block text-xs text-[#68799f] sm:text-sm">
        {label}
      </span>
    </div>
  );
}

function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-[#dce5f5] p-5 sm:p-7 lg:p-8">
      <header className="mb-7">
        <h1 className="text-3xl font-extrabold text-[#090f29]">{title}</h1>
        <p className="mt-2 max-w-2xl text-[#68799f]">{description}</p>
      </header>
      {children}
    </section>
  );
}
