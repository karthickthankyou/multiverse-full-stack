import {
  StoryQuery,
  useNodeLazyQuery,
  useNodeQuery,
} from '@multiverse-org/network/src/generated'
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
    <div className="mb-24 ">
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
      <div className="flex flex-col items-start gap-3">
        {story?.startingNodes?.map((node) => (
          <PlainButton
            className="py-1 transition-all hover:underline hover:underline-offset-4 hover:font-bold hover:shadow-lg"
            key={node.id}
            onClick={() => setSelectedNodeId(node.id)}
          >
            {node.title}
          </PlainButton>
        ))}
      </div>
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

  if (loading) return <LoaderPanel />
  return (
    <div>
      <div className="max-w-md font-black">{data?.node.title}</div>
      <div className="max-w-md mt-2">{data?.node.content}</div>
      <div className="flex flex-col items-start gap-2 mt-8 text-lg">
        {data?.node?.choices?.map((choice) => (
          <PlainButton
            className="py-1 transition-all hover:underline hover:underline-offset-4 hover:font-bold hover:shadow-lg"
            key={choice.id}
            onClick={() => {
              console.log('choice.choiceNode.id ', choice.choiceNode.id)
              setSelectedNodeId(choice.choiceNode.id)
            }}
          >
            {choice.choiceText}
          </PlainButton>
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
