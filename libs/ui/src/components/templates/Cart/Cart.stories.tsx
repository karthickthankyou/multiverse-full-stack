import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Cart } from './Cart'

export default {
  title: 'src/components/templates/Cart',
  component: Cart,
} as ComponentMeta<typeof Cart>

const Template: ComponentStory<typeof Cart> = (args) => <Cart {...args} />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
