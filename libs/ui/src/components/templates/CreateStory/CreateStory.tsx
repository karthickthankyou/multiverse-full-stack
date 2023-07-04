import {
  FormProviderCreateStory,
  FormTypeCreateStory,
} from '@multiverse-org/forms/src/createStory'

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
import { IconArrowRight, IconFocus, IconPlus } from '@tabler/icons-react'
import { Container } from '../../atoms/Container'
import { Switch } from '../../atoms/Switch'
import { useRouter } from 'next/router'
import { useUserStore } from '@multiverse-org/store/user'
import { notification$ } from '@multiverse-org/util/subjects'

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
    formState: { errors },
  } = useFormContext<FormTypeCreateStory>()

  const storyData = useWatch()
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
        <HtmlLabel title="Title">
          <HtmlInput
            placeholder="Title of the story..."
            {...register('title')}
          />
        </HtmlLabel>
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <HtmlLabel
              title="Cover image"
              error={errors.image?.message?.toString()}
            >
              <HtmlInput
                type="file"
                accept="image/*"
                multiple={false}
                onChange={(e) => field.onChange(e?.target?.files)}
              />
            </HtmlLabel>
          )}
        />
        <AddNodes />
        <Button loading={loading || uploading} type="submit">
          <div className="flex items-center justify-center gap-1">
            Connect nodes <IconArrowRight />
          </div>
        </Button>
      </Form>
    </div>
  )
}

export const AddNodes = () => {
  const {
    control,
    register,
    setValue,
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
            className={`flex gap-2 ${hovered === item.id ? 'bg-strip' : null}`}
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
    </div>
  )
}
