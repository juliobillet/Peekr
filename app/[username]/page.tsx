import type { Metadata } from "next";
import { ProfilePageClient } from "@/components/profile/ProfilePageClient";
export const metadata: Metadata = { title: "Athlon | Peekr", description: "Agende um Peek privado com Athlon." };
export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) { await params; return <ProfilePageClient/>; }
