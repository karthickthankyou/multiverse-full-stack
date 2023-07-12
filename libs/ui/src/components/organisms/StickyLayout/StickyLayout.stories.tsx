import type { Meta, StoryObj } from '@storybook/react'
import { StickyLayout } from './StickyLayout'

const meta: Meta<typeof StickyLayout> = {
  component: StickyLayout,
}
export default meta

type Story = StoryObj<typeof StickyLayout>

export const Primary: Story = {
  render: () => (
    <StickyLayout
      sidebarContent={
        <div className="h-screen p-2 bg-gray-50">'Sidebar content'</div>
      }
    >
      <div className="h-screen p-2 bg-gray-50">
        Hello sticky layout children
      </div>
    </StickyLayout>
  ),
}
const array = Array.from({ length: 50 }, (_, i) => i + 1)

export const Scrollable: Story = {
  render: () => (
    <StickyLayout
      sidebarContent={
        <div className="h-screen p-2 bg-gray-50">'Sidebar content'</div>
      }
    >
      <div className="flex flex-col gap-12 p-2 bg-gray-50">
        {array.map((num) => (
          <div key={num}>{num}</div>
        ))}
      </div>
    </StickyLayout>
  ),
}
