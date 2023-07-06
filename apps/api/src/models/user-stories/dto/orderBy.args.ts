import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { StoryOrderByWithRelationInput } from 'src/models/stories/dto/orderBy.args'
import { UserOrderByWithRelationInput } from 'src/models/users/dto/orderBy.args'

@InputType()
export class UserStoryOrderByWithRelationInput
  implements
    RestrictProperties<
      UserStoryOrderByWithRelationInput,
      Prisma.UserStoryOrderByWithRelationInput
    >
{
  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  user: UserOrderByWithRelationInput
  @Field(() => StoryOrderByWithRelationInput, { nullable: true })
  story: StoryOrderByWithRelationInput
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  uid: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  storyId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  type: Prisma.SortOrder
  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class UserStoryOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
