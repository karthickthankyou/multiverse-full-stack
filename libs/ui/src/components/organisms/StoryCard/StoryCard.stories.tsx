import type { Meta, StoryObj } from '@storybook/react'
import { StoryCard } from './StoryCard'

const meta: Meta<typeof StoryCard> = {
  component: StoryCard,
}
export default meta
type Story = StoryObj<typeof StoryCard>

export const Primary: Story = {
  render: () => (
    <StoryCard
      story={{
        __typename: undefined,
        id: 0,
        title: '',
        image: '',
        price: undefined,
        userStory: undefined,
      }}
    />
  ),
}
