import type { Meta, StoryObj } from '@storybook/react'
import { NavSidebar } from './NavSidebar'

const meta: Meta<typeof NavSidebar> = {
  component: NavSidebar,
}
export default meta

type Story = StoryObj<typeof NavSidebar>

export const Primary: Story = {
  render: () => <NavSidebar menuItems={[]} />,
}
