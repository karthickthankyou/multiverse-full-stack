import {
  UserStoryType,
  useUserStoriesLazyQuery,
} from '@multiverse-org/network/src/generated'
import Link from 'next/link'

import { selectUid, selectUser } from '@multiverse-org/store/user'
import { useAppSelector } from '@multiverse-org/store'
import { useEffect } from 'react'
import { CartCard } from '../../organisms/CartCard'
import { HeaderText } from '../../molecules/HeaderText'
import { CartSummary } from '../../organisms/CartSummary'
import { AlertSection } from '../../organisms/AlertSection'

export interface IWishlistProps {}

export const Cart = () => {
  const uid = useAppSelector(selectUid)
  const [fetchUserStories, { data, loading }] = useUserStoriesLazyQuery()

  useEffect(() => {
    if (uid) {
      fetchUserStories({
        variables: {
          uid,
          where: {
            type: { equals: UserStoryType.InCart },
          },
        },
      })
    }
  }, [uid])

  return (
    <div>
      <HeaderText>Cart</HeaderText>
      <CartAlert
        uid={uid}
        itemsAvailable={data?.userStories && data?.userStories?.length > 0}
      />

      <div className="flex flex-col gap-4">
        {data?.userStories.map(({ type, story }) => (
          <CartCard key={story.id} story={story} />
        ))}
      </div>
      <CartSummary cartItems={data?.userStories || []} />
    </div>
  )
}

export const CartAlert = ({
  uid,
  itemsAvailable,
}: {
  uid?: string
  itemsAvailable?: boolean
}) => {
  if (!uid) {
    return (
      <AlertSection>
        <div className="text-lg font-semibold">You are not logged in.</div>
        <Link className="underline underline-offset-4" href={'/login'}>
          Login.
        </Link>
      </AlertSection>
    )
  }
  if (!itemsAvailable) {
    return (
      <AlertSection>
        <div className="text-lg font-semibold">Cart is empty.</div>
        <Link className="underline underline-offset-4" href={'/'}>
          Go add some.
        </Link>
      </AlertSection>
    )
  }
  return null
}
