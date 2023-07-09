import React from 'react'
import { View, Text } from '../components'
import { RouteProp } from '@react-navigation/native'
import { RootDrawerParamList } from '../config/navigation'

type PlayScreenRouteProp = RouteProp<RootDrawerParamList, 'Play'>

type Props = {
  route: PlayScreenRouteProp
}
export const PlayScreen: React.FC<Props> = ({ route }) => {
  // Access the storyId from the parameters
  const { storyId } = route.params

  // The rest of your component...

  return (
    <View>
      <Text>Story ID: {storyId}</Text>
    </View>
  )
}
