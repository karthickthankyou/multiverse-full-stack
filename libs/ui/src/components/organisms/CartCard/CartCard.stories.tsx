import type { Meta, StoryObj } from '@storybook/react'
import { CartCard } from './CartCard'

const meta: Meta<typeof CartCard> = {
  component: CartCard,
}
export default meta

type Story = StoryObj<typeof CartCard>

export const Primary: Story = {
  render: () => (
    <CartCard
      story={{
        __typename: undefined,
        image: '',
        price: undefined,
        title: '',
        id: 0,
      }}
    />
  ),
}
