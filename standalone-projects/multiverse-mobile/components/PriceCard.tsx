import { Story } from '@multiverse-org/network/src/generated'
import { View, Text } from '.'

export interface IPriceCardProps {
  price: Story['price']
}

export const PriceCard = ({ price }: IPriceCardProps) => {
  if (!price) return <Text className="text-sm">Free</Text>

  return (
    <View className="flex flex-row items-baseline gap-1 text-sm">
      <Text className="font-medium">{price.toFixed(2)}</Text>
      <Text className="text-xs text-gray">USD</Text>
    </View>
  )
}
