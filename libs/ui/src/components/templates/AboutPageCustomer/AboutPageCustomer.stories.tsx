import type { Meta, StoryObj } from '@storybook/react'
import { AboutPageCustomer } from './AboutPageCustomer'

const meta: Meta<typeof AboutPageCustomer> = {
  component: AboutPageCustomer,
}
export default meta

type Story = StoryObj<typeof AboutPageCustomer>

export const Primary: Story = {
  render: () => <AboutPageCustomer />,
}
