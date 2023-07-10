import { Field, Float, ObjectType } from '@nestjs/graphql'
import { Story as StoryType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Story implements RestrictProperties<Story, StoryType> {
  @Field(() => Float)
  price: number
  description: string
  image: string
  id: number
  createdAt: Date
  updatedAt: Date
  title: string
  authorId: string
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
