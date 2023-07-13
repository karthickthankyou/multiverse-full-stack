import type { Meta, StoryObj } from '@storybook/react'
import { StoryMain } from './StoryMain'
import { graphql } from 'msw'
import {
  NodeQuery,
  StoryQuery,
  UserStoryType,
  namedOperations,
} from '@multiverse-org/network/src/generated'

const meta: Meta<typeof StoryMain> = {
  component: StoryMain,
}
export default meta

type Story = StoryObj<typeof StoryMain>

export const PrimaryUnPurchased: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query<StoryQuery>(
          namedOperations.Query.story,
          (req, res, ctx) => {
            return res(
              ctx.data({
                story: {
                  price: 0,
                  authorId: '1',
                  createdAt: '',
                  description: 'Description of sample story',
                  id: 1,
                  image: 'https://placehold.co/400',
                  title: 'Sample story in the story main component',
                  updatedAt: '',
                  __typename: 'Story',
                },
              }),
            )
          },
        ),
      ],
    },
  },
}

export const PrimaryPurchased: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query<NodeQuery>(namedOperations.Query.node, (req, res, ctx) =>
          res(
            ctx.data({
              node: {
                content:
                  'Good choice indeed. Now click reset to replay this immersive game once again.',
                id: 1,
                title: 'Good choice.',
              },
            }),
          ),
        ),
        graphql.query<StoryQuery>(
          namedOperations.Query.story,
          (req, res, ctx) => {
            return res(
              ctx.data({
                story: {
                  authorId: '1',
                  price: 0,
                  createdAt: '',
                  description: 'Description of sample story',
                  id: 1,
                  image: 'https://placehold.co/400',
                  title: 'Sample story in the story main component',
                  updatedAt: '',
                  __typename: 'Story',
                  userStory: {
                    type: UserStoryType.Purchased,
                  },
                  startingNodes: [
                    { id: 1, title: 'Choose this.' },
                    { id: 1, title: 'Choose that.' },
                  ],
                },
              }),
            )
          },
        ),
      ],
    },
  },
}
