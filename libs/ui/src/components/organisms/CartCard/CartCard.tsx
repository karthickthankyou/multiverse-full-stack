import {
  UserStoriesQuery,
  UserStoryType,
  namedOperations,
  useCreateUserStoryMutation,
} from '@multiverse-org/network/src/gql/generated'
import Image from 'next/image'
import { PriceCard } from '../PriceCard'
import { PlainButton } from '../../atoms/PlainButton'
import { selectUid, selectUser } from '@multiverse-org/store/user'
import { useAppSelector } from '@multiverse-org/store'
import { notification$ } from '@multiverse-org/util/subjects'

export interface ICartCardProps {
  story: UserStoriesQuery['userStories'][0]['story']
}

export const CartCard = ({ story }: ICartCardProps) => {
  const [saveForLater, { loading }] = useCreateUserStoryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      namedOperations.Query.userStories,
      namedOperations.Query.userStoriesCount,
    ],
  })

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
        <PlainButton
          loading={loading}
          className="text-xs underline text-gray underline-offset-4"
          onClick={() => {
            if (!uid) {
              notification$.next({ message: 'You are not logged in.' })
              return
            }
            saveForLater({
              variables: {
                createUserStoryInput: {
                  storyId: story.id,
                  uid,
                  type: UserStoryType.SaveForLater,
                },
              },
            })
          }}
        >
          Saved for later
        </PlainButton>
      </div>
    </div>
  )
}
