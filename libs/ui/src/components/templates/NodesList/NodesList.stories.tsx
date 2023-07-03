import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { NodesList } from './NodesList'

export default {
  title: 'src/components/templates/NodesList',
  component: NodesList,
} as ComponentMeta<typeof NodesList>

const Template: ComponentStory<typeof NodesList> = (args) => (
  <NodesList {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
