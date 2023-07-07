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
import { PriceCard } from '../PriceCard'

export interface IStoryCardProps {
  story: StoriesQuery['stories'][0]
}

export const StoryCard = ({ story }: IStoryCardProps) => {
  return (
    <div>
      <Link
        href={{ pathname: 'play', query: { storyId: story.id } }}
        key={story.id}
      >
        <Image
          className="object-cover w-full border-2 border-white shadow-lg rounded-xl h-96"
          width={200}
          height={200}
          src={story.image}
          alt=""
        />
      </Link>
      <div className="mt-2">
        <div className="font-semibold">{story.title}</div>
        <PriceCard price={story.price} />
        <UserActions story={story} />
      </div>
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

  const uid = useUserStore((state) => state.uid)
  if (!uid) {
    return null
  }

  if (!story.price) {
    return null
  }

  return (
    <div className="flex gap-2 mt-2">
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
      {(!story.userStory?.type ||
        [UserStoryType.Wishlisted, UserStoryType.SaveForLater].includes(
          story.userStory?.type,
        )) && (
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
      {story.userStory?.type === UserStoryType.InCart && (
        <Link href="/cart" className="text-xs underline underline-offset-4">
          In cart
        </Link>
      )}
      {story.userStory?.type === UserStoryType.Purchased && (
        <Link
          href="/purchased"
          className="text-xs underline underline-offset-4"
        >
          Purchased
        </Link>
      )}
    </div>
  )
}
