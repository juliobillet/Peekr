import { AuthForm } from "@/components/auth/AuthForm";
import { Card, CardContent } from "@/components/ui/Card";
export default function RegisterPage() { return <div className="mx-auto max-w-md py-8"><div className="mb-6 text-center"><h1 className="text-3xl font-extrabold text-[#0d1b57]">Crie seu perfil</h1><p className="mt-2 text-[#68799f]">Transforme sua presença em impacto.</p></div><Card><CardContent><AuthForm mode="register"/></CardContent></Card></div>; }
