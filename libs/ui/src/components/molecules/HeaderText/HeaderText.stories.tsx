import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { HeaderText } from './HeaderText'

export default {
  title: 'src/components/molecules/HeaderText',
  component: HeaderText,
} as ComponentMeta<typeof HeaderText>

const Template: ComponentStory<typeof HeaderText> = (args) => (
  <HeaderText {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
