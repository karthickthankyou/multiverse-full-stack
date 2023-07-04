import { gql } from 'graphql-request'

export const stories = gql`
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

export const story = gql`
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

export const login = gql`
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

export const register = gql`
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

export const createStory = gql`
  mutation createStory($createStoryInput: CreateStoryInput!) {
    createStory(createStoryInput: $createStoryInput) {
      id
    }
  }
`

export const createNodes = gql`
  mutation createNodes($createMultipleNodesInput: CreateMultipleNodesInput!) {
    createNodes(CreateMultipleNodesInput: $createMultipleNodesInput) {
      id
    }
  }
`

export const nodes = gql`
  query nodes(
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
      end
      start
      content
      choiceNodes {
        id
        choiceText
        choiceNode {
          id
          title
        }
      }
    }
    nodesCount(where: $where) {
      count
    }
  }
`

export const node = gql`
  query node($where: NodeWhereUniqueInput) {
    node(where: $where) {
      id
      title
      image
      end
      start
      content
      choiceNodes {
        id
        choiceText
        choiceNode {
          id
          title
        }
      }
    }
  }
`

export const createManyChoices = gql`
  mutation createManyChoices($createManyChoiceInput: CreateManyChoiceInput!) {
    createManyChoices(createManyChoiceInput: $createManyChoiceInput) {
      id
    }
  }
`

export const choices = gql`
  query choices(
    $where: ChoiceWhereInput
    $orderBy: [ChoiceOrderByWithRelationInput!]
    $cursor: ChoiceWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [ChoiceScalarFieldEnum!]
  ) {
    choices(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    ) {
      id
      choiceText
      choiceNode {
        id
        title
      }
    }
  }
`
