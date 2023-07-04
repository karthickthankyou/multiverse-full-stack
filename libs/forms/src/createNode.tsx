import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const createNodeFormSchema = z.object({
  title: z.string(),
  content: z.string(),
  choiceText: z.string(),
  start: z.boolean(),
  end: z.boolean(),
  image: z.any(),
})

export type FormTypeCreateNode = z.infer<typeof createNodeFormSchema>

export const useFormCreateNode = () =>
  useForm<FormTypeCreateNode>({
    resolver: zodResolver(createNodeFormSchema),
  })
