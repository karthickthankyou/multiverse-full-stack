import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { StoryMain } from './StoryMain'

export default {
  title: 'src/components/templates/StoryMain',
  component: StoryMain,
} as ComponentMeta<typeof StoryMain>

const Template: ComponentStory<typeof StoryMain> = (args) => (
  <StoryMain {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
