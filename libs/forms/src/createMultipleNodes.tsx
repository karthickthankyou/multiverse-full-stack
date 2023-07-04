import { ReactNode } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createStoryFormSchema } from './createStory'

export const formSchemaCreateMultipleNodes = createStoryFormSchema.pick({
  nodes: true,
})

export type FormTypeCreateMultipleNodes = z.infer<
  typeof formSchemaCreateMultipleNodes
>

export const useFormCreateMultipleNodes = () =>
  useForm<FormTypeCreateMultipleNodes>({
    resolver: zodResolver(formSchemaCreateMultipleNodes),
  })

export const FormProviderCreateMultipleNodes = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useFormCreateMultipleNodes()
  return <FormProvider {...methods}>{children}</FormProvider>
}
