/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query MyRecipesList {\n    myRecipes {\n      id\n      name\n      prepTimeMinutes\n      cookTimeMinutes\n      published\n      ingredients\n      directions\n    }\n  }\n": typeof types.MyRecipesListDocument,
    "\n  mutation CreateRecipe($input: CreateRecipeInput!) {\n    createRecipe(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateRecipeDocument,
    "\n  mutation UpdateRecipe($id: ID!, $input: UpdateRecipeInput!) {\n    updateRecipe(id: $id, input: $input) {\n      id\n      published\n    }\n  }\n": typeof types.UpdateRecipeDocument,
    "\n  mutation DeleteRecipe($id: ID!) {\n    deleteRecipe(id: $id)\n  }\n": typeof types.DeleteRecipeDocument,
    "\n  query MySavedRecipesList {\n    mySavedRecipes {\n      id\n      name\n      prepTimeMinutes\n      cookTimeMinutes\n      authorUsername\n    }\n  }\n": typeof types.MySavedRecipesListDocument,
    "\n  query PublishedRecipes($filters: RecipesFilterInput) {\n    publishedRecipes(filters: $filters) {\n      id\n      name\n      prepTimeMinutes\n      cookTimeMinutes\n      authorUsername\n    }\n  }\n": typeof types.PublishedRecipesDocument,
    "\n  query RecipeDetail($id: ID!) {\n    recipe(id: $id) {\n      id\n      name\n      prepTimeMinutes\n      cookTimeMinutes\n      ingredients\n      directions\n      published\n      authorUsername\n      authorId\n    }\n  }\n": typeof types.RecipeDetailDocument,
    "\n  query MySavedIds {\n    mySavedRecipes {\n      id\n    }\n  }\n": typeof types.MySavedIdsDocument,
    "\n  mutation FavoriteRecipe($id: ID!) {\n    favoriteRecipe(id: $id)\n  }\n": typeof types.FavoriteRecipeDocument,
    "\n  mutation UnfavoriteRecipe($id: ID!) {\n    unfavoriteRecipe(id: $id)\n  }\n": typeof types.UnfavoriteRecipeDocument,
};
const documents: Documents = {
    "\n  query MyRecipesList {\n    myRecipes {\n      id\n      name\n      prepTimeMinutes\n      cookTimeMinutes\n      published\n      ingredients\n      directions\n    }\n  }\n": types.MyRecipesListDocument,
    "\n  mutation CreateRecipe($input: CreateRecipeInput!) {\n    createRecipe(input: $input) {\n      id\n    }\n  }\n": types.CreateRecipeDocument,
    "\n  mutation UpdateRecipe($id: ID!, $input: UpdateRecipeInput!) {\n    updateRecipe(id: $id, input: $input) {\n      id\n      published\n    }\n  }\n": types.UpdateRecipeDocument,
    "\n  mutation DeleteRecipe($id: ID!) {\n    deleteRecipe(id: $id)\n  }\n": types.DeleteRecipeDocument,
    "\n  query MySavedRecipesList {\n    mySavedRecipes {\n      id\n      name\n      prepTimeMinutes\n      cookTimeMinutes\n      authorUsername\n    }\n  }\n": types.MySavedRecipesListDocument,
    "\n  query PublishedRecipes($filters: RecipesFilterInput) {\n    publishedRecipes(filters: $filters) {\n      id\n      name\n      prepTimeMinutes\n      cookTimeMinutes\n      authorUsername\n    }\n  }\n": types.PublishedRecipesDocument,
    "\n  query RecipeDetail($id: ID!) {\n    recipe(id: $id) {\n      id\n      name\n      prepTimeMinutes\n      cookTimeMinutes\n      ingredients\n      directions\n      published\n      authorUsername\n      authorId\n    }\n  }\n": types.RecipeDetailDocument,
    "\n  query MySavedIds {\n    mySavedRecipes {\n      id\n    }\n  }\n": types.MySavedIdsDocument,
    "\n  mutation FavoriteRecipe($id: ID!) {\n    favoriteRecipe(id: $id)\n  }\n": types.FavoriteRecipeDocument,
    "\n  mutation UnfavoriteRecipe($id: ID!) {\n    unfavoriteRecipe(id: $id)\n  }\n": types.UnfavoriteRecipeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MyRecipesList {\n    myRecipes {\n      id\n      name\n      prepTimeMinutes\n      cookTimeMinutes\n      published\n      ingredients\n      directions\n    }\n  }\n"): (typeof documents)["\n  query MyRecipesList {\n    myRecipes {\n      id\n      name\n      prepTimeMinutes\n      cookTimeMinutes\n      published\n      ingredients\n      directions\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateRecipe($input: CreateRecipeInput!) {\n    createRecipe(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRecipe($input: CreateRecipeInput!) {\n    createRecipe(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateRecipe($id: ID!, $input: UpdateRecipeInput!) {\n    updateRecipe(id: $id, input: $input) {\n      id\n      published\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateRecipe($id: ID!, $input: UpdateRecipeInput!) {\n    updateRecipe(id: $id, input: $input) {\n      id\n      published\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteRecipe($id: ID!) {\n    deleteRecipe(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteRecipe($id: ID!) {\n    deleteRecipe(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MySavedRecipesList {\n    mySavedRecipes {\n      id\n      name\n      prepTimeMinutes\n      cookTimeMinutes\n      authorUsername\n    }\n  }\n"): (typeof documents)["\n  query MySavedRecipesList {\n    mySavedRecipes {\n      id\n      name\n      prepTimeMinutes\n      cookTimeMinutes\n      authorUsername\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PublishedRecipes($filters: RecipesFilterInput) {\n    publishedRecipes(filters: $filters) {\n      id\n      name\n      prepTimeMinutes\n      cookTimeMinutes\n      authorUsername\n    }\n  }\n"): (typeof documents)["\n  query PublishedRecipes($filters: RecipesFilterInput) {\n    publishedRecipes(filters: $filters) {\n      id\n      name\n      prepTimeMinutes\n      cookTimeMinutes\n      authorUsername\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query RecipeDetail($id: ID!) {\n    recipe(id: $id) {\n      id\n      name\n      prepTimeMinutes\n      cookTimeMinutes\n      ingredients\n      directions\n      published\n      authorUsername\n      authorId\n    }\n  }\n"): (typeof documents)["\n  query RecipeDetail($id: ID!) {\n    recipe(id: $id) {\n      id\n      name\n      prepTimeMinutes\n      cookTimeMinutes\n      ingredients\n      directions\n      published\n      authorUsername\n      authorId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MySavedIds {\n    mySavedRecipes {\n      id\n    }\n  }\n"): (typeof documents)["\n  query MySavedIds {\n    mySavedRecipes {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation FavoriteRecipe($id: ID!) {\n    favoriteRecipe(id: $id)\n  }\n"): (typeof documents)["\n  mutation FavoriteRecipe($id: ID!) {\n    favoriteRecipe(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UnfavoriteRecipe($id: ID!) {\n    unfavoriteRecipe(id: $id)\n  }\n"): (typeof documents)["\n  mutation UnfavoriteRecipe($id: ID!) {\n    unfavoriteRecipe(id: $id)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;