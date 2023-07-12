import type { Meta, StoryObj } from '@storybook/react'
import { SearchStories } from './SearchStories'
import { graphql } from 'msw'
import {
  StoriesQuery,
  namedOperations,
} from '@multiverse-org/network/src/gql/generated'

const meta: Meta<typeof SearchStories> = {
  component: SearchStories,
}
export default meta

type Story = StoryObj<typeof SearchStories>

const storiesData: StoriesQuery['stories'] = [
  { id: 1, image: 'https://placehold.co/400', title: 'America', price: 0.99 },
  { id: 2, image: 'https://placehold.co/400', title: 'Australia', price: 0.49 },
]

export const Primary: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        graphql.query<StoriesQuery>(
          namedOperations.Query.stories,
          (req, res, ctx) => {
            console.log('req.variables ', req.variables)
            const filtered = storiesData.filter((story) =>
              story.title
                .toLowerCase()
                .includes(req.variables.searchTerm.toLowerCase()),
            )
            return res(
              ctx.data({
                stories: filtered,
                storiesCount: { count: filtered.length },
              }),
            )
          },
        ),
      ],
    },
  },
}
