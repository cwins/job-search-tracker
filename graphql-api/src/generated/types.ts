import type { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateRecipeInput: CreateRecipeInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Recipe: ResolverTypeWrapper<Recipe>;
  RecipesFilterInput: RecipesFilterInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateRecipeInput: UpdateRecipeInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateRecipeInput: CreateRecipeInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  Recipe: Recipe;
  RecipesFilterInput: RecipesFilterInput;
  String: Scalars['String']['output'];
  UpdateRecipeInput: UpdateRecipeInput;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createRecipe: Resolver<ResolversTypes['Recipe'], ParentType, ContextType, RequireFields<MutationCreateRecipeArgs, 'input'>>;
  deleteRecipe: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteRecipeArgs, 'id'>>;
  favoriteRecipe: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationFavoriteRecipeArgs, 'id'>>;
  unfavoriteRecipe: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUnfavoriteRecipeArgs, 'id'>>;
  updateRecipe: Resolver<ResolversTypes['Recipe'], ParentType, ContextType, RequireFields<MutationUpdateRecipeArgs, 'id' | 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  myRecipes: Resolver<Array<ResolversTypes['Recipe']>, ParentType, ContextType>;
  mySavedRecipes: Resolver<Array<ResolversTypes['Recipe']>, ParentType, ContextType>;
  publishedRecipes: Resolver<Array<ResolversTypes['Recipe']>, ParentType, ContextType, QueryPublishedRecipesArgs>;
  recipe: Resolver<Maybe<ResolversTypes['Recipe']>, ParentType, ContextType, RequireFields<QueryRecipeArgs, 'id'>>;
};

export type RecipeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Recipe'] = ResolversParentTypes['Recipe']> = {
  authorId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  authorUsername: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cookTimeMinutes: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  directions: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ingredients: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  prepTimeMinutes: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  published: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation: MutationResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  Recipe: RecipeResolvers<ContextType>;
};

