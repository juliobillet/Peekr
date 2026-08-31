"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import type { AvailabilitySlot, Service } from "@/lib/mock-data";
import {
  availabilitySlots,
  mockNotifications,
  mockProfile,
  services,
} from "@/lib/mock-data";
import { formatCurrencyBRL } from "@/lib/utils/format";
import { BookingModal } from "./BookingModal";
import { MessageModal } from "./MessageModal";
import { ProfileCalendar, type CalendarSelection } from "./ProfileCalendar";

type ProfileTab =
  | "overview"
  | "calendar"
  | "testimonials"
  | "blog"
  | "notifications";

const tabs: Array<{ id: ProfileTab; icon: string; label: string }> = [
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
    text: "Athlon transformou uma ideia confusa em um loop de gameplay claro. Saí com prioridades e próximos passos.",
  },
  {
    name: "Lucas Andrade",
    rating: 5,
    text: "A revisão do GDD foi direta, cuidadosa e prática. O olhar para progressão fez toda a diferença.",
  },
  {
    name: "Bianca Melo",
    rating: 4,
    text: "Ótima sessão de balanceamento, com exemplos que consegui aplicar no mesmo dia.",
  },
];

const posts = [
  {
    title: "Três perguntas antes de criar uma nova mecânica",
    text: "Uma mecânica merece entrar no projeto quando reforça a fantasia, cria decisões interessantes e conversa com o loop principal.",
    date: "18 ago 2026",
  },
  {
    title: "Protótipo não é produto — e isso é uma vantagem",
    text: "O objetivo do protótipo é responder perguntas rapidamente. Aparência, conteúdo e polimento podem esperar.",
    date: "08 ago 2026",
  },
];

