import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AddChoicesDialog } from './AddChoicesDialog'

export default {
  title: 'src/components/organisms/AddChoicesDialog',
  component: AddChoicesDialog,
} as ComponentMeta<typeof AddChoicesDialog>

const Template: ComponentStory<typeof AddChoicesDialog> = (args) => (
  <AddChoicesDialog {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
