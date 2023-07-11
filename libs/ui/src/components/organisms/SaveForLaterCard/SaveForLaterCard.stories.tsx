import type { Meta, StoryObj } from '@storybook/react'
import { SaveForLaterCard } from './SaveForLaterCard'

const meta: Meta<typeof SaveForLaterCard> = {
  component: SaveForLaterCard,
}
export default meta

type Story = StoryObj<typeof SaveForLaterCard>

export const Primary: Story = {
  render: () => (
    <SaveForLaterCard
      story={{
        __typename: undefined,
        image: '',
        price: undefined,
        title: '',
        id: 0,
      }}
    />
  ),
}
