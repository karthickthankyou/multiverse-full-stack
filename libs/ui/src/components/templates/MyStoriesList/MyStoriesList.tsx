import { useStoriesQuery } from '@multiverse-org/network/src/gql/generated'
import { useUserStore } from '@multiverse-org/store/user'
import { Loader } from '../../molecules/Loader'
import Link from 'next/link'

export interface IMyStoriesListProps {}

export const MyStoriesList = ({}: IMyStoriesListProps) => {
  const uid = useUserStore((state) => state.uid)
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
