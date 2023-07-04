import {
  FormProviderCreateStory,
  FormTypeCreateStory,
} from '@multiverse-org/forms/src/createStory'
import Image from 'next/image'
import { Form } from '../../atoms/Form'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { Controller } from 'react-hook-form'
import { Button } from '../../atoms/Button'
import { useImageUpload } from '@multiverse-org/util'
import { useCreateStoryMutation } from '@multiverse-org/network/src/gql/generated'
import { useFormContext, useWatch, useFieldArray } from 'react-hook-form'
import { useState } from 'react'
import { Accordion } from '../../molecules/Accordion'
import { HtmlTextArea } from '../../atoms/HtmlTextArea'
import {
  IconArrowRight,
  IconFocus,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react'
import { Container } from '../../atoms/Container'
import { Switch2 } from '../../atoms/Switch2'
import { useRouter } from 'next/router'
import { useUserStore } from '@multiverse-org/store/user'
import { notification$ } from '@multiverse-org/util/subjects'
import { Header } from '../../organisms/Header'
import { HeaderText } from '../../molecules/HeaderText'
import { PlainButton } from '../../atoms/PlainButton'
import { StickyLayout } from '../../organisms/StickyLayout'

export interface ICreateStoryProps {}

export const CreateStory = () => {
  return (
    <Container>
      <FormProviderCreateStory>
        <CreateStoryContent />
      </FormProviderCreateStory>
    </Container>
  )
}

export const CreateStoryContent = ({}: ICreateStoryProps) => {
  const {
    register,
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useFormContext<FormTypeCreateStory>()

  const storyData = useWatch<FormTypeCreateStory>()
  console.log('storyData', storyData, storyData.image, storyData.image?.[0])

  const [{ percent, uploading }, uploadImages] = useImageUpload()
  const uid = useUserStore((state) => state.uid)

  const [createStory, { data, loading }] = useCreateStoryMutation()

  const router = useRouter()

  return (
    <div>
      <Form
        onSubmit={handleSubmit(async (data) => {
          if (!uid) {
            notification$.next({ message: 'You are not logged in.' })
            return
          }
          console.log('data.image ', data.image)
          const images = await uploadImages(data.image)

          const nodesWithImage = await Promise.all(
            data.nodes.map(async (node) => {
              console.log('node.image', node.image)
              const nodeImage = await uploadImages(node.image)
              return { ...node, authorId: uid, image: nodeImage[0] }
            }),
          )
          console.log('nodesWithImage ', nodesWithImage, images)
          const story = await createStory({
            variables: {
              createStoryInput: {
                authorId: uid,
                image: images[0],
                title: data.title,
                nodes: nodesWithImage,
              },
            },
          })

          router.push({
            pathname: '/connect-nodes',
            query: { storyId: story.data?.createStory.id },
          })
        })}
      >
        <StickyLayout
          sidebarContent={
            <div className="flex flex-col gap-4">
              <HeaderText>Create Story</HeaderText>
              {storyData.image ? (
                <div className="relative flex items-center justify-center w-full h-full min-h-[12rem]">
                  <PlainButton
                    className="flex items-center gap-1 p-2 text-white underline underline-offset-4 bg-black/30"
                    onClick={() => {
                      resetField(`image`)
                    }}
                  >
                    <IconTrash /> Clear
                  </PlainButton>
                  <img
                    className="absolute object-cover h-full z-full -z-10"
                    alt=""
                    src={URL.createObjectURL(storyData.image[0])}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full  min-h-[12rem] bg-gray-100">
                  <Controller
                    control={control}
                    name={`image`}
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

              <HtmlLabel title="Title">
                <HtmlInput
                  placeholder="Title of the story..."
                  {...register('title')}
                />
              </HtmlLabel>
              <HtmlLabel title="Description">
                <HtmlTextArea
                  placeholder="Describe..."
                  {...register('description')}
                />
              </HtmlLabel>
              <Button loading={loading || uploading} type="submit">
                <div className="flex items-center justify-center gap-1">
                  Proceed to connect the nodes <IconArrowRight />
                </div>
              </Button>
            </div>
          }
        >
          <AddNodes />
        </StickyLayout>
      </Form>
    </div>
  )
}

export const AddNodes = () => {
  const {
    control,
    register,
    setValue,
    resetField,
    formState: { errors },
  } = useFormContext<FormTypeCreateStory>()

  const { fields, append, remove } = useFieldArray<FormTypeCreateStory>({
    control,
    name: `nodes`,
  })

  const { nodes } = useWatch<FormTypeCreateStory>()
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div>
      <div className="mb-4 space-y-2">
        <HeaderText>Nodes</HeaderText>
        <p className="text-gray">
          Each choice is a node. You will create all the choices and their
          consequences here.
        </p>
      </div>
      {fields.map((item, nodeIndex) => (
        <Accordion
          title={
            (
              <div className="flex items-center gap-1">
                <IconFocus /> <div> {nodes?.[nodeIndex]?.choiceText}</div>
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
                title="Choice text"
                optional
                error={errors.nodes?.[nodeIndex]?.choiceText?.message}
              >
                <HtmlInput
                  placeholder="Enter the choice text"
                  {...register(`nodes.${nodeIndex}.choiceText`)}
                />
              </HtmlLabel>
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

              <Switch2
                checked={nodes?.[nodeIndex]?.start || false}
                onChange={(value) => {
                  setValue(`nodes.${nodeIndex}.start`, value)
                }}
                label={'Start?'}
              />
              <Switch2
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
    </div>
  )
}
