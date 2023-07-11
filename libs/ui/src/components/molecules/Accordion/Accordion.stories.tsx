import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from './Accordion'

const meta: Meta<typeof Accordion> = {
  component: Accordion,
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Primary: Story = {
  render: () => (
    <div className="max-w-md">
      <Accordion defaultOpen title="Title 1">
        <div>Body 1</div>
      </Accordion>
      <Accordion defaultOpen title="Title 2">
        <div>Body 2</div>
      </Accordion>
      <Accordion defaultOpen title="Title 3">
        <div>Body 3</div>
      </Accordion>
    </div>
  ),
}

export const AccordionListTemplate: Story = {
  render: () => (
    <div className="max-w-md">
      <Accordion defaultOpen title="Title 1">
        <div>Body 1</div>
      </Accordion>
      <Accordion defaultOpen title="Title 2">
        <div>Body 2</div>
      </Accordion>
      <Accordion defaultOpen title="Title 3">
        <div>Body 3</div>
      </Accordion>
    </div>
  ),
}

export const AccordionListTemplateLoose: Story = {
  render: () => (
    <div className="max-w-md">
      <Accordion defaultOpen title="Title 1" className="py-3">
        <div>Body 1</div>
      </Accordion>
      <Accordion defaultOpen title="Title 2" className="py-3">
        <div>Body 2</div>
      </Accordion>
      <Accordion defaultOpen title="Title 3" className="py-3">
        <div>Body 3</div>
      </Accordion>
    </div>
  ),
}

export const NestedAccordionListTemplate: Story = {
  render: () => (
    <div className="max-w-md">
      <Accordion
        defaultOpen
        title="I have an accodion inside me!"
        className="py-3"
      >
        <Accordion defaultOpen title="I have one too." className="py-3">
          <Accordion defaultOpen title="I have nothing. 🙄" className="py-3">
            <div>You have me... 😟</div>
          </Accordion>
        </Accordion>
      </Accordion>
    </div>
  ),
}
