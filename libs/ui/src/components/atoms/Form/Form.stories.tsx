import type { Meta, StoryObj } from '@storybook/react'
import { Form } from './Form'
import { HtmlLabel } from '../HtmlLabel'
import { HtmlInput } from '../HtmlInput'
import { Button } from '../Button'

const meta: Meta<typeof Form> = {
  component: Form,
  argTypes: { onSubmit: { action: 'submitted.' } },
}
export default meta

type Story = StoryObj<typeof Form>

export const Primary: Story = {
  render: (args) => {
    return <Form {...args} />
  },
  args: {
    children: (
      <>
        <HtmlLabel title="myInput">
          <HtmlInput name="myInput" placeholder="Enter my input..." />
        </HtmlLabel>
        <Button type="submit">Submit</Button>
      </>
    ),
    onSubmit: (e) => {
      e.preventDefault()
      // Access form data
      const formData = new FormData(e.currentTarget)
      const inputValue = formData.get('myInput')

      // Log the input value
      console.log(inputValue)
    },
  },
}
