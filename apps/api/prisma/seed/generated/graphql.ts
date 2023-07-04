/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
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
  addChildNodes: Node
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

export type MutationAddChildNodesArgs = {
  childrenNodeIds: Array<Scalars['Int']>
  nodeId: Scalars['Int']
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

export type NodesQueryVariables = Exact<{ [key: string]: never }>

export type NodesQuery = {
  __typename?: 'Query'
  nodes: Array<{ __typename?: 'Node'; id: number }>
}

export const NodesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'nodes' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'nodes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NodesQuery, NodesQueryVariables>
