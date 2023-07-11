import type { Meta, StoryObj } from '@storybook/react'
import Tooltip from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
}
export default meta
type Story = StoryObj<typeof Tooltip>

export const Primary: Story = {
  args: {
    title: 'Hello World',
    arrow: true,
    children: <div className="inline">Hover over me.</div>,
  },
}

export const Right: Story = {
  args: {
    title: 'Hello World',
    arrow: true,
    placement: 'right',
    children: <div className="inline">Hover over me.</div>,
  },
}
