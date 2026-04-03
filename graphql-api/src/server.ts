import {
  createInlineSigningKeyProvider,
  extractFromCookie,
  extractFromHeader,
  useJWT,
} from '@graphql-yoga/plugin-jwt';
import { useCookies } from '@whatwg-node/server-plugin-cookies';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchema } from '@graphql-tools/load';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createYoga } from 'graphql-yoga';
import { Hono } from 'hono';
import { logger } from 'hono/logger';

import resolvers from './resolvers';
import type { ContextWithServices } from './types';
import { RecipesServicePostgreSQL } from './services/recipes/recipes-service-postgresql';

const PORT = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 4001;
const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'auth_token';

const DEV_JWT_SECRET = 'dev-insecure-secret-change-me';
function getJwtSecret(): string {
  const secret = process.env.AUTH_JWT_SECRET || DEV_JWT_SECRET;
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.AUTH_JWT_SECRET || process.env.AUTH_JWT_SECRET === DEV_JWT_SECRET) {
      console.error('AUTH_JWT_SECRET must be set to a secure value in production (e.g. from a secret manager).');
      process.exit(1);
    }
  }
  return secret;
}
const JWT_SECRET = getJwtSecret();

export async function startServer() {
  const typeDefs = await loadSchema('src/schema.graphql', {
    loaders: [new GraphQLFileLoader()],
  });

  const app = new Hono();
  app.use(logger());

  const yoga = createYoga({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
    plugins: [
      useCookies(),
      useJWT({
        signingKeyProviders: [createInlineSigningKeyProvider(JWT_SECRET)],
        tokenLookupLocations: [
          extractFromHeader({ name: 'authorization', prefix: 'Bearer' }),
          extractFromCookie({ name: AUTH_COOKIE_NAME }),
        ],
        reject: {
          missingToken: false,
          invalidToken: false,
        },
        extendContext: true,
      }),
    ],
    context: async (initialContext): Promise<ContextWithServices> => ({
      ...initialContext,
      services: {
        recipes: new RecipesServicePostgreSQL(),
      },
    }),
  });

  app.all('/health', async (ctx) => {
    return ctx.json({ status: 'ok', uptime: process.uptime() }, 200);
  });

  app.get('/graphql', async (ctx) => yoga.fetch(ctx.req.raw));
  app.post('/graphql', async (ctx) => yoga.fetch(ctx.req.raw));

  return {
    port: PORT,
    fetch: app.fetch,
  };
}
