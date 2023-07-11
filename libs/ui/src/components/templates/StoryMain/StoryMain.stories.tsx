import type { Meta, StoryObj } from '@storybook/react'
import { StoryMain } from './StoryMain'

const meta: Meta<typeof StoryMain> = {
  component: StoryMain,
}
export default meta

type Story = StoryObj<typeof StoryMain>

export const Primary: Story = {
  render: () => <StoryMain storyId={0} />,
}
