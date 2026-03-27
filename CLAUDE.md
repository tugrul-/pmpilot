# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```

No test suite is configured.

## Architecture

PMPilot is a project management SaaS built with Next.js App Router + Supabase. It is in MVP phase with tiered billing (Free/Pro/Business/Custom) but no payment integration yet.

### Data flow pattern

- **Server components** fetch data directly via the Supabase server client (`lib/supabase/server.ts`) — no API routes for reads.
- **Mutations** use Next.js Server Actions defined inline in page files.
- **Client components** (auth forms, logout button) use the browser Supabase client (`lib/supabase/client.ts`).

### Auth

- Email/password via Supabase Auth; email verification required.
- OAuth callback at `/auth/callback/route.ts` — exchanges code for session and calls `ensureProfileForUser` to create a `profiles` row on first login.
- Server components redirect to `/login` manually (no middleware).

### Database tables

| Table | Key columns |
|-------|-------------|
| `profiles` | `user_id`, `plan` (free/pro/business), `project_limit` |
| `projects` | `id`, `owner_id`, `name`, `status` (planned/in_progress/done) |
| `documents` | `id`, `project_id`, `owner_id`, `document_type`, `storage_path`, `mime_type`, `size` |

Files are stored in Supabase Storage; `getSignedUrl` in `lib/documents/queries.ts` generates temporary download URLs.

### Plan enforcement

`profiles.project_limit` is checked in the dashboard server action before creating a project. The billing page at `/billing` shows plan tiers but upgrade buttons are not yet wired to a payment provider.

### Styling

Tailwind CSS 4 (no config file — uses defaults via PostCSS). Global custom classes are in `app/globals.css`: `.btn-primary`, `.btn-secondary`, card/hero/dashboard layout classes. Color palette: background `#f7f9fc`, accent `#4f46e5`, text `#111827`.

### AI Analysis

The "AI Analyze" buttons on the project detail page (`/dashboard/projects/[id]`) are UI-only — the feature is not yet implemented.
