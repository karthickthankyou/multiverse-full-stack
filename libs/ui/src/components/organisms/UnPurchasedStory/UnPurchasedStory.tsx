import {
  StoryQuery,
  UserStoryType,
  namedOperations,
  useCreateUserStoryMutation,
} from '@multiverse-org/network/src/gql/generated'
import { IconShoppingBag } from '@tabler/icons-react'
import { useUserStore } from '@multiverse-org/store/user'
import { notification$ } from '@multiverse-org/util/subjects'
import { Button } from '../../atoms/Button'

export interface IUnPurchasedStoryProps {
  story: StoryQuery['story']
}

export const UnPurchasedStory = ({ story }: IUnPurchasedStoryProps) => {
  const [addToCart, { loading: addingToCart }] = useCreateUserStoryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.story],
  })

  const uid = useUserStore((s) => s.uid)

  return (
    <div>
      <Button
        onClick={async () => {
          if (!uid) {
            notification$.next({ message: 'You are not logged in.' })
            return
          }

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
        className="flex items-center gap-1"
      >
        <IconShoppingBag /> Add to Cart
      </Button>
    </div>
  )
}
