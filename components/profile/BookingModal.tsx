"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { AvailabilitySlot, Service } from "@/lib/mock-data";
import { services } from "@/lib/mock-data";
import {
  formatCurrencyBRL,
  formatDateShort,
  formatTime,
} from "@/lib/utils/format";

export function BookingModal({
  slot,
  initialService,
  displayName = "Athlon",
  onClose,
}: {
  slot: AvailabilitySlot;
  initialService: Service | null;
  displayName?: string;
  onClose: () => void;
}) {
  const [service, setService] = useState(initialService ?? services[0]);
  const [paymentMethod, setPaymentMethod] = useState("Cartão");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#071330]/70 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">
              Agendamento mockado
            </p>
            <h2
              id="booking-title"
              className="mt-1 text-2xl font-extrabold text-[#0d1b57]"
            >
              Reservar horário
            </h2>
            <p className="mt-1 text-[#68799f]">
              com {displayName} · {formatDateShort(slot.startsAt)} às{" "}
              {formatTime(slot.startsAt)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 font-bold text-brand-blue"
          >
            ✕
          </button>
        </div>

        {success ? (
          <div className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
            <div className="text-4xl">✓</div>
            <h3 className="mt-3 text-xl font-extrabold text-emerald-800">
              Agendamento concluído!
            </h3>
            <p className="mt-2 text-emerald-700">
              A confirmação foi simulada por e-mail e o evento foi adicionado
              aos calendários do cliente e de {displayName}.
            </p>
            <Button href="/bookings" className="mt-5">
              Ver meus agendamentos
            </Button>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            <label className="block text-sm font-bold text-[#274477]">
              Peek selecionado
              <select
                value={service.id}
                onChange={(event) =>
                  setService(
                    services.find((item) => item.id === event.target.value) ??
                      services[0],
                  )
                }
                className="mt-2 min-h-12 w-full rounded-xl border border-[#ccd8f6] bg-white px-3 text-[#0d1b57]"
              >
                {services.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
            <div className="rounded-2xl bg-[#f5f8ff] p-4">
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <h3 className="font-extrabold text-[#0d1b57]">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#68799f]">
                    {service.durationMinutes} minutos
                  </p>
                </div>
                <strong className="text-xl text-[#0d1b57]">
                  {formatCurrencyBRL(service.priceCents)}
                </strong>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#40547c]">
                {service.description}
              </p>
            </div>
            <fieldset>
              <legend className="text-sm font-bold text-[#274477]">
                Pagamento simulado
              </legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {["Cartão", "Pix", "Saldo"].map((method) => (
                  <button
                    type="button"
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`min-h-11 rounded-xl border px-3 text-sm font-bold ${
                      paymentMethod === method
                        ? "border-brand-blue bg-blue-50 text-brand-blue"
                        : "border-[#dce4f2] text-[#53688f]"
                    }`}
                    aria-pressed={paymentMethod === method}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </fieldset>
            <Notice title="Regras de cancelamento">
              Cancelamentos feitos até 1h antes do início dão direito a
              reembolso integral. Se o especialista não comparecer, o cliente
              também recebe reembolso integral.
            </Notice>
            <Notice title="Confirmação">
              Depois da confirmação, simularemos o envio de e-mail e o registro
              do evento nos dois calendários.
            </Notice>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button variant="secondary" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={() => setSuccess(true)}>
                Concluir agendamento
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Notice({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-4 border-brand-orange pl-4">
      <h4 className="text-sm font-extrabold text-[#0d1b57]">{title}</h4>
      <p className="mt-1 text-xs leading-5 text-[#68799f]">{children}</p>
    </div>
  );
}
