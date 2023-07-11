import type { Meta, StoryObj } from '@storybook/react'
import { AlertSection } from './AlertSection'

const meta: Meta<typeof AlertSection> = {
  component: AlertSection,
}
export default meta

type Story = StoryObj<typeof AlertSection>

export const Primary: Story = {
  render: () => <AlertSection children={'Alert content.'} />,
}
