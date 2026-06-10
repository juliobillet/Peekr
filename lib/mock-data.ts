export type Service = {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  priceCents: number;
  currency: "BRL";
  tags: string[];
};

export type AvailabilitySlot = {
  id: string;
  startsAt: string;
  endsAt: string;
  status: "available" | "reserved";
};

function futureSlot(id: string, daysFromNow: number, hour: number, status: AvailabilitySlot["status"] = "available"): AvailabilitySlot {
  const start = new Date();
  start.setDate(start.getDate() + daysFromNow);
  start.setHours(hour, 0, 0, 0);
  const end = new Date(start);
  end.setHours(end.getHours() + 1);
  return { id, startsAt: start.toISOString(), endsAt: end.toISOString(), status };
}

export const services: Service[] = [
  { id: "mentoria-game-design", title: "Mentoria de Game Design", description: "Sessão para analisar sua ideia, mecânicas principais, loop de gameplay e próximos passos do projeto.", durationMinutes: 60, priceCents: 12000, currency: "BRL", tags: ["Mentoria", "Game Design"] },
  { id: "revisao-projeto", title: "Revisão de Projeto de Jogo", description: "Análise guiada do seu GDD, protótipo, pitch ou documentação com sugestões práticas de melhoria.", durationMinutes: 45, priceCents: 9000, currency: "BRL", tags: ["Revisão", "Projeto"] },
  { id: "aula-sistemas", title: "Aula Particular de Sistemas de Jogo", description: "Aula individual sobre sistemas, progressão, balanceamento e experiência do jogador.", durationMinutes: 50, priceCents: 10000, currency: "BRL", tags: ["Aula", "Sistemas"] },
];

export const availabilitySlots: AvailabilitySlot[] = [
  futureSlot("slot-1", 1, 10), futureSlot("slot-2", 1, 14, "reserved"), futureSlot("slot-3", 2, 16),
  futureSlot("slot-4", 3, 9), futureSlot("slot-5", 3, 19), futureSlot("slot-6", 5, 15),
];

export const mockProfile = {
  username: "athlon",
  displayName: "Athlon",
  title: "Especialista em Game Design",
  bio: "Ajudo criadores independentes a transformar ideias em sistemas de jogo mais claros, jogáveis e envolventes. Trabalho com análise de mecânicas, progressão, balanceamento, documentação e estruturação de projetos.",
  avatarUrl: null as string | null,
  coverUrl: null as string | null,
  instagram: "@athlon",
  location: "Atendimento online",
  languages: ["Português", "Inglês"],
  peekersCount: 262,
  peeksCount: 262,
  rating: 4.9,
  reviewsCount: 38,
  responseTime: "Responde em até 2h",
  specialties: ["Game Design", "Balanceamento", "Progressão", "Documentação", "Pitch de jogos"],
  introVideo: { title: "Trailer do canal", duration: "1:42", thumbnailUrl: null as string | null },
  services,
  availabilitySlots,
};

export const mockBookings = [
  { title: "Mentoria de Game Design", date: "12 Jun 2026", time: "10:00", status: "Confirmado", active: true },
  { title: "Revisão de TCC", date: "04 Jun 2026", time: "14:30", status: "Concluído", active: false },
  { title: "Conversação em Inglês", date: "30 Mai 2026", time: "09:00", status: "Cancelado", active: false },
];
export const mockConversations = [
  { name: "Ana Souza", preview: "Podemos ajustar o horário da sessão?", time: "10:42" },
  { name: "Rafael Lima", preview: "Enviei os materiais para revisão.", time: "Ontem" },
  { name: "Carla Mendes", preview: "Obrigado pela mentoria de ontem!", time: "Seg" },
];
export const mockNotifications = ["Reserva confirmada", "Pagamento confirmado", "Seu Peek começa em breve", "Nova mensagem recebida"];
