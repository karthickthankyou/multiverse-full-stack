import type { Meta, StoryObj } from '@storybook/react'
import { CartSummary } from './CartSummary'

const meta: Meta<typeof CartSummary> = {
  component: CartSummary,
}
export default meta

type Story = StoryObj<typeof CartSummary>

export const Primary: Story = {
  args: {
    cartItems: [
      {
        createdAt: new Date(),
        story: {
          id: 1,
          image: 'https://placehold.co/400',
          title: 'Yes or no.',
          price: 2.99,
        },
      },
      {
        createdAt: new Date(),
        story: {
          id: 2,
          image: 'https://placehold.co/400',
          title: 'Me or you.',
          price: 0.99,
        },
      },
    ],
  },
}

export const Empty: Story = {
  args: {
    cartItems: [],
  },
}
