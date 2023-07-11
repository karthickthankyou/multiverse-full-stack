import type { Meta, StoryObj } from '@storybook/react'
import { Autocomplete } from './Autocomplete'

const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
}

const options = ['One', 'Two', 'Three', 'Four', 'Five']

export default meta
type Story = StoryObj<typeof Autocomplete>

export const Primary: Story = {
  render: () => (
    <Autocomplete placeholder="Start typing..." options={options} />
  ),
}
