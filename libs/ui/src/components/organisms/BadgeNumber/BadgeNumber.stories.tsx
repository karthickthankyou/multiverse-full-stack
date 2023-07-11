import type { Meta, StoryObj } from '@storybook/react'
import { BadgeNumber } from './BadgeNumber'

const meta: Meta<typeof BadgeNumber> = {
  component: BadgeNumber,
}
export default meta

type Story = StoryObj<typeof BadgeNumber>

export const Primary: Story = {
  render: () => <BadgeNumber count={34} children={'BadgeChild'} />,
}
