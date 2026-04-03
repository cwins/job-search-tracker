import { and, eq } from 'drizzle-orm';
import { recipes, recipeSaves } from '../db-schema';
import { db } from '../db-connection';

export interface CreateRecipeInput {
    authorId: string;
    name: string;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    ingredients: string[];
    directions: string;
    published?: boolean;
}

export interface UpdateRecipeInput {
    name?: string;
    prepTimeMinutes?: number;
    cookTimeMinutes?: number;
    ingredients?: string[];
    directions?: string;
    published?: boolean;
}

export async function createRecipe(input: CreateRecipeInput) {
    const [row] = await db
        .insert(recipes)
        .values({
            authorId: input.authorId,
            name: input.name,
            prepTimeMinutes: input.prepTimeMinutes,
            cookTimeMinutes: input.cookTimeMinutes,
            ingredients: input.ingredients,
            directions: input.directions,
            published: input.published ?? false,
        })
        .returning();

    return row ?? null;
}

export async function updateRecipe(recipeId: string, authorId: string, patch: UpdateRecipeInput) {
    const updates: Partial<typeof recipes.$inferInsert> = {};
    if (patch.name !== undefined) updates.name = patch.name;
    if (patch.prepTimeMinutes !== undefined) updates.prepTimeMinutes = patch.prepTimeMinutes;
    if (patch.cookTimeMinutes !== undefined) updates.cookTimeMinutes = patch.cookTimeMinutes;
    if (patch.ingredients !== undefined) updates.ingredients = patch.ingredients;
    if (patch.directions !== undefined) updates.directions = patch.directions;
    if (patch.published !== undefined) updates.published = patch.published;

    if (Object.keys(updates).length === 0) {
        const [existing] = await db
            .select()
            .from(recipes)
            .where(and(eq(recipes.id, recipeId), eq(recipes.authorId, authorId)))
            .limit(1);
        return existing ?? null;
    }

    const [row] = await db
        .update(recipes)
        .set(updates)
        .where(and(eq(recipes.id, recipeId), eq(recipes.authorId, authorId)))
        .returning();

    return row ?? null;
}

export async function deleteRecipe(recipeId: string, authorId: string): Promise<boolean> {
    const result = await db.delete(recipes).where(and(eq(recipes.id, recipeId), eq(recipes.authorId, authorId))).returning({ id: recipes.id });

    return result.length > 0;
}

export async function favoriteRecipe(userId: string, recipeId: string): Promise<'ok' | 'not_found' | 'not_published' | 'already_saved'> {
    const [recipe] = await db.select().from(recipes).where(eq(recipes.id, recipeId)).limit(1);
    if (!recipe) return 'not_found';
    if (!recipe.published) return 'not_published';

    const inserted = await db
        .insert(recipeSaves)
        .values({ userId, recipeId })
        .onConflictDoNothing({ target: [recipeSaves.userId, recipeSaves.recipeId] })
        .returning({ recipeId: recipeSaves.recipeId });

    if (inserted.length === 0) return 'already_saved';
    return 'ok';
}

export async function unfavoriteRecipe(userId: string, recipeId: string): Promise<boolean> {
    const result = await db
        .delete(recipeSaves)
        .where(and(eq(recipeSaves.userId, userId), eq(recipeSaves.recipeId, recipeId)))
        .returning({ recipeId: recipeSaves.recipeId });

    return result.length > 0;
}
