import {
  UserStoriesQuery,
  UserStoryType,
  namedOperations,
  useCreateUserStoryMutation,
} from '@multiverse-org/network/src/generated'
import Image from 'next/image'
import { PriceCard } from '../PriceCard'
import { PlainButton } from '../../atoms/PlainButton'
import { selectUid, selectUser } from '@multiverse-org/store/user'
import { useAppSelector } from '@multiverse-org/store'
import { notification$ } from '@multiverse-org/util/subjects'

export interface ICartCardProps {
  story: UserStoriesQuery['userStories'][0]['story']
}

export const SaveForLaterCard = ({ story }: ICartCardProps) => {
  const [moveToCart, { loading }] = useCreateUserStoryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.userStories],
  })
  const [moveToWishlist, { loading: wishlisting }] = useCreateUserStoryMutation(
    {
      awaitRefetchQueries: true,
      refetchQueries: [
        namedOperations.Query.userStories,
        namedOperations.Query.userStoriesCount,
      ],
    },
  )

  const uid = useAppSelector(selectUid)
  return (
    <div className="flex gap-2">
      <Image
        className="object-cover w-36 h-36"
        width={200}
        height={200}
        src={story.image}
        alt=""
      />
      <div>
        <div className="font-semibold">{story.title}</div>
        <PriceCard price={story.price} />
        <div className="flex flex-col items-start gap-1 mt-1 text-xs">
          <PlainButton
            loading={loading}
            onClick={() => {
              if (!uid) {
                notification$.next({ message: 'You are not logged in.' })
                return
              }
              moveToCart({
                variables: {
                  createUserStoryInput: {
                    storyId: story.id,
                    uid,
                    type: UserStoryType.InCart,
                  },
                },
              })
            }}
          >
            Add to cart
          </PlainButton>
          <PlainButton
            loading={wishlisting}
            onClick={() => {
              if (!uid) {
                notification$.next({ message: 'You are not logged in.' })
                return
              }
              moveToWishlist({
                variables: {
                  createUserStoryInput: {
                    storyId: story.id,
                    uid,
                    type: UserStoryType.Wishlisted,
                  },
                },
              })
            }}
          >
            Add to wishlist
          </PlainButton>
        </div>
      </div>
    </div>
  )
}
