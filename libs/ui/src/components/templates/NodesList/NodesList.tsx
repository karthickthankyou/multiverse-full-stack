import {
  CreateMultipleNodesInput,
  namedOperations,
  useCreateNodesMutation,
  useNodesQuery,
} from '@multiverse-org/network/src/generated'
import Image from 'next/image'
import { LoaderPanel } from '../../molecules/Loader'
import { ShowData } from '../../organisms/ShowData'
import { useTakeSkip } from '@multiverse-org/hooks'
import { AddChoicesDialog } from '../../organisms/AddChoicesDialog'
import { useState } from 'react'
import { Button } from '../../atoms/Button'
import {
  useFormContext,
  useWatch,
  useFieldArray,
  Controller,
} from 'react-hook-form'
import { Accordion } from '../../molecules/Accordion'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { Switch } from '../../atoms/Switch'
import {
  FormProviderCreateMultipleNodes,
  FormTypeCreateMultipleNodes,
} from '@multiverse-org/forms/src/createMultipleNodes'
import { IconFocus, IconPlus, IconTrash } from '@tabler/icons-react'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlTextArea } from '../../atoms/HtmlTextArea'
import { Dialog } from '../../atoms/Dialog'
import { Form } from '../../atoms/Form'
import { selectUid, selectUser } from '@multiverse-org/store/user'
import { useAppSelector } from '@multiverse-org/store'
import { notification$ } from '@multiverse-org/util/subjects'
import { useImageUpload } from '@multiverse-org/util'
import { PlainButton } from '../../atoms/PlainButton'

export interface INodesListProps {
  storyId: number
}

export const NodesList = ({ storyId }: INodesListProps) => {
  const { setSkip, setTake, skip, take } = useTakeSkip()
  const { data, loading, error } = useNodesQuery({
    variables: { where: { storyId: { equals: storyId } }, skip, take },
  })

  return (
    <FormProviderCreateMultipleNodes>
      <AddNodesDialog storyId={storyId} />
      <ShowData
        error={error?.message}
        loading={loading}
        pagination={{
          resultCount: data?.nodes?.length,
          totalCount: data?.nodesCount.count,
          setSkip,
          setTake,
          skip,
          take,
        }}
        title={'Connect nodes'}
      >
        {data?.nodes?.map((node) => (
          <div key={node.id}>
            <div>{node.title}</div>
            {node.end ? (
              <div className="inline-block px-1 text-xs text-white bg-black">
                End.
              </div>
            ) : null}
            {node.start ? (
              <div className="inline-block px-1 text-xs text-black bg-primary">
                Start.
              </div>
            ) : null}

            {node.image ? (
              <Image
                width={200}
                height={160}
                src={node.image}
                alt={node.title}
              />
            ) : null}
            <ul className="my-2 list-disc">
              {node.choices?.map((choice) => (
                <li
                  key={node.id}
                  className="text-xs text-gray decoration-slice"
                >
                  {choice.choiceText}
                </li>
              ))}
            </ul>
            {node.end ? null : <AddChoicesDialog node={node} />}
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
    resetField,
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
  const [{ percent, uploading }, uploadImages] = useImageUpload()

  const uid = useAppSelector(selectUid)
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

            const nodesWithImage: CreateMultipleNodesInput['nodes'] =
              await Promise.all(
                data.nodes.map(async (node) => {
                  console.log(node.image)
                  const nodeImage = await uploadImages(node.image)

                  return {
                    ...node,
                    authorId: uid,
                    image: nodeImage[0],
                    storyId,
                  }
                }),
              )
            await createNodes({
              variables: {
                createMultipleNodesInput: {
                  nodes: nodesWithImage,
                },
              },
              awaitRefetchQueries: true,
              refetchQueries: [namedOperations.Query.nodes],
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
                className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 ${
                  hovered === item.id ? 'bg-strip' : null
                }`}
              >
                {nodes?.[nodeIndex]?.image ? (
                  <div className="relative flex items-center justify-center w-full h-full min-h-[12rem]">
                    <PlainButton
                      className="flex items-center gap-1 p-2 text-white underline underline-offset-4 bg-black/30"
                      onClick={() => {
                        resetField(`nodes.${nodeIndex}.image`)
                      }}
                    >
                      <IconTrash /> Clear
                    </PlainButton>
                    <img
                      className="absolute object-cover h-full z-full -z-10"
                      alt=""
                      src={URL.createObjectURL(nodes?.[nodeIndex].image[0])}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-full  min-h-[12rem] bg-gray-100">
                    <Controller
                      control={control}
                      name={`nodes.${nodeIndex}.image`}
                      render={({ field }) => (
                        <HtmlInput
                          type="file"
                          accept="image/*"
                          multiple={false}
                          onChange={(e) => field.onChange(e?.target?.files)}
                        />
                      )}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <HtmlLabel
                    title="Title"
                    error={errors.nodes?.[nodeIndex]?.title?.message}
                  >
                    <HtmlInput
                      placeholder="Enter the title"
                      {...register(`nodes.${nodeIndex}.title`)}
                    />
                  </HtmlLabel>

                  <Switch
                    checked={nodes?.[nodeIndex]?.start || false}
                    onChange={(value) => {
                      setValue(`nodes.${nodeIndex}.start`, value)
                    }}
                    label={'Start?'}
                  />
                  <Switch
                    checked={nodes?.[nodeIndex]?.end || false}
                    onChange={(value) => {
                      setValue(`nodes.${nodeIndex}.end`, value)
                    }}
                    label={'End?'}
                  />
                </div>
                <HtmlLabel
                  title="Content"
                  optional
                  error={errors.nodes?.[nodeIndex]?.content?.message}
                >
                  <HtmlTextArea
                    rows={8}
                    placeholder="Enter the content"
                    {...register(`nodes.${nodeIndex}.content`)}
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
          <Button loading={loading || uploading} type="submit">
            Create nodes
          </Button>
        </Form>
      </Dialog>
    </div>
  )
}
