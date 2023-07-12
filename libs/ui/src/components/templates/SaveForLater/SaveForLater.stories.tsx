import type { Meta, StoryObj } from '@storybook/react'
import { SaveForLater } from './SaveForLater'
import { ReduxAddUid } from '@multiverse-org/store/Provider'
import { graphql } from 'msw'
import {
  UserStoriesQuery,
  namedOperations,
} from '@multiverse-org/network/src/gql/generated'

const meta: Meta<typeof SaveForLater> = {
  component: SaveForLater,
}
export default meta

type Story = StoryObj<typeof SaveForLater>

export const NotLoggedIn: Story = {}
export const LoggedInNoContent: Story = {
  decorators: [(Story) => <ReduxAddUid>{Story()}</ReduxAddUid>],
  parameters: {
    msw: {
      handlers: [
        graphql.query<UserStoriesQuery>(
          namedOperations.Query.userStories,
          (req, res, ctx) =>
            res(ctx.data({ userStories: [], userStoriesCount: { count: 0 } })),
        ),
      ],
    },
  },
}
export const LoggedInContent: Story = {
  decorators: [(Story) => <ReduxAddUid>{Story()}</ReduxAddUid>],
  parameters: {
    msw: {
      handlers: [
        graphql.query<UserStoriesQuery>(
          namedOperations.Query.userStories,
          (req, res, ctx) =>
            res(
              ctx.data({
                userStories: [
                  {
                    createdAt: '',
                    story: {
                      id: 1,
                      image: 'https://placehold.co/400',
                      title: 'The story in the saved for later.',
                      price: 12.99,
                    },
                  },
                ],
                userStoriesCount: { count: 1 },
              }),
            ),
        ),
      ],
    },
  },
}
