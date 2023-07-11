import type { Meta, StoryObj } from '@storybook/react'
import { CreateStory } from './CreateStory'

const meta: Meta<typeof CreateStory> = {
  component: CreateStory,
}
export default meta

type Story = StoryObj<typeof CreateStory>

export const Primary: Story = {
  render: () => <CreateStory />,
}
