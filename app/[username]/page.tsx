"use client";

import { useMemo, useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatCard } from "@/components/ui/StatCard";
import { Tabs } from "@/components/ui/Tabs";
import { mockProfile } from "@/lib/mock-data";

export default function PublicProfilePage({ params }: { params: { username: string } }) {
  const isKnownProfile = params.username.toLowerCase() === mockProfile.username;
  const profile = useMemo(
    () => ({ ...mockProfile, username: isKnownProfile ? mockProfile.username : params.username, displayName: isKnownProfile ? mockProfile.displayName : params.username }),
    [isKnownProfile, params.username],
  );
  const [tab, setTab] = useState("sobre");

  return (
    <div className="space-y-6">
      <section className="space-y-3 text-center">
        <div className="flex justify-center"><Avatar name={profile.displayName} src={profile.avatarUrl} className="h-20 w-20" /></div>
        <h1 className="text-3xl font-bold">{profile.displayName}</h1>
        <p className="text-zinc-400">@{profile.username}</p>
      </section>
      <Tabs items={[{ value: "sobre", label: "Sobre" }, { value: "agenda", label: "Agenda" }, { value: "peeks", label: "Peeks" }, { value: "mensagens", label: "Mensagens" }]} value={tab} onChange={setTab} />

      {tab === "sobre" ? <div className="space-y-4"><Card><CardHeader><CardTitle>Sobre {profile.displayName}</CardTitle></CardHeader><CardContent className="space-y-3"><p className="text-zinc-300">{profile.bio}</p><p className="text-zinc-400">Instagram: {profile.instagram}</p></CardContent></Card><div className="grid gap-4 sm:grid-cols-2"><StatCard title="Peekers atendidos" value={String(profile.peekersCount)} /><StatCard title="Peeks realizados" value={String(profile.peeksCount)} /></div><Card><CardHeader><CardTitle>Vídeo de Apresentação</CardTitle></CardHeader><CardContent><div className="flex h-48 items-center justify-center rounded-xl border border-zinc-800 text-zinc-400">{profile.introVideoTitle}</div></CardContent></Card></div> : null}

      {tab === "agenda" ? <Card><CardContent className="space-y-4"><div className="h-56 rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 text-zinc-400">Placeholder de calendário</div><p className="text-sm text-zinc-400">Os horários disponíveis aparecerão aqui.</p><Button>Agendar Peek</Button></CardContent></Card> : null}

      {tab === "peeks" ? <div className="grid gap-4">{profile.services.map((service) => <Card key={service.title}><CardHeader><CardTitle>{service.title}</CardTitle></CardHeader><CardContent><p className="text-zinc-300">{service.description}</p><p className="mt-2 text-sm text-zinc-400">{service.duration} • {service.price}</p></CardContent></Card>)}</div> : null}

      {tab === "mensagens" ? <EmptyState title="Mensagens" description="Envie uma mensagem antes de reservar um Peek." action={<Button variant="secondary">Enviar mensagem</Button>} /> : null}
    </div>
  );
}
