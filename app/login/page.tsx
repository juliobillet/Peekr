"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { routes } from "@/lib/routes";

export default function LoginPage() {
  return <Card className="mx-auto max-w-md"><CardHeader><CardTitle>Entrar</CardTitle></CardHeader><CardContent><form onSubmit={(e) => e.preventDefault()} className="space-y-4"><Input label="Email" type="email" required /><Input label="Senha" type="password" required /><Button type="submit" className="w-full">Entrar</Button><p className="text-sm text-zinc-400">Ainda não tem conta? <Link href={routes.register} className="text-brand-orange">Criar cadastro</Link></p></form></CardContent></Card>;
}
