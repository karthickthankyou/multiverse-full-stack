import { ObjectType } from '@nestjs/graphql'
import { Choice as ChoiceType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Choice implements RestrictProperties<Choice, ChoiceType> {
  id: number
  createdAt: Date
  updatedAt: Date
  choiceText: string
  parentNodeId: number
  choiceNodeId: number
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
