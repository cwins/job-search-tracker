// import fs from 'fs/promises';
import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { proxy } from 'hono/proxy';
import path from 'path';

const PORT = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 4000;
const GRAPHQL_API_ENDPOINT = process.env.GRAPHQL_API_ENDPOINT || 'http://localhost:4001/graphql';

const serverEntryPath =
  process.env.NODE_ENV === 'production'
    ? path.join(import.meta.dirname, '../dist/server/entry-server.js')
    : path.join(import.meta.dirname, '../src/entry-server.tsx');

const app = new Hono();

export async function startServer() {
  app.use(logger());

  app.all('/health', async (ctx) => {
    console.log('Health check requested');
    return ctx.json({ status: 'ok', uptime: process.uptime() }, 200);
  });

  app.use('/static/entry-client.js', serveStatic({ root: path.join(import.meta.dirname, '../dist/client') }));
  app.use('/static/assets/*', serveStatic({ root: path.join(import.meta.dirname, '../dist/client') }));
  app.use('/images/*', serveStatic({ root: path.join(import.meta.dirname, '../dist/client') }));
  app.use('/favicon.*', serveStatic({ root: path.join(import.meta.dirname, '../dist/client'), path: 'favicon.png' }));

  app.post('/graphql', (ctx) => {
    return proxy(GRAPHQL_API_ENDPOINT).catch((reason) => {
      console.log('Failed to fetch from GraphQL endpoint with reason:', reason);

      return ctx.json({ data: {} });
    });
  });

  app.get('*', async (ctx) => {
    const { render } = await import(/* @vite-ignore */ serverEntryPath);
    const renderResult = await render(ctx.req.raw);

    return ctx.html(renderResult);
  });

  return {
    port: PORT,
    fetch: app.fetch
  };
}

await startServer();

export default app;
