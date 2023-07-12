import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './Header'
import { ReduxAddUid } from '@multiverse-org/store/Provider'

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
  },
  decorators: [(Story) => <ReduxAddUid>{Story()}</ReduxAddUid>],
}

export const SignedInAdmin: Story = {
  args: {
    menuItems: [],
    sideMenuItems: [],
    type: 'admin',
  },
  decorators: [(Story) => <ReduxAddUid>{Story()}</ReduxAddUid>],
}
