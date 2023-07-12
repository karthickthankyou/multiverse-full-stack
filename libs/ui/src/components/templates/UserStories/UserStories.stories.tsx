import type { Meta, StoryObj } from '@storybook/react'
import { UserStories } from './UserStories'
import { UserStoryType } from '@multiverse-org/network/src/gql/generated'
import { LoggedInNoItems, LoggedInWithResults } from '../Cart/Cart.stories'

const meta: Meta<typeof UserStories> = {
  component: UserStories,
}
export default meta

type Story = StoryObj<typeof UserStories>

export const Primary: Story = {
  args: {
    type: UserStoryType.InCart,
  },
  parameters: LoggedInWithResults.parameters,
  decorators: LoggedInWithResults.decorators,
}
