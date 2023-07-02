import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { NodeOrderByRelationAggregateInput } from 'src/models/nodes/dto/orderBy.args'
import { StoryOrderByRelationAggregateInput } from 'src/models/stories/dto/orderBy.args'

@InputType()
export class UserOrderByWithRelationInput
  implements
    RestrictProperties<
      UserOrderByWithRelationInput,
      Prisma.UserOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  uid: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  name: Prisma.SortOrder
  @Field(() => StoryOrderByRelationAggregateInput, { nullable: true })
  stories: StoryOrderByRelationAggregateInput
  @Field(() => NodeOrderByRelationAggregateInput, { nullable: true })
  nodes: NodeOrderByRelationAggregateInput
}

@InputType()
export class UserOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
