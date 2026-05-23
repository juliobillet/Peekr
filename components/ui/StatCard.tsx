import { Card, CardContent } from "@/components/ui/Card";

export function StatCard({ title, value, description }: { title: string; value: string; description?: string }) {
  return (
    <Card>
      <CardContent>
        <p className="text-sm text-zinc-400">{title}</p>
        <p className="mt-1 text-2xl font-semibold text-zinc-100">{value}</p>
        {description ? <p className="mt-1 text-xs text-zinc-500">{description}</p> : null}
      </CardContent>
    </Card>
  );
}
