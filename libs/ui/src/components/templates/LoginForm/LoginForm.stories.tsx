import type { Meta, StoryObj } from '@storybook/react'
import { LoginForm } from './LoginForm'
import { ReduxAddUid } from '@multiverse-org/store/Provider'

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
}
export default meta

type Story = StoryObj<typeof LoginForm>

export const Primary: Story = {
  decorators: [(Story) => <ReduxAddUid>{Story()}</ReduxAddUid>],
}
