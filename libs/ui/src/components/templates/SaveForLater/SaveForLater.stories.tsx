import type { Meta, StoryObj } from '@storybook/react'
import { SaveForLater } from './SaveForLater'

const meta: Meta<typeof SaveForLater> = {
  component: SaveForLater,
}
export default meta

type Story = StoryObj<typeof SaveForLater>

export const Primary: Story = {
  render: () => <SaveForLater />,
}
