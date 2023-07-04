import { useEffect, useState } from 'react'
import { Button } from '../../atoms/Button'
import { Dialog } from '../../atoms/Dialog'
import {
  NodeQuery,
  QueryMode,
  namedOperations,
  useAddChildNodesMutation,
  useNodeLazyQuery,
  useNodesQuery,
} from '@multiverse-org/network/src/gql/generated'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { useDebouncedValue } from '@multiverse-org/hooks/src/async'
import { ShowData } from '../ShowData'
import { useTakeSkip } from '@multiverse-org/hooks'
import { notification$ } from '@multiverse-org/util/subjects'

export interface IAddChoicesDialogProps {
  nodeId: number
}

export const AddChoicesDialog = ({ nodeId }: IAddChoicesDialogProps) => {
  const [open, setOpen] = useState(false)

  const [getNode, { loading, data }] = useNodeLazyQuery()
  useEffect(() => {
    getNode({ variables: { where: { id: nodeId } } })
  }, [])

  return (
    <div>
      <Button variant="text" size="none" onClick={() => setOpen(true)}>
        Add choices
      </Button>
      <Dialog open={open} setOpen={setOpen} title={'Add choices'}>
        <div>{data?.node.title}</div>
        <div>{data?.node.content}</div>
        <ChooseChoices
          nodeId={nodeId}
          childNodes={data?.node.childNodes || []}
        />
      </Dialog>
    </div>
  )
}

type ChildNodes = NonNullable<NodeQuery['node']['childNodes']>

const ChooseChoices = ({
  childNodes = [],
  nodeId,
}: {
  childNodes: ChildNodes
  nodeId: number
}) => {
  const [searchText, setSearchText] = useState('')

  const debouncedSearchText = useDebouncedValue(searchText, 300)

  const { data, loading } = useNodesQuery({
    variables: {
      where: debouncedSearchText
        ? {
            title: {
              contains: debouncedSearchText,
              mode: QueryMode.Insensitive,
            },
          }
        : undefined,
    },
  })

  const { setSkip, setTake, skip, take } = useTakeSkip()

  const [selectedNodes, setSelectedNodes] = useState<ChildNodes>(
    () => childNodes,
  )

  return (
    <div>
      <RenderSelectedNodes
        nodes={selectedNodes}
        removeNode={(id) =>
          setSelectedNodes((state) => state?.filter((node) => node.id !== id))
        }
      />
      <UpdateChoicesButton
        nodeId={nodeId}
        childNodes={childNodes?.map((node) => node.id) || []}
        selectedNodes={selectedNodes?.map((node) => node.id) || []}
      />
      <HtmlLabel title="Search">
        <HtmlInput
          placeholder="Search node titles"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </HtmlLabel>

      <ShowData
        loading={loading}
        pagination={{
          resultCount: data?.nodes.length,
          totalCount: data?.nodesCount.count,
          setSkip,
          setTake,
          skip,
          take,
        }}
        title={undefined}
      >
        {data?.nodes.map((node) => (
          <div key={node.id}>
            <div>{node.title}</div>
            <Button
              variant="text"
              size="none"
              onClick={() => {
                if (
                  selectedNodes?.find(
                    (selectedNode) => selectedNode.id === node.id,
                  )
                ) {
                  notification$.next({ message: 'Already added.' })
                  return
                }
                setSelectedNodes((state) => [...state, node])
              }}
            >
              Add
            </Button>
          </div>
        ))}
      </ShowData>
    </div>
  )
}

export const RenderSelectedNodes = ({
  nodes,
  removeNode,
}: {
  nodes: ChildNodes
  removeNode: (id: number) => void
}) => {
  const { setSkip, setTake, skip, take } = useTakeSkip()

  return (
    <ShowData
      loading={false}
      pagination={{
        resultCount: nodes.length,
        totalCount: nodes.length,
        setSkip,
        setTake,
        skip,
        take,
      }}
      title={undefined}
    >
      {nodes.map((node) => (
        <div key={node.id}>
          <div>{node.title}</div>
          <Button
            variant="text"
            size="none"
            onClick={() => removeNode(node.id)}
          >
            Remove
          </Button>
        </div>
      ))}
    </ShowData>
  )
}

export const UpdateChoicesButton = ({
  nodeId,
  selectedNodes = [],
  childNodes = [],
}: {
  nodeId: number
  selectedNodes: number[]
  childNodes: number[]
}) => {
  const [addChildNodes, { data, loading }] = useAddChildNodesMutation()

  const disableUpdateChildNodes = () => {
    if (childNodes.length !== selectedNodes.length) {
      return false
    }

    return selectedNodes.every((nodeId) => childNodes.includes(nodeId))
  }
  return (
    <Button
      disabled={disableUpdateChildNodes()}
      loading={loading}
      onClick={async () => {
        await addChildNodes({
          variables: { childrenNodeIds: selectedNodes, nodeId },
          awaitRefetchQueries: true,
          refetchQueries: [namedOperations.Query.node],
        })
      }}
    >
      Update choices
    </Button>
  )
}
