import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination'
import { useTakeSkip } from '@multiverse-org/hooks'

const meta: Meta<typeof Pagination> = {
  component: Pagination,
}
export default meta
type Story = StoryObj<typeof Pagination>

export const Primary: Story = {
  args: {
    count: 120,
    page: 3,
    rowsPerPage: 12,
    rowsPerPageOptions: [12, 24, 36, 48],
  },
  render: (args) => {
    const { setSkip, setTake, skip, take } = useTakeSkip()
    return (
      <Pagination
        count={args.count || 0}
        page={(skip || 0) / (take || 12)}
        rowsPerPage={take || 0}
        rowsPerPageOptions={args.rowsPerPageOptions}
        onPageChange={(v, c) => setSkip(c * (take || 12))}
        onRowsPerPageChange={(v) => {
          setTake(+v.target.value)
        }}
      />
    )
  },
}

export const CustomRowsPerPage: Story = {
  args: {
    count: 170,
    page: 3,
    rowsPerPage: 17,
    rowsPerPageOptions: [7, 17, 27, 37],
  },
  render: (args) => {
    const { setSkip, setTake, skip, take } = useTakeSkip()
    return (
      <Pagination
        count={args.count || 0}
        page={(skip || 0) / (take || 12)}
        rowsPerPage={take || 0}
        rowsPerPageOptions={args.rowsPerPageOptions}
        onPageChange={(v, c) => setSkip(c * (take || 12))}
        onRowsPerPageChange={(v) => {
          setTake(+v.target.value)
        }}
      />
    )
  },
}

export const ShowFirstLastButton: Story = {
  args: {
    count: 3600,
    page: 3,
    rowsPerPage: 12,
    rowsPerPageOptions: [12, 24, 36, 48],
    showFirstButton: true,
    showLastButton: true,
  },
  render: (args) => {
    const { setSkip, setTake, skip, take } = useTakeSkip()
    return (
      <Pagination
        count={args.count || 0}
        page={(skip || 0) / (take || 12)}
        rowsPerPage={take || 0}
        rowsPerPageOptions={args.rowsPerPageOptions}
        onPageChange={(v, c) => setSkip(c * (take || 12))}
        onRowsPerPageChange={(v) => {
          setTake(+v.target.value)
        }}
        showFirstButton={args.showFirstButton}
        showLastButton={args.showLastButton}
      />
    )
  },
}
