import { useEffect, useState } from 'react'
import { Button } from '../../atoms/Button'
import { Dialog } from '../../atoms/Dialog'
import {
  CreateManyChoiceInput,
  NodesQuery,
  QueryMode,
  namedOperations,
  useChoicesLazyQuery,
  useCreateManyChoicesMutation,
  useNodesQuery,
} from '@multiverse-org/network/src/gql/generated'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { useDebouncedValue } from '@multiverse-org/hooks/src/async'
import { ShowData } from '../ShowData'
import { useTakeSkip } from '@multiverse-org/hooks'
import { notification$ } from '@multiverse-org/util/subjects'
import { SelectedNode, useStoreSelectedNodesWithChoiceText } from './data'
import { Switch } from '../../atoms/Switch'

export interface IAddChoicesDialogProps {
  node: NodesQuery['nodes'][0]
}

export const AddChoicesDialog = ({ node }: IAddChoicesDialogProps) => {
  const [open, setOpen] = useState(false)

  const [getChoices, { loading, data }] = useChoicesLazyQuery()
  useEffect(() => {
    getChoices({ variables: { where: { parentNodeId: { equals: node.id } } } })
  }, [])

  const { setSelectedNodes, resetSelectedNodes } =
    useStoreSelectedNodesWithChoiceText()

  useEffect(() => {
    setSelectedNodes(
      data?.choices.map((choice) => ({
        id: choice.choiceNode.id,
        title: choice.choiceNode.title,
        choiceText: choice.choiceText || '',
      })) || [],
    )

    return () => {
      resetSelectedNodes()
    }
  }, [data?.choices])

  return (
    <div>
      <Button variant="text" size="none" onClick={() => setOpen(true)}>
        Add choices
      </Button>
      <Dialog open={open} setOpen={setOpen} title={'Add choices'}>
        <div className="mb-4 space-y-2">
          <div>{node.title}</div>
          <div className="text-sm text-gray">{node.content}</div>
        </div>

        <SearchNodes node={node} />
      </Dialog>
    </div>
  )
}

const SearchNodes = ({ node }: { node: NodesQuery['nodes'][0] }) => {
  const [searchText, setSearchText] = useState('')
  const [showAllNodes, setShowAllNodes] = useState(false)

  const debouncedSearchText = useDebouncedValue(searchText, 300)

  const { data, loading } = useNodesQuery({
    variables: {
      where: {
        ...(debouncedSearchText
          ? {
              title: {
                contains: debouncedSearchText,
                mode: QueryMode.Insensitive,
              },
            }
          : {}),
        ...(showAllNodes ? {} : { storyId: { equals: node.storyId } }),
      },
    },
  })

  const { setSkip, setTake, skip, take } = useTakeSkip()

  const { selectedNodes, addSelectedNode, removeSelectedNode } =
    useStoreSelectedNodesWithChoiceText()

  return (
    <div>
      <RenderSelectedNodes
        nodes={selectedNodes}
        removeNode={(id) => removeSelectedNode(id)}
      />
      <UpdateChoicesButton selectedNodes={selectedNodes} nodeId={node.id} />
      <div className="my-3" />
      <HtmlLabel title="Search">
        <HtmlInput
          placeholder="Search node titles"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </HtmlLabel>
      <Switch
        label={'Search nodes from all stories?'}
        checked={showAllNodes}
        onChange={(v) => {
          setShowAllNodes(v)
        }}
      />

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
                    (selectedNode) => selectedNode?.id === node.id,
                  )
                ) {
                  notification$.next({ message: 'Already added.' })
                  return
                }
                addSelectedNode({
                  id: node.id,
                  title: node.title,
                  choiceText: '',
                })
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
  nodes: SelectedNode[]
  removeNode: (id: number) => void
}) => {
  const { setSkip, setTake, skip, take } = useTakeSkip()

  const { updateChoiceTextForNodeId } = useStoreSelectedNodesWithChoiceText()

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
      title={'Choices'}
      className="flex flex-col gap-4"
    >
      {nodes.map((node) => (
        <div key={node?.id} className="space-y-1">
          {/* Add choice text somewhere. */}
          <div>{node.title}</div>

          <HtmlInput
            value={node.choiceText}
            onChange={(e) => updateChoiceTextForNodeId(node.id, e.target.value)}
            placeholder="Enter choice text"
          />

          <Button
            variant="text"
            size="none"
            onClick={() => removeNode(node?.id)}
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
  selectedNodes,
}: {
  nodeId: number
  selectedNodes: SelectedNode[]
}) => {
  const [addChildNodes, { data, loading }] = useCreateManyChoicesMutation()

  useEffect(() => {
    if (data?.createManyChoices) {
      notification$.next({ message: 'Choices created.' })
    }
  }, [data?.createManyChoices])

  return (
    <Button
      loading={loading}
      onClick={async () => {
        console.log('selectedNodes', selectedNodes)

        selectedNodes.forEach((node) => {
          if (!node.choiceText) {
            notification$.next({ message: 'Choice text can not be empty.' })
            return
          }
        })
        const choices: CreateManyChoiceInput['choices'] = selectedNodes.map(
          (choice) => ({
            choiceNodeId: choice.id,
            choiceText: choice.choiceText || '-',
            parentNodeId: nodeId,
          }),
        )
        await addChildNodes({
          variables: {
            createManyChoiceInput: {
              choices,
            },
          },
          awaitRefetchQueries: true,
          refetchQueries: [
            namedOperations.Query.choices,
            namedOperations.Query.nodes,
          ],
        })
      }}
    >
      Update choices
    </Button>
  )
}
