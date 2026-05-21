import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { mockConversations } from "@/lib/mock-data";

export default function MessagesPage() {
  return <div className="grid gap-4 md:grid-cols-[320px_1fr]"><Card><CardHeader><CardTitle>Conversas</CardTitle></CardHeader><CardContent className="space-y-3">{mockConversations.map((conversation) => <button key={conversation.name} className="w-full rounded-xl border border-zinc-800 p-3 text-left hover:bg-zinc-800"><p className="font-medium">{conversation.name}</p><p className="text-sm text-zinc-400">{conversation.preview}</p></button>)}</CardContent></Card><Card><CardContent className="flex min-h-[320px] items-center justify-center text-zinc-400">Selecione uma conversa para começar.</CardContent></Card></div>;
}
