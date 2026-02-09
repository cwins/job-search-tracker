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

export type Job = {
  __typename: 'Job';
  company: Scalars['String']['output'];
  creationTime: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  listingDate: Scalars['Int']['output'];
  listingUrl: Scalars['String']['output'];
  location: Scalars['String']['output'];
  notes: Array<Note>;
  status: StatusEnum;
  statusHistory: Array<StatusChange>;
  title: Scalars['String']['output'];
};

export type JobsFilterInputs = {
  company: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  location: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status: InputMaybe<Array<InputMaybe<StatusEnum>>>;
  title: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Note = {
  __typename: 'Note';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  jobId: Scalars['ID']['output'];
  timestamp: Scalars['String']['output'];
};

export type Query = {
  __typename: 'Query';
  getJobs: Array<Job>;
};


export type QueryGetJobsArgs = {
  filters: InputMaybe<JobsFilterInputs>;
  userId: Scalars['ID']['input'];
};

export type StatusChange = {
  __typename: 'StatusChange';
  date: Scalars['String']['output'];
  status: StatusEnum;
};

export type StatusEnum =
  | 'APPLIED'
  | 'ARCHIVED'
  | 'CORRESPONDING'
  | 'INTERVIEWING'
  | 'OFFER_ACCEPTED'
  | 'OFFER_RECEIVED'
  | 'REJECTED'
  | 'SAVED'
  | 'STALE';



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
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Job: ResolverTypeWrapper<Job>;
  JobsFilterInputs: JobsFilterInputs;
  Note: ResolverTypeWrapper<Note>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  StatusChange: ResolverTypeWrapper<StatusChange>;
  StatusEnum: StatusEnum;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Job: Job;
  JobsFilterInputs: JobsFilterInputs;
  Note: Note;
  Query: Record<PropertyKey, never>;
  StatusChange: StatusChange;
  String: Scalars['String']['output'];
};

export type JobResolvers<ContextType = any, ParentType extends ResolversParentTypes['Job'] = ResolversParentTypes['Job']> = {
  company: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creationTime: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  listingDate: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  listingUrl: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes: Resolver<Array<ResolversTypes['Note']>, ParentType, ContextType>;
  status: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  statusHistory: Resolver<Array<ResolversTypes['StatusChange']>, ParentType, ContextType>;
  title: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type NoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Note'] = ResolversParentTypes['Note']> = {
  content: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  jobId: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getJobs: Resolver<Array<ResolversTypes['Job']>, ParentType, ContextType, RequireFields<QueryGetJobsArgs, 'userId'>>;
};

export type StatusChangeResolvers<ContextType = any, ParentType extends ResolversParentTypes['StatusChange'] = ResolversParentTypes['StatusChange']> = {
  date: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Job: JobResolvers<ContextType>;
  Note: NoteResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  StatusChange: StatusChangeResolvers<ContextType>;
};

