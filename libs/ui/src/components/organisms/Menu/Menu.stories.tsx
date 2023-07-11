import type { Meta, StoryObj } from '@storybook/react'
import { Menu } from './Menu'

const meta: Meta<typeof Menu> = {
  component: Menu,
}
export default meta

type Story = StoryObj<typeof Menu>

export const Primary: Story = {
  render: () => <Menu open={true} />,
}

export const ClosedMenu: Story = {
  render: () => <Menu open={false} />,
}
