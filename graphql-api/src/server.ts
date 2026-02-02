import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchema } from '@graphql-tools/load';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createYoga } from 'graphql-yoga';
import { Hono } from 'hono';

import resolvers from './resolvers';

export async function startServer() {
    const typeDefs = await loadSchema('src/schema.graphql', {
        loaders: [new GraphQLFileLoader()],
    });

    const app = new Hono();
    const yoga = createYoga({
        schema: makeExecutableSchema({
            typeDefs,
            resolvers
        }),
    });

    app.get('/graphql', async (ctx) => yoga.fetch(ctx.req.raw));
    app.post('/graphql', async (ctx) => yoga.fetch(ctx.req.raw));

    return {
        port: 4000,
        fetch: app.fetch
    }
};
