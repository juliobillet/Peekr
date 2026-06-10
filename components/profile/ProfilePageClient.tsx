"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import type { AvailabilitySlot, Service } from "@/lib/mock-data";
import { BookingModal } from "./BookingModal";
import { ProfileAbout } from "./ProfileAbout";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileSchedule } from "./ProfileSchedule";
import { ProfileServices } from "./ProfileServices";
import { ProfileTabs, type ProfileTab } from "./ProfileTabs";
export function ProfilePageClient() { const [tab, setTab] = useState<ProfileTab>("Sobre"); const [service, setService] = useState<Service | null>(null); const [slot, setSlot] = useState<AvailabilitySlot | null>(null); const schedule = () => setTab("Agenda"); const chooseService = (item: Service) => { setService(item); setTab("Agenda"); }; return <div className="space-y-6"><ProfileHeader onSchedule={schedule}/><ProfileTabs active={tab} onChange={setTab}/><div className="min-h-[360px]">{tab === "Sobre" && <ProfileAbout/>}{tab === "Agenda" && <ProfileSchedule selectedService={service} onSelectSlot={setSlot}/>} {tab === "Peeks" && <ProfileServices onSelect={chooseService}/>} {tab === "Mensagens" && <EmptyState title="Envie uma mensagem antes de reservar um Peek." description="Use mensagens para alinhar dúvidas rápidas sobre o serviço, materiais necessários ou expectativas antes da sessão." action={<Button href="/messages">Enviar mensagem</Button>}/>}</div>{slot && <BookingModal slot={slot} initialService={service} onClose={() => setSlot(null)}/>}</div>; }
