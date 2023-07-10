import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, Image, ScrollView } from '../components'
import { ActivityIndicator } from 'react-native'
import {
  StoryQuery,
  useNodeLazyQuery,
  useNodeQuery,
  useStoryQuery,
} from '../gql/generated'

interface IPlayStoryProps {
  route: { params: { storyId: number } }
}

export const PlayScreen = ({ route }: IPlayStoryProps) => {
  const { storyId } = route.params

  const { data, loading } = useStoryQuery({
    variables: { where: { id: storyId } },
  })

  if (loading) {
    return <ActivityIndicator />
  }

  if (!data?.story) {
    return <Text>Story not found.</Text>
  }

  return (
    <View>
      <PlayScreenContent story={data.story} />
    </View>
  )
}

export interface IPlayScreenContentProps {
  story: StoryQuery['story']
}

export const PlayScreenContent = ({ story }: IPlayScreenContentProps) => {
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null)

  return (
    <View>
      {selectedNodeId ? (
        <View>
          <View className="flex flex-row justify-end mb-2">
            <TouchableOpacity
              className="mt-4 text-sm"
              onPress={() => setSelectedNodeId(null)}
            >
              <Text>Reset story</Text>
            </TouchableOpacity>
          </View>
          <Node nodeId={selectedNodeId} setSelectedNodeId={setSelectedNodeId} />
        </View>
      ) : (
        <Launcher story={story} setSelectedNodeId={setSelectedNodeId} />
      )}
    </View>
  )
}

export const Launcher = ({
  story,
  setSelectedNodeId,
}: {
  story: StoryQuery['story']
  setSelectedNodeId: (id: number) => void
}) => {
  return (
    <ScrollView className="space-y-2 ">
      <Image
        className="object-cover w-full border-2 border-white shadow-lg rounded-xl h-96"
        source={{ uri: story.image }}
      />
      <View>
        <Text className="text-lg font-bold">{story.title}</Text>
        <Text className="mt-1 leading-relaxed" style={{ lineHeight: 20 }}>
          {story.description}
        </Text>
      </View>
      {story?.startingNodes?.length || 0 > 1 ? (
        <Text className="text-sm text-gray">
          Pick one of the below beginnings.
        </Text>
      ) : null}
      {story?.startingNodes?.map((node) => (
        <TouchableOpacity
          key={node.id}
          onPress={() => setSelectedNodeId(node.id)}
        >
          <ChoiceText choice={node.title} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export const Node = ({
  nodeId,
  setSelectedNodeId,
}: {
  nodeId: number
  setSelectedNodeId: (id: number | null) => void
}) => {
  const { data, loading } = useNodeQuery({
    variables: { where: { id: nodeId } },
  })
  const [prefetchNodes] = useNodeLazyQuery()
  useEffect(() => {
    if (data?.node?.choiceNodes?.length || 0 > 0) {
      data?.node.choiceNodes?.forEach((node) => {
        prefetchNodes({ variables: { where: { id: node.id } } })
      })
    }
  }, [data?.node?.choiceNodes])

  if (loading) return <ActivityIndicator />
  return (
    <ScrollView className="space-y-2 ">
      <Text className="font-black">{data?.node.title}</Text>
      <Text className="mt-2">{data?.node.content}</Text>
      <View className="flex gap-2 mt-8 text-lg">
        {data?.node?.choiceNodes?.map((choice) => (
          <TouchableOpacity
            key={choice.id}
            onPress={() => setSelectedNodeId(choice.choiceNode.id)}
          >
            <ChoiceText choice={choice.choiceText} />
          </TouchableOpacity>
        ))}
      </View>
      {data?.node.end ? (
        <TouchableOpacity
          className="underline underline-offset-4"
          onPress={() => {
            setSelectedNodeId(null)
          }}
        >
          <ChoiceText choice={'Restart'} />
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  )
}

export const ChoiceText = ({ choice }: { choice: string }) => {
  return <Text className="p-2 border-2 border-black rounded">{choice}</Text>
}
