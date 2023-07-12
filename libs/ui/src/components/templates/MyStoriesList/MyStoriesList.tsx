import { useStoriesQuery } from '@multiverse-org/network/src/gql/generated'
import { selectUid, selectUser } from '@multiverse-org/store/user'
import { useAppSelector } from '@multiverse-org/store'
import { Loader } from '../../molecules/Loader'
import Link from 'next/link'

export interface IMyStoriesListProps {}

export const MyStoriesList = ({}: IMyStoriesListProps) => {
  const uid = useAppSelector(selectUid)
  const { data, loading } = useStoriesQuery({
    variables: { where: { authorId: { equals: uid } } },
  })
  if (loading) {
    return <Loader />
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
