import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MyStoriesList } from './MyStoriesList'

export default {
  title: 'src/components/templates/MyStoriesList',
  component: MyStoriesList,
} as ComponentMeta<typeof MyStoriesList>

const Template: ComponentStory<typeof MyStoriesList> = (args) => (
  <MyStoriesList {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
