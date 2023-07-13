import {
  UserStoryType,
  useUserStoriesLazyQuery,
  useUserStoriesQuery,
} from '@multiverse-org/network/src/generated'
import { selectUid, selectUser } from '@multiverse-org/store/user'
import { useAppSelector } from '@multiverse-org/store'
import { useEffect } from 'react'
import { ShowData } from '../../organisms/ShowData'
import { useTakeSkip } from '@multiverse-org/hooks'
import { StoryCard } from '../../organisms/StoryCard'

export interface IWishlistProps {
  type: UserStoryType
}

export const UserStories = ({ type }: IWishlistProps) => {
  const uid = useAppSelector(selectUid)
  const [fetchUserStories, { data, loading }] = useUserStoriesLazyQuery()

  const { setSkip, setTake, skip, take } = useTakeSkip()

  useEffect(() => {
    if (uid) {
      fetchUserStories({
        variables: {
          uid,
          where: {
            type: { equals: type },
          },
        },
      })
    }
  }, [uid])

  return (
    <ShowData
      loading={loading}
      pagination={{
        resultCount: data?.userStories.length,
        totalCount: data?.userStoriesCount.count,
        setSkip,
        setTake,
        skip,
        take,
      }}
      title={undefined}
    >
      {data?.userStories.map(({ type, story }) => (
        <StoryCard
          uid={uid}
          key={story.id}
          story={{
            __typename: undefined,
            id: story.id,
            title: story.title,
            image: story.image,
            price: story.price,
            userStory: {
              type,
            },
          }}
        />
      ))}
    </ShowData>
  )
}
