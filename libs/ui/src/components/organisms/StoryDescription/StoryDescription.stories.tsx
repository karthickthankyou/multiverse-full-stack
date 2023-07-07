import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { StoryDescription } from './StoryDescription'

export default {
  title: 'src/components/organisms/StoryDescription',
  component: StoryDescription,
} as ComponentMeta<typeof StoryDescription>

const Template: ComponentStory<typeof StoryDescription> = (args) => (
  <StoryDescription {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
