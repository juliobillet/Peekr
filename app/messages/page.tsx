import { Avatar } from "@/components/ui/Avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { mockConversations } from "@/lib/mock-data";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ with?: string; sent?: string }>;
}) {
  const { with: username, sent } = await searchParams;
  const selectedName = username
    ? username === "athlon"
      ? "Athlon"
      : username
    : null;

  return (
    <div className="profile-frame p-5 sm:p-7">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">
          Caixa de entrada
        </p>
        <h1 className="mt-1 text-3xl font-extrabold text-[#0d1b57]">
          Mensagens
        </h1>
      </div>
      {sent === "1" && selectedName && (
        <p className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 font-semibold text-emerald-700">
          Mensagem simulada enviada para {selectedName}.
        </p>
      )}
      <div className="grid gap-4 md:grid-cols-[340px_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Conversas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {selectedName && (
              <Conversation
                name={selectedName}
                preview="Nova conversa iniciada pelo perfil."
                active
              />
            )}
            {mockConversations.map((conversation) => (
              <Conversation
                key={conversation.name}
                name={conversation.name}
                preview={conversation.preview}
                time={conversation.time}
              />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex min-h-[420px] flex-col items-center justify-center text-center">
            {selectedName ? (
              <>
                <Avatar name={selectedName} className="h-16 w-16 text-xl" />
                <h2 className="mt-4 text-xl font-extrabold text-[#0d1b57]">
                  Conversa com {selectedName}
                </h2>
                <p className="mt-2 max-w-sm text-[#68799f]">
                  As mensagens desta conversa aparecerão aqui quando a
                  integração for implementada.
                </p>
              </>
            ) : (
              <p className="text-[#68799f]">
                Selecione uma conversa para começar.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Conversation({
  name,
  preview,
  time,
  active = false,
}: {
  name: string;
  preview: string;
  time?: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex w-full gap-3 rounded-xl border p-3 text-left ${active ? "border-brand-blue bg-blue-50" : "border-[#e5ebf8] hover:bg-blue-50"}`}
    >
      <Avatar name={name} className="h-10 w-10 shrink-0 text-sm" />
      <span className="min-w-0 flex-1">
        <span className="flex justify-between gap-2 font-bold text-[#274477]">
          {name}
          {time && <small className="font-normal text-[#8794b1]">{time}</small>}
        </span>
        <span className="mt-1 block truncate text-sm text-[#68799f]">
          {preview}
        </span>
      </span>
    </button>
  );
}
