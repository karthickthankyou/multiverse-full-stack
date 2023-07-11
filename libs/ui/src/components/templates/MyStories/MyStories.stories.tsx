import type { Meta, StoryObj } from '@storybook/react'
import { MyStories } from './MyStories'

const meta: Meta<typeof MyStories> = {
  component: MyStories,
}
export default meta

type Story = StoryObj<typeof MyStories>

export const Primary: Story = {
  render: () => <MyStories />,
}
