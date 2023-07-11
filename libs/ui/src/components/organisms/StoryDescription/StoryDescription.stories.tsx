import type { Meta, StoryObj } from '@storybook/react'
import { StoryDescription } from './StoryDescription'

const meta: Meta<typeof StoryDescription> = {
  component: StoryDescription,
}
export default meta

type Story = StoryObj<typeof StoryDescription>

export const Primary: Story = {
  render: () => <StoryDescription />,
}
