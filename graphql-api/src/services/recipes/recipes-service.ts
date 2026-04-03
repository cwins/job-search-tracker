import type {
    CreateRecipeInput,
    Recipe,
    RecipesFilterInput,
    UpdateRecipeInput,
} from '../../generated/types';
import { Service } from '../service';

export abstract class RecipesService extends Service {
    abstract publishedRecipes(filters: RecipesFilterInput | null | undefined): Promise<Recipe[]>;
    abstract recipe(id: string, token?: string | null): Promise<Recipe | null>;
    abstract myRecipes(token: string): Promise<Recipe[]>;
    abstract mySavedRecipes(token: string): Promise<Recipe[]>;
    abstract createRecipe(input: CreateRecipeInput, token: string): Promise<Recipe>;
    abstract updateRecipe(id: string, input: UpdateRecipeInput, token: string): Promise<Recipe>;
    abstract deleteRecipe(id: string, token: string): Promise<boolean>;
    abstract favoriteRecipe(id: string, token: string): Promise<boolean>;
    abstract unfavoriteRecipe(id: string, token: string): Promise<boolean>;
}
