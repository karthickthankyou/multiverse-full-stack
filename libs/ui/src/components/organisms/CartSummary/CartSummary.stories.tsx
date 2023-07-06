import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CartSummary } from './CartSummary'

export default {
  title: 'src/components/organisms/CartSummary',
  component: CartSummary,
} as ComponentMeta<typeof CartSummary>

const Template: ComponentStory<typeof CartSummary> = (args) => (
  <CartSummary {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
