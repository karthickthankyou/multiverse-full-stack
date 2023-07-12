import type { Meta, StoryObj } from '@storybook/react'
import { CartCard } from './CartCard'

const meta: Meta<typeof CartCard> = {
  component: CartCard,
}
export default meta

type Story = StoryObj<typeof CartCard>

export const Primary: Story = {
  args: {
    story: {
      id: 1,
      image: 'https://placehold.co/400',
      title: 'This is the way',
      price: 2.99,
    },
  },
}

export const Free: Story = {
  args: {
    story: {
      id: 1,
      image: 'https://placehold.co/400',
      title: 'This is the way',
    },
  },
}
