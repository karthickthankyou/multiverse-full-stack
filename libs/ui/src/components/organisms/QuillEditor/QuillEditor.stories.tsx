import type { Meta, StoryObj } from '@storybook/react'
import { QuillEditor } from './QuillEditor'

const meta: Meta<typeof QuillEditor> = {
  component: QuillEditor,
}
export default meta

type Story = StoryObj<typeof QuillEditor>

export const Primary: Story = {
  render: () => <QuillEditor />,
}
