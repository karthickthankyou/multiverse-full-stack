import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SaveForLater } from './SaveForLater'

export default {
  title: 'src/components/templates/SaveForLater',
  component: SaveForLater,
} as ComponentMeta<typeof SaveForLater>

const Template: ComponentStory<typeof SaveForLater> = (args) => (
  <SaveForLater {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
