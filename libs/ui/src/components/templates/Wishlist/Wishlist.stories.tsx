import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Wishlist } from './Wishlist'

export default {
  title: 'src/components/templates/Wishlist',
  component: Wishlist,
} as ComponentMeta<typeof Wishlist>

const Template: ComponentStory<typeof Wishlist> = (args) => (
  <Wishlist {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
