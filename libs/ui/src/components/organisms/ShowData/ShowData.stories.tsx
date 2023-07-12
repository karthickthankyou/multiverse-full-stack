import type { Meta, StoryObj } from '@storybook/react'
import { ShowData } from './ShowData'
import { useTakeSkip } from '@multiverse-org/hooks'

const meta: Meta<typeof ShowData> = {
  component: ShowData,
}
export default meta

type Story = StoryObj<typeof ShowData>

const numbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26,
]
export const Primary: Story = {
  render: () => {
    const { setSkip, setTake, skip, take } = useTakeSkip(0, 6)
    const result = numbers.slice(skip, skip + take)
    return (
      <ShowData
        loading={false}
        pagination={{
          skip: skip,
          take: take,
          resultCount: result.length,
          totalCount: numbers.length,
          setSkip: (n) => {
            console.log('setSkip n ', n)
            setSkip(n)
          },
          setTake: (n) => {
            console.log('setTake n ', n)
            setTake(n)
          },
        }}
        title={'Numbers'}
      >
        {result.map((num) => (
          <div key={num}>{num}</div>
        ))}
      </ShowData>
    )
  },
}

export const NoResult: Story = {
  render: () => {
    const { setSkip, setTake, skip, take } = useTakeSkip(0, 6)
    const result: number[] = []
    return (
      <ShowData
        loading={false}
        pagination={{
          skip: skip,
          take: take,
          resultCount: 0,
          totalCount: 0,
          setSkip: (n) => {
            console.log('setSkip n ', n)
            setSkip(n)
          },
          setTake: (n) => {
            console.log('setTake n ', n)
            setTake(n)
          },
        }}
        title={'Numbers'}
      >
        {result.map((num) => (
          <div key={num}>{num}</div>
        ))}
      </ShowData>
    )
  },
}
