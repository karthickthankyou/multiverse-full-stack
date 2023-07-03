import { useStoriesQuery } from '@multiverse-org/network/src/gql/generated'
import { useUserStore } from '@multiverse-org/store/user'
import { Loader } from '../../molecules/Loader'

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
        <div key={story.id}>{story.id}</div>
      ))}
    </div>
  )
}
