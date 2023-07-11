import type { Meta, StoryObj } from '@storybook/react'
import { AddChoicesDialog } from './AddChoicesDialog'

const meta: Meta<typeof AddChoicesDialog> = {
  component: AddChoicesDialog,
}
export default meta

type Story = StoryObj<typeof AddChoicesDialog>

export const Primary: Story = {
  render: () => (
    <AddChoicesDialog
      node={{
        __typename: undefined,
        id: 0,
        title: '',
        image: undefined,
        end: undefined,
        start: undefined,
        storyId: 0,
        content: '',
        choiceNodes: undefined,
      }}
    />
  ),
}
