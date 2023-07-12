import type { Meta, StoryObj } from '@storybook/react'
import { graphql } from 'msw'
import { AddChoicesDialog } from './AddChoicesDialog'
import {
  Choice,
  ChoicesQuery,
  NodesQuery,
  namedOperations,
} from '@multiverse-org/network/src/gql/generated'

const meta: Meta<typeof AddChoicesDialog> = {
  component: AddChoicesDialog,
}
export default meta

type Story = StoryObj<typeof AddChoicesDialog>

export const Primary: Story = {
  render: () => (
    <AddChoicesDialog
      node={{
        __typename: undefined,
        id: 0,
        title: '',
        image: undefined,
        end: undefined,
        start: undefined,
        storyId: 0,
        content: '',
        choiceNodes: undefined,
      }}
    />
  ),
  parameters: {
    msw: {
      handlers: [
        graphql.query<ChoicesQuery>(
          namedOperations.Query.choices,
          (req, res, ctx) => {
            return res(
              ctx.data({
                choices: [],
              }),
            )
          },
        ),
        graphql.query<NodesQuery>(
          namedOperations.Query.nodes,
          (req, res, ctx) => {
            return res(
              ctx.data({
                nodesCount: { count: 12 },
                __typename: 'Query',
                nodes: [
                  {
                    content: 'Hey there',
                    id: 1,
                    storyId: 1,
                    title: 'Fine me.',
                    __typename: 'Node',
                    choiceNodes: [],
                    end: true,
                  },
                  {
                    content: 'Hey there 2',
                    id: 2,
                    storyId: 1,
                    title: 'Fine me 2.',
                    __typename: 'Node',
                    choiceNodes: [],
                  },
                ],
              }),
            )
          },
        ),
        graphql.mutation<Choice[]>(
          namedOperations.Mutation.createManyChoices,
          (req, res, ctx) => {
            return res(ctx.data(req.variables.createManyChoiceInput.choices))
          },
        ),
      ],
    },
  },
}
