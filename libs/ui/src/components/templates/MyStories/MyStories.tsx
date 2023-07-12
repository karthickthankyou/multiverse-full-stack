import { selectUid, selectUser } from '@multiverse-org/store/user'
import { useAppSelector } from '@multiverse-org/store'
import { Loader, LoaderPanel } from '../../molecules/Loader'
import { AlertSection } from '../../organisms/AlertSection'
import Link from 'next/link'
import { useStoriesQuery } from '@multiverse-org/network/src/gql/generated'
import { IconMoodSad } from '@tabler/icons-react'

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
    <div>
      {data?.stories.map((story) => (
        <div key={story.id}>
          <div>{story.id}</div>
          <div>{story.title}</div>
          <Link href={`/connect-nodes?storyId=${story.id}`}>Modify</Link>
        </div>
      ))}
    </div>
  )
}
