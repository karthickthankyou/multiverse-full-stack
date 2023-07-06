import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { UserStories } from './UserStories'

export default {
  title: 'src/components/templates/UserStories',
  component: UserStories,
} as ComponentMeta<typeof UserStories>

const Template: ComponentStory<typeof UserStories> = (args) => (
  <UserStories {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
