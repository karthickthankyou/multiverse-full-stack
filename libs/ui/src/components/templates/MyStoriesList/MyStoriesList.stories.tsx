import type { Meta, StoryObj } from '@storybook/react'
import { MyStoriesList } from './MyStoriesList'

const meta: Meta<typeof MyStoriesList> = {
  component: MyStoriesList,
}
export default meta
type Story = StoryObj<typeof MyStoriesList>

export const Primary: Story = {
  render: () => <MyStoriesList />,
}
