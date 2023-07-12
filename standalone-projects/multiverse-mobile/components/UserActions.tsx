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
  id,
  price,
  type,
}: {
  id: number
  price: number
  type?: UserStoryType | null
}) => {
  const navigation: any = useNavigation()

  const [saveForLater, { loading: savingForLater }] =
    useCreateUserStoryMutation({
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

  const uid = useAppSelector(selectUser)
  console.log('UserActions', uid)
  if (!uid) {
    return null
  }

  if (!price) {
    return null
  }

  if (type === UserStoryType.Purchased) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Purchased')}>
        <Text className="text-xs">Purchased</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View className="flex flex-row justify-start gap-1 mt-1">
      <WishlistButton type={type} id={id} uid={uid} />
      <CartButton type={type} id={id} uid={uid} />
      <SaveForLaterButton type={type} id={id} uid={uid} />
    </View>
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
    <TouchableOpacity
      disabled={removing}
      onPress={async () =>
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
        <ActivityIndicator size="small" />
      ) : (
        <Ionicons size={24} name={'heart'} />
      )}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      disabled={wishlisting}
      onPress={async () =>
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
      {wishlisting ? (
        <ActivityIndicator size="small" />
      ) : (
        <Ionicons size={24} name={'heart-outline'} />
      )}
    </TouchableOpacity>
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
    <TouchableOpacity
      disabled={removing}
      onPress={async () =>
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
        <ActivityIndicator size="small" />
      ) : (
        <Ionicons size={24} name={'cart'} />
      )}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      disabled={wishlisting}
      onPress={async () =>
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
      {wishlisting ? (
        <ActivityIndicator size="small" />
      ) : (
        <Ionicons size={24} name={'cart-outline'} />
      )}
    </TouchableOpacity>
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
    <TouchableOpacity
      disabled={removing}
      onPress={async () =>
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
        <ActivityIndicator size="small" />
      ) : (
        <Ionicons size={24} name={'save'} />
      )}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      disabled={adding}
      onPress={async () =>
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
      {adding ? (
        <ActivityIndicator size="small" />
      ) : (
        <Ionicons size={24} name={'save-outline'} />
      )}
    </TouchableOpacity>
  )
}
