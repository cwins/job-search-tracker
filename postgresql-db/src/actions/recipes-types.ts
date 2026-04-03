export interface RecipesFilter {
    name?: string | string[];
    maxPrepTimeMinutes?: number;
    maxCookTimeMinutes?: number;
    ingredient?: string | string[];
    authorUsername?: string | string[];
}
