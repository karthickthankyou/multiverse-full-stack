import type { Meta, StoryObj } from '@storybook/react'
import { StoryCard } from './StoryCard'
import { UserStoryType } from '@multiverse-org/network/src/generated'

const meta: Meta<typeof StoryCard> = {
  component: StoryCard,
}
export default meta
type Story = StoryObj<typeof StoryCard>

export const Primary: Story = {
  render: () => (
    <StoryCard
      story={{
        __typename: 'Story',
        id: 0,
        title: 'This is a story about you',
        image: 'https://placehold.co/400',
        price: 2.99,
        userStory: undefined,
      }}
    />
  ),
}

export const StoryLoggedIn: Story = {
  render: () => (
    <StoryCard
      uid="SomeId"
      story={{
        __typename: 'Story',
        id: 0,
        title: 'This is a story about you',
        image: 'https://placehold.co/400',
        price: 2.99,
      }}
    />
  ),
}

export const StoryInCart: Story = {
  render: () => (
    <StoryCard
      uid="SomeId"
      story={{
        __typename: 'Story',
        id: 0,
        title: 'This is a story about you',
        image: 'https://placehold.co/400',
        price: 2.99,
        userStory: {
          __typename: 'UserStory',
          type: UserStoryType.InCart,
        },
      }}
    />
  ),
}

export const StoryWishlisted: Story = {
  render: () => (
    <StoryCard
      uid="SomeId"
      story={{
        __typename: 'Story',
        id: 0,
        title: 'This is a story about you',
        image: 'https://placehold.co/400',
        price: 2.99,
        userStory: {
          __typename: 'UserStory',
          type: UserStoryType.Wishlisted,
        },
      }}
    />
  ),
}

export const StorySaveForLater: Story = {
  render: () => (
    <StoryCard
      uid="SomeId"
      story={{
        __typename: 'Story',
        id: 0,
        title: 'This is a story about you',
        image: 'https://placehold.co/400',
        price: 2.99,
        userStory: {
          __typename: 'UserStory',
          type: UserStoryType.SaveForLater,
        },
      }}
    />
  ),
}
