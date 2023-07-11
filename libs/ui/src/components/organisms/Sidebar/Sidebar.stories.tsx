import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'
import { render } from '@testing-library/react'

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
}
export default meta

const SomeContent = () => (
  <div className="max-w-xs mb-24">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa excepturi,
    ullam praesentium alias hic totam debitis nam accusamus dolorum sunt! Earum
    dolorem unde distinctio sapiente vitae aliquid accusantium ipsa quidem ipsum
    provident. Necessitatibus, aut sint.
  </div>
)

type Story = StoryObj<typeof Sidebar>

export const Primary: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <div>
        <button
          type="button"
          className="block w-full text-right"
          onClick={() => setOpen((state) => !state)}
        >
          Open sidebar
        </button>
        <Sidebar open={open} setOpen={setOpen}>
          <div className="flex items-center justify-center h-screen p-6 italic rounded outline-gray-200 outline-dashed">
            <div>Any children go here.</div>
          </div>
        </Sidebar>
      </div>
    )
  },
}

export const ScrollableBodyTemplate: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <div>
        <button
          type="button"
          className="block w-full text-right"
          onClick={() => setOpen((state) => !state)}
        >
          Open sidebar
        </button>
        <Sidebar open={open} setOpen={setOpen}>
          <Sidebar.Header>Sample header</Sidebar.Header>
          <Sidebar.Body>
            <SomeContent />
            <SomeContent />
            <SomeContent />
          </Sidebar.Body>

          <Sidebar.Footer>Sample footer</Sidebar.Footer>
        </Sidebar>
      </div>
    )
  },
}

export const WithHeaderAndFooterTemplate: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <div>
        <button
          type="button"
          className="block w-full text-right"
          onClick={() => setOpen((state) => !state)}
        >
          Open sidebar
        </button>
        <Sidebar open={open} setOpen={setOpen}>
          <Sidebar.Header>Sample header</Sidebar.Header>
          <Sidebar.Body>
            <SomeContent />
            <SomeContent />
            <SomeContent />
          </Sidebar.Body>

          <Sidebar.Footer>Sample footer</Sidebar.Footer>
        </Sidebar>
      </div>
    )
  },
}
