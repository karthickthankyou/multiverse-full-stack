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

  return (
    <>
      <Link href="/cart">
        <BadgeNumber count={cartData?.userStoriesCount.count}>
          <IconShoppingBag />
        </BadgeNumber>
      </Link>
      <Link href="/wishlist">
        <BadgeNumber count={wishlistData?.userStoriesCount.count}>
          <IconHeart />
        </BadgeNumber>
      </Link>
      <Link href="/purchased">
        <IconInbox />
      </Link>
    </>
  )
}
