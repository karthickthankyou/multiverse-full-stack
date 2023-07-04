import {
  namedOperations,
  useCreateNodesMutation,
  useNodesQuery,
} from '@multiverse-org/network/src/gql/generated'
import { LoaderPanel } from '../../molecules/Loader'
import { ShowData } from '../../organisms/ShowData'
import { useTakeSkip } from '@multiverse-org/hooks'
import { AddChoicesDialog } from '../../organisms/AddChoicesDialog'
import { useState } from 'react'
import { Button } from '../../atoms/Button'
import { useFormContext, useWatch, useFieldArray } from 'react-hook-form'
import { Accordion } from '../../molecules/Accordion'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { Switch } from '../../atoms/Switch'
import {
  FormProviderCreateMultipleNodes,
  FormTypeCreateMultipleNodes,
} from '@multiverse-org/forms/src/createMultipleNodes'
import { IconFocus, IconPlus } from '@tabler/icons-react'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlTextArea } from '../../atoms/HtmlTextArea'
import { Dialog } from '../../atoms/Dialog'
import { Form } from '../../atoms/Form'
import { useUserStore } from '@multiverse-org/store/user'
import { notification$ } from '@multiverse-org/util/subjects'

export interface INodesListProps {
  storyId: number
}

export const NodesList = ({ storyId }: INodesListProps) => {
  const { data, loading } = useNodesQuery({
    variables: { where: { storyId: { equals: storyId } } },
  })

  const { setSkip, setTake, skip, take } = useTakeSkip()

  if (loading) {
    return <LoaderPanel />
  }
  return (
    <FormProviderCreateMultipleNodes>
      <AddNodesDialog storyId={storyId} />
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
          <div key={node.id}>
            <div>{node.title}</div>
            <AddChoicesDialog />
          </div>
        ))}
      </ShowData>
    </FormProviderCreateMultipleNodes>
  )
}

// Investigage: Remove duplicate AddNodes!
// The react-hook-form does not recognize using Generic types which allows us to use this component for types FormTypeCreateStory and FormTypeCreateMultipleNodes.

export const AddNodesDialog = ({ storyId }: INodesListProps) => {
  const [open, setOpen] = useState(false)
  const {
    control,
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext<FormTypeCreateMultipleNodes>()

  const { fields, append, remove } = useFieldArray<FormTypeCreateMultipleNodes>(
    {
      control,
      name: `nodes`,
    },
  )

  const { nodes } = useWatch<FormTypeCreateMultipleNodes>()
  const [hovered, setHovered] = useState<string | null>(null)

  const [createNodes, { loading, data }] = useCreateNodesMutation()

  const uid = useUserStore((state) => state.uid)
  return (
    <div>
      <Button onClick={() => setOpen(true)}>New nodes</Button>
      <Dialog
        widthClassName="max-w-4xl"
        open={open}
        setOpen={setOpen}
        title={'New nodes'}
      >
        <Form
          onSubmit={handleSubmit(async (data) => {
            if (!uid) {
              notification$.next({ message: 'You are not logged in.' })
              return
            }
            await createNodes({
              variables: {
                createMultipleNodesInput: {
                  nodes: data.nodes.map(
                    ({ content, end, start, title, image }) => ({
                      authorId: uid,
                      content,
                      end,
                      start,
                      title,
                      image,
                      storyId,
                    }),
                  ),
                },
              },
              awaitRefetchQueries: true,
              refetchQueries: [namedOperations.Query.Nodes],
            })
            reset()
            setOpen(false)
            console.log(data)
          })}
        >
          {fields.map((item, nodeIndex) => (
            <Accordion
              title={
                (
                  <div className="flex items-center gap-1">
                    <IconFocus /> <div> {nodes?.[nodeIndex]?.title}</div>
                  </div>
                ) || '[Empty]'
              }
              key={item.id}
              className={item.id}
              defaultOpen
            >
              <div className={`flex justify-end my-2`}>
                <Button
                  variant="text"
                  size="none"
                  className="text-xs text-gray-600 underline underline-offset-2"
                  onClick={() => {
                    remove(nodeIndex)
                  }}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(item.id)}
                  onBlur={() => setHovered(null)}
                >
                  remove node
                </Button>
              </div>

              <div
                className={`flex gap-2 ${
                  hovered === item.id ? 'bg-strip' : null
                }`}
              >
                <HtmlLabel
                  title="Title"
                  optional
                  error={errors.nodes?.[nodeIndex]?.title?.message}
                >
                  <HtmlInput
                    placeholder="Enter the title"
                    {...register(`nodes.${nodeIndex}.title`)}
                  />
                </HtmlLabel>
                <HtmlLabel
                  title="Content"
                  optional
                  error={errors.nodes?.[nodeIndex]?.content?.message}
                >
                  <HtmlTextArea
                    placeholder="Enter the content"
                    {...register(`nodes.${nodeIndex}.content`)}
                  />
                </HtmlLabel>
                <HtmlLabel
                  title="Start?"
                  optional
                  error={errors.nodes?.[nodeIndex]?.content?.message}
                >
                  <Switch
                    checked={nodes?.[nodeIndex]?.start}
                    onChange={(e) => {
                      setValue(`nodes.${nodeIndex}.start`, e.target.checked)
                    }}
                  />
                </HtmlLabel>
                <HtmlLabel
                  title="End?"
                  optional
                  error={errors.nodes?.[nodeIndex]?.content?.message}
                >
                  <Switch
                    checked={nodes?.[nodeIndex]?.end}
                    onChange={(e) => {
                      setValue(`nodes.${nodeIndex}.end`, e.target.checked)
                    }}
                  />
                </HtmlLabel>
              </div>
            </Accordion>
          ))}
          <div>
            <Button
              className="flex items-center justify-center w-full py-2 text-xs border border-dashed"
              size="none"
              variant="text"
              onClick={() =>
                append({
                  title: '',
                  content: '',
                  start: false,
                  end: false,
                })
              }
            >
              <IconPlus className="w-4 h-4" /> Add node
            </Button>
          </div>
          <Button loading={loading} type="submit">
            Create nodes
          </Button>
        </Form>
      </Dialog>
    </div>
  )
}
