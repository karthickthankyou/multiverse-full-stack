import { ReactNode } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createNodeFormSchema } from './createNode'

export const createStoryFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.any(), // Todo: find a suitable type which throws validation error if the image is falsy.
  nodes: z.array(createNodeFormSchema),
})

export type FormTypeCreateStory = z.infer<typeof createStoryFormSchema>

export const useFormCreateStory = () =>
  useForm<FormTypeCreateStory>({
    resolver: zodResolver(createStoryFormSchema),
  })

export const FormProviderCreateStory = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useFormCreateStory()
  return <FormProvider {...methods}>{children}</FormProvider>
}
