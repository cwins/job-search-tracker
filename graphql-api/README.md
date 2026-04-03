# graphql-api

GraphQL Yoga server for the recipe website. Resolvers call the **postgresql-db** REST API (`RECIPES_API_ENDPOINT`).

```bash
bun install
bun run dev
bun run graphql:types   # regenerate src/generated/types.ts from src/schema.graphql
```

This project was created using `bun init` in bun v1.3.8. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
