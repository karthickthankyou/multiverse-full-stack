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

export type AggregateCountOutput = {
  __typename?: 'AggregateCountOutput'
  count: Scalars['Int']
}

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>
  not?: InputMaybe<Scalars['Boolean']>
}

export type CreateMultipleNodesInput = {
  nodes: Array<CreateNodeInput>
}

export type CreateNodeInput = {
  authorId: Scalars['String']
  content: Scalars['String']
  end?: InputMaybe<Scalars['Boolean']>
  image?: InputMaybe<Scalars['String']>
  start?: InputMaybe<Scalars['Boolean']>
  storyId: Scalars['Int']
  title: Scalars['String']
}

export type CreateNodeInputWithoutStory = {
  authorId: Scalars['String']
  content: Scalars['String']
  end?: InputMaybe<Scalars['Boolean']>
  image?: InputMaybe<Scalars['String']>
  start?: InputMaybe<Scalars['Boolean']>
  title: Scalars['String']
}

export type CreateStoryInput = {
  authorId: Scalars['String']
  image: Scalars['String']
  nodes: Array<CreateNodeInputWithoutStory>
  title: Scalars['String']
}

export type CreateUserInput = {
  name?: InputMaybe<Scalars['String']>
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

export type LoginInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type LoginOutput = {
  __typename?: 'LoginOutput'
  displayName: Scalars['String']
  email: Scalars['String']
  expiresIn: Scalars['String']
  idToken: Scalars['String']
  kind: Scalars['String']
  localId: Scalars['String']
  refreshToken: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createNode: Node
  createNodes: Array<Node>
  createStory: Story
  createUser: User
  login: LoginOutput
  logout: Scalars['Boolean']
  refreshToken: RefreshTokenOutput
  register: RegisterOutput
  removeNode: Node
  removeStory: Story
  removeUser: User
  setAdmin: Scalars['Boolean']
  setRole: Scalars['Boolean']
  updateNode: Node
  updateStory: Story
  updateUser: User
}

export type MutationCreateNodeArgs = {
  createNodeInput: CreateNodeInput
}

export type MutationCreateNodesArgs = {
  CreateMultipleNodesInput: CreateMultipleNodesInput
}

export type MutationCreateStoryArgs = {
  createStoryInput: CreateStoryInput
}

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput
}

export type MutationLoginArgs = {
  credentials: LoginInput
}

export type MutationRefreshTokenArgs = {
  refreshTokenInput: RefreshTokenInput
}

