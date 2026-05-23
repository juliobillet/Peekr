# Peekr

Peekr é uma plataforma de sessões privadas ao vivo para especialistas venderem aulas, mentorias, revisões e consultorias sem montar curso ou infraestrutura própria.

> “Venda sua presença. Não um curso.”

## Escopo do MVP

- Conta e perfil público.
- Serviços oferecidos.
- Agenda.
- Reserva.
- Pagamento.
- Sala efêmera.
- Notificações.
- E-mails.
- Denúncias e moderação básica.

## O que **NÃO** faz parte do MVP inicial

- Cursos gravados.
- Feed social completo.
- Comunidades.
- Lives públicas.
- App mobile.
- Saúde regulada.
- Gravação de sessões.
- Bloqueio absoluto de captura/gravação externa.

## Stack planejada

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- LiveKit
- Stripe
- Resend
- Prisma opcional

## Como rodar localmente

1. `npm install`
2. `cp .env.example .env.local`
3. Preencha as variáveis mínimas.
4. `npm run setup:check`
5. `npm run dev`

## Variáveis de ambiente

- `NEXT_PUBLIC_*` são públicas e podem ir para o client.
- Variáveis **sem** `NEXT_PUBLIC_` são privadas e nunca devem ser usadas em Client Components.
- Feature flags permitem desenvolver sem configurar todas as integrações de uma vez.

## Fases de ativação das integrações

### Fase 1

- UI, perfis e Supabase.
- Payments `false`.
- LiveKit `false`.
- Emails `false`.

### Fase 2

- Ativar pagamentos.
- `NEXT_PUBLIC_ENABLE_PAYMENTS=true`.

### Fase 3

- Ativar e-mails.
- `NEXT_PUBLIC_ENABLE_EMAILS=true`.

### Fase 4

- Ativar LiveKit.
- `NEXT_PUBLIC_ENABLE_LIVEKIT=true`.

### Fase 5

- Ativar arquivos temporários.
- `NEXT_PUBLIC_ENABLE_TEMP_FILES=true`.

## Limitações importantes

- A Peekr não grava sessões por padrão.
- A Peekr não oferece gravação nativa.
- Não existe garantia absoluta contra gravação externa feita por terceiros.
- Denúncias e moderação serão implementadas em fases posteriores.
- Saúde regulada deve ser tratada em uma vertical futura, com regras específicas.

## Checklist futuro de deploy

- Configurar domínio principal.
- Configurar domínio de salas.
- Configurar Supabase.
- Configurar Storage buckets.
- Configurar Stripe webhook.
- Configurar Resend domain.
- Configurar LiveKit.
- Configurar cron para fechamento de salas expiradas.
- Revisar RLS policies.
- Revisar termos de uso e política de privacidade.
