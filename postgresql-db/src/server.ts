import { OpenAPIHono } from '@hono/zod-openapi';
import type { Context } from 'hono';
import { verify } from 'hono/jwt';
import {
    createRecipe,
    createUser,
    deleteRecipe,
    favoriteRecipe,
    getPublishedRecipesWithFilters,
    getRecipeById,
    getRecipesByAuthor,
    getSavedRecipesForUser,
    getUserByUsername,
    type RecipesFilter,
    unfavoriteRecipe,
    updateRecipe,
} from './actions';
import {
    recipesCreateRoute,
    recipesDeleteRoute,
    recipesFavoriteDeleteRoute,
    recipesFavoritePostRoute,
    recipesGetByIdRoute,
    recipesMineRoute,
    recipesPatchRoute,
    recipesPublishedRoute,
    recipesSavedRoute,
} from './openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
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
import { serializeRecipeRow } from './recipe-json';

const PORT = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 4002;

type Variables = JwtVariables;

interface AuthInputs {
    username: string;
    password: string;
}

async function getUserIdFromContext(ctx: Context): Promise<string | null> {
    const token = getTokenFromRequest(getCookie(ctx, AUTH_COOKIE_NAME), ctx.req.header('Authorization'));
    if (!token) return null;
    try {
        const payload = await verify(token, getSecret(), 'HS256');
        return typeof payload.sub === 'string' ? payload.sub : null;
    } catch {
        return null;
    }
}

export function startServer() {
    const app = new OpenAPIHono<{ Variables: Variables }>();
    app.use('*', logger());

    app.all('/health', async (ctx) => {
        return ctx.json({ status: 'ok', uptime: process.uptime() }, 200);
    });

    app.openapi(recipesPublishedRoute, async (ctx) => {
        const body = ctx.req.valid('json') as RecipesFilter;
        const list = await getPublishedRecipesWithFilters(body ?? {});
        return ctx.json(list.map(serializeRecipeRow), 200);
    });

    app.openapi(recipesMineRoute, async (ctx) => {
        const userId = await getUserIdFromContext(ctx);
        if (!userId) return ctx.json({ error: 'UNAUTHENTICATED' }, 401);
        ctx.req.valid('json');
        const list = await getRecipesByAuthor(userId);
        return ctx.json(list.map(serializeRecipeRow), 200);
    });

    app.openapi(recipesSavedRoute, async (ctx) => {
        const userId = await getUserIdFromContext(ctx);
        if (!userId) return ctx.json({ error: 'UNAUTHENTICATED' }, 401);
        ctx.req.valid('json');
        const list = await getSavedRecipesForUser(userId);
        return ctx.json(list.map(serializeRecipeRow), 200);
    });

    app.openapi(recipesCreateRoute, async (ctx) => {
        const userId = await getUserIdFromContext(ctx);
        if (!userId) return ctx.json({ error: 'UNAUTHENTICATED' }, 401);
        const body = ctx.req.valid('json');
        const created = await createRecipe({
            authorId: userId,
            name: body.name,
            prepTimeMinutes: body.prepTimeMinutes,
            cookTimeMinutes: body.cookTimeMinutes,
            ingredients: body.ingredients,
            directions: body.directions,
            published: body.published,
        });
        if (!created) return ctx.json({ error: 'CREATE_FAILED' }, 400);
        const full = await getRecipeById(created.id, userId);
        if (!full) return ctx.json({ error: 'CREATE_FAILED' }, 400);
        return ctx.json(serializeRecipeRow(full), 201);
    });

    app.openapi(recipesGetByIdRoute, async (ctx) => {
        const { id } = ctx.req.valid('param');
        const token = getTokenFromRequest(getCookie(ctx, AUTH_COOKIE_NAME), ctx.req.header('Authorization'));
        const auth = await getAuthFromToken(token);
        const recipe = await getRecipeById(id, auth?.userId ?? null);
        if (!recipe) return ctx.json({ error: 'NOT_FOUND' }, 404);
        return ctx.json(serializeRecipeRow(recipe), 200);
    });

    app.openapi(recipesPatchRoute, async (ctx) => {
        const userId = await getUserIdFromContext(ctx);
        if (!userId) return ctx.json({ error: 'UNAUTHENTICATED' }, 401);
        const { id } = ctx.req.valid('param');
        const body = ctx.req.valid('json');
        const updated = await updateRecipe(id, userId, body);
        if (!updated) return ctx.json({ error: 'NOT_FOUND' }, 404);
        const full = await getRecipeById(id, userId);
        if (!full) return ctx.json({ error: 'NOT_FOUND' }, 404);
        return ctx.json(serializeRecipeRow(full), 200);
    });

    app.openapi(recipesDeleteRoute, async (ctx) => {
        const userId = await getUserIdFromContext(ctx);
        if (!userId) return ctx.json({ error: 'UNAUTHENTICATED' }, 401);
        const { id } = ctx.req.valid('param');
        const ok = await deleteRecipe(id, userId);
        if (!ok) return ctx.json({ error: 'NOT_FOUND' }, 404);
        return ctx.json({ ok: true as const }, 200);
    });

    app.openapi(recipesFavoritePostRoute, async (ctx) => {
        const userId = await getUserIdFromContext(ctx);
        if (!userId) return ctx.json({ error: 'UNAUTHENTICATED' }, 401);
        const { id } = ctx.req.valid('param');
        const result = await favoriteRecipe(userId, id);
        if (result === 'not_found') return ctx.json({ error: 'NOT_FOUND' }, 404);
        if (result === 'not_published') return ctx.json({ error: 'NOT_PUBLISHED' }, 400);
        if (result === 'already_saved') return ctx.json({ error: 'ALREADY_SAVED' }, 409);
        return ctx.json({ ok: true as const }, 200);
    });

    app.openapi(recipesFavoriteDeleteRoute, async (ctx) => {
        const userId = await getUserIdFromContext(ctx);
        if (!userId) return ctx.json({ error: 'UNAUTHENTICATED' }, 401);
        const { id } = ctx.req.valid('param');
        const ok = await unfavoriteRecipe(userId, id);
        if (!ok) return ctx.json({ error: 'NOT_FOUND' }, 404);
        return ctx.json({ ok: true as const }, 200);
    });

    app.doc('/openapi/doc', {
        openapi: '3.0.0',
        info: {
            title: 'Recipe Website API',
            description: 'REST API for the recipe website (PostgreSQL access layer). Protected routes expect Authorization: Bearer <JWT>.',
            version: '1.0.0',
        },
    });

    app.get('/openapi/ui', swaggerUI({ url: '/openapi/doc', tryItOutEnabled: true }));

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

    return {
        port: PORT,
        fetch: app.fetch,
    };
}
