import { useTakeSkip } from '@multiverse-org/hooks'
import {
  useUserStoriesLazyQuery,
  UserStoryType,
} from '@multiverse-org/network/src/gql/generated'
import { selectUid, selectUser } from '@multiverse-org/store/user'
import { useAppSelector } from '@multiverse-org/store'
import { useEffect } from 'react'
import { ShowData } from '../../organisms/ShowData'
import { SaveForLaterCard } from '../../organisms/SaveForLaterCard'
import { HeaderText } from '../../molecules/HeaderText'
import { AlertSection } from '../../organisms/AlertSection'
import Link from 'next/link'

export interface ISaveForLaterProps {}

export const SaveForLater = ({}: ISaveForLaterProps) => {
  const uid = useAppSelector(selectUid)
  const [fetchUserStories, { data, loading }] = useUserStoriesLazyQuery()

  const { setSkip, setTake, skip, take } = useTakeSkip()

  useEffect(() => {
    if (uid) {
      fetchUserStories({
        variables: {
          uid,
          where: {
            type: { equals: UserStoryType.SaveForLater },
          },
        },
      })
    }
  }, [uid])

  if (!uid) {
    return (
      <AlertSection>
        You are not logged in.<Link href="/login">Login</Link>{' '}
      </AlertSection>
    )
  }

  if (data?.userStoriesCount.count === 0) {
    return null
  }

  return (
    <div>
      <HeaderText>Saved for later</HeaderText>
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
        className="flex flex-col gap-4"
      >
        {data?.userStories.map(({ type, story }) => (
          <SaveForLaterCard key={story.id} story={story} />
        ))}
      </ShowData>
    </div>
  )
}
