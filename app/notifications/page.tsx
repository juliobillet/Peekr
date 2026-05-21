import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { mockNotifications } from "@/lib/mock-data";

export default function NotificationsPage() {
  return <div className="space-y-6"><h1 className="text-3xl font-bold">Notificações</h1><Card><CardHeader><CardTitle>Últimas atualizações</CardTitle></CardHeader><CardContent className="space-y-2">{mockNotifications.map((notification) => <div key={notification} className="rounded-xl border border-zinc-800 p-3 text-zinc-300">{notification}</div>)}</CardContent></Card></div>;
}
