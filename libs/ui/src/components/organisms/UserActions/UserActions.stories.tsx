import type { Meta, StoryObj } from '@storybook/react'
import { UserActions } from './UserActions'
import { UserStoryType } from '@multiverse-org/network/src/generated'

const meta: Meta<typeof UserActions> = {
  component: UserActions,
}
export default meta

type Story = StoryObj<typeof UserActions>

export const Primary: Story = {
  args: {
    uid: 'someid',
    story: {
      __typename: 'Story',
      id: 0,
      title: 'This is a story about you',
      image: 'https://placehold.co/400',
      price: 2.99,
      userStory: undefined,
    },
  },
}

export const InCart: Story = {
  args: {
    uid: 'someid',
    story: {
      __typename: 'Story',
      id: 0,
      title: 'This is a story about you',
      image: 'https://placehold.co/400',
      price: 2.99,
      userStory: {
        type: UserStoryType.InCart,
      },
    },
  },
}

export const Wishlist: Story = {
  args: {
    uid: 'someid',
    story: {
      __typename: 'Story',
      id: 0,
      title: 'This is a story about you',
      image: 'https://placehold.co/400',
      price: 2.99,
      userStory: {
        type: UserStoryType.Wishlisted,
      },
    },
  },
}

export const SavedForLater: Story = {
  args: {
    uid: 'someid',
    story: {
      __typename: 'Story',
      id: 0,
      title: 'This is a story about you',
      image: 'https://placehold.co/400',
      price: 2.99,
      userStory: {
        type: UserStoryType.SaveForLater,
      },
    },
  },
}

export const Purchased: Story = {
  args: {
    uid: 'someid',
    story: {
      __typename: 'Story',
      id: 0,
      title: 'This is a story about you',
      image: 'https://placehold.co/400',
      price: 2.99,
      userStory: {
        type: UserStoryType.Purchased,
      },
    },
  },
}

export const LoggedOut: Story = {
  args: {
    story: {
      __typename: 'Story',
      id: 0,
      title: 'This is a story about you',
      image: 'https://placehold.co/400',
      price: 2.99,
      userStory: undefined,
    },
  },
}
