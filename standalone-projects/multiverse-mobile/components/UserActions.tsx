import {
  StoriesQuery,
  UserStoryType,
  namedOperations,
  useCreateUserStoryMutation,
  useRemoveUserStoryMutation,
} from '../gql/generated'
import { Ionicons } from '@expo/vector-icons'

import { TouchableOpacity, Text, View } from '.'
import { useNavigation } from '@react-navigation/native'
import { useUserStore } from '../store/user'
import { ActivityIndicator } from 'react-native'

export const UserActions = ({
  story,
}: {
  story: StoriesQuery['stories'][0]
}) => {
  const navigation: any = useNavigation()

  const [wishlist, { loading: wishlisting }] = useCreateUserStoryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.stories],
  })
  const [addToCart, { loading: addingToCart }] = useCreateUserStoryMutation({
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

  const uid = useUserStore((state) => state.uid)
  console.log('UserActions', uid)
  if (!uid) {
    return null
  }

  if (!story.price) {
    return null
  }

  return (
    <View className="flex flex-row justify-start gap-1 mt-1">
      {/* No type */}
      {!story.userStory?.type && (
        <TouchableOpacity
          disabled={wishlisting}
          onPress={async () =>
            await wishlist({
              variables: {
                createUserStoryInput: {
                  storyId: story.id,
                  uid,
                  type: UserStoryType.Wishlisted,
                },
              },
            })
          }
        >
          {wishlisting ? (
            <ActivityIndicator size="small" />
          ) : (
            <Ionicons size={24} name={'heart-outline'} />
          )}
        </TouchableOpacity>
      )}

      {story.userStory?.type === 'WISHLISTED' && (
        <TouchableOpacity
          disabled={removing}
          onPress={async () =>
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
          }
        >
          {removing ? (
            <ActivityIndicator size="small" />
          ) : (
            <Ionicons size={24} name={'heart'} />
          )}
        </TouchableOpacity>
      )}
      {(!story.userStory?.type ||
        [UserStoryType.Wishlisted, UserStoryType.SaveForLater].includes(
          story.userStory?.type,
        )) && (
        <TouchableOpacity
          onPress={() =>
            addToCart({
              variables: {
                createUserStoryInput: {
                  storyId: story.id,
                  uid,
                  type: UserStoryType.InCart,
                },
              },
            })
          }
          disabled={addingToCart}
        >
          {addingToCart ? (
            <ActivityIndicator size="small" />
          ) : (
            <Ionicons size={24} name={'cart-outline'} />
          )}
        </TouchableOpacity>
      )}

      {story.userStory?.type === UserStoryType.InCart && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Cart', {})
          }}
        >
          <Ionicons size={24} name={'cart'} />
        </TouchableOpacity>
      )}

      {story.userStory?.type === UserStoryType.Purchased && (
        <TouchableOpacity onPress={() => navigation.navigate('Purchased')}>
          <Text>Purchased</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
