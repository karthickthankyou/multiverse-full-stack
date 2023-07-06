import {
  UserStoryType,
  useUserStoriesLazyQuery,
  useUserStoriesQuery,
} from '@multiverse-org/network/src/gql/generated'
import { useUserStore } from '@multiverse-org/store/user'
import { useEffect } from 'react'
import { ShowData } from '../../organisms/ShowData'
import { useTakeSkip } from '@multiverse-org/hooks'
import { StoryCard } from '../../organisms/StoryCard'
import { CartCard } from '../../organisms/CartCard'
import { HeaderText } from '../../molecules/HeaderText'
import { CartSummary } from '../../organisms/CartSummary'

export interface IWishlistProps {}

export const Cart = () => {
  const uid = useUserStore((s) => s.uid)
  const [fetchUserStories, { data, loading }] = useUserStoriesLazyQuery()

  const { setSkip, setTake, skip, take } = useTakeSkip()

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
      <div className="flex flex-col gap-4">
        {data?.userStories.map(({ type, story }) => (
          <CartCard key={story.id} story={story} />
        ))}
      </div>
      <CartSummary cartItems={data?.userStories || []} />
    </div>
  )
}
