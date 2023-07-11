import type { Meta, StoryObj } from '@storybook/react'
import { Cart } from './Cart'

const meta: Meta<typeof Cart> = {
  component: Cart,
}
export default meta

type Story = StoryObj<typeof Cart>

export const Primary: Story = {
  render: () => <Cart />,
}
