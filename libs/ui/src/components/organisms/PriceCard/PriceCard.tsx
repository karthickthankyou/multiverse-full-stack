import { Story } from '@multiverse-org/network/src/generated'

export interface IPriceCardProps {
  price: Story['price']
}

export const PriceCard = ({ price }: IPriceCardProps) => {
  if (!price) return <div className="text-sm">Free</div>

  return (
    <div className="flex items-baseline gap-1 text-sm">
      <div className="font-medium">{price.toFixed(2)}</div>{' '}
      <div className="text-xs text-gray">USD</div>
    </div>
  )
}
