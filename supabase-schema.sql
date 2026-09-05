-- TradeVerge external Supabase schema starter.
-- Run this in the Supabase SQL editor before enabling live persistence.
create extension if not exists pgcrypto;

create table if not exists public.investment_plans (
  id text primary key,
  name text not null,
  category text not null,
  risk text not null,
  duration text not null,
  minimum numeric not null,
  target_return text,
  fee text not null,
  liquidity text not null,
  status text not null default 'Draft',
  description text not null,
  color text not null default 'sage',
  created_at timestamptz not null default now()
);

create table if not exists public.payment_methods (
  id text primary key,
  type text not null,
  name text not null,
  asset text not null,
  network text not null,
  destination text not null,
  status text not null default 'Draft',
  version integer not null default 1,
  updated_at timestamptz not null default now(),
  instructions text,
  min_amount numeric
);

create table if not exists public.deposits (
  id text primary key,
  customer text not null,
  amount numeric not null,
  asset text not null,
  network text not null,
  reference text not null,
  status text not null default 'Pending review',
  submitted_at timestamptz not null default now(),
  method text
);

create table if not exists public.audit_logs (
  id text primary key,
  action text not null,
  actor text not null,
  timestamp timestamptz not null default now(),
  outcome text not null
);

alter table public.investment_plans enable row level security;
alter table public.payment_methods enable row level security;
alter table public.deposits enable row level security;
alter table public.audit_logs enable row level security;