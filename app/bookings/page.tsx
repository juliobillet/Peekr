import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { mockBookings } from "@/lib/mock-data";

export default function BookingsPage() {
  return <div className="space-y-6"><h1 className="text-3xl font-bold">Reservas</h1><div className="flex gap-2"><Badge>Próximos</Badge><Badge variant="default">Passados</Badge><Badge variant="default">Cancelados</Badge></div><div className="grid gap-4">{mockBookings.map((booking) => <Card key={`${booking.title}-${booking.date}`}><CardHeader><CardTitle>{booking.title}</CardTitle></CardHeader><CardContent className="flex flex-wrap items-center justify-between gap-3"><p className="text-zinc-300">{booking.date} • {booking.time} • {booking.status}</p><Button href="/room/demo-room" variant="secondary">Entrar no Peek</Button></CardContent></Card>)}</div></div>;
}
