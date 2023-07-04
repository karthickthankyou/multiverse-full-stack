import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ChoiceOrderByRelationAggregateInput } from 'src/models/choices/dto/orderBy.args'
import { StoryOrderByWithRelationInput } from 'src/models/stories/dto/orderBy.args'
import { UserOrderByWithRelationInput } from 'src/models/users/dto/orderBy.args'

@InputType()
export class NodeOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}

@InputType()
export default class NodeOrderByWithRelationInput
  implements
    RestrictProperties<
      NodeOrderByWithRelationInput,
      Prisma.NodeOrderByWithRelationInput
    >
{
  @Field(() => ChoiceOrderByRelationAggregateInput, { nullable: true })
  parentNodes: ChoiceOrderByRelationAggregateInput
  @Field(() => ChoiceOrderByRelationAggregateInput, { nullable: true })
  choiceNodes: ChoiceOrderByRelationAggregateInput
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
  content: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  start: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  end: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  authorId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  storyId: Prisma.SortOrder

  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  author: UserOrderByWithRelationInput
  @Field(() => StoryOrderByWithRelationInput, { nullable: true })
  story: StoryOrderByWithRelationInput
}
