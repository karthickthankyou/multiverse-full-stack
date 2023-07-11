import type { Meta, StoryObj } from '@storybook/react'
import Badge from './Badge'

const meta: Meta<typeof Badge> = {
  component: Badge,
}

export default meta
type Story = StoryObj<typeof Badge>

export const Small: Story = {
  args: { children: 'Small badge', size: 'sm', variant: 'primary' },
}

export const Medium: Story = {
  args: { children: 'Medium badge', size: 'md', variant: 'red' },
}

export const Large: Story = {
  args: { children: 'Large badge', size: 'lg', variant: 'yellow' },
}
