import { UserStoriesQuery } from '@multiverse-org/network/src/gql/generated'
import React from 'react'
import { Button } from '../../atoms/Button'

interface CartSummaryProps {
  cartItems: UserStoriesQuery['userStories']
}

export const CartSummary: React.FC<CartSummaryProps> = ({ cartItems }) => {
  const totalItems = cartItems.length
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.story.price,
    0,
  )

  if (!totalItems) {
    return null
  }
  return (
    <div className="flex flex-col items-end">
      <h2 className="mb-2 font-semibold">Cart Summary</h2>
      <p className="flex flex-col items-end">
        <div className="text-sm font-medium">Total Items</div>
        <span className="font-semibold">{totalItems}</span>
      </p>
      <p className="flex flex-col items-end">
        <div className="text-sm font-medium">Total Price</div>
        <span className="font-semibold">${totalPrice.toFixed(2)}</span>
      </p>
      <Button className="mt-4">Pay ${totalPrice.toFixed(2)} </Button>
      <div className="w-full h-0.5 bg-primary my-8"></div>
    </div>
  )
}
