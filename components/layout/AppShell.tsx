import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
export function AppShell({ children }: { children: ReactNode }) { return <div className="flex min-h-screen min-w-0 flex-col overflow-x-hidden bg-[#fbfcff] text-[#101b40]"><Header /><main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-8">{children}</main><Footer /></div>; }
