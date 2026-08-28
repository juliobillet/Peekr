"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
export function AuthForm({ mode }: { mode: "login" | "register" }) { const [sent, setSent] = useState(false); const register = mode === "register"; return <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">{register && <Input name="name" label="Nome" placeholder="Seu nome" required/>}<Input name="email" label="E-mail" type="email" placeholder="voce@exemplo.com" required/><Input name="password" label="Senha" type="password" placeholder="••••••••" required/>{sent && <p className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm font-medium text-[#17479d]">Autenticação será implementada em uma etapa futura.</p>}<Button type="submit" className="w-full">{register ? "Criar conta" : "Entrar"}</Button><p className="text-center text-sm text-[#68799f]">{register ? "Já tem uma conta?" : "Ainda não tem uma conta?"} <Link href={register ? "/login" : "/register"} className="font-bold text-brand-blue">{register ? "Entrar" : "Cadastre-se"}</Link></p></form>; }
