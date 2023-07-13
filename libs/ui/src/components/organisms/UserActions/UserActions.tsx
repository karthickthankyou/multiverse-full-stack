import {
  StoriesQuery,
  UserStoryType,
  namedOperations,
  useCreateUserStoryMutation,
  useRemoveUserStoryMutation,
} from '@multiverse-org/network/src/generated'
import Link from 'next/link'
import { LoaderPanel } from '../../molecules/Loader'
import {
  IconBasket,
  IconBasketFilled,
  IconDisc,
  IconDiscOff,
  IconHeart,
  IconHeartFilled,
} from '@tabler/icons-react'
import { PlainButton } from '../../atoms/PlainButton'

export interface IUserActionsProps {}

export const UserActions = ({
  story,
  uid,
}: {
  story: StoriesQuery['stories'][0]
  uid?: string
}) => {
  const [wishlist, { loading: wishlisting }] = useCreateUserStoryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.stories],
  })
  const [addToCart, { loading: addingToCart }] = useCreateUserStoryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      namedOperations.Query.stories,
      namedOperations.Query.userStories,
      namedOperations.Query.userStoriesCount,
    ],
  })
  const [removeUserStory, { data: dataRemoveUserStory, loading: removing }] =
    useRemoveUserStoryMutation({
      awaitRefetchQueries: true,
      refetchQueries: [
        namedOperations.Query.stories,
        namedOperations.Query.userStories,
        namedOperations.Query.userStoriesCount,
      ],
    })

  if (!uid) {
    return null
  }

  if (!story.price) {
    return null
  }

  if (story.userStory?.type === UserStoryType.Purchased) {
    return (
      <Link href="/purchased">
        <div className="text-xs">Purchased</div>
      </Link>
    )
  }

  return (
    <div className="flex justify-start gap-1 mt-1">
      <WishlistButton type={story.userStory?.type} id={story.id} uid={uid} />
      <CartButton type={story.userStory?.type} id={story.id} uid={uid} />
      <SaveForLaterButton
        type={story.userStory?.type}
        id={story.id}
        uid={uid}
      />
    </div>
  )
}

export const WishlistButton = ({
  id,
  uid,
  type,
}: {
  id: number
  uid: string
  type?: UserStoryType | null
}) => {
  const [wishlist, { loading: wishlisting }] = useCreateUserStoryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      namedOperations.Query.stories,
      namedOperations.Query.userStories,
    ],
  })

  const [removeUserStory, { data: dataRemoveUserStory, loading: removing }] =
    useRemoveUserStoryMutation({
      awaitRefetchQueries: true,
      refetchQueries: [
        namedOperations.Query.stories,
        namedOperations.Query.userStories,
      ],
    })
  return type === 'WISHLISTED' ? (
    <PlainButton
      disabled={removing}
      onClick={async () =>
        await removeUserStory({
          variables: {
            where: {
              uid_storyId: {
                storyId: id,
                uid,
              },
            },
          },
        })
      }
    >
      {removing ? <LoaderPanel /> : <IconHeartFilled />}
    </PlainButton>
  ) : (
    <PlainButton
      disabled={wishlisting}
      onClick={async () =>
        await wishlist({
          variables: {
            createUserStoryInput: {
              storyId: id,
              uid,
              type: UserStoryType.Wishlisted,
            },
          },
        })
      }
    >
      {wishlisting ? <LoaderPanel /> : <IconHeart />}
    </PlainButton>
  )
}

export const CartButton = ({
  id,
  uid,
  type,
}: {
  id: number
  uid: string
  type?: UserStoryType | null
}) => {
  const [wishlist, { loading: wishlisting }] = useCreateUserStoryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      namedOperations.Query.stories,
      namedOperations.Query.userStories,
    ],
  })

  const [removeUserStory, { data: dataRemoveUserStory, loading: removing }] =
    useRemoveUserStoryMutation({
      awaitRefetchQueries: true,
      refetchQueries: [
        namedOperations.Query.stories,
        namedOperations.Query.userStories,
      ],
    })
  return type === UserStoryType.InCart ? (
    <PlainButton
      disabled={removing}
      onClick={async () =>
        await removeUserStory({
          variables: {
            where: {
              uid_storyId: {
                storyId: id,
                uid,
              },
            },
          },
        })
      }
    >
      {removing ? (
        <LoaderPanel />
      ) : (
        <IconBasketFilled size={24} name={'cart'} />
      )}
    </PlainButton>
  ) : (
    <PlainButton
      disabled={wishlisting}
      onClick={async () =>
        await wishlist({
          variables: {
            createUserStoryInput: {
              storyId: id,
              uid,
              type: UserStoryType.InCart,
            },
          },
        })
      }
    >
      {wishlisting ? <LoaderPanel /> : <IconBasket />}
    </PlainButton>
  )
}

export const SaveForLaterButton = ({
  id,
  uid,
  type,
}: {
  id: number
  uid: string
  type?: UserStoryType | null
}) => {
  const [addUserStory, { loading: adding }] = useCreateUserStoryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      namedOperations.Query.stories,
      namedOperations.Query.userStories,
    ],
  })

  const [removeUserStory, { loading: removing }] = useRemoveUserStoryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      namedOperations.Query.stories,
      namedOperations.Query.userStories,
    ],
  })
  return type === UserStoryType.SaveForLater ? (
    <PlainButton
      disabled={removing}
      onClick={async () =>
        await removeUserStory({
          variables: {
            where: {
              uid_storyId: {
                storyId: id,
                uid,
              },
            },
          },
        })
      }
    >
      {removing ? <LoaderPanel /> : <IconDiscOff />}
    </PlainButton>
  ) : (
    <PlainButton
      disabled={adding}
      onClick={async () =>
        await addUserStory({
          variables: {
            createUserStoryInput: {
              storyId: id,
              uid,
              type: UserStoryType.InCart,
            },
          },
        })
      }
    >
      {adding ? <LoaderPanel /> : <IconDisc />}
    </PlainButton>
  )
}
