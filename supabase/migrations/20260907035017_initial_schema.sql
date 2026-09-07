-- Peekr - 001_initial_schema.sql
-- Fundação do MVP: perfis, ofertas de Peek, agenda, reservas e integração de calendário.
-- Projetado para PostgreSQL/Supabase.

begin;

-- ============================================================
-- 1. EXTENSÕES E TIPOS
-- ============================================================

-- Necessária para a constraint que impede dois agendamentos
-- sobrepostos para o mesmo especialista.
create extension if not exists btree_gist;

create type public.calendar_provider as enum ('google', 'microsoft');
create type public.calendar_connection_status as enum ('connected', 'disconnected', 'error');
create type public.booking_status as enum ('pending', 'confirmed', 'cancelled', 'completed', 'no_show', 'failed');
create type public.calendar_sync_status as enum ('pending', 'synced', 'error');
create type public.availability_exception_kind as enum ('blocked', 'available');

-- Schema separado para segredos de integrações.
-- Ele NÃO deve ser exposto diretamente ao navegador.
create schema if not exists private;
revoke all on schema private from public;
revoke all on schema private from anon;
revoke all on schema private from authenticated;

-- ============================================================
-- 2. FUNÇÃO AUXILIAR PARA updated_at
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public;

-- ============================================================
-- 3. PERFIS
-- ============================================================

