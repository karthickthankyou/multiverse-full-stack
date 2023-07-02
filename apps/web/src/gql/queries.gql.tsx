import { gql } from 'graphql-request'

export const nodes = gql`
  query nodes {
    nodes {
      id
    }
  }
`
