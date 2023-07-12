import type { Meta, StoryObj } from '@storybook/react'
import { BadgeNumber } from './BadgeNumber'
import { IconShoppingBag } from '@tabler/icons-react'

const meta: Meta<typeof BadgeNumber> = {
  component: BadgeNumber,
  decorators: [(Story) => <div className="w-6">{Story()}</div>],
}
export default meta

type Story = StoryObj<typeof BadgeNumber>

export const Primary: Story = {
  args: {
    children: <IconShoppingBag />,
    count: 9,
  },
  render: (args) => <BadgeNumber {...args} />,
}

export const MoreThanNine: Story = {
  args: {
    children: <IconShoppingBag />,
    count: 90,
  },
  render: (args) => <BadgeNumber {...args} />,
}
