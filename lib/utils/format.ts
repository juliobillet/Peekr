const toDate = (date: Date | string) => typeof date === "string" ? new Date(date) : date;
export const formatCurrencyBRL = (cents: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
export const formatDateShort = (date: Date | string) => new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "2-digit", month: "short" }).format(toDate(date));
export const formatTime = (date: Date | string) => new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(toDate(date));
