import {
  StoriesQuery,
  UserStoryType,
  namedOperations,
  useCreateUserStoryMutation,
  useRemoveUserStoryMutation,
} from '@multiverse-org/network/src/gql/generated'
import Image from 'next/image'
import Link from 'next/link'

import {
  IconHeart,
  IconHeartFilled,
  IconShoppingBag,
} from '@tabler/icons-react'
import { useUserStore } from '@multiverse-org/store/user'
import { PlainButton } from '../../atoms/PlainButton'

export interface IStoryCardProps {
  story: StoriesQuery['stories'][0]
}

export const StoryCard = ({ story }: IStoryCardProps) => {
  return (
    <div>
      <Link
        href={{ pathname: 'play', query: { storyId: story.id } }}
        key={story.id}
        className="relative space-y-2"
      >
        <Image
          className="object-cover w-full h-full"
          width={200}
          height={200}
          src={story.image}
          alt=""
        />
        <div className="font-semibold">{story.title}</div>
      </Link>
      <UserActions story={story} />
    </div>
  )
}

export const UserActions = ({
  story,
}: {
  story: StoriesQuery['stories'][0]
}) => {
  const [wishlist, { loading: wishlisting }] = useCreateUserStoryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.stories],
  })
  const [addToCart, { loading: addingToCart }] = useCreateUserStoryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.stories],
  })
  const [removeUserStory, { data: dataRemoveUserStory, loading: removing }] =
    useRemoveUserStoryMutation({
      awaitRefetchQueries: true,
      refetchQueries: [namedOperations.Query.stories],
    })

  const uid = useUserStore((state) => state.uid)
  if (!uid) {
    return null
  }

  console.log(story.userStory?.type)
  return (
    <div className="flex gap-2">
      {/* No type */}
      {!story.userStory?.type && (
        <PlainButton
          onClick={async () => {
            await wishlist({
              variables: {
                createUserStoryInput: {
                  storyId: story.id,
                  uid,
                  type: UserStoryType.Wishlisted,
                },
              },
            })
          }}
          loading={wishlisting}
        >
          <IconHeart />
        </PlainButton>
      )}
      {story.userStory?.type === 'WISHLISTED' && (
        <PlainButton
          onClick={async () => {
            await removeUserStory({
              variables: {
                where: {
                  uid_storyId: {
                    storyId: story.id,
                    uid,
                  },
                },
              },
            })
          }}
          loading={removing}
          disabled={removing}
        >
          <IconHeartFilled />
        </PlainButton>
      )}
      {(!story.userStory?.type || story.userStory?.type !== 'IN_CART') && (
        <PlainButton
          onClick={async () => {
            await addToCart({
              variables: {
                createUserStoryInput: {
                  storyId: story.id,
                  uid,
                  type: UserStoryType.InCart,
                },
              },
            })
          }}
          loading={addingToCart}
          disabled={addingToCart}
        >
          <IconShoppingBag />
        </PlainButton>
      )}
      {story.userStory?.type === 'IN_CART' && (
        <Link href="/cart" className="text-xs underline underline-offset-4">
          In cart
        </Link>
      )}
      {story.userStory?.type === 'PURCHASED' && (
        <Link href="/cart" className="text-xs underline underline-offset-4">
          Purchased
        </Link>
      )}
    </div>
  )
}
