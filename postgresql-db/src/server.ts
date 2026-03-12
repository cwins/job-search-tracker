import { Hono } from 'hono';
import { OpenAPIHono } from '@hono/zod-openapi';
import { createUser, getUserByUsername, getUserJobs, getUserJobsWithFilters, type JobFilters } from './actions';
import { jobsRoute } from './openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { jwt } from 'hono/jwt';
import type { JwtVariables } from 'hono/jwt';
import { logger } from 'hono/logger';
import {
  AUTH_COOKIE_NAME,
  getAuthFromToken,
  getSecret,
  getTokenFromRequest,
  hashPassword,
  signAuthToken,
  verifyPassword,
} from './auth';

const PORT = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 4002;

type Variables = JwtVariables;

interface JobsFilterInputs {
  company?: string | string[];
  location?: string | string[];
  status?: string | string[];
  title?: string | string[];
}

interface AuthInputs {
  username: string;
  password: string;
}

export function startServer() {
    const app = new Hono<{ Variables: Variables }>();
    app.use(logger());

    const openApiApp = new OpenAPIHono();

  app.all('/health', async (ctx) => {
    return ctx.json({ status: 'ok', uptime: process.uptime() }, 200);
  });

  openApiApp.openapi(jobsRoute, (ctx) => {
    ctx.req.valid('json');

    return ctx.json([], 200);
  });

  openApiApp.doc('/doc', {
    openapi: '3.0.0',
    info: {
      title: 'Job Search Tracker API',
      description: 'API documentation for the Job Search Tracker application',
      version: '1.0.0',
    },
  });

  openApiApp.get('/ui', swaggerUI({ url: '/openapi/doc', tryItOutEnabled: true }));

  app.route('/openapi', openApiApp);

  // Auth routes (no JWT required)
  app.post('/auth/signup', async (ctx) => {
    const body = await ctx.req.json<AuthInputs>().catch(() => null);
    if (!body?.username || !body?.password) return ctx.json({ error: 'Missing username or password' }, 400);

    const existing = await getUserByUsername(body.username);
    if (existing) return ctx.json({ error: 'Username already exists' }, 409);

    const passwordHash = await hashPassword(body.password);
    const user = await createUser({ username: body.username, passwordHash });
    if (!user) return ctx.json({ error: 'Failed to create user' }, 500);

    const token = await signAuthToken({ userId: user.id, username: user.username });
    setCookie(ctx, AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return ctx.json({ user: { id: user.id, username: user.username } }, 201);
  });

  app.post('/auth/login', async (ctx) => {
    const body = await ctx.req.json<AuthInputs>().catch(() => null);
    if (!body?.username || !body?.password) return ctx.json({ error: 'Missing username or password' }, 400);

    const user = await getUserByUsername(body.username);
    if (!user) return ctx.json({ error: 'Invalid username or password' }, 401);

    const ok = await verifyPassword(body.password, user.passwordHash);
    if (!ok) return ctx.json({ error: 'Invalid username or password' }, 401);

    const token = await signAuthToken({ userId: user.id, username: user.username });
    setCookie(ctx, AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return ctx.json({ user: { id: user.id, username: user.username } }, 200);
  });

  app.post('/auth/logout', async (ctx) => {
    deleteCookie(ctx, AUTH_COOKIE_NAME, { path: '/' });
    return ctx.json({ ok: true }, 200);
  });

  app.get('/auth/me', async (ctx) => {
    const token = getTokenFromRequest(getCookie(ctx, AUTH_COOKIE_NAME), ctx.req.header('Authorization'));
    const auth = await getAuthFromToken(token);
    if (!auth) return ctx.json({ user: null }, 200);
    return ctx.json({ user: { id: auth.userId, username: auth.username } }, 200);
  });

  // Protected: JWT from Authorization header (used by graphql-api). Cookie not used for /jobs.
  app.post(
    '/jobs',
    jwt({ secret: getSecret(), alg: 'HS256' }),
    async (ctx) => {
      const payload = ctx.get('jwtPayload');
      const userId = payload.sub as string;
      if (!userId) return ctx.json({ error: 'UNAUTHENTICATED' }, 401);

      const inputs = await ctx.req.json<JobsFilterInputs>().catch(() => ({} as JobsFilterInputs));
      const { title, company, location, status } = inputs;

      const filters = Object.entries({ title, company, location, status }).reduce((acc, input) => {
        const [key, value] = input;
        if (value !== undefined && value !== null) {
          return { ...acc, [key]: value };
        }
        return acc;
      }, {} as Partial<JobFilters>);

      const results =
        Object.keys(filters).length > 0
          ? await getUserJobsWithFilters(userId, filters)
          : await getUserJobs(userId);

      return ctx.json(results);
    }
  );

  return {
    port: PORT,
    fetch: app.fetch,
  };
}
