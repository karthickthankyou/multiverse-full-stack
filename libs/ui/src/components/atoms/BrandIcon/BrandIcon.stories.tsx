import type { Meta, StoryObj } from '@storybook/react'
import { BrandIcon } from './BrandIcon'

const meta: Meta<typeof BrandIcon> = {
  component: BrandIcon,
}
export default meta

type Story = StoryObj<typeof BrandIcon>

export const Primary: Story = {
  render: () => <BrandIcon />,
}
