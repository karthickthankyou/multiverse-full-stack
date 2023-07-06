import { Field, InputType } from '@nestjs/graphql'
import { Prisma, UserStoryType } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { StoryRelationFilter } from 'src/models/stories/dto/where.args'
import { UserRelationFilter } from 'src/models/users/dto/where.args'

@InputType()
export class UserStoryUidStoryIdCompoundUniqueInput {
  uid: string
  storyId: number
}

@InputType()
export class UserStoryWhereUniqueInput
  implements
    RestrictProperties<
      UserStoryWhereUniqueInput,
      Prisma.UserStoryWhereUniqueInput
    >
{
  @Field(() => UserStoryUidStoryIdCompoundUniqueInput, { nullable: true })
  uid_storyId: UserStoryUidStoryIdCompoundUniqueInput
}
@InputType()
export class EnumUserStoryTypeFilter {
  @Field(() => UserStoryType, { nullable: true })
  equals: UserStoryType;
  @Field(() => [UserStoryType], { nullable: true })
  in: UserStoryType[]
  @Field(() => [UserStoryType], { nullable: true })
  notIn: UserStoryType[]
  @Field(() => UserStoryType, { nullable: true })
  not: UserStoryType
}

@InputType()
export class UserStoryWhereInput
  implements
    RestrictProperties<UserStoryWhereInput, Prisma.UserStoryWhereInput>
{
  @Field(() => UserRelationFilter, { nullable: true })
  user: UserRelationFilter
  @Field(() => StoryRelationFilter, { nullable: true })
  story: StoryRelationFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  uid: StringFilter
  @Field(() => IntFilter, { nullable: true })
  storyId: IntFilter
  @Field(() => EnumUserStoryTypeFilter, { nullable: true })
  type: EnumUserStoryTypeFilter

  @Field(() => [UserStoryWhereInput], { nullable: true })
  AND: UserStoryWhereInput[]
  @Field(() => [UserStoryWhereInput], { nullable: true })
  OR: UserStoryWhereInput[]
  @Field(() => [UserStoryWhereInput], { nullable: true })
  NOT: UserStoryWhereInput[]
}

@InputType()
export class UserStoryListRelationFilter {
  @Field(() => UserStoryWhereInput, { nullable: true })
  every: UserStoryWhereInput
  @Field(() => UserStoryWhereInput, { nullable: true })
  some: UserStoryWhereInput
  @Field(() => UserStoryWhereInput, { nullable: true })
  none: UserStoryWhereInput
}

@InputType()
export class UserStoryRelationFilter {
  @Field(() => UserStoryWhereInput, { nullable: true })
  is: UserStoryWhereInput
  @Field(() => UserStoryWhereInput, { nullable: true })
  isNot: UserStoryWhereInput
}
