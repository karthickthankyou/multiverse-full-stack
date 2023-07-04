import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { PlayStory } from './PlayStory'

export default {
  title: 'src/components/templates/PlayStory',
  component: PlayStory,
} as ComponentMeta<typeof PlayStory>

const Template: ComponentStory<typeof PlayStory> = (args) => (
  <PlayStory {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
