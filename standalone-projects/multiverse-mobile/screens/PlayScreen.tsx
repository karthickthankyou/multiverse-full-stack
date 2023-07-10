import React from 'react'
import { View, Text, Image } from '../components'
import { RouteProp } from '@react-navigation/native'
import { RootDrawerParamList } from '../config/navigation'
import { UserStoryType, useStoryQuery } from '../gql/generated'
import { Dimensions } from 'react-native'

type PlayScreenRouteProp = RouteProp<RootDrawerParamList, 'Play'>

type Props = {
  route: PlayScreenRouteProp
}

const screenWidth = Dimensions.get('window').width

export const PlayScreen: React.FC<Props> = ({ route }) => {
  // Access the storyId from the parameters
  const { storyId } = route.params

  const { data, loading } = useStoryQuery({
    variables: { where: { id: storyId } },
  })

  if (data?.story.userStory?.type === UserStoryType.InCart) {
    return <Text>In cart</Text>
  }

  return (
    <View>
      <View>
        {data?.story.image ? (
          <Image
            className="object-cover "
            source={{ uri: data?.story?.image || '' }}
            style={{ width: screenWidth, height: screenWidth }}
            alt=""
          />
        ) : null}
        <Text className="mt-1 text-xl font-light">{data?.story.title}</Text>
        <Text className="mt-2 text-sm text-gray">
          {data?.story.description}
        </Text>
      </View>
    </View>
  )
}
