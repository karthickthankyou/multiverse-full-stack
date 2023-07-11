import type { Meta, StoryObj } from '@storybook/react'
import { ShowData } from './ShowData'

const meta: Meta<typeof ShowData> = {
  component: ShowData,
}
export default meta

type Story = StoryObj<typeof ShowData>

export const Primary: Story = {
  render: () => (
    <ShowData
      loading={false}
      pagination={{
        skip: undefined,
        take: undefined,
        resultCount: undefined,
        totalCount: undefined,
        setSkip: function (skip: number): void {
          throw new Error('Function not implemented.')
        },
        setTake: function (take: number): void {
          throw new Error('Function not implemented.')
        },
      }}
      title={undefined}
    />
  ),
}
