import type { Meta, StoryObj } from '@storybook/react'
import { SaveForLaterCard } from './SaveForLaterCard'

const meta: Meta<typeof SaveForLaterCard> = {
  component: SaveForLaterCard,
}
export default meta

type Story = StoryObj<typeof SaveForLaterCard>

export const Primary: Story = {
  args: {
    story: {
      id: 2,
      image: 'https://placehold.co/400',
      title: 'Sample title',
      __typename: 'Story',
      price: 2.99,
    },
  },
}
