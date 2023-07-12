import type { Meta, StoryObj } from '@storybook/react'
import { AlertSection } from './AlertSection'
import { IconBold, IconBox } from '@tabler/icons-react'

const meta: Meta<typeof AlertSection> = {
  component: AlertSection,
}
export default meta

type Story = StoryObj<typeof AlertSection>

export const Primary: Story = {
  args: {
    children: 'Alert content',
    title: 'Alert title',
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <div className="flex gap-1">
        Be <IconBold className="border border-black rounded" />
      </div>
    ),
    title: 'Alert with icons',
  },
}
