import type { Meta, StoryObj } from '@storybook/react'
import { UnPurchasedStory } from './UnPurchasedStory'

const meta: Meta<typeof UnPurchasedStory> = {
  component: UnPurchasedStory,
}
export default meta

type Story = StoryObj<typeof UnPurchasedStory>

export const Primary: Story = {
  render: () => (
    <UnPurchasedStory
      story={{
        __typename: undefined,
        authorId: '',
        createdAt: undefined,
        id: 0,
        image: '',
        price: 0,
        description: '',
        title: '',
        updatedAt: undefined,
        author: undefined,
        startingNodes: undefined,
        userStory: undefined,
        nodes: undefined,
      }}
    />
  ),
}
