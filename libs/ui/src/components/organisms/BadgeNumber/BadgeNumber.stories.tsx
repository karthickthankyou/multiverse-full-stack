import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BadgeNumber } from './BadgeNumber'

export default {
  title: 'src/components/organisms/BadgeNumber',
  component: BadgeNumber,
} as ComponentMeta<typeof BadgeNumber>

const Template: ComponentStory<typeof BadgeNumber> = (args) => (
  <BadgeNumber {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
