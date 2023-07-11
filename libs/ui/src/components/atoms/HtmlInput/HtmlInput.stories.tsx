import type { Meta, StoryObj } from '@storybook/react'
import { HtmlInput } from './HtmlInput'

const meta: Meta<typeof HtmlInput> = {
  component: HtmlInput,
}
export default meta

type Story = StoryObj<typeof HtmlInput>

export const Primary: Story = {
  args: {
    placeholder: 'Type anything...',
  },
}

export const Password: Story = {
  args: {
    placeholder: 'Secret...',
    type: 'password',
  },
}

export const DateTime: Story = {
  args: {
    type: 'datetime-local',
  },
}
