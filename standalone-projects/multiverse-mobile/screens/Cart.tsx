import { Text, View, ScrollView, RefreshControl } from 'react-native'
import { UserStoryType, useUserStoriesLazyQuery } from '../gql/generated'
import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../providers/UserProvider'

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
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    >
      {loading && <Text>Loading...</Text>}

      {!loading && data?.userStories.length === 0 && <Text>No results.</Text>}

      {data?.userStories.map((userStory) => (
        <Text key={userStory.story.id}>{userStory.story.title}</Text>
      ))}
      <View>
        <Text>
          Stripe payment for multiverse in mobile apps is temporarily disabled.
          Please use the web version to execute payment in your cart.
        </Text>
      </View>
    </ScrollView>
  )
}
