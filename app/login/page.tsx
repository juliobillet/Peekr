import { AuthForm } from "@/components/auth/AuthForm";
import { Card, CardContent } from "@/components/ui/Card";
export default function LoginPage() { return <div className="mx-auto max-w-md py-8"><div className="mb-6 text-center"><h1 className="text-3xl font-extrabold text-[#0d1b57]">Bem-vindo de volta</h1><p className="mt-2 text-[#68799f]">Entre para gerenciar seus Peeks.</p></div><Card><CardContent><AuthForm mode="login"/></CardContent></Card></div>; }
