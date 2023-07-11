import type { Meta, StoryObj } from '@storybook/react'
import { SearchStories } from './SearchStories'

const meta: Meta<typeof SearchStories> = {
  component: SearchStories,
}
export default meta

type Story = StoryObj<typeof SearchStories>

export const Primary: Story = {
  render: () => <SearchStories />,
}
