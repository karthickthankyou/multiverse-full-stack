import type { Meta, StoryObj } from '@storybook/react'
import { HeaderInfo } from './HeaderInfo'
import { graphql } from 'msw'
import {
  UserStoriesCountQuery,
  namedOperations,
} from '@multiverse-org/network/src/generated'
import { ReduxAddUid } from '@multiverse-org/store/Provider'

const meta: Meta<typeof HeaderInfo> = {
  component: HeaderInfo,
  decorators: [(Story) => <div className="flex gap-2">{Story()}</div>],
}
export default meta

type Story = StoryObj<typeof HeaderInfo>

export const Primary: Story = {
  render: () => (
    <ReduxAddUid>
      <HeaderInfo />
    </ReduxAddUid>
  ),
  parameters: {
    msw: {
      handlers: [
        graphql.query<UserStoriesCountQuery>(
          namedOperations.Query.userStoriesCount,
          (req, res, ctx) => {
            return res(
              ctx.data({ userStoriesCount: { count: 3 }, __typename: 'Query' }),
            )
          },
        ),
      ],
    },
  },
}
