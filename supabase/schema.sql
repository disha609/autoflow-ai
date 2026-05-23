-- AutoFlow AI database schema
-- Run in Supabase SQL Editor before launching the app.

create extension if not exists pgcrypto;

create table if not exists public.workflow_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  workflow_type text not null check (workflow_type in ('summarize', 'actions', 'email', 'json')),
  input_name text,
  input_text text not null,
  input_char_count integer not null check (input_char_count >= 0 and input_char_count <= 50000),
  output_text text not null,
  created_at timestamptz not null default now()
);

create index if not exists workflow_runs_user_created_idx
  on public.workflow_runs (user_id, created_at desc);

alter table public.workflow_runs enable row level security;

drop policy if exists "Users can view their own runs" on public.workflow_runs;
create policy "Users can view their own runs"
  on public.workflow_runs for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own runs" on public.workflow_runs;
create policy "Users can create their own runs"
  on public.workflow_runs for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own runs" on public.workflow_runs;
create policy "Users can delete their own runs"
  on public.workflow_runs for delete
  to authenticated
  using ((select auth.uid()) = user_id);
