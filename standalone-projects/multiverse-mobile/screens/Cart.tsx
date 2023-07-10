import { RefreshControl } from 'react-native'
import { UserStoryType, useUserStoriesLazyQuery } from '../gql/generated'
import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../providers/UserProvider'
import { StoryCardSimple } from '../components/StoryCardSimple'
import { View, Text, ScrollView } from '../components'

export const Cart = () => {
  const user = useContext(UserContext)
  const [getUserStories, { data, loading }] = useUserStoriesLazyQuery()
  console.log('data ', data)

  const onRefresh = useCallback(() => {
    if (user?.uid) {
      getUserStories({
        variables: {
          uid: user?.uid,
          where: {
            uid: { equals: user?.uid },
            type: { equals: UserStoryType.InCart },
          },
        },

        fetchPolicy: 'cache-and-network',
      })
    }
  }, [])
  useEffect(() => {
    if (user?.uid) {
      getUserStories({
        variables: {
          uid: user.uid,
          where: {
            uid: { equals: user.uid },
            type: { equals: UserStoryType.InCart },
          },
        },
      })
    }
  }, [user])
  if (!user?.uid) {
    return <Text>You need to login...</Text>
  }

  return (
    <ScrollView
      className="space-y-4"
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    >
      {loading && <Text>Loading...</Text>}

      {!loading && data?.userStories.length === 0 && <Text>No results.</Text>}

      {data?.userStories.map((userStory) => (
        <StoryCardSimple key={userStory.story.id} userStory={userStory} />
      ))}
      <View className="p-2 mt-6 bg-red-100">
        <Text className="text-xs text-red">
          Stripe payment for multiverse in mobile apps is temporarily disabled.
          Please use the web version to execute payment in your cart.
        </Text>
      </View>
    </ScrollView>
  )
}
