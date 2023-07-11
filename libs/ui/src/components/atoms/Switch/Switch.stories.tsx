import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'
import { useState } from 'react'

const meta: Meta<typeof Switch> = {
  component: Switch,
}
export default meta

type Story = StoryObj<typeof Switch>

export const Checked: Story = {
  args: {
    label: 'Checked switch',
    checked: true,
  },
}

export const UnChecked: Story = {
  args: {
    label: 'Unchecked switch',
    checked: false,
  },
}

export const Interactive: Story = {
  args: {
    label: 'Interactive switch',
    checked: false,
  },
  render: (args) => {
    const [check, setCheck] = useState(args.checked)
    return <Switch {...args} checked={check} onChange={setCheck} />
  },
}
