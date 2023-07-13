import { StoriesQuery } from '../gql/generated'

import { PriceCard } from './PriceCard'
import { TouchableOpacity, Image, View, Text } from '.'
import { useNavigation } from '@react-navigation/native'
import { UserActions } from './UserActions'
import { Dimensions } from 'react-native'

export interface IStoryCardProps {
  story: StoriesQuery['stories'][0]
}
const screenWidth = Dimensions.get('window').width

export const StoryCard = ({ story }: IStoryCardProps) => {
  return (
    <View>
      <Image
        className="object-cover w-full shadow-lg rounded-xl h-96"
        source={{ uri: story.image }}
        style={{ width: screenWidth, height: screenWidth }}
        alt=""
      />

      <View className="p-2">
        <View className="flex flex-row items-center justify-between">
          <Text className="text-lg font-medium">{story.title}</Text>
          <PriceCard price={story.price} />
        </View>
        <UserActions
          id={story.id}
          price={story.price}
          type={story?.userStory?.type}
        />
      </View>
    </View>
  )
}
