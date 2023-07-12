import type { Meta, StoryObj } from '@storybook/react'
import { PlayStory } from './PlayStory'
import { graphql } from 'msw'
import {
  NodeQuery,
  namedOperations,
} from '@multiverse-org/network/src/gql/generated'

const meta: Meta<typeof PlayStory> = {
  component: PlayStory,
}
export default meta

type Story = StoryObj<typeof PlayStory>

export const Primary: Story = {
  args: {
    story: {
      __typename: undefined,
      authorId: '',
      createdAt: undefined,
      id: 0,
      image: 'https://placehold.co/400',
      price: undefined,
      description: '',
      title: 'The sample story in the play',
      updatedAt: undefined,
      author: undefined,
      startingNodes: [
        { id: 1, title: 'Pick life' },
        { id: 2, title: 'Pick wife.' },
      ],
      userStory: undefined,
      nodes: undefined,
    },
  },
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
      ],
    },
  },
}
