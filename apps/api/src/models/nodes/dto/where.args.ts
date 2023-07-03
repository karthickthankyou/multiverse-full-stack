import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  BoolFilter,
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { StoryRelationFilter } from 'src/models/stories/dto/where.args'
import { UserRelationFilter } from 'src/models/users/dto/where.args'
import { NodeListRelationFilter, NodeRelationFilter } from './relations.args'

@InputType()
export class NodeWhereUniqueInput
  implements
    RestrictProperties<NodeWhereUniqueInput, Prisma.NodeWhereUniqueInput>
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class NodeWhereInput
  implements RestrictProperties<NodeWhereInput, Prisma.NodeWhereInput>
{
  @Field(() => StringFilter, { nullable: true })
  image: StringFilter
  @Field(() => NodeListRelationFilter, { nullable: true })
  parentNodes: NodeListRelationFilter
  @Field(() => NodeListRelationFilter, { nullable: true })
  childNodes: NodeListRelationFilter
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  title: StringFilter
  @Field(() => StringFilter, { nullable: true })
  content: StringFilter
  @Field(() => BoolFilter, { nullable: true })
  start: BoolFilter
  @Field(() => BoolFilter, { nullable: true })
  end: BoolFilter
  @Field(() => StringFilter, { nullable: true })
  authorId: StringFilter
  @Field(() => IntFilter, { nullable: true })
  storyId: IntFilter

  @Field(() => UserRelationFilter, { nullable: true })
  author: UserRelationFilter
  @Field(() => StoryRelationFilter, { nullable: true })
  story: StoryRelationFilter

  @Field(() => [NodeWhereInput], { nullable: true })
  AND: NodeWhereInput[]
  @Field(() => [NodeWhereInput], { nullable: true })
  OR: NodeWhereInput[]
  @Field(() => [NodeWhereInput], { nullable: true })
  NOT: NodeWhereInput[]
}
