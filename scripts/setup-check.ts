import { config } from "../lib/config";

const ok = (label: string) => console.log(`✅ ${label}`);
const error = (label: string) => console.error(`❌ ${label}`);
const warn = (label: string) => console.warn(`⚠️ ${label}`);

const getVar = (key: string) => process.env[key]?.trim();

const missing: string[] = [];

function requireVar(key: string) {
  if (getVar(key)) {
    ok(`${key} configurada`);
  } else {
    error(`${key} ausente`);
    missing.push(key);
  }
}

console.log("🔎 Peekr setup check\n");

["NEXT_PUBLIC_APP_URL", "NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"].forEach(requireVar);

if (config.features.payments) {
  console.log("\n💳 Payments habilitado, validando chaves Stripe:");
  ["STRIPE_SECRET_KEY", "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", "STRIPE_WEBHOOK_SECRET"].forEach(requireVar);
}

if (config.features.livekit) {
  console.log("\n🎥 LiveKit habilitado, validando credenciais:");
  ["LIVEKIT_URL", "LIVEKIT_API_KEY", "LIVEKIT_API_SECRET"].forEach(requireVar);
}

if (config.features.emails) {
  console.log("\n📧 Emails habilitado, validando provedor:");
  ["RESEND_API_KEY", "EMAIL_FROM"].forEach(requireVar);
}

if (config.features.tempFiles) {
  console.log("\n📁 Arquivos temporários habilitado, validando bucket:");
  ["SUPABASE_TEMP_FILES_BUCKET"].forEach(requireVar);
}

if (config.features.reports && !getVar("MAX_CONFIRMED_STRIKES_PER_CATEGORY")) {
  warn("MAX_CONFIRMED_STRIKES_PER_CATEGORY não definido. Usando fallback 3.");
}

if (missing.length > 0) {
  console.error(`\nSetup incompleto. Variáveis obrigatórias ausentes: ${missing.join(", ")}`);
  process.exit(1);
}

console.log("\n✅ Setup válido. Você pode continuar.");
