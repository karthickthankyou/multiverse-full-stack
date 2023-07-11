import type { Meta, StoryObj } from '@storybook/react'
import { Container } from './Container'

const meta: Meta<typeof Container> = {
  component: Container,
}
export default meta

type Story = StoryObj<typeof Container>

export const Primary: Story = {
  args: {
    children: `Hey! Look! I'm inside a container.`,
    className: 'bg-gray-200 h-64',
  },
  render: (args) => <Container {...args} />,
}
