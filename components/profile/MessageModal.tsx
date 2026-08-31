"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";

export function MessageModal({
  username,
  displayName,
  onClose,
}: {
  username: string;
  displayName: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#071330]/70 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="message-title"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">
              Mensagem direta
            </p>
            <h2
              id="message-title"
              className="mt-1 text-2xl font-extrabold text-[#0d1b57]"
            >
              Falar com {displayName}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 font-bold text-brand-blue"
          >
            ✕
          </button>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            router.push(
              `/messages?with=${encodeURIComponent(username)}&sent=1`,
            );
          }}
          className="mt-6 space-y-4"
        >
          <Textarea
            label="Sua mensagem"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Escreva uma dúvida sobre os Peeks, materiais ou horários..."
            required
            className="min-h-36"
          />
          <p className="text-xs leading-5 text-[#7787a5]">
            Ao enviar, você será direcionado para sua caixa de entrada.
          </p>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Enviar mensagem</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
