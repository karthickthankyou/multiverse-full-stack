import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SearchStories } from './SearchStories'

export default {
  title: 'src/components/templates/SearchStories',
  component: SearchStories,
} as ComponentMeta<typeof SearchStories>

const Template: ComponentStory<typeof SearchStories> = (args) => (
  <SearchStories {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
