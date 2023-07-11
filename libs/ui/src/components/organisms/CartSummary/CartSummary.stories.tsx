import type { Meta, StoryObj } from '@storybook/react'
import { CartSummary } from './CartSummary'

const meta: Meta<typeof CartSummary> = {
  component: CartSummary,
}
export default meta

type Story = StoryObj<typeof CartSummary>

export const Primary: Story = {
  render: () => <CartSummary cartItems={[]} />,
}
