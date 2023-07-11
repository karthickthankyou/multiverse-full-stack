import type { Meta, StoryObj } from '@storybook/react'
import { LinkButton } from './LinkButton'

const meta: Meta<typeof LinkButton> = {
  component: LinkButton,
}
export default meta

type Story = StoryObj<typeof LinkButton>

export const Primary: Story = {
  render: (args) => <LinkButton {...args} />,
  args: {
    children: 'Link text',
    href: '/',
  },
}
