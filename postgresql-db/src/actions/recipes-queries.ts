import { and, eq, ilike, lte, or, sql } from 'drizzle-orm';
import { recipeSaves, recipes, users } from '../db-schema';
import { db } from '../db-connection';
import type { RecipesFilter } from './recipes-types';

const HARD_LIMIT = 100;

type NonEmptyString<T> = T extends string ? (T extends '' ? never : T) : T;
type RequiredNonEmpty<T> = T extends undefined ? never : T;

const hasValue = (value: unknown): value is RequiredNonEmpty<NonEmptyString<unknown>> => {
    if (Array.isArray(value)) {
        return value.length > 0 && value.every((v) => hasValue(v));
    }
    if (typeof value === 'string') {
        return value.trim() !== '';
    }
    if (typeof value === 'number') {
        return !Number.isNaN(value);
    }
    return value !== undefined && value !== null;
};

export type RecipeRowWithAuthor = {
    id: string;
    authorId: string;
    name: string;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    ingredients: string[];
    directions: string;
    published: boolean;
    createdAt: Date;
    authorUsername: string;
};

function mapRecipeWithAuthor(row: {
    recipes: typeof recipes.$inferSelect;
    users: { username: string };
}): RecipeRowWithAuthor {
    const r = row.recipes;
    return {
        id: r.id,
        authorId: r.authorId,
        name: r.name,
        prepTimeMinutes: r.prepTimeMinutes,
        cookTimeMinutes: r.cookTimeMinutes,
        ingredients: r.ingredients,
        directions: r.directions,
        published: r.published,
        createdAt: r.createdAt,
        authorUsername: row.users.username,
    };
}

export async function getPublishedRecipesWithFilters(filters: RecipesFilter): Promise<RecipeRowWithAuthor[]> {
    const queryFilters = [eq(recipes.published, true)];

    if (hasValue(filters.name)) {
        const name = filters.name;
        if (Array.isArray(name)) {
            queryFilters.push(or(...name.map((entry) => ilike(recipes.name, `%${entry}%`)))!);
        } else {
            queryFilters.push(ilike(recipes.name, `%${name}%`));
        }
    }

    if (hasValue(filters.maxPrepTimeMinutes)) {
        queryFilters.push(lte(recipes.prepTimeMinutes, filters.maxPrepTimeMinutes!));
    }

    if (hasValue(filters.maxCookTimeMinutes)) {
        queryFilters.push(lte(recipes.cookTimeMinutes, filters.maxCookTimeMinutes!));
    }

    if (hasValue(filters.ingredient)) {
        const parts = Array.isArray(filters.ingredient) ? filters.ingredient : [filters.ingredient];
        const ingredientOrs = parts.map((ing) => sql`${recipes.ingredients}::text ILIKE ${'%' + ing + '%'}`);
        queryFilters.push(or(...ingredientOrs)!);
    }

    if (hasValue(filters.authorUsername)) {
        const au = filters.authorUsername;
        if (Array.isArray(au)) {
            queryFilters.push(or(...au.map((entry) => ilike(users.username, `%${entry}%`)))!);
        } else {
            queryFilters.push(ilike(users.username, `%${au}%`));
        }
    }

    const rows = await db
        .select()
        .from(recipes)
        .innerJoin(users, eq(recipes.authorId, users.id))
        .where(and(...queryFilters))
        .limit(HARD_LIMIT);

    return rows.map(mapRecipeWithAuthor);
}

export async function getRecipeById(
    recipeId: string,
    viewerUserId: string | null
): Promise<RecipeRowWithAuthor | null> {
    const rows = await db
        .select()
        .from(recipes)
        .innerJoin(users, eq(recipes.authorId, users.id))
        .where(eq(recipes.id, recipeId))
        .limit(1);

    const row = rows[0];
    if (!row) return null;

    const r = row.recipes;
    const canSee = r.published || (viewerUserId !== null && r.authorId === viewerUserId);
    if (!canSee) return null;

    return mapRecipeWithAuthor(row);
}

export async function getRecipesByAuthor(authorId: string): Promise<RecipeRowWithAuthor[]> {
    const rows = await db
        .select()
        .from(recipes)
        .innerJoin(users, eq(recipes.authorId, users.id))
        .where(eq(recipes.authorId, authorId))
        .limit(HARD_LIMIT);

    return rows.map(mapRecipeWithAuthor);
}

export async function getSavedRecipesForUser(userId: string): Promise<RecipeRowWithAuthor[]> {
    const rows = await db
        .select()
        .from(recipeSaves)
        .innerJoin(recipes, eq(recipeSaves.recipeId, recipes.id))
        .innerJoin(users, eq(recipes.authorId, users.id))
        .where(eq(recipeSaves.userId, userId))
        .limit(HARD_LIMIT);

    return rows.map((row) => mapRecipeWithAuthor({ recipes: row.recipes, users: row.users }));
}
