import { Text, View, ScrollView, RefreshControl } from 'react-native'
import { UserStoryType, useUserStoriesLazyQuery } from '../gql/generated'
import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../providers/UserProvider'
import { StoryCardSimple } from '../components/StoryCardSimple'

export const Wishlist = () => {
  const user = useContext(UserContext)
  const [getUserStories, { data, loading }] = useUserStoriesLazyQuery()

  const onRefresh = useCallback(() => {
    if (user?.uid) {
      getUserStories({
        variables: {
          uid: user?.uid,
          where: {
            uid: { equals: user?.uid },
            type: { equals: UserStoryType.Wishlisted },
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
            type: { equals: UserStoryType.Wishlisted },
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
        <StoryCardSimple key={userStory.story.id} userStory={userStory} />
      ))}
    </ScrollView>
  )
}
