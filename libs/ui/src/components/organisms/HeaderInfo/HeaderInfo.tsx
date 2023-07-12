import {
  UserStoryType,
  useUserStoriesCountLazyQuery,
} from '@multiverse-org/network/src/gql/generated'
import { selectUid, selectUser } from '@multiverse-org/store/user'
import { useAppSelector } from '@multiverse-org/store'
import { IconHeart, IconInbox, IconShoppingBag } from '@tabler/icons-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { BadgeNumber } from '../BadgeNumber'

export interface IHeaderInfoProps {}

export const HeaderInfo = ({}: IHeaderInfoProps) => {
  const uid = useAppSelector(selectUid)
  const [fetchCartCount, { data: cartData }] = useUserStoriesCountLazyQuery()
  const [fetchWishlistCount, { data: wishlistData }] =
    useUserStoriesCountLazyQuery()

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
