import type { Meta, StoryObj } from '@storybook/react'
import { HtmlSelect } from './HtmlSelect'
import { HtmlLabel } from '../HtmlLabel'

const meta: Meta<typeof HtmlSelect> = {
  component: HtmlSelect,
}
export default meta

type Story = StoryObj<typeof HtmlSelect>
const options = ['One', 'Two', 'Three', 'Four', 'Five']

export const Primary: Story = {
  args: {
    children: options.map((option) => <option key={option}>{option}</option>),
  },
}

export const WithLabel: Story = {
  render: (args) => (
    <HtmlLabel title="Select a number">
      <HtmlSelect {...args} />
    </HtmlLabel>
  ),
  args: {
    children: options.map((option) => <option key={option}>{option}</option>),
  },
}
