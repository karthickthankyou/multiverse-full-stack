import { Field, ObjectType } from '@nestjs/graphql'
import { Node as NodeType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Node implements RestrictProperties<Node, NodeType> {
  choiceText: string
  @Field(() => String, { nullable: true })
  image: string
  id: number
  createdAt: Date
  updatedAt: Date
  title: string
  content: string
  @Field(() => Boolean, { nullable: true })
  start: boolean
  @Field(() => Boolean, { nullable: true })
  end: boolean
  authorId: string
  storyId: number
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
