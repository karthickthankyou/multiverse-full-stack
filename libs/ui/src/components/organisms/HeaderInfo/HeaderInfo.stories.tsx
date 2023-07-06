import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { HeaderInfo } from './HeaderInfo'

export default {
  title: 'src/components/organisms/HeaderInfo',
  component: HeaderInfo,
} as ComponentMeta<typeof HeaderInfo>

const Template: ComponentStory<typeof HeaderInfo> = (args) => (
  <HeaderInfo {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
