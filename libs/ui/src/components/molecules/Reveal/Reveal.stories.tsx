import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Reveal } from './Reveal'

export default {
  title: 'components/molecules/Reveal',
  component: Reveal,
} as ComponentMeta<typeof Reveal>

const Template: ComponentStory<typeof Reveal> = (args) => <Reveal {...args} />

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
