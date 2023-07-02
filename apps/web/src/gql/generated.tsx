import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
}

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>
  not?: InputMaybe<Scalars['Boolean']>
}

export type CreateNodeInput = {
  authorId: Scalars['String']
  content: Scalars['String']
  end: Scalars['Boolean']
  start: Scalars['Boolean']
  storyId: Scalars['Int']
  title: Scalars['String']
}

export type CreateStoryInput = {
  authorId: Scalars['String']
  title: Scalars['String']
}

export type CreateUserInput = {
  name: Scalars['String']
  uid: Scalars['String']
}

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['String']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<Scalars['String']>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  notIn?: InputMaybe<Array<Scalars['String']>>
}

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>
  gt?: InputMaybe<Scalars['Int']>
  gte?: InputMaybe<Scalars['Int']>
  in?: InputMaybe<Scalars['Int']>
  lt?: InputMaybe<Scalars['Int']>
  lte?: InputMaybe<Scalars['Int']>
  not?: InputMaybe<Scalars['Int']>
  notIn?: InputMaybe<Scalars['Int']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createNode: Node
  createStory: Story
  createUser: User
  removeNode: Node
  removeStory: Story
  removeUser: User
  updateNode: Node
  updateStory: Story
  updateUser: User
}

export type MutationCreateNodeArgs = {
  createNodeInput: CreateNodeInput
}

export type MutationCreateStoryArgs = {
  createStoryInput: CreateStoryInput
}

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput
}

export type MutationRemoveNodeArgs = {
  where?: InputMaybe<NodeWhereUniqueInput>
}

export type MutationRemoveStoryArgs = {
  where?: InputMaybe<StoryWhereUniqueInput>
}

export type MutationRemoveUserArgs = {
  where?: InputMaybe<UserWhereUniqueInput>
}

export type MutationUpdateNodeArgs = {
  updateNodeInput: UpdateNodeInput
}

export type MutationUpdateStoryArgs = {
  updateStoryInput: UpdateStoryInput
}

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput
}

