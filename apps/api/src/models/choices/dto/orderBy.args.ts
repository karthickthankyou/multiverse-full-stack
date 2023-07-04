import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import NodeOrderByWithRelationInput from 'src/models/nodes/dto/orderBy.args'

@InputType()
export class ChoiceOrderByWithRelationInput
  implements
    RestrictProperties<
      ChoiceOrderByWithRelationInput,
      Prisma.ChoiceOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  choiceText: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  parentNodeId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  choiceNodeId: Prisma.SortOrder
  @Field(() => NodeOrderByWithRelationInput, { nullable: true })
  parentNode: NodeOrderByWithRelationInput
  @Field(() => NodeOrderByWithRelationInput, { nullable: true })
  choiceNode: NodeOrderByWithRelationInput
}

@InputType()
export class ChoiceOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
