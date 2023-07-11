import type { Meta, StoryObj } from '@storybook/react'
import { HeaderText } from './HeaderText'

const meta: Meta<typeof HeaderText> = {
  component: HeaderText,
}
export default meta
type Story = StoryObj<typeof HeaderText>

export const Primary: Story = {
  render: () => {
    return <HeaderText>The opinionated header text.</HeaderText>
  },
}
