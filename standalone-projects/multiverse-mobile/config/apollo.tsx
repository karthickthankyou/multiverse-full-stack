import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  ApolloProvider as Provider,
  split,
} from '@apollo/client'

import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { ReactNode, useContext } from 'react'
import { UserContext } from '../providers/UserProvider'

export interface IApolloProviderProps {
  children: ReactNode
}

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  const user = useContext(UserContext)

  const authMiddleware = new ApolloLink((operation, forward) => {
    // Get token on each request.
    const token = user?.getIdToken()
    // add the authorization to the headers
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    })
    return forward(operation)
  })

  const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql',
  })

  const httpLinkWithAuth = authMiddleware.concat(httpLink)

  const wsLink = new GraphQLWsLink(
    createClient({
      url: 'ws://localhost:3000/graphql',
      connectionParams: async () => ({
        headers: {
          authorization: `Bearer ${await user?.getIdToken()}`,
        },
      }),
    }),
  )

  // The split function takes three parameters:
  //
  // * A function that's called for each operation to execute
  // * The Link to use for an operation if the function returns a "truthy" value
  // * The Link to use for an operation if the function returns a "falsy" value
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLinkWithAuth,
  )
  // Create an Apollo Client instance
  const apolloClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })

  return <Provider client={apolloClient}>{children}</Provider>
}
