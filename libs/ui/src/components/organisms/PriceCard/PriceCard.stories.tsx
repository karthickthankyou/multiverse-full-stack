import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { PriceCard } from './PriceCard'

export default {
  title: 'src/components/organisms/PriceCard',
  component: PriceCard,
} as ComponentMeta<typeof PriceCard>

const Template: ComponentStory<typeof PriceCard> = (args) => (
  <PriceCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
