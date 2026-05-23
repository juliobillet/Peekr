export const mockProfile = {
  username: "oathlon",
  displayName: "oAthlon",
  avatarUrl: null as string | null,
  bio: "Especialista em Game Design",
  peekersCount: 262,
  peeksCount: 262,
  instagram: "@oathlon",
  introVideoTitle: "Trailer do canal",
  services: [
    {
      title: "Mentoria de Game Design",
      description: "Mentoria prática para estruturação de mecânicas e loops de retenção.",
      duration: "60 min",
      price: "R$ 280",
    },
    {
      title: "Revisão de projeto de jogo",
      description: "Análise de GDD, economia e experiência de jogador com feedback acionável.",
      duration: "90 min",
      price: "R$ 420",
    },
    {
      title: "Aula particular de design de sistemas",
      description: "Aula ao vivo para dominar balanceamento, progressão e sistemas de recompensa.",
      duration: "75 min",
      price: "R$ 350",
    },
  ],
};

export const mockBookings = [
  { title: "Mentoria de Game Design", date: "25 Mai 2026", time: "19:00", status: "Confirmado" },
  { title: "Revisão de TCC", date: "27 Mai 2026", time: "14:30", status: "Confirmado" },
  { title: "Conversação em Inglês", date: "30 Mai 2026", time: "09:00", status: "Confirmado" },
];

export const mockConversations = [
  { name: "Ana Souza", preview: "Podemos ajustar o horário da sessão?" },
  { name: "Rafael Lima", preview: "Enviei os materiais para revisão." },
  { name: "Carla Mendes", preview: "Obrigado pela mentoria de ontem!" },
];

export const mockNotifications = [
  "Reserva confirmada",
  "Pagamento confirmado",
  "Seu Peek começa em breve",
  "Nova mensagem recebida",
];
