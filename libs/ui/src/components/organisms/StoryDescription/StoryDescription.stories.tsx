import type { Meta, StoryObj } from '@storybook/react'
import { StoryDescription } from './StoryDescription'

const meta: Meta<typeof StoryDescription> = {
  component: StoryDescription,
}
export default meta

type Story = StoryObj<typeof StoryDescription>

export const Primary: Story = {
  args: {
    story: {
      authorId: '23',
      createdAt: new Date(),
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, doloribus exercitationem beatae inventore ipsam nemo laborum culpa quis in possimus. Eius atque at nesciunt maiores aperiam tempora a explicabo facere enim vel. Eaque reiciendis ex esse dignissimos suscipit et explicabo officiis in. Aspernatur quae, iure in alias quo natus et obcaecati praesentium eum. Aut necessitatibus doloribus explicabo corrupti blanditiis dolorum quidem cupiditate repellat corporis ab quis provident ipsum facere architecto dignissimos, voluptatum impedit exercitationem accusantium, nemo eligendi eos tenetur! Natus voluptate necessitatibus ipsa nobis nostrum ullam, nesciunt laborum. Amet ullam eum adipisci doloremque neque voluptatum nobis aliquam asperiores quod ab?',
      id: 1,
      image: 'https://placehold.co/400',
      title: 'Sample Title',
      updatedAt: new Date(),
    },
  },
}
