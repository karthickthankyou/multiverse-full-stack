import type { Meta, StoryObj } from '@storybook/react'
import { Notifications } from './Notifications'

const meta: Meta<typeof Notifications> = {
  component: Notifications,
}
export default meta

type Story = StoryObj<typeof Notifications>

export const Primary: Story = {
  args: {
    notifications: [
      {
        id: '1',
        message: 'This is a sample info notification.',
        position: 'bottom-center',
        type: 'info',
      },
    ],
  },
}

export const Success: Story = {
  args: {
    notifications: [
      {
        id: '1',
        message: 'This is a sample success notification.',
        position: 'bottom-center',
        type: 'success',
      },
    ],
  },
}

export const Error: Story = {
  args: {
    notifications: [
      {
        id: '1',
        message:
          'This is a sample notification. Which turns out to be an error.',
        position: 'bottom-center',
        type: 'error',
      },
    ],
  },
}

export const Multiple: Story = {
  args: {
    notifications: [
      {
        id: '1',
        message: 'This is a sample notification.',
        position: 'bottom-center',
        type: 'info',
      },
      {
        id: '2',
        message: 'This is another notification.',
        position: 'bottom-center',
        type: 'info',
      },
    ],
  },
}

export const MixedMultiple: Story = {
  args: {
    notifications: [
      {
        id: '1',
        message: 'This is a sample success notification.',
        position: 'bottom-center',
        type: 'success',
      },
      {
        id: '2',
        message: 'This is a sample error notification.',
        position: 'bottom-center',
        type: 'error',
      },
    ],
  },
}
