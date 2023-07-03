import { ObjectType } from '@nestjs/graphql'
import { Node as NodeType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Node implements RestrictProperties<Node, NodeType> {
  id: number
  createdAt: Date
  updatedAt: Date
  title: string
  content: string
  start: boolean
  end: boolean
  authorId: string
  storyId: number
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
