import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchema } from '@graphql-tools/load';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createYoga } from 'graphql-yoga';
import { Hono } from 'hono';

import resolvers from './resolvers';
import type { ContextWithServices } from './types';
import { JobsServicePostgreSQL } from './services/jobs/jobs-service-postgresql';

const PORT = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 4001;

export async function startServer() {
    const typeDefs = await loadSchema('src/schema.graphql', {
        loaders: [new GraphQLFileLoader()],
    });

    const context: ContextWithServices = {
        services: {
            jobs: new JobsServicePostgreSQL()
        }
    };

    const app = new Hono();
    const yoga = createYoga({
        schema: makeExecutableSchema({
            typeDefs,
            resolvers
        }),
        // add services to be used by resolvers
        context
    });

    app.all("/health", async (ctx) => {
      console.log("Health check requested");
      return ctx.json({ status: "ok", uptime: process.uptime() }, 200);
    });

    app.get('/graphql', async (ctx) => yoga.fetch(ctx.req.raw));
    app.post('/graphql', async (ctx) => yoga.fetch(ctx.req.raw));

    return {
        port: PORT,
        fetch: app.fetch
    }
};