export function ProfileTemplate({
  username,
  initialTab,
}: {
  username: string;
  initialTab?: string;
}) {
  const normalizedUsername = username.toLowerCase();
  const displayName =
    normalizedUsername === "athlon" ? "Athlon" : toDisplayName(username);
  const [activeTab, setActiveTab] = useState<ProfileTab>(
    isTab(initialTab) ? initialTab : "overview",
  );
  const [selection, setSelection] = useState<CalendarSelection>(() => ({
    date: availabilitySlots[0].startsAt,
    slotId: availabilitySlots[0].id,
  }));
  const [selectedService, setSelectedService] = useState<Service | null>(
    services[0],
  );
  const [bookingSlot, setBookingSlot] = useState<AvailabilitySlot | null>(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const [reactions, setReactions] = useState<Record<number, number>>({
    0: 18,
    1: 11,
  });

  function openFullCalendar() {
    setActiveTab("calendar");
  }

  return (
    <div className="profile-frame">
      <div className="grid min-h-full gap-5 md:grid-cols-[76px_minmax(0,1fr)] lg:grid-cols-[88px_minmax(0,1fr)]">
        <ProfileSideNav activeTab={activeTab} onChange={setActiveTab} />
        <main className="min-w-0">
          {activeTab === "overview" && (
            <Overview
              username={normalizedUsername}
              displayName={displayName}
              selection={selection}
              selectedService={selectedService}
              onSelectionChange={setSelection}
              onServiceChange={setSelectedService}
              onOpenCalendar={openFullCalendar}
              onMessage={() => setMessageOpen(true)}
            />
          )}
          {activeTab === "calendar" && (
            <Panel
              title="Calendário"
              description={`Selecione um horário disponível para reservar um Peek com ${displayName}.`}
            >
              {selectedService && (
                <SelectedPeek
                  service={selectedService}
                  onClear={() => setSelectedService(null)}
                />
              )}
              <ProfileCalendar
                selection={selection}
                onSelectionChange={setSelection}
                onBook={setBookingSlot}
              />
            </Panel>
          )}
          {activeTab === "testimonials" && <TestimonialsPanel />}
          {activeTab === "blog" && (
            <BlogPanel
              reactions={reactions}
              onReact={(index) =>
                setReactions((current) => ({
                  ...current,
                  [index]: current[index] + 1,
                }))
              }
            />
          )}
          {activeTab === "notifications" && <NotificationsPanel />}
        </main>
      </div>

      {bookingSlot && (
        <BookingModal
          slot={bookingSlot}
          initialService={selectedService}
          displayName={displayName}
          onClose={() => setBookingSlot(null)}
        />
      )}
      {messageOpen && (
        <MessageModal
          username={normalizedUsername}
          displayName={displayName}
          onClose={() => setMessageOpen(false)}
        />
      )}
    </div>
  );
}

function ProfileSideNav({
  activeTab,
  onChange,
}: {
  activeTab: ProfileTab;
  onChange: (tab: ProfileTab) => void;
}) {
  return (
    <aside aria-label="Navegação do perfil" className="md:py-2">
      <div className="flex gap-2 overflow-x-auto rounded-2xl bg-[#f7f9fe] p-2 md:sticky md:top-24 md:flex-col md:items-center md:bg-transparent md:p-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            title={tab.label}
            aria-label={tab.label}
            aria-pressed={activeTab === tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold transition md:h-16 md:w-16 ${activeTab === tab.id ? "bg-[#edf3ff] text-brand-blue shadow-sm" : "text-[#617398] hover:bg-blue-50 hover:text-brand-blue"}`}
          >
            {tab.icon}
          </button>
        ))}
      </div>
    </aside>
  );
}

function Overview({
  username,
  displayName,
  selection,
  selectedService,
  onSelectionChange,
  onServiceChange,
  onOpenCalendar,
  onMessage,
}: {
  username: string;
  displayName: string;
  selection: CalendarSelection;
  selectedService: Service | null;
  onSelectionChange: (selection: CalendarSelection) => void;
  onServiceChange: (service: Service) => void;
  onOpenCalendar: () => void;
  onMessage: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(340px,.85fr)]">
        <section className="profile-panel p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="relative shrink-0">
              <Avatar
                name={displayName}
                className="h-28 w-28 rounded-[1.8rem] text-4xl sm:h-36 sm:w-36"
              />
              <span
                className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full border-4 border-white bg-emerald-400"
                aria-label="Online"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-extrabold text-[#090f29] sm:text-4xl">
                  {displayName}{" "}
                  <span className="text-xl text-brand-blue">✓</span>
                </h1>
                <button
                  type="button"
                  onClick={onMessage}
                  className="rounded-xl border border-[#cdd9f1] px-3 py-2 text-sm font-bold text-[#274477] hover:bg-blue-50"
                >
                  Mensagem
                </button>
              </div>
              <p className="mt-1 font-semibold text-[#8794b1]">@{username}</p>
              <p className="mt-2 text-lg text-[#53688f] sm:text-xl">
                {mockProfile.title}
              </p>
              <p className="mt-4 text-lg text-[#53688f]">
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
          <dl className="mt-7 grid gap-4 border-t border-[#e4eaf5] pt-6 sm:grid-cols-3">
            <ProfileInfo label="Atendimento" value={mockProfile.location} />
            <ProfileInfo
              label="Idiomas"
              value={mockProfile.languages.join(", ")}
            />
            <ProfileInfo label="Instagram" value={`@${username}`} />
          </dl>
          <div className="mt-7 grid grid-cols-3 gap-3 border-t border-[#e4eaf5] pt-6">
            <Metric value={String(mockProfile.peeksCount)} label="Peeks" />
            <Metric value="98%" label="Avaliações 5 ★" />
            <Metric value="2 anos" label="na Peekr" />
          </div>
        </section>
        <section className="profile-panel p-5 sm:p-7">
          <ProfileCalendar
            compact
            selection={selection}
            onSelectionChange={onSelectionChange}
            onOpenFull={onOpenCalendar}
          />
        </section>
      </div>
      <ServicesBlock
        displayName={displayName}
        selectedService={selectedService}
        onSelect={onServiceChange}
        onOpenCalendar={onOpenCalendar}
      />
    </div>
  );
}

function ServicesBlock({
  displayName,
  selectedService,
  onSelect,
  onOpenCalendar,
}: {
  displayName: string;
  selectedService: Service | null;
  onSelect: (service: Service) => void;
  onOpenCalendar: () => void;
}) {
  return (
    <section className="profile-panel p-5 sm:p-7">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">
            Peeks disponíveis
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-[#091333]">
            Escolha como {displayName} pode ajudar
          </h2>
        </div>
        <button
          type="button"
          onClick={onOpenCalendar}
          className="text-sm font-bold text-brand-blue"
        >
          Ver horários →
        </button>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {services.map((service) => {
          const selected = selectedService?.id === service.id;
          return (
            <button
              type="button"
              key={service.id}
              onClick={() => onSelect(service)}
              className={`flex h-full flex-col rounded-2xl border p-5 text-left transition ${selected ? "border-brand-blue bg-blue-50 shadow-sm" : "border-[#e1e8f5] hover:border-[#9eb8ed]"}`}
            >
              <div className="flex w-full justify-between gap-3">
                <h3 className="font-extrabold text-[#0d1b57]">
                  {service.title}
                </h3>
                {selected && <span className="text-brand-blue">✓</span>}
              </div>
              <p className="mt-2 flex-1 text-sm leading-6 text-[#68799f]">
                {service.description}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-[#e2e8f4] pt-4">
                <span className="text-sm font-bold text-[#53688f]">
                  {service.durationMinutes} min
                </span>
                <strong className="text-[#0d1b57]">
                  {formatCurrencyBRL(service.priceCents)}
                </strong>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function SelectedPeek({
  service,
  onClear,
}: {
  service: Service;
  onClear: () => void;
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:flex-row sm:items-center">
      <div>
        <span className="text-xs font-bold uppercase text-brand-blue">
          Peek selecionado
        </span>
        <h3 className="font-extrabold text-[#0d1b57]">
          {service.title} · {service.durationMinutes} min
        </h3>
      </div>
      <button
        type="button"
        onClick={onClear}
        className="text-sm font-bold text-[#53688f]"
      >
        Escolher no agendamento
      </button>
    </div>
  );
}

function TestimonialsPanel() {
  return (
    <Panel
      title="Depoimentos"
      description="Avaliações de pessoas que já reservaram um horário com este perfil."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {testimonials.map((item) => (
          <article
            key={item.name}
            className="rounded-2xl border border-[#e1e8f5] p-5"
          >
            <div className="flex items-center gap-3">
              <Avatar name={item.name} className="h-11 w-11 text-sm" />
              <div>
                <h3 className="font-extrabold text-[#091333]">{item.name}</h3>
                <p
                  className="text-sm text-brand-orange"
                  aria-label={`${item.rating} de 5 estrelas`}
                >
                  {"★".repeat(item.rating)}
                  {"☆".repeat(5 - item.rating)}
                </p>
              </div>
            </div>
            <p className="mt-4 leading-7 text-[#53688f]">“{item.text}”</p>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function BlogPanel({
  reactions,
  onReact,
}: {
  reactions: Record<number, number>;
  onReact: (index: number) => void;
}) {
  return (
    <Panel
      title="Blog"
      description="Textos curtos publicados pelo autor deste perfil."
    >
      <div className="space-y-4">
        {posts.map((post, index) => (
          <article
            key={post.title}
            className="overflow-hidden rounded-2xl border border-[#e1e8f5]"
          >
            <div className="h-2 bg-gradient-to-r from-brand-blue to-brand-orange" />
            <div className="p-5 sm:p-6">
              <span className="text-sm font-semibold text-[#8794b1]">
                {post.date}
              </span>
              <h3 className="mt-2 text-xl font-extrabold text-[#091333]">
                {post.title}
              </h3>
              <p className="mt-3 leading-7 text-[#53688f]">{post.text}</p>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-[#edf1f8] pt-4">
                <button
                  type="button"
                  onClick={() => onReact(index)}
                  className="rounded-full bg-blue-50 px-3 py-2 text-sm font-bold text-brand-blue"
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
  );
}

function NotificationsPanel() {
  return (
    <Panel
      title="Notificações"
      description="Atualizações entre este perfil e a sua conta."
    >
      <div className="divide-y divide-[#e8edf7] rounded-2xl border border-[#e1e8f5]">
        {mockNotifications.map((item, index) => (
          <div key={item} className="flex gap-4 p-4 sm:p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xl text-brand-blue">
              {["✓", "📅", "✉", "💬"][index]}
            </span>
            <div>
              <h3 className="font-extrabold text-[#091333]">{item}</h3>
              <p className="mt-1 text-sm text-[#7787a5]">
                Atualização de demonstração desta relação.
              </p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
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
    <section className="profile-panel p-5 sm:p-7 lg:p-8">
      <header className="mb-7">
        <h1 className="text-3xl font-extrabold text-[#090f29]">{title}</h1>
        <p className="mt-2 max-w-2xl text-[#68799f]">{description}</p>
      </header>
      {children}
    </section>
  );
}
function ProfileInfo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wide text-[#8794b1]">
        {label}
      </dt>
      <dd className="mt-1 font-bold text-[#274477]">{value}</dd>
    </div>
  );
}
function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <strong className="block text-xl text-[#090f29] sm:text-2xl">
        {value}
      </strong>
      <span className="mt-1 block text-xs text-[#68799f] sm:text-sm">
        {label}
      </span>
    </div>
  );
}
function isTab(value?: string): value is ProfileTab {
  return tabs.some((tab) => tab.id === value);
}
function toDisplayName(username: string) {
  return username
    .replace(/[-_.]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
