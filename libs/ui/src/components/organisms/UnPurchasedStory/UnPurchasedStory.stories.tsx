import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { UnPurchasedStory } from './UnPurchasedStory'

export default {
  title: 'src/components/organisms/UnPurchasedStory',
  component: UnPurchasedStory,
} as ComponentMeta<typeof UnPurchasedStory>

const Template: ComponentStory<typeof UnPurchasedStory> = (args) => (
  <UnPurchasedStory {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
