# postgresql-db

Database access service (Hono + Drizzle + OpenAPI). Defines PostgreSQL schema in `src/db-schema.ts` and exposes REST routes for recipes and auth.

## Commands

```bash
bun install
bun run dev
```

- **`bun run drizzle:push`** — apply the current Drizzle schema to Postgres (no migration history in-repo).
- **`bun run drizzle:studio`** — Drizzle Studio (default port 3000).

After major schema renames (e.g. replacing old tables), reset the database or Docker volume before `drizzle:push` if push conflicts with leftover objects.

This project was created using `bun init`. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
