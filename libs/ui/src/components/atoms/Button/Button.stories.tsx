import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  component: Button,
}
export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Primary',
  },
}

export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
}
export const Medium: Story = {
  args: {
    children: 'Medium',
    size: 'md',
  },
}
export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
  },
}

export const NoProps: Story = {
  args: {
    children: 'Default Button',
  },
}

export const PrimaryContained: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    fullWidth: false,
    disabled: false,
    children: 'Primary contained',
  },
}

export const SuccessContained: Story = {
  args: {
    variant: 'contained',
    color: 'success',
    fullWidth: false,
    disabled: false,
    children: 'Success contained',
  },
}

export const ErrorContained: Story = {
  args: {
    variant: 'contained',
    color: 'error',
    fullWidth: false,
    disabled: false,
    children: 'Error contained',
  },
}
// Outlined

export const PrimaryOutlined: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    fullWidth: false,
    disabled: false,
    children: 'Primary outlined',
  },
}

export const SuccessOutlined: Story = {
  args: {
    variant: 'outlined',
    color: 'success',
    fullWidth: false,
    disabled: false,
    children: 'Success outlined',
  },
}

export const ErrorOutlined: Story = {
  args: {
    variant: 'outlined',
    color: 'error',
    fullWidth: false,
    disabled: false,
    children: 'Error outlined',
  },
}
export const FullWidth: Story = {
  args: {
    children: 'full width',
    fullWidth: true,
  },
}
export const Disabled: Story = {
  args: {
    children: 'disabled',
    disabled: true,
  },
}
export const CustomClasses: Story = {
  args: {
    children: 'custom classes',
    className: 'ml-12 rotate-12 skew-x-12',
  },
}

export const CrazyChildren: Story = {
  args: {
    children: (
      <div>
        Hello{' '}
        <span className="text-lg">
          children{' '}
          <span className="p-1 bg-white rounded-full shadow-lg">🎉</span>{' '}
        </span>
      </div>
    ),
  },
}
