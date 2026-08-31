import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";


export const metadata: Metadata = {
  title: "Peekr",
  description: "Sessões privadas ao vivo para aulas, mentorias, revisões e consultorias.",
  icons: {
    icon: [{ url: "icon.svg", sizes: "any", type: "image/svg+xml" }],
    shortcut: "icon.svg",
    apple: "icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
