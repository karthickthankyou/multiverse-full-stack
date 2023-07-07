import {
  UserStoryType,
  useUserStoriesCountLazyQuery,
  useUserStoriesLazyQuery,
  useUserStoriesQuery,
} from '@multiverse-org/network/src/gql/generated'
import { useUserStore } from '@multiverse-org/store/user'
import { IconHeart, IconInbox, IconShoppingBag } from '@tabler/icons-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { BadgeNumber } from '../BadgeNumber'

export interface IHeaderInfoProps {}

const returnDisplayNumber = (num?: number) => {
  if (!num) return
  return (num || 0) > 9 ? '9+' : num
}

export const HeaderInfo = ({}: IHeaderInfoProps) => {
  const uid = useUserStore((s) => s.uid)
  const [fetchCartCount, { data: cartData, loading: cartCountLoading }] =
    useUserStoriesCountLazyQuery()
  const [
    fetchWishlistCount,
    { data: wishlistData, loading: wishlistCountLoading },
  ] = useUserStoriesCountLazyQuery()

  useEffect(() => {
    if (uid) {
      fetchCartCount({
        variables: {
          uid,
          where: {
            type: { equals: UserStoryType.InCart },
          },
        },
      })
      fetchWishlistCount({
        variables: {
          uid,
          where: {
            type: { equals: UserStoryType.Wishlisted },
          },
        },
      })
    }
  }, [uid])

  const cartCount = returnDisplayNumber(cartData?.userStoriesCount.count)
  const wishlistCount = returnDisplayNumber(
    wishlistData?.userStoriesCount.count,
  )

  return (
    <>
      <Link href="/cart">
        <BadgeNumber count={cartCount}>
          <IconShoppingBag />
        </BadgeNumber>
      </Link>
      <Link href="/wishlist">
        <BadgeNumber count={wishlistCount}>
          <IconHeart />
        </BadgeNumber>
      </Link>
      <Link href="/purchased">
        <IconInbox />
      </Link>
    </>
  )
}
