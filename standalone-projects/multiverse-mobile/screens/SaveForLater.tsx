import { Text, ScrollView, RefreshControl } from 'react-native'
import { UserStoryType, useUserStoriesLazyQuery } from '../gql/generated'
import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../providers/UserProvider'
import { StoryCardSimple } from '../components/StoryCardSimple'

export const SaveForLater = () => {
  const user = useContext(UserContext)
  const [getUserStories, { data, loading }] = useUserStoriesLazyQuery()

  const onRefresh = useCallback(() => {
    if (user?.uid) {
      getUserStories({
        variables: {
          uid: user?.uid,
          where: {
            uid: { equals: user?.uid },
            type: { equals: UserStoryType.SaveForLater },
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
            type: { equals: UserStoryType.SaveForLater },
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
        <StoryCardSimple userStory={userStory} />
      ))}
    </ScrollView>
  )
}
