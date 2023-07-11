import type { Meta, StoryObj } from '@storybook/react'
import { HtmlTextArea } from './HtmlTextArea'
import { HtmlLabel } from '../HtmlLabel'

const meta: Meta<typeof HtmlTextArea> = {
  component: HtmlTextArea,
}
export default meta

type Story = StoryObj<typeof HtmlTextArea>

export const Primary: Story = {
  render: (args) => {
    return <HtmlTextArea {...args} />
  },
  args: {
    rows: 2,
    placeholder: 'Type something. It does not matter.',
  },
}

export const FiveRows: Story = {
  render: (args) => {
    return <HtmlTextArea {...args} />
  },
  args: {
    rows: 5,
    placeholder: 'Type something longer.',
  },
}

export const WithLabel: Story = {
  render: (args) => (
    <HtmlLabel title="Label text">
      <HtmlTextArea {...args} />
    </HtmlLabel>
  ),
  args: {
    rows: 5,
    placeholder: 'Type something longer.',
  },
}
