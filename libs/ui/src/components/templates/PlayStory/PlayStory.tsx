import {
  StoryQuery,
  useNodeLazyQuery,
  useNodeQuery,
} from '@multiverse-org/network/src/gql/generated'
import { useEffect, useState } from 'react'
import { PlainButton } from '../../atoms/PlainButton'
import { Button } from '../../atoms/Button'
import { LoaderPanel } from '../../molecules/Loader'

export interface IPlayStoryProps {
  story: StoryQuery['story']
}

export const PlayStory = ({ story }: IPlayStoryProps) => {
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null)

  return (
    <div>
      <div className="flex justify-end">
        <PlainButton
          className="mt-4 text-sm"
          onClick={() => setSelectedNodeId(null)}
        >
          Reset
        </PlainButton>
      </div>
      {selectedNodeId ? (
        <Node nodeId={selectedNodeId} setSelectedNodeId={setSelectedNodeId} />
      ) : (
        <Launcher story={story} setSelectedNodeId={setSelectedNodeId} />
      )}
    </div>
  )
}

export const Launcher = ({
  story,
  setSelectedNodeId,
}: {
  story?: StoryQuery['story']
  setSelectedNodeId: (id: number) => void
}) => {
  return (
    <div className="space-y-2">
      {story?.startingNodes?.length || 0 > 1 ? (
        <div className="text-sm text-gray">
          Pick one of the below beginnings.
        </div>
      ) : null}
      {story?.startingNodes?.map((node) => (
        <Button
          variant={'outlined'}
          key={node.id}
          onClick={() => setSelectedNodeId(node.id)}
        >
          {node.title}
        </Button>
      ))}
    </div>
  )
}

export const Node = ({
  nodeId,
  setSelectedNodeId,
}: {
  nodeId: number
  setSelectedNodeId: (id: number | null) => void
}) => {
  const { data, loading } = useNodeQuery({
    variables: { where: { id: nodeId } },
  })
  console.log('data ', data)
  const [prefetchNodes] = useNodeLazyQuery()
  useEffect(() => {
    if (data?.node?.choiceNodes?.length || 0 > 0) {
      data?.node.choiceNodes?.forEach((node) => {
        prefetchNodes({ variables: { where: { id: node.id } } })
      })
    }
  }, [data?.node?.choiceNodes])

  if (loading) return <LoaderPanel />
  return (
    <div>
      <div className="font-black">{data?.node.title}</div>
      <div className="mt-2">{data?.node.content}</div>
      <div className="flex gap-2 mt-8 text-lg">
        {data?.node?.choiceNodes?.map((choice) => (
          <Button
            variant={'outlined'}
            key={choice.id}
            onClick={() => setSelectedNodeId(choice.choiceNode.id)}
          >
            {choice.choiceText}
          </Button>
        ))}
      </div>
      {data?.node.end ? (
        <PlainButton
          className="underline underline-offset-4"
          onClick={() => {
            setSelectedNodeId(null)
          }}
        >
          Restart
        </PlainButton>
      ) : null}
    </div>
  )
}
