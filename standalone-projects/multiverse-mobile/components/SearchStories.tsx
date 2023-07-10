import { useCallback, useEffect, useState } from 'react'
import { StoryCard } from './StoryCard'
import { StoriesQuery, useStoriesLazyQuery } from '../gql/generated'
import { useDebouncedValue } from '../hooks'
import { TextInput, View } from '.'
import { FlatList, RefreshControl } from 'react-native'

export interface ISearchStoriesProps {}
type Story = NonNullable<StoriesQuery['stories']>[0]

export const SearchStories = ({}: ISearchStoriesProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300)
  const [getStories, { data, loading, fetchMore }] = useStoriesLazyQuery()

  useEffect(() => {
    getStories({
      variables: { searchTerm: debouncedSearchTerm },
      fetchPolicy: 'cache-and-network',
    })
  }, [debouncedSearchTerm])

  const onRefresh = useCallback(() => {
    getStories({
      variables: { searchTerm: debouncedSearchTerm },
      fetchPolicy: 'cache-and-network',
    })
  }, [debouncedSearchTerm])

  const loadMoreTransactions = async () => {
    await fetchMore({
      variables: {
        skip: data?.stories.length,
        take: 8,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          products: [
            ...(prev?.stories || []),
            ...(fetchMoreResult?.stories || []),
          ],
        })
      },
    })
  }

  return (
    <View>
      <FlatList<Story>
        ListHeaderComponent={
          <View className="flex justify-center my-4">
            <TextInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Search stories"
              className="p-1"
            />
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        data={data?.stories}
        renderItem={({ item, index }) => <StoryCard key={index} story={item} />}
        onEndReached={loadMoreTransactions}
      />
    </View>
  )
}
