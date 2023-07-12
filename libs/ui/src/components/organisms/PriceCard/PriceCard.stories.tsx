import type { Meta, StoryObj } from '@storybook/react'
import { PriceCard } from './PriceCard'

const meta: Meta<typeof PriceCard> = {
  component: PriceCard,
}
export default meta

type Story = StoryObj<typeof PriceCard>

export const Primary: Story = {
  args: {
    price: 2.99,
  },
}

export const Free: Story = {
  args: {},
}
