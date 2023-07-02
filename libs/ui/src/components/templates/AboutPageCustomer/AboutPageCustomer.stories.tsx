import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AboutPageCustomer } from './AboutPageCustomer'

export default {
  title: 'src/components/templates/AboutPageCustomer',
  component: AboutPageCustomer,
} as ComponentMeta<typeof AboutPageCustomer>

const Template: ComponentStory<typeof AboutPageCustomer> = (args) => (
  <AboutPageCustomer {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
