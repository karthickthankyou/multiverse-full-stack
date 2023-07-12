import type { Meta, StoryObj } from '@storybook/react'
import { CreateStory } from './CreateStory'
import { ReduxAddUid } from '@multiverse-org/store/Provider'

const meta: Meta<typeof CreateStory> = {
  component: CreateStory,
}
export default meta

type Story = StoryObj<typeof CreateStory>

export const NotLoggedIn: Story = {
  args: {},
}

export const Primary: Story = {
  args: {},
  decorators: [(Story) => <ReduxAddUid>{Story()}</ReduxAddUid>],
}
