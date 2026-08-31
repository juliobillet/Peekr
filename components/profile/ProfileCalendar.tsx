"use client";

import { useState } from "react";
import type { AvailabilitySlot } from "@/lib/mock-data";
import { availabilitySlots } from "@/lib/mock-data";
import { formatDateShort, formatTime } from "@/lib/utils/format";

export type CalendarSelection = {
  date: string;
  slotId: string | null;
};

type ProfileCalendarProps = {
  compact?: boolean;
  selection: CalendarSelection;
  onSelectionChange: (selection: CalendarSelection) => void;
  onOpenFull?: () => void;
  onBook?: (slot: AvailabilitySlot) => void;
};

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

export function ProfileCalendar({
  compact = false,
  selection,
  onSelectionChange,
  onOpenFull,
  onBook,
}: ProfileCalendarProps) {
  const selectedDate = new Date(selection.date);
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
  );

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
  const daySlots = availabilitySlots.filter((slot) => {
    const date = new Date(slot.startsAt);
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  });

  function selectDay(day: number) {
    onSelectionChange({
      date: new Date(
        visibleMonth.getFullYear(),
        visibleMonth.getMonth(),
        day,
      ).toISOString(),
      slotId: null,
    });
  }

  function changeMonth(offset: number) {
    const nextMonth = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() + offset,
      1,
    );
    setVisibleMonth(nextMonth);
    onSelectionChange({ date: nextMonth.toISOString(), slotId: null });
  }

  return (
    <section className="space-y-5" aria-label="Calendário de horários">
      <div className="flex items-center justify-between gap-3">
        <h2
          className={`${compact ? "text-xl" : "text-2xl"} font-extrabold text-[#091333]`}
        >
          {compact ? "Próximos horários" : "Calendário de disponibilidade"}
        </h2>
        {!compact && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-brand-blue">
            Escolha um horário
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-[#53688f]">
        <strong className="capitalize">{monthName}</strong>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            className="calendar-nav"
            aria-label="Mês anterior"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            className="calendar-nav"
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
              date.getMonth() === visibleMonth.getMonth() &&
              date.getFullYear() === visibleMonth.getFullYear()
            );
          });
          const selected =
            day === selectedDate.getDate() &&
            selectedDate.getMonth() === visibleMonth.getMonth() &&
            selectedDate.getFullYear() === visibleMonth.getFullYear();

          return (
            <button
              type="button"
              key={day}
              onClick={() => selectDay(day)}
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
          {formatDateShort(selectedDate)}
        </h3>
        {daySlots.length ? (
          <div
            className={
              compact ? "space-y-2" : "grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
            }
          >
            {daySlots.map((slot) => (
              <SlotButton
                key={slot.id}
                slot={slot}
                selected={selection.slotId === slot.id}
                compact={compact}
                onSelect={() =>
                  onSelectionChange({ date: slot.startsAt, slotId: slot.id })
                }
                onBook={onBook}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-[#cfd9ed] p-4 text-sm text-[#7787a5]">
            Nenhum horário disponível neste dia.
          </p>
        )}
      </div>

      {compact && onOpenFull && (
        <button
          type="button"
          onClick={onOpenFull}
          className="w-full rounded-xl bg-[#0b4bff] px-4 py-3 font-bold text-white hover:bg-[#073bd1]"
        >
          Abrir calendário completo
        </button>
      )}
    </section>
  );
}

function SlotButton({
  slot,
  selected,
  compact,
  onSelect,
  onBook,
}: {
  slot: AvailabilitySlot;
  selected: boolean;
  compact: boolean;
  onSelect: () => void;
  onBook?: (slot: AvailabilitySlot) => void;
}) {
  const reserved = slot.status === "reserved";

  return (
    <div
      className={`rounded-xl border p-3 ${reserved ? "border-[#dde4f2] bg-[#f7f9fd]" : selected ? "border-brand-blue bg-blue-50" : "border-[#d5dff1] bg-white"}`}
    >
      <button
        type="button"
        onClick={onSelect}
        disabled={reserved}
        className="flex w-full items-center justify-between disabled:cursor-not-allowed"
        aria-pressed={selected}
      >
        <strong className={reserved ? "text-[#8794b1]" : "text-brand-blue"}>
          {formatTime(slot.startsAt)}
        </strong>
        <span className="text-xs font-bold text-[#7787a5]">
          {reserved ? "Reservado" : selected ? "Selecionado" : "Selecionar"}
        </span>
      </button>
      {!compact && !reserved && selected && onBook && (
        <button
          type="button"
          onClick={() => onBook(slot)}
          className="mt-3 w-full rounded-lg bg-brand-blue px-3 py-2 text-sm font-bold text-white hover:bg-[#073bd1]"
        >
          Reservar horário
        </button>
      )}
    </div>
  );
}
