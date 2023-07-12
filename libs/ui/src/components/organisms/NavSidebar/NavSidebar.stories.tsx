import type { Meta, StoryObj } from '@storybook/react'
import { NavSidebar } from './NavSidebar'
import { ReduxAddUid } from '@multiverse-org/store/Provider'

const meta: Meta<typeof NavSidebar> = {
  component: NavSidebar,
}
export default meta

type Story = StoryObj<typeof NavSidebar>

export const Primary: Story = {
  args: {
    menuItems: [
      { href: '/', label: 'Home', loggedIn: false },
      { href: '/', label: 'Authorized Page', loggedIn: true },
    ],
  },
}

export const LoggedIn: Story = {
  decorators: [(Story) => <ReduxAddUid>{Story()}</ReduxAddUid>],
  args: {
    menuItems: [
      { href: '/', label: 'Home', loggedIn: false },
      { href: '/', label: 'Authorized Page', loggedIn: true },
    ],
  },
}
