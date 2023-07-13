import { selectUid, selectUser } from '@multiverse-org/store/user'
import { useAppSelector } from '@multiverse-org/store'
import { Loader, LoaderPanel } from '../../molecules/Loader'
import { AlertSection } from '../../organisms/AlertSection'
import Link from 'next/link'
import { useStoriesQuery } from '@multiverse-org/network/src/generated'
import { IconMoodSad } from '@tabler/icons-react'
import { MyStoryCard } from '../../organisms/MyStoryCard'
import { useTakeSkip } from '@multiverse-org/hooks'
import { ShowData } from '../../organisms/ShowData'

export interface IMyStoriesProps {}

export const MyStories = ({}: IMyStoriesProps) => {
  const { uid, loaded } = useAppSelector(selectUser)

  if (!loaded) {
    return <Loader />
  }
  if (!uid) {
    return (
      <AlertSection>
        <div>You have to be logged in.</div>
        <Link
          href="/login"
          className="font-semibold underline underline-offset-4"
        >
          Login
        </Link>
      </AlertSection>
    )
  }
  return (
    <div>
      <MyStoriesList />
    </div>
  )
}

export const MyStoriesList = () => {
  const uid = useAppSelector(selectUid)
  const { setSkip, setTake, skip, take } = useTakeSkip()

  const { data, loading, error } = useStoriesQuery({
    variables: { where: { authorId: { equals: uid } } },
  })
  if (loading) {
    return <LoaderPanel text="Fetching your stories..." />
  }

  if (error?.message) {
    return (
      <AlertSection title="Error">
        <IconMoodSad /> Something went wrong. Please try again later.
      </AlertSection>
    )
  }

  if (data?.stories.length === 0) {
    return <AlertSection title="No results">No results found.</AlertSection>
  }

  return (
    <ShowData
      loading={false}
      pagination={{
        setSkip,
        setTake,
        skip,
        take,
        resultCount: data?.stories.length,
        totalCount: data?.storiesCount.count,
      }}
      title={undefined}
    >
      {data?.stories.map((story) => (
        <MyStoryCard key={story.id} story={story} />
      ))}
    </ShowData>
  )
}
