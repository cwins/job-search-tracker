import { createRoute, z } from '@hono/zod-openapi';

const stringOrStringArray = z.union([z.string().min(1), z.array(z.string().min(1))]);

export const RecipesFilterSchema = z
    .object({
        name: stringOrStringArray.optional(),
        maxPrepTimeMinutes: z.number().int().nonnegative().optional(),
        maxCookTimeMinutes: z.number().int().nonnegative().optional(),
        ingredient: stringOrStringArray.optional(),
        authorUsername: stringOrStringArray.optional(),
    })
    .openapi('RecipesFilter');

export const RecipeResponseSchema = z
    .object({
        id: z.string().uuid(),
        authorId: z.string().uuid(),
        authorUsername: z.string(),
        name: z.string(),
        prepTimeMinutes: z.number().int(),
        cookTimeMinutes: z.number().int(),
        ingredients: z.array(z.string()),
        directions: z.string(),
        published: z.boolean(),
        createdAt: z.string(),
    })
    .openapi('Recipe');

export const CreateRecipeBodySchema = z
    .object({
        name: z.string().min(1),
        prepTimeMinutes: z.number().int().nonnegative(),
        cookTimeMinutes: z.number().int().nonnegative(),
        ingredients: z.array(z.string()),
        directions: z.string().min(1),
        published: z.boolean().optional(),
    })
    .openapi('CreateRecipeInput');

export const UpdateRecipeBodySchema = z
    .object({
        name: z.string().min(1).optional(),
        prepTimeMinutes: z.number().int().nonnegative().optional(),
        cookTimeMinutes: z.number().int().nonnegative().optional(),
        ingredients: z.array(z.string()).optional(),
        directions: z.string().min(1).optional(),
        published: z.boolean().optional(),
    })
    .openapi('UpdateRecipeInput');

export const ErrorSchema = z.object({ error: z.string() }).openapi('Error');

const emptyBodySchema = z.object({}).openapi('EmptyBody');

export const recipesPublishedRoute = createRoute({
    method: 'post',
    path: '/recipes/published',
    tags: ['Recipes'],
    request: {
        body: {
            content: {
                'application/json': {
                    schema: RecipesFilterSchema,
                },
            },
            required: true,
            description: 'Filters (may be an empty object for all published recipes)',
        },
    },
    responses: {
        200: {
            description: 'Published recipes',
            content: {
                'application/json': {
                    schema: z.array(RecipeResponseSchema),
                },
            },
        },
    },
    description: 'List published recipes (no authentication)',
});

export const recipesMineRoute = createRoute({
    method: 'post',
    path: '/recipes/mine',
    tags: ['Recipes'],
    request: {
        body: {
            content: {
                'application/json': {
                    schema: emptyBodySchema,
                },
            },
            required: true,
        },
    },
    responses: {
        200: {
            description: 'Your recipes',
            content: {
                'application/json': {
                    schema: z.array(RecipeResponseSchema),
                },
            },
        },
        401: {
            description: 'Missing or invalid JWT',
            content: { 'application/json': { schema: ErrorSchema } },
        },
    },
    description: 'List the authenticated user’s recipes (drafts and published). Send Authorization: Bearer <JWT>.',
});

export const recipesSavedRoute = createRoute({
    method: 'post',
    path: '/recipes/saved',
    tags: ['Recipes'],
    request: {
        body: {
            content: {
                'application/json': {
                    schema: emptyBodySchema,
                },
            },
            required: true,
        },
    },
    responses: {
        200: {
            description: 'Saved recipes',
            content: {
                'application/json': {
                    schema: z.array(RecipeResponseSchema),
                },
            },
        },
        401: {
            description: 'Missing or invalid JWT',
            content: { 'application/json': { schema: ErrorSchema } },
        },
    },
    description: 'List recipes favorited by the authenticated user',
});

