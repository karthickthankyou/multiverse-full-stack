import type { Meta, StoryObj } from '@storybook/react'
import { Cart } from './Cart'
import { graphql } from 'msw'
import {
  UserStoriesQuery,
  UserStoryType,
  namedOperations,
} from '@multiverse-org/network/src/generated'
import { ReduxAddUid } from '@multiverse-org/store/Provider'

const meta: Meta<typeof Cart> = {
  component: Cart,
}

export default meta

type Story = StoryObj<typeof Cart>

const getCartItemsHandlers = () =>
  graphql.query<UserStoriesQuery>(
    namedOperations.Query.userStories,
    (req, res, ctx) =>
      res(
        ctx.data({
          userStoriesCount: { count: 1 },
          userStories: [
            {
              __typename: 'UserStory',
              createdAt: '',
              story: {
                id: 1,
                image: 'https://placehold.co/400',
                title: 'The story that was added to the cart.',
                __typename: 'Story',
                price: 12,
              },
              type: UserStoryType.InCart,
            },
          ],
        }),
      ),
  )

const getCartItemsHandlersNoResult = () =>
  graphql.query<UserStoriesQuery>(
    namedOperations.Query.userStories,
    (req, res, ctx) =>
      res(
        ctx.data({
          userStoriesCount: { count: 0 },
          userStories: [],
        }),
      ),
  )

export const NotLoggedIn: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [getCartItemsHandlers()],
    },
  },
}

export const LoggedInNoItems: Story = {
  args: {},
  decorators: [(Story) => <ReduxAddUid>{Story()}</ReduxAddUid>],
  parameters: {
    msw: {
      handlers: [getCartItemsHandlersNoResult()],
    },
  },
}

export const LoggedInWithResults: Story = {
  args: {},
  decorators: [(Story) => <ReduxAddUid>{Story()}</ReduxAddUid>],
  parameters: {
    msw: {
      handlers: [getCartItemsHandlers()],
    },
  },
}
