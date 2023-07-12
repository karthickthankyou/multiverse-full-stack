import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './Header'

const meta: Meta<typeof Header> = {
  component: Header,
}
export default meta

type Story = StoryObj<typeof Header>

export const Primary: Story = {
  args: {
    menuItems: [],
    sideMenuItems: [],
    type: 'admin',
  },
}

export const SignedIn: Story = {
  args: {
    menuItems: [],
    sideMenuItems: [],
    uid: 'some_string',
  },
}

export const SignedInAdmin: Story = {
  args: {
    menuItems: [],
    sideMenuItems: [],
    type: 'admin',
    uid: 'some_string',
  },
}
