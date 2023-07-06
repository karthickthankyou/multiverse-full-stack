import {
  UserStoryType,
  useUserStoriesLazyQuery,
} from '@multiverse-org/network/src/gql/generated'
import Link from 'next/link'

import { useUserStore } from '@multiverse-org/store/user'
import { useEffect } from 'react'
import { useTakeSkip } from '@multiverse-org/hooks'
import { CartCard } from '../../organisms/CartCard'
import { HeaderText } from '../../molecules/HeaderText'
import { CartSummary } from '../../organisms/CartSummary'
import { AlertSection } from '../../organisms/AlertSection'

export interface IWishlistProps {}

export const Cart = () => {
  const uid = useUserStore((s) => s.uid)
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
      {data?.userStories.length === 0 && (
        <AlertSection>
          <div className="text-lg font-semibold">Cart is empty.</div>
          <Link className="underline underline-offset-4" href={'/'}>
            Go add some.
          </Link>
        </AlertSection>
      )}
      <div className="flex flex-col gap-4">
        {data?.userStories.map(({ type, story }) => (
          <CartCard key={story.id} story={story} />
        ))}
      </div>
      <CartSummary cartItems={data?.userStories || []} />
    </div>
  )
}
