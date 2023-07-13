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
} from '@multiverse-org/network/src/generated'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { useDebouncedValue } from '@multiverse-org/hooks/src/async'
import { ShowData } from '../ShowData'
import { useTakeSkip } from '@multiverse-org/hooks'
import { notification$ } from '@multiverse-org/util/subjects'
import { SelectedNode, useStoreSelectedNodesWithChoiceText } from './data'
import { Switch } from '../../atoms/Switch'
import { AlertSection } from '../AlertSection'
import { makeId } from '@multiverse-org/util'

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
        id: makeId(),
        nodeId: choice.choiceNode.id,
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

        <SearchNodes closeDialog={() => setOpen(false)} node={node} />
      </Dialog>
    </div>
  )
}

const SearchNodes = ({
  node,
  closeDialog,
}: {
  node: NodesQuery['nodes'][0]
  closeDialog: Function
}) => {
  const [searchText, setSearchText] = useState('')
  const [showAllNodes, setShowAllNodes] = useState(false)

  const debouncedSearchText = useDebouncedValue(searchText, 300)
  const { setSkip, setTake, skip, take } = useTakeSkip()
  const { data, loading } = useNodesQuery({
    variables: {
      skip,
      take,
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

  const {
    setSelectedNodes,
    selectedNodes,
    addSelectedNode,
    removeSelectedNode,
    resetSelectedNodes,
  } = useStoreSelectedNodesWithChoiceText()

  useEffect(() => {
    setSelectedNodes(
      node.choices?.map((choice) => ({
        id: makeId(),
        nodeId: choice.choiceNode.id,
        title: choice.choiceNode.title,
        choiceText: choice.choiceText,
      })) || [],
    )
  }, [])

  return (
    <div className="space-y-2">
      <RenderSelectedNodes
        nodes={selectedNodes}
        removeNode={(id) => removeSelectedNode(id)}
      />
      <UpdateChoicesButton
        selectedNodes={selectedNodes}
        nodeId={node.id}
        afterSubmit={() => {
          resetSelectedNodes()
          closeDialog()
        }}
      />
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
        className="mb-4"
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
            <div className="text-xs">{node.title}</div>
            <Button
              variant="text"
              size="none"
              onClick={() => {
                // if (
                //   selectedNodes?.find(
                //     (selectedNode) => selectedNode?.id === node.id,
                //   )
                // ) {
                //   notification$.next({ message: 'Already added.' })
                //   return
                // }
                addSelectedNode({
                  id: makeId(),
                  nodeId: node.id,
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
  removeNode: (id: string) => void
}) => {
  const { setSkip, setTake, skip, take } = useTakeSkip()

  const { updateChoiceTextForNodeId } = useStoreSelectedNodesWithChoiceText()

  if (nodes.length === 0) {
    return <AlertSection>No choices selected.</AlertSection>
  }
  return (
    <div className="flex flex-col gap-4">
      {nodes.map((node) => (
        <div key={node.id} className="space-y-1">
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
            onClick={() => removeNode(node.id)}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  )
}

export const UpdateChoicesButton = ({
  nodeId,
  selectedNodes,
  afterSubmit,
}: {
  nodeId: number
  selectedNodes: SelectedNode[]
  afterSubmit?: Function
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
            choiceNodeId: choice.nodeId,
            choiceText: choice.choiceText || '-',
            parentNodeId: nodeId,
          }),
        )
        console.log('choices ', choices, selectedNodes)
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
        {
          afterSubmit ? afterSubmit() : null
        }
      }}
    >
      Update choices
    </Button>
  )
}
