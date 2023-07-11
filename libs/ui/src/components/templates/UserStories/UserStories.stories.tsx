import type { Meta, StoryObj } from '@storybook/react'
import { UserStories } from './UserStories'
import { UserStoryType } from '@multiverse-org/network/src/gql/generated'

const meta: Meta<typeof UserStories> = {
  component: UserStories,
}
export default meta

type Story = StoryObj<typeof UserStories>

export const Primary: Story = {
  render: () => <UserStories type={UserStoryType.InCart} />,
}
