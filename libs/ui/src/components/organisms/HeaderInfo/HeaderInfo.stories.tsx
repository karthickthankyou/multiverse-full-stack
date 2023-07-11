import type { Meta, StoryObj } from '@storybook/react'
import { HeaderInfo } from './HeaderInfo'

const meta: Meta<typeof HeaderInfo> = {
  component: HeaderInfo,
}
export default meta

type Story = StoryObj<typeof HeaderInfo>

export const Primary: Story = {
  render: () => <HeaderInfo />,
}