export type Node = {
  __typename?: 'Node'
  authorId: Scalars['String']
  content: Scalars['String']
  createdAt: Scalars['DateTime']
  end: Scalars['Boolean']
  id: Scalars['Int']
  parentNodeId: Scalars['Int']
  start: Scalars['Boolean']
  storyId: Scalars['Int']
  title: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type NodeListRelationFilter = {
  every?: InputMaybe<NodeWhereInput>
  none?: InputMaybe<NodeWhereInput>
  some?: InputMaybe<NodeWhereInput>
}

export type NodeOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type NodeOrderByWithRelationInput = {
  author?: InputMaybe<UserOrderByWithRelationInput>
  authorId?: InputMaybe<SortOrder>
  choices?: InputMaybe<NodeOrderByRelationAggregateInput>
  content?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  end?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  parentNode?: InputMaybe<NodeOrderByWithRelationInput>
  parentNodeId?: InputMaybe<SortOrder>
  start?: InputMaybe<SortOrder>
  story?: InputMaybe<StoryOrderByWithRelationInput>
  storyId?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export type NodeRelationFilter = {
  is?: InputMaybe<NodeWhereInput>
  isNot?: InputMaybe<NodeWhereInput>
}

export enum NodeScalarFieldEnum {
  AuthorId = 'authorId',
  Content = 'content',
  CreatedAt = 'createdAt',
  End = 'end',
  Id = 'id',
  ParentNodeId = 'parentNodeId',
  Start = 'start',
  StoryId = 'storyId',
  Title = 'title',
  UpdatedAt = 'updatedAt',
}

export type NodeWhereInput = {
  AND?: InputMaybe<Array<NodeWhereInput>>
  NOT?: InputMaybe<Array<NodeWhereInput>>
  OR?: InputMaybe<Array<NodeWhereInput>>
  author?: InputMaybe<UserRelationFilter>
  authorId?: InputMaybe<StringFilter>
  choices?: InputMaybe<NodeListRelationFilter>
  content?: InputMaybe<StringFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  end?: InputMaybe<BoolFilter>
  id?: InputMaybe<IntFilter>
  parentNode?: InputMaybe<NodeRelationFilter>
  parentNodeId?: InputMaybe<IntFilter>
  start?: InputMaybe<BoolFilter>
  story?: InputMaybe<StoryRelationFilter>
  storyId?: InputMaybe<IntFilter>
  title?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type NodeWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export type Query = {
  __typename?: 'Query'
  node: Node
  nodes: Array<Node>
  stories: Array<Story>
  story: Story
  user: User
  users: Array<User>
}

export type QueryNodeArgs = {
  where?: InputMaybe<NodeWhereUniqueInput>
}

export type QueryNodesArgs = {
  cursor?: InputMaybe<NodeWhereUniqueInput>
  distinct?: InputMaybe<Array<NodeScalarFieldEnum>>
  orderBy?: InputMaybe<Array<NodeOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<NodeWhereInput>
}

export type QueryStoriesArgs = {
  cursor?: InputMaybe<StoryWhereUniqueInput>
  distinct?: InputMaybe<Array<StoryScalarFieldEnum>>
  orderBy?: InputMaybe<Array<StoryOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<StoryWhereInput>
}

export type QueryStoryArgs = {
  where?: InputMaybe<StoryWhereUniqueInput>
}

export type QueryUserArgs = {
  where?: InputMaybe<UserWhereUniqueInput>
}

export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<UserWhereInput>
}

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type Story = {
  __typename?: 'Story'
  authorId: Scalars['String']
  createdAt: Scalars['DateTime']
  id: Scalars['Int']
  title: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type StoryListRelationFilter = {
  every?: InputMaybe<StoryWhereInput>
  none?: InputMaybe<StoryWhereInput>
  some?: InputMaybe<StoryWhereInput>
}

export type StoryOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type StoryOrderByWithRelationInput = {
  author?: InputMaybe<UserOrderByWithRelationInput>
  authorId?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  nodes?: InputMaybe<NodeOrderByRelationAggregateInput>
  title?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export type StoryRelationFilter = {
  is?: InputMaybe<StoryWhereInput>
  isNot?: InputMaybe<StoryWhereInput>
}

export enum StoryScalarFieldEnum {
  AuthorId = 'authorId',
  CreatedAt = 'createdAt',
  Id = 'id',
  Title = 'title',
  UpdatedAt = 'updatedAt',
}

export type StoryWhereInput = {
  AND?: InputMaybe<Array<StoryWhereInput>>
  NOT?: InputMaybe<Array<StoryWhereInput>>
  OR?: InputMaybe<Array<StoryWhereInput>>
  author?: InputMaybe<UserRelationFilter>
  authorId?: InputMaybe<StringFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  id?: InputMaybe<IntFilter>
  nodes?: InputMaybe<NodeListRelationFilter>
  title?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type StoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>
  endsWith?: InputMaybe<Scalars['String']>
  equals?: InputMaybe<Scalars['String']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<Scalars['String']>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  mode?: InputMaybe<QueryMode>
  not?: InputMaybe<Scalars['String']>
  notIn?: InputMaybe<Array<Scalars['String']>>
  startsWith?: InputMaybe<Scalars['String']>
}

export type UpdateNodeInput = {
  authorId?: InputMaybe<Scalars['String']>
  content?: InputMaybe<Scalars['String']>
  end?: InputMaybe<Scalars['Boolean']>
  id: Scalars['Int']
  start?: InputMaybe<Scalars['Boolean']>
  storyId?: InputMaybe<Scalars['Int']>
  title?: InputMaybe<Scalars['String']>
}

export type UpdateStoryInput = {
  authorId?: InputMaybe<Scalars['String']>
  id: Scalars['Int']
  title?: InputMaybe<Scalars['String']>
}

export type UpdateUserInput = {
  name?: InputMaybe<Scalars['String']>
  uid: Scalars['String']
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['DateTime']
  name: Scalars['String']
  uid: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type UserOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  nodes?: InputMaybe<NodeOrderByRelationAggregateInput>
  stories?: InputMaybe<StoryOrderByRelationAggregateInput>
  uid?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>
  isNot?: InputMaybe<UserWhereInput>
}

export enum UserScalarFieldEnum {
  CreatedAt = 'createdAt',
  Name = 'name',
  Uid = 'uid',
  UpdatedAt = 'updatedAt',
}

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>
  NOT?: InputMaybe<Array<UserWhereInput>>
  OR?: InputMaybe<Array<UserWhereInput>>
  createdAt?: InputMaybe<DateTimeFilter>
  name?: InputMaybe<StringFilter>
  nodes?: InputMaybe<NodeListRelationFilter>
  stories?: InputMaybe<StoryListRelationFilter>
  uid?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type UserWhereUniqueInput = {
  uid?: InputMaybe<Scalars['String']>
}

export type NodesQueryVariables = Exact<{ [key: string]: never }>

export type NodesQuery = {
  __typename?: 'Query'
  nodes: Array<{ __typename?: 'Node'; id: number }>
}

export const namedOperations = {
  Query: {
    nodes: 'nodes',
  },
}

export const NodesDocument = /*#__PURE__*/ gql`
  query nodes {
    nodes {
      id
    }
  }
`

/**
 * __useNodesQuery__
 *
 * To run a query within a React component, call `useNodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNodesQuery({
 *   variables: {
 *   },
 * });
 */
export function useNodesQuery(
  baseOptions?: Apollo.QueryHookOptions<NodesQuery, NodesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<NodesQuery, NodesQueryVariables>(
    NodesDocument,
    options,
  )
}
export function useNodesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<NodesQuery, NodesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<NodesQuery, NodesQueryVariables>(
    NodesDocument,
    options,
  )
}
export type NodesQueryHookResult = ReturnType<typeof useNodesQuery>
export type NodesLazyQueryHookResult = ReturnType<typeof useNodesLazyQuery>
export type NodesQueryResult = Apollo.QueryResult<
  NodesQuery,
  NodesQueryVariables
>
