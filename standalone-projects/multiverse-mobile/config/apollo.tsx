import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  ApolloProvider as Provider,
  split,
} from '@apollo/client'

import { Observable, getMainDefinition } from '@apollo/client/utilities'
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
    return new Observable((observer) => {
      user
        ?.getIdToken()
        .then((token) => {
          operation.setContext({
            headers: {
              authorization: token ? `Bearer ${token}` : '',
            },
          })

          const subscriber = {
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          }

          // Note: If the promise was rejected, we're not forwarding the operation
          // and instead sending the error directly to the observer.
          // In the case you want to forward the operation even when the promise
          // was rejected, you would move this line into the Promise callback
          // right after setting the operation context.
          forward(operation).subscribe(subscriber)
        })
        .catch(observer.error.bind(observer))
    })
  })

  const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql',
  })

  const httpLinkWithAuth = authMiddleware.concat(httpLink)

  const wsLink = new GraphQLWsLink(
    createClient({
      url: 'ws://localhost:3000/graphql',
      connectionParams: () =>
        user?.getIdToken().then((token) => ({
          headers: {
            authorization: `Bearer ${token}`,
          },
        })),
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
