import type { Meta, StoryObj } from '@storybook/react'
import { MyStoryCard } from './MyStoryCard'

const meta: Meta<typeof MyStoryCard> = {
  component: MyStoryCard,
}
export default meta

type Story = StoryObj<typeof MyStoryCard>

export const Primary: Story = {}
