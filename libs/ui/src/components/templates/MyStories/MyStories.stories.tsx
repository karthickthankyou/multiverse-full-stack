import type { Meta, StoryObj } from '@storybook/react'
import { MyStories } from './MyStories'
import { useAppDispatch } from '@multiverse-org/store'
import { useEffect } from 'react'
import { resetUser, setUser } from '@multiverse-org/store/user'
import { ReduxAddUid } from '@multiverse-org/store/Provider'
import { graphql } from 'msw'
import {
  StoriesQuery,
  namedOperations,
} from '@multiverse-org/network/src/gql/generated'

const meta: Meta<typeof MyStories> = {
  component: MyStories,
}
export default meta

type Story = StoryObj<typeof MyStories>

export const AuthorLoginInfoLoading: Story = {}
export const NotLoggedIn: Story = {
  decorators: [
    (Story) => {
      const dispatch = useAppDispatch()
      useEffect(() => {
        dispatch(setUser({ loaded: true }))
        return () => {
          dispatch(resetUser())
        }
      }, [])
      return Story()
    },
  ],
}
export const ContentLoading: Story = {
  decorators: [(Story) => <ReduxAddUid>{Story()}</ReduxAddUid>],
  parameters: {
    msw: {
      handlers: [
        graphql.query<StoriesQuery>(
          namedOperations.Query.stories,
          (req, res, ctx) => res(ctx.delay(99999)),
        ),
      ],
    },
  },
}
export const ContentError: Story = {
  decorators: [(Story) => <ReduxAddUid>{Story()}</ReduxAddUid>],
  parameters: {
    msw: {
      handlers: [
        graphql.query<StoriesQuery>(
          namedOperations.Query.stories,
          (req, res, ctx) =>
            res(
              ctx.errors([
                {
                  message: 'Something went wrong.',
                },
              ]),
            ),
        ),
      ],
    },
  },
}
export const LoggedInNoResults: Story = {
  decorators: [(Story) => <ReduxAddUid>{Story()}</ReduxAddUid>],
  parameters: {
    msw: {
      handlers: [
        graphql.query<StoriesQuery>(
          namedOperations.Query.stories,
          (req, res, ctx) =>
            res(
              ctx.data({
                storiesCount: { count: 0 },
                stories: [],
              }),
            ),
        ),
      ],
    },
  },
}
export const LoggedInWithContent: Story = {
  decorators: [(Story) => <ReduxAddUid>{Story()}</ReduxAddUid>],
  parameters: {
    msw: {
      handlers: [
        graphql.query<StoriesQuery>(
          namedOperations.Query.stories,
          (req, res, ctx) =>
            res(
              ctx.data({
                storiesCount: { count: 2 },
                stories: [
                  {
                    id: 1,
                    image: 'https://placehold.co/400',
                    title: 'The story in my stories list.',
                  },
                  {
                    id: 2,
                    image: 'https://placehold.co/400',
                    title: 'Another story in my stories list.',
                  },
                ],
              }),
            ),
        ),
      ],
    },
  },
}
