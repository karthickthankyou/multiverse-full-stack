import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { StickyLayout } from './StickyLayout'

export default {
  title: 'src/components/organisms/StickyLayout',
  component: StickyLayout,
} as ComponentMeta<typeof StickyLayout>

const Template: ComponentStory<typeof StickyLayout> = (args) => (
  <StickyLayout {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
