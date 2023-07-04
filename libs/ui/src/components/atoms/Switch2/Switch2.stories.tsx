import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Switch2 } from './Switch2'

export default {
  title: 'src/components/atoms/Switch2',
  component: Switch2,
} as ComponentMeta<typeof Switch2>

const Template: ComponentStory<typeof Switch2> = (args) => <Switch2 {...args} />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
