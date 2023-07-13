import type { Meta, StoryObj } from '@storybook/react'
import { NodesList } from './NodesList'
import { graphql } from 'msw'
import {
  NodesQuery,
  namedOperations,
} from '@multiverse-org/network/src/generated'

const meta: Meta<typeof NodesList> = {
  component: NodesList,
}
export default meta

type Story = StoryObj<typeof NodesList>

export const Primary: Story = {
  args: {
    storyId: 0,
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query<NodesQuery>(
          namedOperations.Query.nodes,
          (req, res, ctx) =>
            res(
              ctx.data({
                nodesCount: { count: 1 },
                nodes: [
                  {
                    content: 'This is sampel content.',
                    id: 1,
                    storyId: 0,
                    title: 'Story in my nodes list',
                    __typename: 'Node',
                    choices: [
                      {
                        choiceText: 'Choice text',
                        choiceNode: { id: 1, title: 'Choice' },
                        id: 1,
                      },
                    ],
                  },
                ],
              }),
            ),
        ),
      ],
    },
  },
}

export const Loading: Story = {
  args: {
    storyId: 0,
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query<NodesQuery>(
          namedOperations.Query.nodes,
          (req, res, ctx) => res(ctx.delay(99999999)),
        ),
      ],
    },
  },
}

export const Error: Story = {
  args: {
    storyId: -99,
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query<NodesQuery>(
          namedOperations.Query.nodes,
          (req, res, ctx) =>
            res(
              ctx.errors([
                {
                  message:
                    'Some super complex error message about prisma or something that only the developers care about.',
                },
              ]),
            ),
        ),
      ],
    },
  },
}
