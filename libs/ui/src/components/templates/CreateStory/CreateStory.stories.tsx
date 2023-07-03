import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CreateStory } from './CreateStory'

export default {
  title: 'src/components/templates/CreateStory',
  component: CreateStory,
} as ComponentMeta<typeof CreateStory>

const Template: ComponentStory<typeof CreateStory> = (args) => <CreateStory />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
