import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MyStories } from './MyStories'

export default {
  title: 'src/components/templates/MyStories',
  component: MyStories,
} as ComponentMeta<typeof MyStories>

const Template: ComponentStory<typeof MyStories> = (args) => (
  <MyStories {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
