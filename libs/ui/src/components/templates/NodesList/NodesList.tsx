import {
  useNodesQuery,
  useStoryQuery,
} from '@multiverse-org/network/src/gql/generated'
import { Loader } from '../../molecules/Loader'
import { ShowData } from '../../organisms/ShowData'
import { useTakeSkip } from '@multiverse-org/hooks'

export interface INodesListProps {
  storyId: number
}

export const NodesList = ({ storyId }: INodesListProps) => {
  const { data, loading } = useNodesQuery({
    variables: { where: { storyId: { equals: storyId } } },
  })

  const { setSkip, setTake, skip, take } = useTakeSkip()

  if (loading) {
    return <Loader />
  }
  return (
    <ShowData
      loading={false}
      pagination={{
        resultCount: data?.nodes?.length,
        totalCount: data?.nodesCount.count,
        setSkip,
        setTake,
        skip,
        take,
      }}
      title={undefined}
    >
      {data?.nodes?.map((node) => (
        <div key={node.id}>{node.title}</div>
      ))}
    </ShowData>
  )
}
