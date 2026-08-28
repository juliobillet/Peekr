"use client";

import { useMemo, useState } from "react";
import { availabilitySlots } from "@/lib/mock-data";
import { formatDateShort, formatTime } from "@/lib/utils/format";

type DashboardCalendarProps = {
  compact?: boolean;
};

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const firstAvailableStartsAt = availabilitySlots[0].startsAt;

export function DashboardCalendar({ compact = false }: DashboardCalendarProps) {
  const [selectedDay, setSelectedDay] = useState(() =>
    new Date(firstAvailableStartsAt).getDate(),
  );
  const [monthOffset, setMonthOffset] = useState(0);

  const visibleMonth = useMemo(() => {
    const firstAvailable = new Date(firstAvailableStartsAt);
    const date = new Date(
      firstAvailable.getFullYear(),
      firstAvailable.getMonth() + monthOffset,
      1,
    );
    return date;
  }, [monthOffset]);

  const monthName = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(visibleMonth);
  const daysInMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    0,
  ).getDate();
  const leadingDays = visibleMonth.getDay();
  const selectedSlots = availabilitySlots.filter((slot) => {
    const date = new Date(slot.startsAt);
    return (
      date.getDate() === selectedDay &&
      date.getMonth() === visibleMonth.getMonth() &&
      date.getFullYear() === visibleMonth.getFullYear()
    );
  });

  return (
    <section
      className={compact ? "space-y-5" : "space-y-7"}
      aria-label="Calendário de horários"
    >
      <div className="flex items-center justify-between gap-4">
        <h2
          className={
            compact
              ? "text-xl font-extrabold text-[#091333]"
              : "text-2xl font-extrabold text-[#091333]"
          }
        >
          {compact ? "Próximos horários" : "Calendário de disponibilidade"}
        </h2>
        {!compact && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-[#0b4bff]">
            Agenda mockada
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-[#53688f]">
        <strong className="capitalize">{monthName}</strong>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setMonthOffset((offset) => offset - 1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-blue-50"
            aria-label="Mês anterior"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setMonthOffset((offset) => offset + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-blue-50"
            aria-label="Próximo mês"
          >
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-sm text-[#40547c]">
        {weekDays.map((day, index) => (
          <span key={`${day}-${index}`} className="py-2 font-extrabold">
            {day}
          </span>
        ))}
        {Array.from({ length: leadingDays }).map((_, index) => (
          <span key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const hasSlot = availabilitySlots.some((slot) => {
            const date = new Date(slot.startsAt);
            return (
              date.getDate() === day &&
              date.getMonth() === visibleMonth.getMonth()
            );
          });
          const selected = day === selectedDay;

          return (
            <button
              type="button"
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`relative mx-auto flex items-center justify-center rounded-full transition ${
                compact ? "h-9 w-9" : "h-11 w-11"
              } ${selected ? "bg-[#0b4bff] font-extrabold text-white shadow-md" : "hover:bg-blue-50"}`}
              aria-pressed={selected}
            >
              {day}
              {hasSlot && !selected && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-brand-orange" />
              )}
            </button>
          );
        })}
      </div>

      <div>
        <h3 className="mb-3 font-extrabold capitalize text-[#091333]">
          {formatDateShort(
            new Date(
              visibleMonth.getFullYear(),
              visibleMonth.getMonth(),
              selectedDay,
            ),
          )}
        </h3>
        {selectedSlots.length ? (
          <div
            className={
              compact ? "space-y-2" : "grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            }
          >
            {selectedSlots.map((slot) => (
              <div
                key={slot.id}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                  slot.status === "available"
                    ? "border-[#0b4bff] bg-blue-50 text-[#0b4bff]"
                    : "border-[#dde4f2] bg-[#f7f9fd] text-[#8794b1]"
                }`}
              >
                <strong>{formatTime(slot.startsAt)}</strong>
                <span className="text-xs font-bold">
                  {slot.status === "available"
                    ? compact
                      ? "◉"
                      : "Disponível"
                    : "Reservado"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-[#cfd9ed] p-4 text-sm text-[#7787a5]">
            Nenhum horário disponível neste dia.
          </p>
        )}
      </div>
    </section>
  );
}
