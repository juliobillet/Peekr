import { Card, CardContent } from "@/components/ui/Card";

const sections = ["Perfil", "Agenda", "Notificações", "Conta", "Sair"];

export default function SettingsPage() {
  return <div className="space-y-6"><h1 className="text-3xl font-bold">Configurações</h1><Card><CardContent className="space-y-2">{sections.map((section) => <button key={section} className="w-full rounded-xl border border-zinc-800 p-3 text-left hover:bg-zinc-800">{section}</button>)}</CardContent></Card></div>;
}
