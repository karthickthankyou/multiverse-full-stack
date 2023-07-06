import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SaveForLaterCard } from './SaveForLaterCard'

export default {
  title: 'src/components/organisms/SaveForLaterCard',
  component: SaveForLaterCard,
} as ComponentMeta<typeof SaveForLaterCard>

const Template: ComponentStory<typeof SaveForLaterCard> = (args) => (
  <SaveForLaterCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
