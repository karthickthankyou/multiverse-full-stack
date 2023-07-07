import axios from 'axios'
import { UserStoriesQuery } from '@multiverse-org/network/src/gql/generated'
import React from 'react'
import { Button } from '../../atoms/Button'
import { loadStripe } from '@stripe/stripe-js'
import { StripeItemType } from '@multiverse-org/types'
import { notification$ } from '@multiverse-org/util/subjects'
import { useUserStore } from '@multiverse-org/store/user'

interface CartSummaryProps {
  cartItems: UserStoriesQuery['userStories']
}

export const CartSummary: React.FC<CartSummaryProps> = ({ cartItems }) => {
  const totalItems = cartItems.length
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item?.story?.price || 0),
    0,
  )

  const uid = useUserStore((s) => s.uid)

  const items: StripeItemType[] = cartItems.map((item) => ({
    id: item.story.id,
    image: item.story.image,
    title: item.story.title,
    price: item.story.price || 0,
  }))

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
      <Button
        onClick={async () => {
          if (!uid) {
            notification$.next({ message: 'You are not logged in.' })
            return
          }
          const res = await createPaymentSession(
            uid,
            'http://localhost:3001',
            items,
          )
          if (res?.error) {
            notification$.next({ message: 'Booking failed.' })
            return
          }
        }}
        className="mt-4"
      >
        Pay ${totalPrice.toFixed(2)}{' '}
      </Button>
      <div className="w-full h-0.5 bg-primary my-8"></div>
    </div>
  )
}

export const createPaymentSession = async (
  uid: string,
  redirectUrl: string,
  items: StripeItemType[],
) => {
  const checkoutSession = await axios.post('http://localhost:3000/stripe', {
    items,
    redirectUrl,
    uid,
  })

  console.log('checkoutSession', checkoutSession)

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

  const stripePromise = loadStripe(publishableKey || '')
  const stripe = await stripePromise
  const result = await stripe?.redirectToCheckout({
    sessionId: checkoutSession.data.sessionId,
  })

  return result
}
