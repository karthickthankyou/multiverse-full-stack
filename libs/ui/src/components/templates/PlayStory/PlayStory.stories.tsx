import type { Meta, StoryObj } from '@storybook/react'
import { PlayStory } from './PlayStory'

const meta: Meta<typeof PlayStory> = {
  component: PlayStory,
}
export default meta

type Story = StoryObj<typeof PlayStory>

export const Primary: Story = {
  render: () => (
    <PlayStory
      story={{
        __typename: undefined,
        authorId: '',
        createdAt: undefined,
        id: 0,
        image: '',
        price: undefined,
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
