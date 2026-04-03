import type { RecipeRowWithAuthor } from './actions/recipes-queries';

export type RecipeJson = {
    id: string;
    authorId: string;
    authorUsername: string;
    name: string;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    ingredients: string[];
    directions: string;
    published: boolean;
    createdAt: string;
};

export function serializeRecipeRow(row: RecipeRowWithAuthor): RecipeJson {
    return {
        id: row.id,
        authorId: row.authorId,
        authorUsername: row.authorUsername,
        name: row.name,
        prepTimeMinutes: row.prepTimeMinutes,
        cookTimeMinutes: row.cookTimeMinutes,
        ingredients: row.ingredients,
        directions: row.directions,
        published: row.published,
        createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : String(row.createdAt),
    };
}
