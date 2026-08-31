import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen min-w-0 flex-col overflow-x-hidden bg-[#f7f9fd] text-[#101b40]">
      <Header />
      <main className="mx-auto flex w-full max-w-[1500px] flex-1 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="flex w-full">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
