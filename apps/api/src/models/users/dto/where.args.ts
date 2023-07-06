import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { NodeListRelationFilter } from 'src/models/nodes/dto/relations.args'
import { StoryListRelationFilter } from 'src/models/stories/dto/where.args'
import { UserStoryListRelationFilter } from 'src/models/user-stories/dto/where.args'

@InputType()
export class UserWhereUniqueInput
  implements
    RestrictProperties<UserWhereUniqueInput, Prisma.UserWhereUniqueInput>
{
  @Field(() => String, { nullable: true })
  uid: string
}

@InputType()
export class UserWhereInput
  implements RestrictProperties<UserWhereInput, Prisma.UserWhereInput>
{
  @Field(() => UserStoryListRelationFilter, { nullable: true })
  userStories: UserStoryListRelationFilter
  @Field(() => StringFilter, { nullable: true })
  uid: StringFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  name: StringFilter
  @Field(() => StoryListRelationFilter, { nullable: true })
  stories: StoryListRelationFilter
  @Field(() => NodeListRelationFilter, { nullable: true })
  nodes: NodeListRelationFilter

  @Field(() => [UserWhereInput], { nullable: true })
  AND: UserWhereInput[]
  @Field(() => [UserWhereInput], { nullable: true })
  OR: UserWhereInput[]
  @Field(() => [UserWhereInput], { nullable: true })
  NOT: UserWhereInput[]
}

@InputType()
export class UserListRelationFilter {
  @Field(() => UserWhereInput, { nullable: true })
  every: UserWhereInput
  @Field(() => UserWhereInput, { nullable: true })
  some: UserWhereInput
  @Field(() => UserWhereInput, { nullable: true })
  none: UserWhereInput
}

@InputType()
export class UserRelationFilter {
  @Field(() => UserWhereInput, { nullable: true })
  is: UserWhereInput
  @Field(() => UserWhereInput, { nullable: true })
  isNot: UserWhereInput
}
