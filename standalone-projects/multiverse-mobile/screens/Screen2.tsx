import { Text, View } from 'react-native'
import { useStoriesQuery } from '../gql/generated'

export const Screen2 = () => {
  const { data, loading } = useStoriesQuery()
  return (
    <View>
      {data?.stories.map((story) => (
        <Text key={story.id}>{story.title}</Text>
      ))}
    </View>
  )
}
