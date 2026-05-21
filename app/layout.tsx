import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peekr",
  description: "Venda sua presença. Não um curso.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
