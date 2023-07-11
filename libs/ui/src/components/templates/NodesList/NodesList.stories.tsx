import type { Meta, StoryObj } from '@storybook/react'
import { NodesList } from './NodesList'

const meta: Meta<typeof NodesList> = {
  component: NodesList,
}
export default meta

type Story = StoryObj<typeof NodesList>

export const Primary: Story = {
  render: () => <NodesList storyId={0} />,
}
