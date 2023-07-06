import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { NodeOrderByRelationAggregateInput } from 'src/models/nodes/dto/orderBy.args'
import { UserStoryOrderByRelationAggregateInput } from 'src/models/user-stories/dto/orderBy.args'
import { UserOrderByWithRelationInput } from 'src/models/users/dto/orderBy.args'

@InputType()
export class StoryOrderByWithRelationInput
  implements
    RestrictProperties<
      StoryOrderByWithRelationInput,
      Prisma.StoryOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  userStories: UserStoryOrderByRelationAggregateInput
  @Field(() => Prisma.SortOrder, { nullable: true })
  description: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  image: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  title: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  authorId: Prisma.SortOrder
  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  author: UserOrderByWithRelationInput
  @Field(() => NodeOrderByRelationAggregateInput, { nullable: true })
  nodes: NodeOrderByRelationAggregateInput
}

@InputType()
export class StoryOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