export type MutationRegisterArgs = {
  credentials: RegisterInput
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

export type MutationSetAdminArgs = {
  uid: Scalars['String']
}

export type MutationSetRoleArgs = {
  setRoleInput: SetRoleInput
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
  author?: Maybe<User>
  authorId: Scalars['String']
  childNodes?: Maybe<Array<Node>>
  content: Scalars['String']
  createdAt: Scalars['DateTime']
  end?: Maybe<Scalars['Boolean']>
  id: Scalars['Int']
  image?: Maybe<Scalars['String']>
  parentNodes?: Maybe<Array<Node>>
  start?: Maybe<Scalars['Boolean']>
  story?: Maybe<Story>
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
  childNodes?: InputMaybe<NodeOrderByRelationAggregateInput>
  content?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  end?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  image?: InputMaybe<SortOrder>
  parentNodes?: InputMaybe<NodeOrderByRelationAggregateInput>
  start?: InputMaybe<SortOrder>
  story?: InputMaybe<StoryOrderByWithRelationInput>
  storyId?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export enum NodeScalarFieldEnum {
  AuthorId = 'authorId',
  Content = 'content',
  CreatedAt = 'createdAt',
  End = 'end',
  Id = 'id',
  Image = 'image',
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
  childNodes?: InputMaybe<NodeListRelationFilter>
  content?: InputMaybe<StringFilter>
  createdAt?: InputMaybe<DateTimeFilter>
  end?: InputMaybe<BoolFilter>
  id?: InputMaybe<IntFilter>
  image?: InputMaybe<StringFilter>
  parentNodes?: InputMaybe<NodeListRelationFilter>
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
  nodesCount: AggregateCountOutput
  stories: Array<Story>
  story: Story
  user?: Maybe<User>
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

export type QueryNodesCountArgs = {
  where?: InputMaybe<NodeWhereInput>
}

export type QueryStoriesArgs = {
  cursor?: InputMaybe<StoryWhereUniqueInput>
  distinct?: InputMaybe<Array<StoryScalarFieldEnum>>
  orderBy?: InputMaybe<Array<StoryOrderByWithRelationInput>>
  searchTerm?: InputMaybe<Scalars['String']>
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

export type RefreshTokenInput = {
  refresh_token: Scalars['String']
}

export type RefreshTokenOutput = {
  __typename?: 'RefreshTokenOutput'
  access_token: Scalars['String']
  expires_in: Scalars['String']
  id_token: Scalars['String']
  project_id: Scalars['String']
  refresh_token: Scalars['String']
  token_type: Scalars['String']
  user_id: Scalars['String']
}

export type RegisterInput = {
  displayName?: InputMaybe<Scalars['String']>
  email: Scalars['String']
  password: Scalars['String']
}

export type RegisterOutput = {
  __typename?: 'RegisterOutput'
  displayName: Scalars['String']
  email: Scalars['String']
  expiresIn: Scalars['String']
  idToken: Scalars['String']
  kind: Scalars['String']
  localId: Scalars['String']
  refreshToken: Scalars['String']
}

/** Enum for roles */
export enum RoleEnum {
  Admin = 'admin',
  Manager = 'manager',
}

export type SetRoleInput = {
  role: RoleEnum
  uid: Scalars['String']
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type Story = {
  __typename?: 'Story'
  author?: Maybe<User>
  authorId: Scalars['String']
  createdAt: Scalars['DateTime']
  id: Scalars['Int']
  image: Scalars['String']
  nodes?: Maybe<Array<Node>>
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
  image?: InputMaybe<SortOrder>
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
  Image = 'image',
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
  image?: InputMaybe<StringFilter>
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
  image?: InputMaybe<Scalars['String']>
  start?: InputMaybe<Scalars['Boolean']>
  storyId?: InputMaybe<Scalars['Int']>
  title?: InputMaybe<Scalars['String']>
}

export type UpdateStoryInput = {
  authorId?: InputMaybe<Scalars['String']>
  id: Scalars['Int']
  image?: InputMaybe<Scalars['String']>
  nodes?: InputMaybe<Array<CreateNodeInputWithoutStory>>
  title?: InputMaybe<Scalars['String']>
}

export type UpdateUserInput = {
  name?: InputMaybe<Scalars['String']>
  uid: Scalars['String']
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['DateTime']
  name?: Maybe<Scalars['String']>
  stories?: Maybe<Array<Story>>
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

export type StoriesQueryVariables = Exact<{
  where?: InputMaybe<StoryWhereInput>
  orderBy?: InputMaybe<
    Array<StoryOrderByWithRelationInput> | StoryOrderByWithRelationInput
  >
  cursor?: InputMaybe<StoryWhereUniqueInput>
  take?: InputMaybe<Scalars['Int']>
  skip?: InputMaybe<Scalars['Int']>
  distinct?: InputMaybe<Array<StoryScalarFieldEnum> | StoryScalarFieldEnum>
  searchTerm?: InputMaybe<Scalars['String']>
}>

export type StoriesQuery = {
  __typename?: 'Query'
  stories: Array<{
    __typename?: 'Story'
    id: number
    title: string
    image: string
  }>
}

export type StoryQueryVariables = Exact<{
  where?: InputMaybe<StoryWhereUniqueInput>
}>

export type StoryQuery = {
  __typename?: 'Query'
  story: {
    __typename?: 'Story'
    authorId: string
    createdAt: any
    id: number
    image: string
    title: string
    updatedAt: any
    author?: { __typename?: 'User'; uid: string; name?: string | null } | null
    nodes?: Array<{
      __typename?: 'Node'
      id: number
      image?: string | null
      end?: boolean | null
      start?: boolean | null
      title: string
      content: string
    }> | null
  }
}

export type LoginMutationVariables = Exact<{
  credentials: LoginInput
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login: {
    __typename?: 'LoginOutput'
    refreshToken: string
    localId: string
    kind: string
    idToken: string
    expiresIn: string
    email: string
    displayName: string
  }
}

export type RegisterMutationVariables = Exact<{
  credentials: RegisterInput
}>

export type RegisterMutation = {
  __typename?: 'Mutation'
  register: {
    __typename?: 'RegisterOutput'
    refreshToken: string
    localId: string
    kind: string
    idToken: string
    expiresIn: string
    email: string
    displayName: string
  }
}

export type CreateStoryMutationVariables = Exact<{
  createStoryInput: CreateStoryInput
}>

export type CreateStoryMutation = {
  __typename?: 'Mutation'
  createStory: { __typename?: 'Story'; id: number }
}

export type CreateNodesMutationVariables = Exact<{
  createMultipleNodesInput: CreateMultipleNodesInput
}>

export type CreateNodesMutation = {
  __typename?: 'Mutation'
  createNodes: Array<{ __typename?: 'Node'; id: number }>
}

export type NodesQueryVariables = Exact<{
  where?: InputMaybe<NodeWhereInput>
  orderBy?: InputMaybe<
    Array<NodeOrderByWithRelationInput> | NodeOrderByWithRelationInput
  >
  cursor?: InputMaybe<NodeWhereUniqueInput>
  take?: InputMaybe<Scalars['Int']>
  skip?: InputMaybe<Scalars['Int']>
  distinct?: InputMaybe<Array<NodeScalarFieldEnum> | NodeScalarFieldEnum>
}>

export type NodesQuery = {
  __typename?: 'Query'
  nodes: Array<{
    __typename?: 'Node'
    id: number
    title: string
    image?: string | null
  }>
  nodesCount: { __typename?: 'AggregateCountOutput'; count: number }
}

export const namedOperations = {
  Query: {
    stories: 'stories',
    story: 'story',
    Nodes: 'Nodes',
  },
  Mutation: {
    Login: 'Login',
    register: 'register',
    createStory: 'createStory',
    createNodes: 'createNodes',
  },
}

export const StoriesDocument = /*#__PURE__*/ gql`
  query stories(
    $where: StoryWhereInput
    $orderBy: [StoryOrderByWithRelationInput!]
    $cursor: StoryWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [StoryScalarFieldEnum!]
    $searchTerm: String
  ) {
    stories(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
      searchTerm: $searchTerm
    ) {
      id
      title
      image
    }
  }
`

/**
 * __useStoriesQuery__
 *
 * To run a query within a React component, call `useStoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStoriesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useStoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<StoriesQuery, StoriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<StoriesQuery, StoriesQueryVariables>(
    StoriesDocument,
    options,
  )
}
export function useStoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    StoriesQuery,
    StoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<StoriesQuery, StoriesQueryVariables>(
    StoriesDocument,
    options,
  )
}
export type StoriesQueryHookResult = ReturnType<typeof useStoriesQuery>
export type StoriesLazyQueryHookResult = ReturnType<typeof useStoriesLazyQuery>
export type StoriesQueryResult = Apollo.QueryResult<
  StoriesQuery,
  StoriesQueryVariables
>
export const StoryDocument = /*#__PURE__*/ gql`
  query story($where: StoryWhereUniqueInput) {
    story(where: $where) {
      author {
        uid
        name
      }
      authorId
      createdAt
      id
      image
      nodes {
        id
        image
        end
        start
        title
        content
      }
      title
      updatedAt
    }
  }
`

/**
 * __useStoryQuery__
 *
 * To run a query within a React component, call `useStoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStoryQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useStoryQuery(
  baseOptions?: Apollo.QueryHookOptions<StoryQuery, StoryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<StoryQuery, StoryQueryVariables>(
    StoryDocument,
    options,
  )
}
export function useStoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<StoryQuery, StoryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<StoryQuery, StoryQueryVariables>(
    StoryDocument,
    options,
  )
}
export type StoryQueryHookResult = ReturnType<typeof useStoryQuery>
export type StoryLazyQueryHookResult = ReturnType<typeof useStoryLazyQuery>
export type StoryQueryResult = Apollo.QueryResult<
  StoryQuery,
  StoryQueryVariables
>
export const LoginDocument = /*#__PURE__*/ gql`
  mutation Login($credentials: LoginInput!) {
    login(credentials: $credentials) {
      refreshToken
      localId
      kind
      idToken
      expiresIn
      email
      displayName
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const RegisterDocument = /*#__PURE__*/ gql`
  mutation register($credentials: RegisterInput!) {
    register(credentials: $credentials) {
      refreshToken
      localId
      kind
      idToken
      expiresIn
      email
      displayName
    }
  }
`
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options,
  )
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>
export const CreateStoryDocument = /*#__PURE__*/ gql`
  mutation createStory($createStoryInput: CreateStoryInput!) {
    createStory(createStoryInput: $createStoryInput) {
      id
    }
  }
`
export type CreateStoryMutationFn = Apollo.MutationFunction<
  CreateStoryMutation,
  CreateStoryMutationVariables
>

/**
 * __useCreateStoryMutation__
 *
 * To run a mutation, you first call `useCreateStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStoryMutation, { data, loading, error }] = useCreateStoryMutation({
 *   variables: {
 *      createStoryInput: // value for 'createStoryInput'
 *   },
 * });
 */
export function useCreateStoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateStoryMutation,
    CreateStoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateStoryMutation, CreateStoryMutationVariables>(
    CreateStoryDocument,
    options,
  )
}
export type CreateStoryMutationHookResult = ReturnType<
  typeof useCreateStoryMutation
>
export type CreateStoryMutationResult =
  Apollo.MutationResult<CreateStoryMutation>
export type CreateStoryMutationOptions = Apollo.BaseMutationOptions<
  CreateStoryMutation,
  CreateStoryMutationVariables
>
export const CreateNodesDocument = /*#__PURE__*/ gql`
  mutation createNodes($createMultipleNodesInput: CreateMultipleNodesInput!) {
    createNodes(CreateMultipleNodesInput: $createMultipleNodesInput) {
      id
    }
  }
`
export type CreateNodesMutationFn = Apollo.MutationFunction<
  CreateNodesMutation,
  CreateNodesMutationVariables
>

/**
 * __useCreateNodesMutation__
 *
 * To run a mutation, you first call `useCreateNodesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNodesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNodesMutation, { data, loading, error }] = useCreateNodesMutation({
 *   variables: {
 *      createMultipleNodesInput: // value for 'createMultipleNodesInput'
 *   },
 * });
 */
export function useCreateNodesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateNodesMutation,
    CreateNodesMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateNodesMutation, CreateNodesMutationVariables>(
    CreateNodesDocument,
    options,
  )
}
export type CreateNodesMutationHookResult = ReturnType<
  typeof useCreateNodesMutation
>
export type CreateNodesMutationResult =
  Apollo.MutationResult<CreateNodesMutation>
export type CreateNodesMutationOptions = Apollo.BaseMutationOptions<
  CreateNodesMutation,
  CreateNodesMutationVariables
>
export const NodesDocument = /*#__PURE__*/ gql`
  query Nodes(
    $where: NodeWhereInput
    $orderBy: [NodeOrderByWithRelationInput!]
    $cursor: NodeWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [NodeScalarFieldEnum!]
  ) {
    nodes(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    ) {
      id
      title
      image
    }
    nodesCount(where: $where) {
      count
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
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      distinct: // value for 'distinct'
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
