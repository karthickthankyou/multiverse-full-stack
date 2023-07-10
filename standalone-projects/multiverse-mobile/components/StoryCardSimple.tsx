import { UserStoriesQuery } from '../gql/generated'

import { PriceCard } from './PriceCard'
import { TouchableOpacity, Image, View, Text } from '.'
import { useNavigation } from '@react-navigation/native'
import { UserActions } from './UserActions'

export interface IStoryCardProps {
  userStory: UserStoriesQuery['userStories'][0]
}

export const StoryCardSimple = ({ userStory }: IStoryCardProps) => {
  const navigation: any = useNavigation()
  return (
    <View className="flex flex-row gap-1">
      <Image
        className="object-cover border-2 border-white shadow-lg rounded-xl h-36 w-36"
        source={{ uri: userStory.story.image }}
        alt=""
      />

      <View>
        <View className="flex flex-col items-start gap-2">
          <Text className="text-lg font-medium">{userStory.story.title}</Text>
          <View>
            <PriceCard price={userStory.story.price} />
          </View>
        </View>
        <UserActions
          id={userStory.story.id}
          type={userStory.type}
          price={userStory.story.id}
        />
      </View>
    </View>
  )
}
