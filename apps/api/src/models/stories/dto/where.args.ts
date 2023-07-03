import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { NodeListRelationFilter } from 'src/models/nodes/dto/relations.args'

import { UserRelationFilter } from 'src/models/users/dto/where.args'

@InputType()
export class StoryWhereUniqueInput
  implements
    RestrictProperties<StoryWhereUniqueInput, Prisma.StoryWhereUniqueInput>
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class StoryWhereInput
  implements RestrictProperties<StoryWhereInput, Prisma.StoryWhereInput>
{
  @Field(() => StringFilter, { nullable: true })
  image: StringFilter
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  title: StringFilter
  @Field(() => StringFilter, { nullable: true })
  authorId: StringFilter
  @Field(() => UserRelationFilter, { nullable: true })
  author: UserRelationFilter
  @Field(() => NodeListRelationFilter, { nullable: true })
  nodes: NodeListRelationFilter

  @Field(() => [StoryWhereInput], { nullable: true })
  AND: StoryWhereInput[]
  @Field(() => [StoryWhereInput], { nullable: true })
  OR: StoryWhereInput[]
  @Field(() => [StoryWhereInput], { nullable: true })
  NOT: StoryWhereInput[]
}

@InputType()
export class StoryListRelationFilter {
  @Field(() => StoryWhereInput, { nullable: true })
  every: StoryWhereInput
  @Field(() => StoryWhereInput, { nullable: true })
  some: StoryWhereInput
  @Field(() => StoryWhereInput, { nullable: true })
  none: StoryWhereInput
}

@InputType()
export class StoryRelationFilter {
  @Field(() => StoryWhereInput, { nullable: true })
  is: StoryWhereInput
  @Field(() => StoryWhereInput, { nullable: true })
  isNot: StoryWhereInput
}
