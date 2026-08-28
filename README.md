# Peekr

Peekr é uma plataforma para especialistas apresentarem seu trabalho e receberem agendamentos de aulas, mentorias, revisões e consultorias.

> “Venda sua presença. Não um curso.”

## Escopo atual do protótipo

- Perfil público de especialista.
- Serviços e horários disponíveis.
- Agendamento simulado.
- Confirmação simulada por e-mail.
- Registro simulado no calendário do cliente e do especialista.
- Dashboard com visão geral, calendário, depoimentos, blog e notificações.

O fluxo termina quando o agendamento é confirmado. Sala de vídeo, entrada em chamada e demais etapas posteriores não fazem parte deste protótipo.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Dados e estado locais

Não é necessário configurar banco de dados, autenticação, pagamento, e-mail ou provedor de calendário para executar esta versão.

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`. O perfil de exemplo está em `/athlon` e o painel reformulado está em `/dashboard`.

## Verificações

```bash
npm run typecheck
npm run lint
npm run build
```

## Limitações

Todos os dados, formulários, horários, depoimentos, posts, reações, notificações e confirmações são mockados. Nenhuma mensagem ou evento é enviado para serviços externos nesta etapa.
