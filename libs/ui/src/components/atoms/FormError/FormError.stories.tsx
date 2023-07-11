import type { Meta, StoryObj } from '@storybook/react'
import { FormError } from './FormError'
import { HtmlLabel } from '../HtmlLabel/HtmlLabel'

const meta: Meta<typeof FormError> = {
  component: FormError,
}
export default meta

type Story = StoryObj<typeof FormError>

export const Primary: Story = {
  render: (args) => {
    return <FormError {...args} />
  },
  args: {
    error: 'Sample error message.',
  },
}
