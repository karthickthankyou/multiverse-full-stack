import type { Meta, StoryObj } from '@storybook/react'
import { StickyLayout } from './StickyLayout'

const meta: Meta<typeof StickyLayout> = {
  component: StickyLayout,
}
export default meta

type Story = StoryObj<typeof StickyLayout>

export const Primary: Story = {
  render: () => (
    <StickyLayout sidebarContent={'Sidebar content'}>
      Hello sticky layout children
    </StickyLayout>
  ),
}
