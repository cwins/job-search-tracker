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

export type JobsListQueryVariables = Exact<{ [key: string]: never; }>;


export type JobsListQuery = { __typename: 'Query', getJobs: Array<{ __typename: 'Job', id: string, company: string, title: string, location: string, status: StatusEnum }> };


export const JobsListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobsList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getJobs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<JobsListQuery, JobsListQueryVariables>;