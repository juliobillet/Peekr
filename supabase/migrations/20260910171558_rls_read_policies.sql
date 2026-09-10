-- Peekr - RLS baseline de leitura
-- Objetivo desta migration:
-- 1) retirar privilégios excessivos padrão de anon/authenticated;
-- 2) liberar somente as leituras públicas necessárias;
-- 3) permitir que usuários autenticados leiam apenas seus próprios dados privados;
-- 4) manter INSERT/UPDATE/DELETE bloqueados por enquanto.

begin;

-- ============================================================
-- 1. PRINCÍPIO DE MENOR PRIVILÉGIO
-- ============================================================
-- Removemos os privilégios automáticos de anon/authenticated e depois
-- devolvemos apenas SELECT onde já sabemos que ele é necessário.

revoke all on table public.profiles from anon, authenticated;
revoke all on table public.specialist_profiles from anon, authenticated;
revoke all on table public.specialties from anon, authenticated;
revoke all on table public.profile_specialties from anon, authenticated;
revoke all on table public.languages from anon, authenticated;
revoke all on table public.profile_languages from anon, authenticated;
revoke all on table public.social_links from anon, authenticated;
revoke all on table public.services from anon, authenticated;
revoke all on table public.calendar_connections from anon, authenticated;
revoke all on table public.scheduling_settings from anon, authenticated;
revoke all on table public.availability_rules from anon, authenticated;
revoke all on table public.availability_exceptions from anon, authenticated;
revoke all on table public.bookings from anon, authenticated;
revoke all on table public.external_calendar_events from anon, authenticated;
revoke all on table public.reviews from anon, authenticated;

-- Dados públicos que alimentam páginas de perfil e catálogos.
grant select on table public.profiles to anon, authenticated;
grant select on table public.specialist_profiles to anon, authenticated;
grant select on table public.specialties to anon, authenticated;
grant select on table public.profile_specialties to anon, authenticated;
grant select on table public.languages to anon, authenticated;
grant select on table public.profile_languages to anon, authenticated;
grant select on table public.social_links to anon, authenticated;
grant select on table public.services to anon, authenticated;
grant select on table public.reviews to anon, authenticated;

-- Dados privados: apenas usuários autenticados podem sequer tentar SELECT.
-- As policies abaixo ainda limitam quais linhas cada usuário enxerga.
grant select on table public.calendar_connections to authenticated;
grant select on table public.scheduling_settings to authenticated;
grant select on table public.availability_rules to authenticated;
grant select on table public.availability_exceptions to authenticated;
grant select on table public.bookings to authenticated;
grant select on table public.external_calendar_events to authenticated;

-- ============================================================
-- 2. PERFIS PÚBLICOS
-- ============================================================

create policy "profiles_public_or_owner_read"
on public.profiles
for select
to anon, authenticated
using (
  is_public
  or id = (select auth.uid())
);

create policy "specialist_profiles_public_or_owner_read"
on public.specialist_profiles
for select
to anon, authenticated
using (
  profile_id = (select auth.uid())
  or exists (
    select 1
    from public.profiles p
    where p.id = specialist_profiles.profile_id
      and p.is_public
  )
);

-- ============================================================
-- 3. CATÁLOGOS PÚBLICOS
-- ============================================================

create policy "specialties_public_read"
on public.specialties
for select
to anon, authenticated
using (true);

create policy "languages_public_read"
on public.languages
for select
to anon, authenticated
using (true);

-- ============================================================
-- 4. DADOS EXIBIDOS NOS PERFIS
-- ============================================================

create policy "profile_specialties_public_or_owner_read"
on public.profile_specialties
for select
to anon, authenticated
using (
  profile_id = (select auth.uid())
  or exists (
    select 1
    from public.profiles p
    where p.id = profile_specialties.profile_id
      and p.is_public
  )
);

create policy "profile_languages_public_or_owner_read"
on public.profile_languages
for select
to anon, authenticated
using (
  profile_id = (select auth.uid())
  or exists (
    select 1
    from public.profiles p
    where p.id = profile_languages.profile_id
      and p.is_public
  )
);

create policy "social_links_public_or_owner_read"
on public.social_links
for select
to anon, authenticated
using (
  profile_id = (select auth.uid())
  or exists (
    select 1
    from public.profiles p
    where p.id = social_links.profile_id
      and p.is_public
  )
);

create policy "services_active_public_or_owner_read"
on public.services
for select
to anon, authenticated
using (
  specialist_id = (select auth.uid())
  or (
    is_active
    and exists (
      select 1
      from public.profiles p
      where p.id = services.specialist_id
        and p.is_public
    )
  )
);

create policy "reviews_public_or_participant_read"
on public.reviews
for select
to anon, authenticated
using (
  reviewer_id = (select auth.uid())
  or specialist_id = (select auth.uid())
  or exists (
    select 1
    from public.profiles p
    where p.id = reviews.specialist_id
      and p.is_public
  )
);

-- ============================================================
-- 5. DADOS PRIVADOS DO ESPECIALISTA
-- ============================================================

create policy "calendar_connections_owner_read"
on public.calendar_connections
for select
to authenticated
using (user_id = (select auth.uid()));

create policy "scheduling_settings_owner_read"
on public.scheduling_settings
for select
to authenticated
using (specialist_id = (select auth.uid()));

create policy "availability_rules_owner_read"
on public.availability_rules
for select
to authenticated
using (specialist_id = (select auth.uid()));

create policy "availability_exceptions_owner_read"
on public.availability_exceptions
for select
to authenticated
using (specialist_id = (select auth.uid()));

-- ============================================================
-- 6. RESERVAS
-- ============================================================
-- Somente especialista e cliente envolvidos podem ler um Booking.

create policy "bookings_participants_read"
on public.bookings
for select
to authenticated
using (
  specialist_id = (select auth.uid())
  or customer_id = (select auth.uid())
);

-- O link do Meet/Teams pertence ao mesmo contexto privado do Booking.
create policy "external_calendar_events_booking_participants_read"
on public.external_calendar_events
for select
to authenticated
using (
  exists (
    select 1
    from public.bookings b
    where b.id = external_calendar_events.booking_id
      and (
        b.specialist_id = (select auth.uid())
        or b.customer_id = (select auth.uid())
      )
  )
);

-- ============================================================
-- 7. ESCRITAS CONTINUAM BLOQUEADAS
-- ============================================================
-- Não concedemos INSERT/UPDATE/DELETE a anon ou authenticated nesta
-- migration. Vamos liberar operações de escrita somente quando o fluxo de
-- autenticação e cada caso de uso (perfil, agenda, Booking etc.) estiverem
-- implementados e puderem ser validados com segurança.

commit;
