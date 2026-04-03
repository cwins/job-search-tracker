import { GraphQLError } from 'graphql';
import type {
    CreateRecipeInput,
    Recipe,
    RecipesFilterInput,
    UpdateRecipeInput,
} from '../../generated/types';
import { RecipesService } from './recipes-service';

const BASE = process.env.RECIPES_API_ENDPOINT || 'http://localhost:4002';

type RecipeJson = {
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

function toRecipe(j: RecipeJson): Recipe {
    return {
        __typename: 'Recipe',
        id: j.id,
        authorId: j.authorId,
        authorUsername: j.authorUsername,
        name: j.name,
        prepTimeMinutes: j.prepTimeMinutes,
        cookTimeMinutes: j.cookTimeMinutes,
        ingredients: j.ingredients,
        directions: j.directions,
        published: j.published,
        createdAt: j.createdAt,
    };
}

function filtersToBody(filters: RecipesFilterInput | null | undefined): Record<string, unknown> {
    if (!filters) return {};
    const body: Record<string, unknown> = {};
    if (filters.name?.length) {
        body.name = filters.name.length === 1 ? filters.name[0] : filters.name;
    }
    if (filters.maxPrepTimeMinutes != null) {
        body.maxPrepTimeMinutes = filters.maxPrepTimeMinutes;
    }
    if (filters.maxCookTimeMinutes != null) {
        body.maxCookTimeMinutes = filters.maxCookTimeMinutes;
    }
    if (filters.ingredient?.length) {
        body.ingredient = filters.ingredient.length === 1 ? filters.ingredient[0] : filters.ingredient;
    }
    if (filters.authorUsername?.length) {
        body.authorUsername =
            filters.authorUsername.length === 1 ? filters.authorUsername[0] : filters.authorUsername;
    }
    return body;
}

async function readError(res: Response): Promise<string> {
    try {
        const j = (await res.json()) as { error?: string };
        return j.error || res.statusText || 'REQUEST_FAILED';
    } catch {
        return res.statusText || 'REQUEST_FAILED';
    }
}

export class RecipesServicePostgreSQL extends RecipesService {
    readonly serviceName = 'RecipesServicePostgreSQL';

    private async fetchJson<T>(
        path: string,
        init: RequestInit & { token?: string | null }
    ): Promise<T> {
        const { token, ...rest } = init;
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(rest.headers as Record<string, string> | undefined),
        };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        const res = await fetch(`${BASE}${path}`, { ...rest, headers });
        if (!res.ok) {
            const code = await readError(res);
            throw new GraphQLError(code, {
                extensions: { code: mapStatusToCode(res.status), httpStatus: res.status },
            });
        }
        return res.json() as Promise<T>;
    }

    async publishedRecipes(filters: RecipesFilterInput | null | undefined): Promise<Recipe[]> {
        const list = await this.fetchJson<RecipeJson[]>('/recipes/published', {
            method: 'POST',
            body: JSON.stringify(filtersToBody(filters)),
        });
        return list.map(toRecipe);
    }

    async recipe(id: string, token?: string | null): Promise<Recipe | null> {
        try {
            const j = await this.fetchJson<RecipeJson>(`/recipes/${id}`, {
                method: 'GET',
                token: token ?? undefined,
            });
            return toRecipe(j);
        } catch (e) {
            if (e instanceof GraphQLError && e.extensions?.httpStatus === 404) {
                return null;
            }
            throw e;
        }
    }

    async myRecipes(token: string): Promise<Recipe[]> {
        const list = await this.fetchJson<RecipeJson[]>('/recipes/mine', {
            method: 'POST',
            body: JSON.stringify({}),
            token,
        });
        return list.map(toRecipe);
    }

    async mySavedRecipes(token: string): Promise<Recipe[]> {
        const list = await this.fetchJson<RecipeJson[]>('/recipes/saved', {
            method: 'POST',
            body: JSON.stringify({}),
            token,
        });
        return list.map(toRecipe);
    }

    async createRecipe(input: CreateRecipeInput, token: string): Promise<Recipe> {
        const j = await this.fetchJson<RecipeJson>('/recipes', {
            method: 'POST',
            body: JSON.stringify({
                name: input.name,
                prepTimeMinutes: input.prepTimeMinutes,
                cookTimeMinutes: input.cookTimeMinutes,
                ingredients: input.ingredients,
                directions: input.directions,
                published: input.published ?? undefined,
            }),
            token,
        });
        return toRecipe(j);
    }

    async updateRecipe(id: string, input: UpdateRecipeInput, token: string): Promise<Recipe> {
        const j = await this.fetchJson<RecipeJson>(`/recipes/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                ...(input.name != null ? { name: input.name } : {}),
                ...(input.prepTimeMinutes != null ? { prepTimeMinutes: input.prepTimeMinutes } : {}),
                ...(input.cookTimeMinutes != null ? { cookTimeMinutes: input.cookTimeMinutes } : {}),
                ...(input.ingredients != null ? { ingredients: input.ingredients } : {}),
                ...(input.directions != null ? { directions: input.directions } : {}),
                ...(input.published != null ? { published: input.published } : {}),
            }),
            token,
        });
        return toRecipe(j);
    }

    async deleteRecipe(id: string, token: string): Promise<boolean> {
        await this.fetchJson<{ ok: true }>(`/recipes/${id}`, {
            method: 'DELETE',
            token,
        });
        return true;
    }

    async favoriteRecipe(id: string, token: string): Promise<boolean> {
        await this.fetchJson<{ ok: true }>(`/recipes/${id}/favorite`, {
            method: 'POST',
            token,
        });
        return true;
    }

    async unfavoriteRecipe(id: string, token: string): Promise<boolean> {
        await this.fetchJson<{ ok: true }>(`/recipes/${id}/favorite`, {
            method: 'DELETE',
            token,
        });
        return true;
    }
}

function mapStatusToCode(status: number): string {
    if (status === 401) return 'UNAUTHENTICATED';
    if (status === 404) return 'NOT_FOUND';
    if (status === 409) return 'CONFLICT';
    return 'BAD_REQUEST';
}
