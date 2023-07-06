import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { StoryCard } from './StoryCard'

export default {
  title: 'src/components/organisms/StoryCard',
  component: StoryCard,
} as ComponentMeta<typeof StoryCard>

const Template: ComponentStory<typeof StoryCard> = (args) => (
  <StoryCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
