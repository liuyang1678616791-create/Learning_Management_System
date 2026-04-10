# Learning Management System Design

## Goal

Build a deployable personal learning management system for coursework submission.
The first priority is successful deployment and a complete, demoable feature set.

## Confirmed Scope

- Public single-user demo application
- No authentication
- Core task CRUD backed by Supabase
- Monorepo structure using pnpm workspaces and Turborepo
- Primary app built with Next.js 15, React 19, Tailwind CSS 4, and shadcn/ui
- Secondary Vite app included in the monorepo to satisfy the required stack
- GitHub repository and hosted website as deliverables

## Recommended Architecture

### Repository layout

- `apps/web`: main product surface, deployed to Vercel
- `apps/playground`: lightweight Vite + React app that documents or demonstrates the workspace setup
- `packages/ui`: shared UI helpers or small reusable components
- `packages/typescript-config`: shared TypeScript configuration
- `packages/eslint-config`: shared lint configuration

### Runtime model

- Next.js server components fetch task data from Supabase
- Server actions handle create, update, delete, and status toggle flows
- Supabase stores the canonical task data in a single `tasks` table
- The web app remains usable as a simple public demo without user accounts

## Product Design

### Pages

#### Home page

- Show task list with clear progress-oriented layout
- Include summary cards for total, completed, in progress, and pending tasks
- Support creating a task from the main screen
- Offer simple filtering by status

#### Task detail and edit page

- Show full task information
- Allow editing title, description, status, priority, and due date
- Allow deleting the task

### Data model

Single `tasks` table:

- `id`: UUID primary key
- `title`: text, required
- `description`: text, optional
- `status`: text enum-like value such as `pending`, `in_progress`, `completed`
- `priority`: text enum-like value such as `low`, `medium`, `high`
- `due_date`: date, optional
- `created_at`: timestamp with time zone
- `updated_at`: timestamp with time zone

## Error Handling

- Validate required inputs on the server
- Show empty-state UI when there are no tasks
- Show basic inline failure states for create and update actions
- Keep database access isolated behind a small data layer for easier debugging

## Testing and Verification

- Lint the monorepo
- Build both the Next.js app and the Vite app
- Verify the web app can run with Supabase environment variables
- Add a GitHub Actions workflow that installs dependencies and runs lint/build on push

## Deployment Plan

- Deploy `apps/web` to Vercel
- Configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel
- Commit repository changes to GitHub
- GitHub Actions provides CI validation before or alongside deployment

## Missing Inputs or External Setup

The implementation can proceed now, but final production success still depends on:

- a Supabase project with the `tasks` table created
- the same environment variables being added to Vercel and local `.env`
- GitHub push access for the repository
- Vercel project settings pointing at `apps/web`

## Scope Guardrails

- No auth, roles, or multi-user behavior in this first version
- No file uploads, notifications, or analytics
- No mobile app
- No extra dashboard modules beyond what supports task management and coursework presentation
