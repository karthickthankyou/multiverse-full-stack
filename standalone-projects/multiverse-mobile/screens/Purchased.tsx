import { Text, View, ScrollView, RefreshControl } from 'react-native'
import { UserStoryType, useUserStoriesLazyQuery } from '../gql/generated'
import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../providers/UserProvider'
import { StoryCardSimple } from '../components/StoryCardSimple'
import { TouchableOpacity } from '../components'
import { useNavigation } from '@react-navigation/native'

export const Purchased = () => {
  const user = useContext(UserContext)
  const [getUserStories, { data, loading }] = useUserStoriesLazyQuery()

  const onRefresh = useCallback(() => {
    if (user?.uid) {
      getUserStories({
        variables: {
          uid: user?.uid,
          where: {
            uid: { equals: user.uid },
            type: { equals: UserStoryType.Purchased },
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
            type: { equals: UserStoryType.Purchased },
          },
        },
      })
    }
  }, [user])
  const navigation: any = useNavigation()

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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Play', { storyId: userStory.story.id })
          }
          key={userStory.story.id}
        >
          <StoryCardSimple userStory={userStory} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}