-- auth.users continua sendo a fonte de verdade para login/autenticação.
-- public.profiles guarda os dados do perfil exibido pelo Peekr.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  display_name text not null,
  avatar_url text,
  headline text,
  bio text,
  timezone text not null default 'UTC',
  is_public boolean not null default true,
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint profiles_username_length check (char_length(username) between 3 and 30),
  constraint profiles_username_format check (
    username ~ '^[a-z0-9]+(?:[-_][a-z0-9]+)*$'
  )
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- Uma pessoa pode usar o Peekr como cliente sem ser especialista.
-- Ter uma linha aqui significa que esse perfil oferece Peeks.
create table public.specialist_profiles (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  accepting_bookings boolean not null default false,
  offers_online_sessions boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger specialist_profiles_set_updated_at
before update on public.specialist_profiles
for each row execute function public.set_updated_at();

-- ============================================================
-- 4. ESPECIALIDADES, IDIOMAS E LINKS SOCIAIS
-- ============================================================

create table public.specialties (
  id bigint generated always as identity primary key,
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.profile_specialties (
  profile_id uuid not null references public.specialist_profiles(profile_id) on delete cascade,
  specialty_id bigint not null references public.specialties(id) on delete restrict,
  sort_order smallint not null default 0,
  primary key (profile_id, specialty_id)
);

create index profile_specialties_specialty_id_idx
  on public.profile_specialties(specialty_id);

create table public.languages (
  code text primary key,
  name text not null unique
);

-- Dados iniciais usados pelos mockups atuais.
insert into public.languages (code, name)
values
  ('pt', 'Português'),
  ('en', 'Inglês');

create table public.profile_languages (
  profile_id uuid not null references public.specialist_profiles(profile_id) on delete cascade,
  language_code text not null references public.languages(code) on delete restrict,
  primary key (profile_id, language_code)
);

create index profile_languages_language_code_idx
  on public.profile_languages(language_code);

create table public.social_links (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  platform text not null,
  handle text,
  url text not null,
  sort_order smallint not null default 0,
  created_at timestamptz not null default now()
);

create index social_links_profile_id_idx
  on public.social_links(profile_id);

-- ============================================================
-- 5. OFERTAS DE PEEK
-- ============================================================

-- Cada linha representa uma forma específica pela qual o especialista
-- pode ajudar, como "Mentoria de Game Design" ou "Revisão de Projeto".
create table public.services (
  id uuid primary key default gen_random_uuid(),
  specialist_id uuid not null references public.specialist_profiles(profile_id) on delete cascade,
  title text not null,
  description text not null,
  duration_minutes integer not null,
  price_cents integer,
  currency char(3) not null default 'BRL',
  is_active boolean not null default true,
  sort_order smallint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint services_duration_check check (duration_minutes between 10 and 480),
  constraint services_price_check check (price_cents is null or price_cents >= 0),
  constraint services_id_specialist_unique unique (id, specialist_id)
);

create index services_specialist_id_idx
  on public.services(specialist_id);

create index services_active_by_specialist_idx
  on public.services(specialist_id, is_active);

create trigger services_set_updated_at
before update on public.services
for each row execute function public.set_updated_at();

-- ============================================================
-- 6. CONEXÕES COM GOOGLE / MICROSOFT
-- ============================================================

-- Metadados não-secretos da conta conectada.
create table public.calendar_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  provider public.calendar_provider not null,
  external_account_id text not null,
  external_email text,
  calendar_id text,
  status public.calendar_connection_status not null default 'connected',
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint calendar_connections_account_unique
    unique (user_id, provider, external_account_id),
  constraint calendar_connections_id_provider_unique
    unique (id, provider)
);

create index calendar_connections_user_id_idx
  on public.calendar_connections(user_id);

create trigger calendar_connections_set_updated_at
before update on public.calendar_connections
for each row execute function public.set_updated_at();

-- Tokens OAuth ficam separados dos dados públicos.
-- Os valores devem chegar aqui JÁ CRIPTOGRAFADOS pela aplicação.
create table private.calendar_credentials (
  connection_id uuid primary key references public.calendar_connections(id) on delete cascade,
  access_token_ciphertext text,
  refresh_token_ciphertext text,
  token_expires_at timestamptz,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 7. CONFIGURAÇÃO E DISPONIBILIDADE
-- ============================================================

create table public.scheduling_settings (
  specialist_id uuid primary key references public.specialist_profiles(profile_id) on delete cascade,
  timezone text not null default 'UTC',
  min_notice_minutes integer not null default 120,
  booking_window_days integer not null default 60,
  slot_interval_minutes integer not null default 15,
  buffer_before_minutes integer not null default 0,
  buffer_after_minutes integer not null default 0,
  default_calendar_connection_id uuid references public.calendar_connections(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint scheduling_min_notice_check check (min_notice_minutes >= 0),
  constraint scheduling_window_check check (booking_window_days between 1 and 365),
  constraint scheduling_slot_interval_check check (slot_interval_minutes between 5 and 120),
  constraint scheduling_buffers_check check (
    buffer_before_minutes >= 0 and buffer_after_minutes >= 0
  )
);

create index scheduling_settings_calendar_connection_idx
  on public.scheduling_settings(default_calendar_connection_id);

create trigger scheduling_settings_set_updated_at
before update on public.scheduling_settings
for each row execute function public.set_updated_at();

-- Regras semanais recorrentes. weekday: 0=domingo ... 6=sábado.
create table public.availability_rules (
  id uuid primary key default gen_random_uuid(),
  specialist_id uuid not null references public.specialist_profiles(profile_id) on delete cascade,
  weekday smallint not null,
  start_time time not null,
  end_time time not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint availability_weekday_check check (weekday between 0 and 6),
  constraint availability_time_check check (start_time < end_time),
  constraint availability_rule_unique
    unique (specialist_id, weekday, start_time, end_time)
);

create index availability_rules_specialist_weekday_idx
  on public.availability_rules(specialist_id, weekday);

create trigger availability_rules_set_updated_at
before update on public.availability_rules
for each row execute function public.set_updated_at();

-- Exceções pontuais: bloquear férias/compromissos ou liberar um horário extra.
-- starts_at e ends_at são timestamptz para evitar ambiguidade de fuso horário.
create table public.availability_exceptions (
  id uuid primary key default gen_random_uuid(),
  specialist_id uuid not null references public.specialist_profiles(profile_id) on delete cascade,
  kind public.availability_exception_kind not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  note text,
  created_at timestamptz not null default now(),

  constraint availability_exception_time_check check (starts_at < ends_at)
);

create index availability_exceptions_specialist_time_idx
  on public.availability_exceptions(specialist_id, starts_at, ends_at);

-- ============================================================
-- 8. RESERVAS / PEEKS AGENDADOS
-- ============================================================

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete restrict,
  specialist_id uuid not null references public.specialist_profiles(profile_id) on delete restrict,
  customer_id uuid not null references public.profiles(id) on delete restrict,

  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status public.booking_status not null default 'pending',

  -- "Snapshots": preservam como a reserva era no momento em que foi criada,
  -- mesmo se o perfil ou o serviço forem editados depois.
  service_title_snapshot text not null,
  price_cents_snapshot integer,
  currency_snapshot char(3) not null default 'BRL',
  customer_name_snapshot text not null,
  customer_email_snapshot text not null,

  customer_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  confirmed_at timestamptz,
  cancelled_at timestamptz,
  completed_at timestamptz,

  constraint bookings_time_check check (starts_at < ends_at),
  constraint bookings_price_check check (price_cents_snapshot is null or price_cents_snapshot >= 0),
  constraint bookings_different_people_check check (specialist_id <> customer_id),
  constraint bookings_service_specialist_fk
    foreign key (service_id, specialist_id)
    references public.services(id, specialist_id)
    on delete restrict,
  constraint bookings_id_specialist_customer_unique
    unique (id, specialist_id, customer_id)
);

create index bookings_specialist_start_idx
  on public.bookings(specialist_id, starts_at);

create index bookings_customer_start_idx
  on public.bookings(customer_id, starts_at);

create index bookings_status_idx
  on public.bookings(status);

-- A regra mais importante contra double booking.
-- [) significa: inclui o início e exclui o final.
-- Assim, 14:00-15:00 e 15:00-16:00 podem coexistir.
alter table public.bookings
  add constraint bookings_no_overlapping_active_times
  exclude using gist (
    specialist_id with =,
    tstzrange(starts_at, ends_at, '[)') with &&
  )
  where (status in ('pending', 'confirmed'));

create trigger bookings_set_updated_at
before update on public.bookings
for each row execute function public.set_updated_at();

-- ============================================================
-- 9. EVENTOS EXTERNOS / MEET / TEAMS
-- ============================================================

create table public.external_calendar_events (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  calendar_connection_id uuid not null references public.calendar_connections(id) on delete restrict,
  provider public.calendar_provider not null,
  external_event_id text not null,
  join_url text,
  external_event_url text,
  sync_status public.calendar_sync_status not null default 'pending',
  last_sync_error text,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint external_calendar_event_unique
    unique (provider, external_event_id),
  constraint external_calendar_booking_connection_unique
    unique (booking_id, calendar_connection_id),
  constraint external_calendar_provider_matches_connection_fk
    foreign key (calendar_connection_id, provider)
    references public.calendar_connections(id, provider)
    on delete restrict
);

create index external_calendar_events_booking_id_idx
  on public.external_calendar_events(booking_id);

create index external_calendar_events_connection_id_idx
  on public.external_calendar_events(calendar_connection_id);

create trigger external_calendar_events_set_updated_at
before update on public.external_calendar_events
for each row execute function public.set_updated_at();

-- ============================================================
-- 10. AVALIAÇÕES
-- ============================================================

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references public.bookings(id) on delete cascade,
  reviewer_id uuid not null references public.profiles(id) on delete restrict,
  specialist_id uuid not null references public.specialist_profiles(profile_id) on delete restrict,
  rating smallint not null,
  comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint reviews_rating_check check (rating between 1 and 5),
  constraint reviews_different_people_check check (reviewer_id <> specialist_id),
  constraint reviews_match_booking_fk
    foreign key (booking_id, specialist_id, reviewer_id)
    references public.bookings(id, specialist_id, customer_id)
    on delete cascade
);

create index reviews_specialist_created_idx
  on public.reviews(specialist_id, created_at desc);

create trigger reviews_set_updated_at
before update on public.reviews
for each row execute function public.set_updated_at();

-- ============================================================
-- ============================================================
-- 11. SEGURANÇA INICIAL
-- ============================================================
-- Nesta primeira migration, ativamos RLS em todas as tabelas públicas,
-- mas ainda NÃO criamos policies de acesso direto pelo navegador.
-- Isso significa que, por padrão, anon/authenticated não conseguem ler
-- nem alterar esses dados diretamente via API do Supabase.
--
-- A ideia inicial do Peekr será:
-- navegador -> backend Next.js -> banco
--
-- As policies específicas podem entrar depois em uma migration separada,
-- quando decidirmos exatamente quais leituras serão feitas diretamente
-- pelo cliente e quais continuarão passando pelo backend.

alter table public.profiles enable row level security;
alter table public.specialist_profiles enable row level security;
alter table public.specialties enable row level security;
alter table public.profile_specialties enable row level security;
alter table public.languages enable row level security;
alter table public.profile_languages enable row level security;
alter table public.social_links enable row level security;
alter table public.services enable row level security;
alter table public.calendar_connections enable row level security;
alter table public.scheduling_settings enable row level security;
alter table public.availability_rules enable row level security;
alter table public.availability_exceptions enable row level security;
alter table public.bookings enable row level security;
alter table public.external_calendar_events enable row level security;
alter table public.reviews enable row level security;

commit;
