const booleanEnv = (value?: string) => value === "true";

const numberEnv = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const publicConfig = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME ?? "Peekr",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    env: process.env.NEXT_PUBLIC_APP_ENV ?? "development",
    mainDomain: process.env.NEXT_PUBLIC_MAIN_DOMAIN ?? "peekr.com.br",
    roomDomain: process.env.NEXT_PUBLIC_ROOM_DOMAIN ?? "peekr.tv",
  },
  features: {
    payments: booleanEnv(process.env.NEXT_PUBLIC_ENABLE_PAYMENTS),
    livekit: booleanEnv(process.env.NEXT_PUBLIC_ENABLE_LIVEKIT),
    emails: booleanEnv(process.env.NEXT_PUBLIC_ENABLE_EMAILS),
    messages: booleanEnv(process.env.NEXT_PUBLIC_ENABLE_MESSAGES ?? "true"),
    reports: booleanEnv(process.env.NEXT_PUBLIC_ENABLE_REPORTS ?? "true"),
    tempFiles: booleanEnv(process.env.NEXT_PUBLIC_ENABLE_TEMP_FILES),
    healthVertical: booleanEnv(process.env.NEXT_PUBLIC_ENABLE_HEALTH_VERTICAL),
  },
};

// Variáveis sem NEXT_PUBLIC_ são privadas e devem ser usadas apenas no server-side.
export const serverConfig = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  auth: {
    sessionSecret: process.env.SESSION_SECRET,
    adminEmails:
      process.env.ADMIN_EMAILS?.split(",")
        .map((email) => email.trim())
        .filter(Boolean) ?? [],
  },
  storage: {
    avatarsBucket: process.env.SUPABASE_AVATARS_BUCKET ?? "avatars",
    tempFilesBucket: process.env.SUPABASE_TEMP_FILES_BUCKET ?? "peek-temp-files",
  },
  livekit: {
    url: process.env.LIVEKIT_URL,
    apiKey: process.env.LIVEKIT_API_KEY,
    apiSecret: process.env.LIVEKIT_API_SECRET,
  },
  payments: {
    provider: process.env.PAYMENT_PROVIDER ?? "stripe",
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    mercadoPagoAccessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    asaasApiKey: process.env.ASAAS_API_KEY,
    pagarmeApiKey: process.env.PAGARME_API_KEY,
  },
  email: {
    provider: process.env.EMAIL_PROVIDER ?? "resend",
    resendApiKey: process.env.RESEND_API_KEY,
    from: process.env.EMAIL_FROM ?? "Peekr <noreply@peekr.com.br>",
  },
  cron: {
    secret: process.env.CRON_SECRET,
  },
  moderation: {
    maxConfirmedStrikesPerCategory: numberEnv(
      process.env.MAX_CONFIRMED_STRIKES_PER_CATEGORY,
      3,
    ),
    severeReportAutoSuspend: booleanEnv(
      process.env.SEVERE_REPORT_AUTO_SUSPEND ?? "true",
    ),
  },
};

export const config = {
  ...publicConfig,
  server: serverConfig,
};

export function assertServerEnv(keys: string[]) {
  const missing = keys.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}
