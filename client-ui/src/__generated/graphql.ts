/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateRecipeInput = {
  cookTimeMinutes: Scalars['Int']['input'];
  directions: Scalars['String']['input'];
  ingredients: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  prepTimeMinutes: Scalars['Int']['input'];
  published: InputMaybe<Scalars['Boolean']['input']>;
};

export type Mutation = {
  __typename: 'Mutation';
  createRecipe: Recipe;
  deleteRecipe: Scalars['Boolean']['output'];
  favoriteRecipe: Scalars['Boolean']['output'];
  unfavoriteRecipe: Scalars['Boolean']['output'];
  updateRecipe: Recipe;
};


export type MutationCreateRecipeArgs = {
  input: CreateRecipeInput;
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationFavoriteRecipeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUnfavoriteRecipeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateRecipeArgs = {
  id: Scalars['ID']['input'];
  input: UpdateRecipeInput;
};

export type Query = {
  __typename: 'Query';
  myRecipes: Array<Recipe>;
  mySavedRecipes: Array<Recipe>;
  publishedRecipes: Array<Recipe>;
  recipe: Maybe<Recipe>;
};


export type QueryPublishedRecipesArgs = {
  filters: InputMaybe<RecipesFilterInput>;
};


export type QueryRecipeArgs = {
  id: Scalars['ID']['input'];
};

export type Recipe = {
  __typename: 'Recipe';
  authorId: Scalars['ID']['output'];
  authorUsername: Scalars['String']['output'];
  cookTimeMinutes: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  directions: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  ingredients: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  prepTimeMinutes: Scalars['Int']['output'];
  published: Scalars['Boolean']['output'];
};

export type RecipesFilterInput = {
  authorUsername: InputMaybe<Array<Scalars['String']['input']>>;
  ingredient: InputMaybe<Array<Scalars['String']['input']>>;
  maxCookTimeMinutes: InputMaybe<Scalars['Int']['input']>;
  maxPrepTimeMinutes: InputMaybe<Scalars['Int']['input']>;
  name: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateRecipeInput = {
  cookTimeMinutes: InputMaybe<Scalars['Int']['input']>;
  directions: InputMaybe<Scalars['String']['input']>;
  ingredients: InputMaybe<Array<Scalars['String']['input']>>;
  name: InputMaybe<Scalars['String']['input']>;
  prepTimeMinutes: InputMaybe<Scalars['Int']['input']>;
  published: InputMaybe<Scalars['Boolean']['input']>;
};

export type MyRecipesListQueryVariables = Exact<{ [key: string]: never; }>;


export type MyRecipesListQuery = { __typename: 'Query', myRecipes: Array<{ __typename: 'Recipe', id: string, name: string, prepTimeMinutes: number, cookTimeMinutes: number, published: boolean, ingredients: Array<string>, directions: string }> };

export type CreateRecipeMutationVariables = Exact<{
  input: CreateRecipeInput;
}>;


export type CreateRecipeMutation = { __typename: 'Mutation', createRecipe: { __typename: 'Recipe', id: string } };

export type UpdateRecipeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateRecipeInput;
}>;


export type UpdateRecipeMutation = { __typename: 'Mutation', updateRecipe: { __typename: 'Recipe', id: string, published: boolean } };

export type DeleteRecipeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteRecipeMutation = { __typename: 'Mutation', deleteRecipe: boolean };

export type MySavedRecipesListQueryVariables = Exact<{ [key: string]: never; }>;


export type MySavedRecipesListQuery = { __typename: 'Query', mySavedRecipes: Array<{ __typename: 'Recipe', id: string, name: string, prepTimeMinutes: number, cookTimeMinutes: number, authorUsername: string }> };

export type PublishedRecipesQueryVariables = Exact<{
  filters: InputMaybe<RecipesFilterInput>;
}>;


export type PublishedRecipesQuery = { __typename: 'Query', publishedRecipes: Array<{ __typename: 'Recipe', id: string, name: string, prepTimeMinutes: number, cookTimeMinutes: number, authorUsername: string }> };

export type RecipeDetailQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RecipeDetailQuery = { __typename: 'Query', recipe: { __typename: 'Recipe', id: string, name: string, prepTimeMinutes: number, cookTimeMinutes: number, ingredients: Array<string>, directions: string, published: boolean, authorUsername: string, authorId: string } | null };

export type MySavedIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type MySavedIdsQuery = { __typename: 'Query', mySavedRecipes: Array<{ __typename: 'Recipe', id: string }> };

export type FavoriteRecipeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FavoriteRecipeMutation = { __typename: 'Mutation', favoriteRecipe: boolean };

export type UnfavoriteRecipeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UnfavoriteRecipeMutation = { __typename: 'Mutation', unfavoriteRecipe: boolean };


export const MyRecipesListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyRecipesList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myRecipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prepTimeMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"cookTimeMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"}},{"kind":"Field","name":{"kind":"Name","value":"directions"}}]}}]}}]} as unknown as DocumentNode<MyRecipesListQuery, MyRecipesListQueryVariables>;
export const CreateRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRecipeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateRecipeMutation, CreateRecipeMutationVariables>;
export const UpdateRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRecipeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"published"}}]}}]}}]} as unknown as DocumentNode<UpdateRecipeMutation, UpdateRecipeMutationVariables>;
export const DeleteRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteRecipeMutation, DeleteRecipeMutationVariables>;
export const MySavedRecipesListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MySavedRecipesList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mySavedRecipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prepTimeMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"cookTimeMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"authorUsername"}}]}}]}}]} as unknown as DocumentNode<MySavedRecipesListQuery, MySavedRecipesListQueryVariables>;
export const PublishedRecipesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublishedRecipes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RecipesFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishedRecipes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prepTimeMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"cookTimeMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"authorUsername"}}]}}]}}]} as unknown as DocumentNode<PublishedRecipesQuery, PublishedRecipesQueryVariables>;
export const RecipeDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RecipeDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prepTimeMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"cookTimeMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"}},{"kind":"Field","name":{"kind":"Name","value":"directions"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"authorUsername"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}}]}}]} as unknown as DocumentNode<RecipeDetailQuery, RecipeDetailQueryVariables>;
export const MySavedIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MySavedIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mySavedRecipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<MySavedIdsQuery, MySavedIdsQueryVariables>;
export const FavoriteRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FavoriteRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"favoriteRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<FavoriteRecipeMutation, FavoriteRecipeMutationVariables>;
export const UnfavoriteRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnfavoriteRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unfavoriteRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<UnfavoriteRecipeMutation, UnfavoriteRecipeMutationVariables>;