export const recipesCreateRoute = createRoute({
    method: 'post',
    path: '/recipes',
    tags: ['Recipes'],
    request: {
        body: {
            content: {
                'application/json': {
                    schema: CreateRecipeBodySchema,
                },
            },
            required: true,
        },
    },
    responses: {
        201: {
            description: 'Recipe created',
            content: {
                'application/json': {
                    schema: RecipeResponseSchema,
                },
            },
        },
        400: {
            description: 'Bad request',
            content: { 'application/json': { schema: ErrorSchema } },
        },
        401: {
            description: 'Missing or invalid JWT',
            content: { 'application/json': { schema: ErrorSchema } },
        },
    },
    description: 'Create a recipe',
});

export const recipesGetByIdRoute = createRoute({
    method: 'get',
    path: '/recipes/{id}',
    tags: ['Recipes'],
    request: {
        params: z.object({
            id: z.string().uuid(),
        }),
    },
    responses: {
        200: {
            description: 'Recipe found',
            content: {
                'application/json': {
                    schema: RecipeResponseSchema,
                },
            },
        },
        404: {
            description: 'Not found or not visible',
            content: { 'application/json': { schema: ErrorSchema } },
        },
    },
    description: 'Get a recipe by id (published, or draft if you are the author)',
});

export const recipesPatchRoute = createRoute({
    method: 'patch',
    path: '/recipes/{id}',
    tags: ['Recipes'],
    request: {
        params: z.object({
            id: z.string().uuid(),
        }),
        body: {
            content: {
                'application/json': {
                    schema: UpdateRecipeBodySchema,
                },
            },
            required: true,
        },
    },
    responses: {
        200: {
            description: 'Recipe updated',
            content: {
                'application/json': {
                    schema: RecipeResponseSchema,
                },
            },
        },
        401: {
            description: 'Missing or invalid JWT',
            content: { 'application/json': { schema: ErrorSchema } },
        },
        404: {
            description: 'Recipe not found or not owned',
            content: { 'application/json': { schema: ErrorSchema } },
        },
    },
    description: 'Update own recipe',
});

export const recipesDeleteRoute = createRoute({
    method: 'delete',
    path: '/recipes/{id}',
    tags: ['Recipes'],
    request: {
        params: z.object({
            id: z.string().uuid(),
        }),
    },
    responses: {
        200: {
            description: 'Deleted',
            content: {
                'application/json': {
                    schema: z.object({ ok: z.literal(true) }),
                },
            },
        },
        401: {
            description: 'Missing or invalid JWT',
            content: { 'application/json': { schema: ErrorSchema } },
        },
        404: {
            description: 'Recipe not found or not owned',
            content: { 'application/json': { schema: ErrorSchema } },
        },
    },
    description: 'Delete own recipe',
});

export const recipesFavoritePostRoute = createRoute({
    method: 'post',
    path: '/recipes/{id}/favorite',
    tags: ['Recipes'],
    request: {
        params: z.object({
            id: z.string().uuid(),
        }),
    },
    responses: {
        200: {
            description: 'Favorited',
            content: {
                'application/json': {
                    schema: z.object({ ok: z.literal(true) }),
                },
            },
        },
        400: {
            description: 'Recipe not published',
            content: { 'application/json': { schema: ErrorSchema } },
        },
        401: {
            description: 'Missing or invalid JWT',
            content: { 'application/json': { schema: ErrorSchema } },
        },
        404: {
            description: 'Recipe not found',
            content: { 'application/json': { schema: ErrorSchema } },
        },
        409: {
            description: 'Already saved',
            content: { 'application/json': { schema: ErrorSchema } },
        },
    },
    description: 'Favorite a published recipe',
});

export const recipesFavoriteDeleteRoute = createRoute({
    method: 'delete',
    path: '/recipes/{id}/favorite',
    tags: ['Recipes'],
    request: {
        params: z.object({
            id: z.string().uuid(),
        }),
    },
    responses: {
        200: {
            description: 'Removed from saves',
            content: {
                'application/json': {
                    schema: z.object({ ok: z.literal(true) }),
                },
            },
        },
        401: {
            description: 'Missing or invalid JWT',
            content: { 'application/json': { schema: ErrorSchema } },
        },
        404: {
            description: 'Save not found',
            content: { 'application/json': { schema: ErrorSchema } },
        },
    },
    description: 'Remove favorite',
});
