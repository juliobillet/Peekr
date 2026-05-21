"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { routes } from "@/lib/routes";

export default function RegisterPage() {
  return <Card className="mx-auto max-w-md"><CardHeader><CardTitle>Criar conta</CardTitle></CardHeader><CardContent><form onSubmit={(e) => e.preventDefault()} className="space-y-4"><Input label="Nome" required /><Input label="Email" type="email" required /><Input label="Senha" type="password" required /><Button type="submit" className="w-full">Criar conta</Button><p className="text-sm text-zinc-400">Já tem conta? <Link href={routes.login} className="text-brand-orange">Entrar</Link></p></form></CardContent></Card>;
}
