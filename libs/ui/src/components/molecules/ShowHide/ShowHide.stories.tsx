import type { Meta, StoryObj } from '@storybook/react'
import { ShowHide } from './ShowHide'

const meta: Meta<typeof ShowHide> = {
  component: ShowHide,
}
export default meta

type Story = StoryObj<typeof ShowHide>

export const Primary: Story = {
  args: {
    show: true,
    children: 'Hello there.',
  },
}

export const Hidden: Story = {
  args: {
    children: 'Wow. You have discovered the hidden content!!!',
    show: false,
  },
}
