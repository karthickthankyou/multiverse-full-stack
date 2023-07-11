import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from './ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
}
export default meta

type Story = StoryObj<typeof ProgressBar>

export const FiftyPercent: Story = {
  args: {
    value: 50,
    variant: 'determinate',
  },
}

export const EightyPercent: Story = {
  args: {
    value: 80,
    variant: 'determinate',
  },
}

export const Indeterminate: Story = {
  args: {
    variant: 'indeterminate',
  },
}
