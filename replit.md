# TradeVerge Investment Platform

TradeVerge is a calm, private-wealth investment platform with public discovery, investor workspaces, and operations tooling.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm --filter @workspace/tradeverge run dev` — run the web app
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `supabase-schema.sql` — starter tables for the connected Supabase project

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5 with Supabase access through the Replit connector proxy
- DB: Supabase PostgreSQL (schema starter in `supabase-schema.sql`)
- Auth: Replit-managed Clerk with Google OAuth/email verification and role-based investor/admin access
- Translation: 10-locale built-in dictionary plus optional Google Cloud Translation endpoint
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/tradeverge/src/` — responsive public, investor, auth, and admin surfaces
- `artifacts/api-server/src/routes/platform.ts` — platform API routes and server-authoritative transitions
- `artifacts/api-server/src/lib/platform-data.ts` — deterministic preview fixtures
- `artifacts/api-server/src/lib/supabase.ts` — Supabase connector adapter
- `lib/api-spec/openapi.yaml` — API contract source of truth
- `supabase-schema.sql` — external Supabase starter schema

## Architecture decisions

- Financial UI is display-only: money-moving actions are represented as pending/review states until a server-side verification path exists.
- Manual bank and crypto payment methods are admin-owned, versioned records; customer-facing instructions are never hard-coded as financial truth.
- Supabase is accessed server-side through the managed connector proxy; local fixtures keep the preview navigable until the external schema is applied.
- One Clerk session serves both customers and operators; `publicMetadata.role` controls the investor/admin workspace and server-side admin middleware.
- Campaigns, support, and audit surfaces remain separate from ledger-changing behavior.

## Product

The platform includes public investment education and plan discovery, investor dashboard/portfolio/transactions/documents/support flows, and an operations console for KYC, plans, deposits, payment-method configuration, reporting, promotions, and audit activity.

## User preferences

- Premium deep-emerald/champagne visual language with restrained, accessible motion.
- Support up to ten locales with translations applied across all public, investor, and admin surfaces.

## Gotchas

- Regenerate API client/Zod output after changing `lib/api-spec/openapi.yaml`.
- Apply `supabase-schema.sql` in the external Supabase project before expecting live persistence; preview fixtures are not financial truth.
- Add `GOOGLE_TRANSLATE_API_KEY` through workspace secrets to enable dynamic translation at `POST /api/translate`; never put the key in browser code.
- Enable Google as a sign-in provider in the Clerk Auth pane and assign `publicMetadata.role=admin` only to operator accounts.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
